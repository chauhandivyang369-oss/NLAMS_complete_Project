import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Building2,
  FileCheck2,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { 
  REPORT_SECTIONS_LIST, 
  REPORT_PROJECT_CONTEXT, 
  DEFAULT_REPORT_NARRATIVES,
  EVIDENCE_ANNEXURES_LIST 
} from '../../../services/siaReportService.js';

export default function ReportPreviewModal({ 
  isOpen, 
  onClose, 
  currentLanguage = 'en', 
  reportState 
}) {
  const [currentPage, setCurrentPage] = useState('cover'); // 'cover' | 'toc' | number (1 to 22)
  if (!isOpen) return null;

  const langNarrative = DEFAULT_REPORT_NARRATIVES[currentLanguage] || DEFAULT_REPORT_NARRATIVES['en'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-100 w-full max-w-5xl h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300">
        
        {/* Preview Control Header Bar */}
        <div className="p-3 bg-[#1B365D] text-white flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold tracking-wide">
                OFFICIAL REPORT PREVIEW • {reportState.currentVersion} ({currentLanguage.toUpperCase()})
              </h3>
              <span className="text-[10px] font-mono text-slate-300">
                RFCTLARR Act 2013 Statutory Assembly • Gazette Format
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Page Selector */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setCurrentPage('cover')}
                className={`px-2 py-1 rounded cursor-pointer ${currentPage === 'cover' ? 'bg-[#C5A059] text-slate-950 font-bold' : 'hover:bg-white/10 text-white'}`}
              >
                Cover
              </button>
              <button
                onClick={() => setCurrentPage('toc')}
                className={`px-2 py-1 rounded cursor-pointer ${currentPage === 'toc' ? 'bg-[#C5A059] text-slate-950 font-bold' : 'hover:bg-white/10 text-white'}`}
              >
                Index
              </button>
              <select
                value={typeof currentPage === 'number' ? currentPage : ''}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-transparent text-white font-mono px-2 py-1 text-xs outline-hidden cursor-pointer"
              >
                <option value="" disabled className="text-slate-900">Jump to Chapter...</option>
                {REPORT_SECTIONS_LIST.map(s => (
                  <option key={s.id} value={s.id} className="text-slate-900">
                    Ch. {s.number}: {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-white text-[#1B365D] hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Print document / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview Canvas (Emulates Standard A4 Paper) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200">
          <div className="w-full max-w-3xl bg-white shadow-xl min-h-[1050px] p-8 sm:p-12 text-slate-900 space-y-8 border border-slate-300 relative font-serif">
            
            {/* Watermark for draft/generated */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-8xl font-black font-sans uppercase rotate-[-35deg]">
              NLAMS STATUTORY
            </div>

            {/* 1. COVER PAGE */}
            {currentPage === 'cover' && (
              <div className="space-y-12 text-center py-6">
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-slate-400 flex items-center justify-center font-bold text-xs font-mono bg-slate-50 text-slate-700">
                    सत्यमेવ જયતે
                  </div>
                  <h4 className="text-sm uppercase tracking-widest font-sans font-bold text-slate-700">
                    GOVERNMENT OF GUJARAT • REVENUE DEPARTMENT
                  </h4>
                  <p className="text-xs font-sans text-slate-500">
                    Under Section 4 to 6 of Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013
                  </p>
                </div>

                <div className="border-y-2 border-slate-800 py-8 space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-slate-900 leading-tight">
                    FINAL SOCIAL IMPACT ASSESSMENT (SIA) REPORT &amp; SOCIAL IMPACT MANAGEMENT PLAN (SIMP)
                  </h1>
                  <h2 className="text-base sm:text-lg font-sans font-semibold text-[#1B365D]">
                    {REPORT_PROJECT_CONTEXT.projectName}
                  </h2>
                  <p className="text-xs font-sans font-mono text-slate-600">
                    Corridor Ch. 0+000 to Ch. 24+800 • Anand District, Gujarat
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 text-left font-sans text-xs pt-8 border-t border-slate-200">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Appointed SIA Evaluation Agency:</span>
                    <strong className="block text-slate-900 text-sm">Gujarat Institute of Development Research (GIDR)</strong>
                    <span className="text-slate-600 block">Gota Char Rasta, Sarkhej-Gandhinagar Highway, Ahmedabad — 380060</span>
                    <span className="text-slate-500 font-mono text-[11px] block">Accredited by Govt of Gujarat (SIA Cell)</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Project Authorities:</span>
                    <strong className="block text-slate-900">Requiring Body: Western Railway Zone</strong>
                    <span className="text-slate-600 block">SIA Gazette No: {REPORT_PROJECT_CONTEXT.gazetteNotificationNo || 'WR/NLAMS/SIA/2026/GZ-04'}</span>
                    <span className="text-slate-600 block font-mono">Date of Compilation: 19 September 2026</span>
                  </div>
                </div>

                <div className="pt-16 text-center font-sans text-[11px] text-slate-400 font-mono">
                  Report Identifier: {REPORT_PROJECT_CONTEXT.reportId} • Version: {reportState.currentVersion}
                </div>
              </div>
            )}

            {/* 2. TABLE OF CONTENTS */}
            {currentPage === 'toc' && (
              <div className="space-y-6">
                <div className="border-b-2 border-slate-900 pb-3 text-center">
                  <h2 className="text-xl font-bold uppercase tracking-wider">TABLE OF CONTENTS</h2>
                  <p className="text-xs font-sans text-slate-500">Statutory 22 Chapters &amp; Schedules</p>
                </div>

                <div className="divide-y divide-slate-200 font-sans text-xs">
                  {REPORT_SECTIONS_LIST.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setCurrentPage(sec.id)}
                      className="w-full py-2 flex items-center justify-between hover:bg-slate-50 px-2 cursor-pointer text-left"
                    >
                      <span className="font-bold text-slate-800">
                        Chapter {sec.number}: {sec.name}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">
                        Page {sec.id + 2}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. CHAPTER CONTENT VIEW (Pages 1 to 22) */}
            {typeof currentPage === 'number' && (
              <div className="space-y-6">
                {(() => {
                  const sec = REPORT_SECTIONS_LIST.find(s => s.id === currentPage) || REPORT_SECTIONS_LIST[0];
                  return (
                    <div className="space-y-4">
                      <div className="border-b border-slate-900 pb-2 flex items-center justify-between font-sans">
                        <span className="font-mono font-bold text-xs text-[#1B365D]">
                          CHAPTER {sec.number} • {REPORT_PROJECT_CONTEXT.projectId}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          SIA Reference: {REPORT_PROJECT_CONTEXT.siaReference}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900 font-serif">
                        {sec.name}
                      </h2>

                      {/* Content Preview */}
                      <div className="text-xs font-sans leading-relaxed text-slate-800 space-y-4 text-justify">
                        {sec.id === 1 && <p>{langNarrative.executiveSummary}</p>}
                        {sec.id === 2 && (
                          <div>
                            <p>{REPORT_PROJECT_CONTEXT.projectDescription}</p>
                            <p className="mt-2"><strong>Requiring Body:</strong> {REPORT_PROJECT_CONTEXT.requiringBody}</p>
                            <p><strong>Corridor Alignment:</strong> {REPORT_PROJECT_CONTEXT.projectAlignment}</p>
                          </div>
                        )}
                        {sec.id === 3 && <p>{langNarrative.publicPurposeJustification}</p>}
                        {sec.id === 4 && (
                          <div>
                            <p>Total proposed land acquisition encompasses 486.75 hectares across 742 cadastral parcels in 5 revenue villages of Anand District.</p>
                            <p className="mt-2 font-mono text-[11px] bg-slate-50 p-3 rounded border border-slate-200">
                              Parcels: 742 • Verified RoR: 100% • Multi-Crop Farmland: 312.40 Ha (64.18%)
                            </p>
                          </div>
                        )}
                        {sec.id === 14 && (
                          <div>
                            <p>The statutory Section 5 public hearing was convened at Town Hall, Petlad on 28/02/2026 under the chairmanship of the Sub-Divisional Magistrate, Petlad.</p>
                            <p className="mt-2"><strong>Total Attendance:</strong> 318 Registered Landowners &amp; Villagers (127% Statutory Quorum).</p>
                          </div>
                        )}
                        {sec.id === 16 && (
                          <div>
                            <p>The Section 6 Social Impact Management Plan (SIMP) establishes 8 concrete mitigation measures with designated executing authorities totaling an escrow allocation of ₹42.74 Crore.</p>
                          </div>
                        )}
                        {sec.id === 22 && (
                          <div className="space-y-4">
                            <p>{langNarrative.finalFindingsNarrative}</p>
                            
                            {/* Signature Block */}
                            <div className="pt-8 border-t border-slate-300 mt-8 grid grid-cols-2 gap-4 text-center font-sans">
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                                <FileCheck2 className="w-6 h-6 text-emerald-700 mx-auto mb-1" />
                                <strong className="block text-slate-900 text-xs">Dr. Sudhir K. Dave</strong>
                                <span className="text-[10px] text-slate-500 font-mono block">Lead Sociologist, GIDR</span>
                                <span className="text-[9px] font-mono text-emerald-800">DSC SHA-256 Verified</span>
                              </div>
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                                <FileCheck2 className="w-6 h-6 text-emerald-700 mx-auto mb-1" />
                                <strong className="block text-slate-900 text-xs">Dr. R. K. Trivedi</strong>
                                <span className="text-[10px] text-slate-500 font-mono block">Chief SIA Evaluator, GIDR</span>
                                <span className="text-[9px] font-mono text-emerald-800">Digital Seal Applied</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {![1, 2, 3, 4, 14, 16, 22].includes(sec.id) && (
                          <p>
                            Detailed statutory data and field tables for {sec.name} have been compiled from authoritative 
                            records in {sec.source}. Verified by GIDR Field Unit and ready for official Gazette publication.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Document Footer */}
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] font-sans text-slate-400 font-mono">
              <span>National Land Acquisition &amp; Management System (NLAMS)</span>
              <span>Page {currentPage === 'cover' ? 'i' : currentPage === 'toc' ? 'ii' : currentPage}</span>
            </div>

          </div>
        </div>

        {/* Bottom Navigation Pagination */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (currentPage === 'toc') setCurrentPage('cover');
              else if (typeof currentPage === 'number') {
                if (currentPage === 1) setCurrentPage('toc');
                else setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 'cover'}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            Current: <strong className="text-[#1B365D] uppercase">{String(currentPage)}</strong>
          </span>

          <button
            onClick={() => {
              if (currentPage === 'cover') setCurrentPage('toc');
              else if (currentPage === 'toc') setCurrentPage(1);
              else if (typeof currentPage === 'number' && currentPage < 22) setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === 22}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
