import yt_dlp
import os
import tempfile
from fastapi import HTTPException

# ── Cookie helper ────────────────────────────────────────────────────────────
# On Render, set the env variable YOUTUBE_COOKIES to the raw Netscape cookie
# text exported from your browser (using the "Get cookies.txt LOCALLY" extension).
def _get_cookie_file():
    """Write the YOUTUBE_COOKIES env var to a temp file and return its path."""
    cookies_text = os.environ.get("YOUTUBE_COOKIES", "")
    if not cookies_text.strip():
        return None
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False)
    tmp.write(cookies_text)
    tmp.close()
    return tmp.name

# ── Common options ────────────────────────────────────────────────────────────
_COMMON_OPTS = {
    'noplaylist': True,
    'quiet': True,
    'no_warnings': True,
    'http_headers': {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/120.0.0.0 Safari/537.36'
        ),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Sec-Fetch-Mode': 'navigate',
    },
    'extractor_args': {'youtube': {'client': ['ios', 'android', 'web']}},
}

def _build_opts(extra=None):
    """Return a fresh options dict, injecting cookies when available."""
    # Default to a pre-merged format – requires no ffmpeg on the server
    defaults = {'format': 'best'}
    opts = {**_COMMON_OPTS, **defaults, **(extra or {})}
    cookie_file = _get_cookie_file()
    if cookie_file:
        opts['cookiefile'] = cookie_file
    return opts

# ── Public functions ──────────────────────────────────────────────────────────
def get_video_info(url: str) -> dict:
    """Extracts video metadata without downloading the video itself."""
    try:
        with yt_dlp.YoutubeDL(_build_opts()) as ydl:
            info = ydl.extract_info(url, download=False)
            return {
                "title": info.get("title", "Unknown Title"),
                "thumbnail": info.get("thumbnail", ""),
                "duration": info.get("duration", 0),
                "uploader": info.get("uploader", "Unknown"),
                "formats": [
                    {
                        "format_id": f.get("format_id"),
                        "ext": f.get("ext"),
                        "resolution": (
                            f.get("resolution")
                            or f"{f.get('width', 'unknown')}x{f.get('height', 'unknown')}"
                        ),
                        "fps": f.get("fps"),
                        "vcodec": f.get("vcodec"),
                        "acodec": f.get("acodec"),
                        "filesize": f.get("filesize") or f.get("filesize_approx"),
                        "url": f.get("url"),
                    }
                    for f in info.get("formats", [])
                    if f.get("vcodec") != "none"
                ],
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch video info: {str(e)}")


def get_direct_download_url(url: str, format_id: str = None) -> dict:
    """Returns the direct stream URL for a specific format or the best available."""
    try:
        extra = {'format': 'best'}
        if format_id:
            extra['format'] = f"{format_id}/best"

        with yt_dlp.YoutubeDL(_build_opts(extra)) as ydl:
            info = ydl.extract_info(url, download=False)
            return {
                "title": info.get("title", "video"),
                "url": info.get("url"),
                "ext": info.get("ext", "mp4"),
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to extract stream: {str(e)}")
