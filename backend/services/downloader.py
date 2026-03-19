import yt_dlp
from fastapi import HTTPException

# Configuration for yt-dlp to extract highest quality video and audio
YDL_OPTIONS = {
    'format': 'bestvideo+bestaudio/best',  # Best automatically handles combining formats if needed
    'noplaylist': True,
    'quiet': True,
    'no_warnings': True,
    'extractor_args': {'youtube': {'client': ['ios', 'android', 'web']}},
}

# Configuration just for extracting info (faster)
INFO_OPTIONS = {
    'noplaylist': True,
    'quiet': True,
    'no_warnings': True,
    'extractor_args': {'youtube': {'client': ['ios', 'android', 'web']}},
}

def get_video_info(url: str) -> dict:
    """Extracts video metadata without downloading the video itself."""
    try:
        with yt_dlp.YoutubeDL(INFO_OPTIONS) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Extract relevant fields
            return {
                "title": info.get("title", "Unknown Title"),
                "thumbnail": info.get("thumbnail", ""),
                "duration": info.get("duration", 0),
                "uploader": info.get("uploader", "Unknown"),
                "formats": [
                    {
                        "format_id": f.get("format_id"),
                        "ext": f.get("ext"),
                        "resolution": f.get("resolution") or f"{f.get('width', 'unknown')}x{f.get('height', 'unknown')}",
                        "fps": f.get("fps"),
                        "vcodec": f.get("vcodec"),
                        "acodec": f.get("acodec"),
                        "filesize": f.get("filesize") or f.get("filesize_approx"),
                        "url": f.get("url")
                    }
                    for f in info.get("formats", [])
                    if f.get("vcodec") != "none"  # Filter out audio-only by default for simple view
                ]
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch video info: {str(e)}")

def get_direct_download_url(url: str, format_id: str = None) -> dict:
     """Returns the direct stream URL for a specific format or the best available."""
     try:
         options = dict(YDL_OPTIONS)
         if format_id:
              options['format'] = f"{format_id}+bestaudio/best"
              
         with yt_dlp.YoutubeDL(options) as ydl:
             info = ydl.extract_info(url, download=False)
             
             # If it's a direct format, return its URL
             return {
                 "title": info.get("title", "video"),
                 "url": info.get("url"), # Direct playable/downloadable URL
                 "ext": info.get("ext", "mp4")
             }
     except Exception as e:
          raise HTTPException(status_code=400, detail=f"Failed to extract stream: {str(e)}")
