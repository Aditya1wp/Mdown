from fastapi import APIRouter
from pydantic import BaseModel
from services.downloader import get_video_info, get_direct_download_url
from typing import Optional

router = APIRouter()

# Schema for incoming request body
class URLRequest(BaseModel):
    url: str
    format_id: Optional[str] = None

@router.post("/info")
def fetch_info(req: URLRequest):
    """
    Given a URL (e.g., YouTube), returns metadata and available formats.
    """
    info = get_video_info(req.url)
    return info

@router.post("/download")
def fetch_download_url(req: URLRequest):
    """
    Given a URL and an optional format_id, returns the direct streaming URL
    that the frontend can use to download or stream the content.
    """
    stream_info = get_direct_download_url(req.url, req.format_id)
    return stream_info
