import React, { useState } from 'react';
import { fetchVideoInfo, fetchDownloadUrl } from '../services/api';
import { downloadVideo } from '../services/capacitor';

const Downloader = ({ platform, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloadingFormat, setDownloadingFormat] = useState(null);

  // Auto-analyze if an initial URL is provided
  React.useEffect(() => {
    if (initialUrl) {
      handleFetchInfo();
    }
  }, [initialUrl]);


  const handleFetchInfo = async (e) => {
    if (e) e.preventDefault();
    if (!url && !initialUrl) return;
    
    // Use the latest url state or fallback to initialUrl
    const targetUrl = url || initialUrl;
    
    setLoading(true);
    setError(null);
    setVideoInfo(null);
    
    try {
      const info = await fetchVideoInfo(targetUrl);
      setVideoInfo(info);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    setDownloadingFormat(format.format_id);
    setError(null);
    try {
      const streamInfo = await fetchDownloadUrl(url, format.format_id);
      
      // Clean up filename
      const title = videoInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${title}_${format.resolution}.${streamInfo.ext || 'mp4'}`;
      
      await downloadVideo(streamInfo.url, filename);
    } catch (err) {
        setError(`Download failed: ${err}`);
    } finally {
        setDownloadingFormat(null);
    }
  };

  // Helper to get friendly quality label like "1080p" or "1080p 60fps"
  const getFriendlyLabel = (format) => {
    if (format.resolution === 'audio only' || format.vcodec === 'none') return 'Audio Only';
    
    // Extract height from resolution string like "1920x1080" or "1280x720"
    const resStr = format.resolution || '';
    const match = resStr.match(/\d+x(\d+)/);
    const height = match ? parseInt(match[1]) : null;

    let label = '';
    if (height) {
      if (height >= 2160) label = '4K (2160p)';
      else if (height >= 1440) label = '1440p';
      else if (height >= 1080) label = '1080p';
      else if (height >= 720) label = '720p';
      else if (height >= 480) label = '480p';
      else if (height >= 360) label = '360p';
      else if (height >= 240) label = '240p';
      else label = '144p';
    } else {
      label = resStr || 'Unknown';
    }

    // Append 60fps badge only for high frame rates
    if (format.fps && format.fps >= 55) label += ' 60fps';

    return label;
  };

  // Helper to format bytes
  const formatBytes = (bytes) => {
      if (!bytes) return 'Unknown size';
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-800 rounded-2xl shadow-xl mt-8 border border-slate-700">
      <div className="text-center mb-8">
        {/* Platform icon + name */}
        {platform && (
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${platform.color}`}>
              {platform.icon}
            </div>
            <h1 className="text-4xl font-extrabold text-white">{platform.name}</h1>
          </div>
        )}
        <p className="text-slate-400">
          {platform ? `Paste your ${platform.name} link below to get started.` : 'Paste a video link below to get started.'}
        </p>
      </div>

      <form onSubmit={handleFetchInfo} className="flex flex-col gap-4 md:flex-row mb-8">
        <input
          type="url"
          placeholder={platform?.placeholder || 'Paste any video link here...'}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/30"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Parsing...
            </span>
          ) : (
            'Analyze URL'
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 mb-6 text-red-200 bg-red-900/50 border border-red-700 rounded-lg">
          {error}
        </div>
      )}

      {videoInfo && (
        <div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-full md:w-1/3">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 shadow-inner">
               {videoInfo.thumbnail ? (
                   <img src={videoInfo.thumbnail} alt={videoInfo.title} className="object-cover w-full h-full" />
               ) : (
                   <div className="flex items-center justify-center h-full text-slate-500">No Thumb</div>
               )}
               <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-bold text-white bg-black/70 rounded">
                   {videoInfo.duration ? `${Math.floor(videoInfo.duration / 60)}:${(videoInfo.duration % 60).toString().padStart(2, '0')}` : 'Live'}
               </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-1 line-clamp-2" title={videoInfo.title}>
              {videoInfo.title}
            </h2>
            <p className="text-sm text-slate-400 mb-4">{videoInfo.uploader}</p>
            
            <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar space-y-2">
              {videoInfo.formats.map((format, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600/50 transition-colors">
                  <div>
                    <div className="font-semibold text-white">
                        {getFriendlyLabel(format)}
                    </div>
                    <div className="text-xs text-slate-400 uppercase">
                        {format.ext} • {format.vcodec !== 'none' ? 'Video+Audio' : 'Audio'} • {formatBytes(format.filesize)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(format)}
                    disabled={downloadingFormat === format.format_id}
                    className="p-2 ml-4 text-emerald-400 hover:text-white hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-emerald-400 rounded-lg transition-all"
                    title="Download to Gallery"
                  >
                     {downloadingFormat === format.format_id ? (
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                     )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloader;
