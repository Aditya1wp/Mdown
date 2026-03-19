import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PLATFORMS = [
  {
    id: 'youtube',
    name: 'YouTube',
    color: 'from-red-600 to-red-500',
    hoverColor: 'hover:shadow-red-500/40',
    borderColor: 'border-red-600/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    placeholder: 'Paste YouTube link... (e.g. youtube.com/watch?v=...)',
    urlHint: 'youtube.com'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'from-purple-600 via-pink-500 to-orange-400',
    hoverColor: 'hover:shadow-pink-500/40',
    borderColor: 'border-pink-500/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    placeholder: 'Paste Instagram link...',
    urlHint: 'instagram.com'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: 'from-gray-900 to-gray-700',
    hoverColor: 'hover:shadow-cyan-400/40',
    borderColor: 'border-cyan-400/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
    placeholder: 'Paste TikTok link...',
    urlHint: 'tiktok.com'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: 'from-blue-700 to-blue-500',
    hoverColor: 'hover:shadow-blue-500/40',
    borderColor: 'border-blue-500/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    placeholder: 'Paste Facebook link...',
    urlHint: 'facebook.com'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: 'from-gray-800 to-black',
    hoverColor: 'hover:shadow-white/20',
    borderColor: 'border-gray-600/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    placeholder: 'Paste X/Twitter link...',
    urlHint: 'x.com / twitter.com'
  },
  {
    id: 'other',
    name: 'Other Sites',
    color: 'from-slate-600 to-slate-500',
    hoverColor: 'hover:shadow-slate-400/30',
    borderColor: 'border-slate-500/30',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    placeholder: 'Paste any video link...',
    urlHint: 'Any supported site'
  }
];

export { PLATFORMS };

/* ── Small floating platform icon for the hero decorations ── */
const FloatingIcon = ({ platform, style }) => (
  <div
    style={style}
    className={`absolute w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-2xl opacity-90`}
  >
    <div className="scale-75">{platform.icon}</div>
  </div>
);

const PlatformSelector = ({ onSelect }) => {
  const { t } = useLanguage();
  const [searchUrl, setSearchUrl] = React.useState('');

  const heroIcons = [
    { platform: PLATFORMS[0], style: { top: '12%', right: '22%' } },   // YouTube
    { platform: PLATFORMS[1], style: { top: '28%', right: '10%' } },   // Instagram
    { platform: PLATFORMS[2], style: { top: '50%', right: '18%' } },   // TikTok
    { platform: PLATFORMS[3], style: { top: '68%', right: '8%' } },    // Facebook
    { platform: PLATFORMS[4], style: { top: '82%', right: '24%' } },   // X
  ];

  return (
    <div className="w-full">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 min-h-[420px] flex items-center px-8 md:px-14 py-12 mb-10 shadow-2xl shadow-yellow-500/20">

        {/* Decorative circles */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-orange-500/30 blur-2xl" />
        <div className="absolute top-0 right-1/3 w-48 h-48 rounded-full bg-yellow-300/40 blur-2xl" />

        {/* Left text content */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            {t.hero.title1}<br />
            <span className="text-white drop-shadow">{t.hero.title2}</span>
          </h1>
          <p className="text-gray-800 text-base mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-700" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            {t.hero.subtitle}
          </p>
          <p className="text-gray-700 text-sm mb-6">
            {t.hero.body}
          </p>

          {/* Scroll hint */}
          <p className="text-gray-800 font-semibold text-sm">
            {t.hero.hint}
          </p>
        </div>

        {/* Right floating platform icons */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
          {heroIcons.map(({ platform, style }, idx) => (
            <FloatingIcon key={idx} platform={platform} style={style} />
          ))}
        </div>
      </section>

      {/* ── PLATFORM GRID ── */}
      <div className="px-2">
        <h2 className="text-center text-white font-semibold text-lg mb-6 tracking-wide">
          {t.platformGrid}
        </h2>

        {/* ── GOOGLE-STYLE SEARCH BAR ── */}
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchUrl.trim()) {
                onSelect(PLATFORMS.find(p => p.id === 'other'), searchUrl);
              }
            }}
            className="relative group"
          >
            {/* Search Icon */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            {/* Input Field */}
            <input
              type="url"
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              placeholder="Paste any video link here..."
              className="w-full pl-14 pr-24 py-4 bg-slate-800 text-white rounded-full border border-slate-700 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:bg-slate-700/80 transition-all text-lg placeholder:text-slate-500"
            />

            {/* Search Button (Internal) */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all text-sm cursor-pointer shadow-lg active:scale-95"
            >
              Go
            </button>
          </form>

          {/* Prompt text like Google */}
          <div className="mt-3 flex justify-center gap-3 text-xs text-slate-500">
            <span>StreamVault Search:</span>
            <span className="text-blue-400 hover:underline cursor-pointer">YouTube</span>
            <span className="text-blue-400 hover:underline cursor-pointer">Instagram</span>
            <span className="text-blue-400 hover:underline cursor-pointer">TikTok</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onSelect(platform)}
              className={`
                flex flex-col items-center justify-center gap-3 p-6
                bg-gradient-to-br ${platform.color}
                rounded-2xl border ${platform.borderColor}
                shadow-lg ${platform.hoverColor}
                hover:scale-105 active:scale-95
                transition-all duration-200 ease-out
                cursor-pointer group
              `}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">
                {platform.icon}
              </div>
              <span className="text-white font-semibold text-base">{platform.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PlatformSelector;
