import React from 'react';

const Footer = () => {
  const quickLinks = [
    'Download StreamVault', 'StreamVault APK', 'StreamVault App 2026',
    'YouTube Downloader', 'Instagram Downloader', 'TikTok Downloader',
    'Facebook Downloader', 'Download Instagram Reel', 'Download Instagram Story',
    'X (Twitter) Downloader', '4K Video Downloader', 'MP3 Downloader',
  ];

  return (
    <footer className="w-full bg-[#2a2a2a] text-gray-400 mt-auto">
      {/* Quick links */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-6 border-b border-gray-600 pb-6">
          {quickLinks.map((link) => (
            <span key={link} className="hover:text-white cursor-pointer transition-colors">
              {link}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex gap-4 flex-wrap justify-center">
            {['About us', 'Contact', 'Terms of Service', 'Privacy Policy'].map((item) => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
          <span>Copyright © 2026 StreamVault</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
