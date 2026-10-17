import React from 'react';
import { 
  Languages, 
  FolderArchive,
  PhoneCall,
  BookOpen
} from 'lucide-react';
import { UILanguage, AppSettings } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  lang: UILanguage;
  onToggleLang: () => void;
  settings?: AppSettings;
  onUpdateSettings?: (settings: Partial<AppSettings>) => void;
  activeView: 'overview' | 'workspace' | 'vault';
  setActiveView: (view: 'overview' | 'workspace' | 'vault') => void;
  savedDocsCount: number;
  onOpenHelplines?: () => void;
  onOpenJargon?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeView,
  setActiveView,
  savedDocsCount,
  onOpenHelplines,
  onOpenJargon
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          
          {/* Logo & Branding - Navigates to Landing Page (Overview) */}
          <div 
            onClick={() => setActiveView('overview')} 
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
            title={lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ' : 'Go to Overview'}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-xs group-hover:bg-zinc-800 transition-colors shrink-0">
              <span className="font-kannada font-bold text-lg sm:text-xl leading-none">ಭಾ</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors truncate">
                {lang === 'kn' ? 'ಭಾಷಾಸೇತು' : 'BhashaSetu'}
              </h1>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* View Switcher: Overview vs Workspace vs Vault */}
            <div className="bg-zinc-100 p-0.5 rounded-lg flex items-center border border-zinc-200/80">
              <button
                onClick={() => setActiveView('overview')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
                  activeView === 'overview'
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title={lang === 'kn' ? 'ಮುಖಪುಟ' : 'Overview'}
              >
                {lang === 'kn' ? 'ಮುಖಪುಟ' : 'Overview'}
              </button>
              <button
                onClick={() => setActiveView('workspace')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
                  activeView === 'workspace'
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title={t.navWorkspace}
              >
                {lang === 'kn' ? 'ಕಾರ್ಯಕ್ಷೇತ್ರ' : 'Workspace'}
              </button>
              <button
                onClick={() => setActiveView('vault')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md flex items-center gap-1.5 transition-all ${
                  activeView === 'vault'
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title={t.navVault}
              >
                <FolderArchive className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">{lang === 'kn' ? 'ಭಂಡಾರ' : 'Vault'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-200/80 text-zinc-700 font-semibold">
                  {savedDocsCount}
                </span>
              </button>
            </div>

            {/* Karnataka Citizen & Farmer Helplines Trigger */}
            {onOpenHelplines && (
              <button
                type="button"
                onClick={onOpenHelplines}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-amber-300/80 bg-amber-50 hover:bg-amber-100/80 text-amber-950 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer font-kannada"
                title={lang === 'kn' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಮತ್ತು ರೈತ ಸಹಾಯವಾಣಿಗಳು' : 'Karnataka Civic & Farmer Helplines'}
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden md:inline">{lang === 'kn' ? 'ಸಹಾಯವಾಣಿ' : 'Helplines'}</span>
              </button>
            )}

            {/* Citizen Government Jargon Simplifier Trigger */}
            {onOpenJargon && (
              <button
                type="button"
                onClick={onOpenJargon}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-emerald-300/80 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer font-kannada"
                title={lang === 'kn' ? 'ಸರಳ ಕನ್ನಡ ಸರ್ಕಾರಿ ಪದಕೋಶ' : 'Karnataka Government Jargon Simplifier'}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden md:inline">{lang === 'kn' ? 'ಪದಕೋಶ' : 'Glossary'}</span>
              </button>
            )}

            {/* Bilingual Toggle Button (Solid Matte Charcoal) */}
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              title={t.toggleLanguage}
            >
              <Languages className="w-4 h-4 text-zinc-400" />
              <span className="font-kannada">
                {lang === 'en' ? 'ಕನ್ನಡ' : 'English'}
              </span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
