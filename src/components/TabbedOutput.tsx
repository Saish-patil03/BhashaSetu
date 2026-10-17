import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Languages, 
  MessageSquareText,
  TableProperties,
  Landmark
} from 'lucide-react';
import { DigitizedDocument, UILanguage, QAMessage } from '../types';
import { translations } from '../i18n/translations';
import { TabExtractedText } from './tabs/TabExtractedText';
import { TabSummary } from './tabs/TabSummary';
import { TabTranslation } from './tabs/TabTranslation';
import { TabAskDocument } from './tabs/TabAskDocument';
import { StructuredEntityView } from './extensions/StructuredEntityView';
import { CitizenSchemeMatcher } from './extensions/CitizenSchemeMatcher';
import { LayoutBlockId } from '../services/layoutSyncService';

export type OutputTabId = 'text' | 'summary' | 'translation' | 'qa' | 'structured' | 'schemes';

interface TabbedOutputProps {
  doc: DigitizedDocument;
  onUpdateText: (newText: string) => void;
  onUpdateChatHistory: (messages: QAMessage[]) => void;
  onSaveToVault: () => void;
  isSavedInVault: boolean;
  apiKey?: string;
  modelName: string;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
  activeTab?: OutputTabId;
  onTabChange?: (tab: OutputTabId) => void;
  syncLayout?: boolean;
  activeBlockId?: LayoutBlockId | null;
  onSelectBlock?: (id: LayoutBlockId | null) => void;
}

export const TabbedOutput: React.FC<TabbedOutputProps> = ({
  doc,
  onUpdateText,
  onUpdateChatHistory,
  onSaveToVault,
  isSavedInVault,
  apiKey,
  modelName,
  lang,
  fontSize,
  activeTab: controlledActiveTab,
  onTabChange,
  syncLayout = true,
  activeBlockId = null,
  onSelectBlock
}) => {
  const t = translations[lang];
  const [internalTab, setInternalTab] = useState<OutputTabId>('text');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalTab;

  const handleTabSelect = (tab: OutputTabId) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const tabs = [
    {
      id: 'text' as OutputTabId,
      label: lang === 'kn' ? '1. ಮೂಲ ಪಠ್ಯ' : '1. Extracted Text',
      icon: FileText,
      badge: `${doc.confidence.overall}%`
    },
    {
      id: 'summary' as OutputTabId,
      label: lang === 'kn' ? '2. ಸರಳ ಸಾರಾಂಶ' : '2. Easy Summary',
      icon: Sparkles
    },
    {
      id: 'translation' as OutputTabId,
      label: lang === 'kn' ? '3. ಅನುವಾದ' : '3. Translation',
      icon: Languages
    },
    {
      id: 'qa' as OutputTabId,
      label: lang === 'kn' ? '4. ಪ್ರಶ್ನೋತ್ತರ' : '4. Ask Document',
      icon: MessageSquareText,
      badge: doc.chatHistory.length > 0 ? `${doc.chatHistory.length}` : undefined
    },
    {
      id: 'structured' as OutputTabId,
      label: lang === 'kn' ? '5. ಮಾಹಿತಿ ಕೋಷ್ಟಕ' : '5. Structured Data',
      icon: TableProperties,
      badge: 'AI'
    },
    {
      id: 'schemes' as OutputTabId,
      label: lang === 'kn' ? '6. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : '6. Citizen Schemes',
      icon: Landmark,
      badge: 'Auto-Fill'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-xs flex flex-col overflow-hidden">
      {/* Tab Navigation Strip - Compact Segmented Pills (100% visible, no clipping) */}
      <div className="border-b border-zinc-200/80 bg-zinc-50/70 p-1.5 sm:p-2 flex flex-wrap items-center gap-1 sm:gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-kannada flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-zinc-900 border border-zinc-200/90 shadow-2xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 border border-transparent font-normal'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold leading-tight ${
                  isActive ? 'bg-zinc-100 text-zinc-900 border border-zinc-200/50' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="p-4 sm:p-5 flex-1">
        {activeTab === 'text' && (
          <TabExtractedText
            doc={doc}
            onUpdateText={onUpdateText}
            onSaveToVault={onSaveToVault}
            isSavedInVault={isSavedInVault}
            lang={lang}
            fontSize={fontSize}
            syncLayout={syncLayout}
            activeBlockId={activeBlockId}
            onSelectBlock={onSelectBlock}
          />
        )}

        {activeTab === 'summary' && (
          <TabSummary
            summary={doc.summary}
            doc={doc}
            lang={lang}
            fontSize={fontSize}
          />
        )}

        {activeTab === 'translation' && (
          <TabTranslation
            docTranslations={doc.translations}
            lang={lang}
            fontSize={fontSize}
          />
        )}

        {activeTab === 'qa' && (
          <TabAskDocument
            doc={doc}
            onUpdateChatHistory={onUpdateChatHistory}
            apiKey={apiKey}
            modelName={modelName}
            lang={lang}
          />
        )}

        {activeTab === 'structured' && (
          <StructuredEntityView
            doc={doc}
            lang={lang}
            fontSize={fontSize}
          />
        )}

        {activeTab === 'schemes' && (
          <CitizenSchemeMatcher
            doc={doc}
            lang={lang}
            fontSize={fontSize}
          />
        )}
      </div>
    </div>
  );
};
