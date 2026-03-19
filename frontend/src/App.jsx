import React, { useState, useEffect } from 'react';
import PlatformSelector from './components/PlatformSelector';
import Downloader from './components/Downloader';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import InstallPrompt from './components/InstallPrompt';
import { useLanguage } from './context/LanguageContext';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [initialUrl, setInitialUrl] = useState('');
  const { t, lang } = useLanguage();

  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = t.dir || 'ltr';
    document.documentElement.lang = lang;
  }, [t, lang]);

  const handleSelectPlatform = (platform, url = '') => {
    setSelectedPlatform(platform);
    setInitialUrl(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setSelectedPlatform(null);
    setInitialUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-500/30">

      {/* ── TOP NAVBAR ── */}
      <nav className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-wide">
            StreamVault
          </span>
        </button>

        <div className="flex items-center gap-4">
          {/* Back button shown when inside a platform */}
          {selectedPlatform && (
            <button
              onClick={goHome}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${t.dir === 'rtl' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t.nav.back}
            </button>
          )}

          <LanguageSwitcher />
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pb-10">
        {selectedPlatform ? (
          <Downloader 
            key={selectedPlatform.id} 
            platform={selectedPlatform} 
            initialUrl={initialUrl} 
          />
        ) : (
          <PlatformSelector onSelect={handleSelectPlatform} />
        )}
      </main>


      {/* ── FOOTER ── */}
      <Footer />
      
      <InstallPrompt />
    </div>
  );
}

export default App;
