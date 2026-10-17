import React, { useState } from 'react';
import { 
  Table as TableIcon, 
  FileText, 
  Calendar, 
  UserCheck, 
  Hash, 
  IndianRupee, 
  Building2, 
  Download, 
  Copy, 
  Check, 
  Plus, 
  Sparkles,
  Layers
} from 'lucide-react';
import { DigitizedDocument, UILanguage, ExtractedEntityItem, ExtractedTable } from '../../types';
import { 
  extractStructuredEntities, 
  extractStructuredTables, 
  exportTableToCsv 
} from '../../services/intelligenceService';
import { copyToClipboard } from '../../services/exportService';

interface StructuredEntityViewProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const StructuredEntityView: React.FC<StructuredEntityViewProps> = ({
  doc,
  lang,
  fontSize
}) => {
  const entities: ExtractedEntityItem[] = extractStructuredEntities(doc);
  const [tables, setTables] = useState<ExtractedTable[]>(() => extractStructuredTables(doc));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCellChange = (tableIdx: number, rowIdx: number, colIdx: number, val: string) => {
    const updated = [...tables];
    updated[tableIdx].rows[rowIdx][colIdx] = val;
    setTables(updated);
  };

  const handleAddRow = (tableIdx: number) => {
    const updated = [...tables];
    const colCount = updated[tableIdx].headers.length;
    updated[tableIdx].rows.push(new Array(colCount).fill(''));
    setTables(updated);
  };

  const handleExportCsv = (table: ExtractedTable, idx: number) => {
    const safeName = (table.title || doc.title || 'kannada-table')
      .replace(/[^a-zA-Z0-9-]/g, '_')
      .slice(0, 30);
    exportTableToCsv(table, `${safeName}.csv`);
    setDownloadSuccess(`table-${idx}`);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const getEntityIcon = (category: ExtractedEntityItem['category']) => {
    switch (category) {
      case 'doc_type':
        return <FileText className="w-4 h-4 text-zinc-900" />;
      case 'date':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'authority':
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'name':
        return <UserCheck className="w-4 h-4 text-purple-600" />;
      case 'reference':
        return <Hash className="w-4 h-4 text-amber-600" />;
      case 'money':
        return <IndianRupee className="w-4 h-4 text-emerald-700" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const textSizeClass =
    fontSize === 'xlarge' ? 'text-base' : fontSize === 'large' ? 'text-sm' : 'text-xs';

  return (
    <div className="space-y-6">
      {/* Top Banner (Neutral Linear style) */}
      <div className="bg-zinc-100/80 border border-zinc-200 rounded-xl p-4 sm:p-5 text-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-xs shrink-0">
              <TableIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-zinc-900 font-kannada">
                  {lang === 'kn' ? 'ಸ್ವಯಂಚಾಲಿತ ಮಾಹಿತಿ & ಕೋಷ್ಟಕ ಹೊರತೆಗೆಯುವಿಕೆ' : 'Structured Document Intelligence & Table Reconstructor'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-zinc-200/80 text-zinc-700 text-[10px] font-medium">
                  NER & Tabular AI
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {lang === 'kn'
                  ? 'ಕನ್ನಡ ಕಾಗದಪತ್ರಗಳಿಂದ ಅಧಿಕೃತ ದಿನಾಂಕಗಳು, ಹೆಸರುಗಳು, ಸರ್ವೆ ಸಂಖ್ಯೆ ಮತ್ತು ಹಣಕಾಸಿನ ಕೋಷ್ಟಕಗಳ ವಿಶ್ಲೇಷಣೆ'
                  : 'Automated entity parsing: classifications, deadlines, authorities, survey numbers & tabular data'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-700 shadow-2xs">
              {entities.length} {lang === 'kn' ? 'ಘಟಕಗಳು ಗುರುತಿಸಲಾಗಿದೆ' : 'Entities Detected'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-700 shadow-2xs">
              {tables.length} {lang === 'kn' ? 'ಕೋಷ್ಟಕ' : 'Tables Found'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Key-Value Entity Cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <h4 className="font-semibold text-sm text-zinc-900 font-kannada">
            {lang === 'kn' ? 'ಪ್ರಮುಖ ದತ್ತಾಂಶ ಘಟಕಗಳು (Key-Value Entity Intelligence)' : 'Key-Value Entity Badges'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {entities.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200/80 rounded-xl p-3.5 shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-100 group-hover:bg-zinc-100 transition-colors">
                    {getEntityIcon(item.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">
                      {item.keyEn}
                    </span>
                    <span className="text-xs font-semibold text-zinc-700 font-kannada block">
                      {item.keyKn}
                    </span>
                  </div>
                </div>

                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50/70 text-emerald-700 border border-emerald-200/60">
                  {item.confidence}%
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-semibold font-kannada text-zinc-900 break-words flex-1">
                  {item.value}
                </p>
                <button
                  onClick={() => handleCopy(item.id, item.value)}
                  className="p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors shrink-0"
                  title="Copy value"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Table Reconstructor */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-zinc-500" />
            <h4 className="font-semibold text-sm text-zinc-900 font-kannada">
              {lang === 'kn' ? 'ಕೋಷ್ಟಕ ದತ್ತಾಂಶ ಪುನರ್ನಿರ್ಮಾಣ (Table Reconstructor)' : 'Extracted Tabular Data'}
            </h4>
          </div>
          <span className="text-xs text-zinc-400 italic hidden sm:inline">
            {lang === 'kn' ? 'ಕೋಶಗಳನ್ನು ನೇರವಾಗಿ ತಿದ್ದುಪಡಿ ಮಾಡಬಹುದು (Editable Cells)' : 'Click cells to edit values'}
          </span>
        </div>

        {tables.length === 0 ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center text-zinc-500 text-xs font-kannada">
            {lang === 'kn'
              ? 'ಈ ದಾಖಲೆಯಲ್ಲಿ ಯಾವುದೇ ನೇರ ಕೋಷ್ಟಕ ಲಭ್ಯವಿಲ್ಲ. ಅಗತ್ಯವಿದ್ದಲ್ಲಿ ಕೀ-ವ್ಯಾಲ್ಯೂ ಕಾರ್ಡ್‌ಗಳನ್ನು ಬಳಸಿ.'
              : 'No structured tabular layout detected in this document.'}
          </div>
        ) : (
          tables.map((table, tIdx) => (
            <div
              key={tIdx}
              className="bg-white border border-zinc-200/80 rounded-xl shadow-xs overflow-hidden space-y-3 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-800 inline-block" />
                  <h5 className="font-semibold text-xs sm:text-sm font-kannada text-zinc-900">
                    {table.title || (lang === 'kn' ? `ಕೋಷ್ಟಕ ${tIdx + 1}` : `Table ${tIdx + 1}`)}
                  </h5>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-600">
                    {table.rows.length} {lang === 'kn' ? 'ಸಾಲುಗಳು' : 'Rows'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddRow(tIdx)}
                    className="px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ಸಾಲು ಸೇರಿಸಿ' : 'Add Row'}</span>
                  </button>

                  <button
                    onClick={() => handleExportCsv(table, tIdx)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                  >
                    {downloadSuccess === `table-${tIdx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                    <span>
                      {downloadSuccess === `table-${tIdx}`
                        ? 'CSV ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ'
                        : 'Export to CSV / Excel'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Editable HTML Table */}
              <div className="overflow-x-auto rounded-lg border border-zinc-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-medium font-kannada">
                      {table.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-3 py-2 text-xs whitespace-nowrap border-r border-zinc-200 last:border-r-0"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-zinc-200 font-kannada ${textSizeClass}`}>
                    {table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-zinc-50/70 transition-colors odd:bg-white even:bg-zinc-50/30"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="p-1 border-r border-zinc-200 last:border-r-0"
                          >
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleCellChange(tIdx, rIdx, cIdx, e.target.value)
                              }
                              className="w-full px-2 py-1 rounded bg-transparent focus:bg-white focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 outline-none text-zinc-800 transition-all font-medium text-xs"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
