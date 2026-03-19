import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, setLang, translations } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = translations[lang];

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium cursor-pointer transition-colors border border-slate-600"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[70vh] overflow-y-auto">
          {/* Native languages */}
          {Object.entries(translations).map(([code, tr]) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer
                ${lang === code
                  ? 'bg-blue-600/30 text-blue-300 font-semibold'
                  : 'text-slate-300 hover:bg-slate-700'
                }`}
            >
              <span className="text-lg">{tr.flag}</span>
              <span>{tr.name}</span>
              {lang === code && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-auto text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}

          {/* Divider */}
          <div className="h-px bg-slate-700 my-1 mx-2" />

          {/* Google Translate Integration Option */}
          <button
            onClick={() => {
              const el = document.getElementById('google_translate_element');
              if (el) {
                // Toggle visibility
                if (el.style.position === 'absolute') {
                  el.style.position = 'relative';
                  el.style.top = '0';
                  el.style.left = '0';
                  el.style.padding = '8px';
                  el.style.background = '#1e293b';
                  el.style.borderTop = '1px solid #334155';
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  el.style.position = 'absolute';
                  el.style.top = '-1000px';
                }
              }
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-amber-400 hover:bg-slate-700 transition-colors cursor-pointer font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12.866 3L11 1.134a.75.75 0 0 0-1.06 0L8.074 3.06a.75.75 0 0 0 0 1.062l.184.184-.132.09c-1.32.906-2.592 1.954-3.792 3.12l-.014.013a21.492 21.492 0 0 0-3.32 4.498.75.75 0 0 0 1.258.82A19.993 19.993 0 0 1 5.4 8.526a19.74 19.74 0 0 1 3.559-2.91L9.135 5.5l.805.805a.75.75 0 0 0 1.06 0l1.866-1.866a.75.75 0 0 0 0-1.062l-.001-.001L12.866 3zM15 15.75h1.5a.75.75 0 0 0 0-1.5H15a.75.75 0 0 0 0 1.5z" />
              <path fillRule="evenodd" d="M16.5 1h-9A2.25 2.25 0 0 0 5.25 3.25v2.31a21.253 21.253 0 0 1 2.217-.676c.49-.105.992-.187 1.503-.245V3.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-.75.75h-3.414l-1.293 1.293a1 1 0 0 1-1.414 0l-1.293-1.293H6.75a.75.75 0 0 1-.75-.75v-2.31a21.218 21.218 0 0 1-2.217.676c-.49.105-.992.187-1.503.245V18c0 1.242 1.008 2.25 2.25 2.25h2.15l1.623 1.623c.39.39 1.024.39 1.414 0L11.35 20.25h7.4a2.25 2.25 0 0 0 2.25-2.25V3.25A2.25 2.25 0 0 0 18.75 1h-2.25z" clipRule="evenodd" />
            </svg>
            <span>More (All Languages)</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default LanguageSwitcher;
