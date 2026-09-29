import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  ShieldCheck,
  QrCode,
  Calendar,
  Building,
  CheckCircle2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext.jsx';
import { MOCK_NOTIFICATIONS } from '../services/citizenMockData.js';

export default function PublicNotificationsPage() {
  const { setActiveDocModal, showToast } = useCitizen();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState('ALL');
  const [selectedLang, setSelectedLang] = useState('ALL');

  const filteredNotifs = MOCK_NOTIFICATIONS.filter((n) => {
    if (selectedSection !== 'ALL' && !n.section.includes(selectedSection)) return false;
    if (selectedProject !== 'ALL' && n.projectId !== selectedProject) return false;
    if (selectedLang !== 'ALL' && !n.language.toLowerCase().includes(selectedLang.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.notificationNo.toLowerCase().includes(q) ||
        n.gazetteNo.toLowerCase().includes(q) ||
        n.issuingAuthority.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C5A059]" />
            <span>Public Notifications &amp; E-Gazette Vault</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory publications issued under RFCTLARR Act 2013 (Section 4, 11, 19, 21 &amp; Form-VI Awards).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authenticated Gazette Feed</span>
          </span>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Search Gazette &amp; Notice Repository
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Notification No., Gazette No., or Keyword..."
                className="w-full bg-slate-50 border border-slate-300 rounded pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Statutory Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Statutory Sections</option>
              <option value="Section 4">Section 4 (SIA Notice)</option>
              <option value="Section 11">Section 11 (Preliminary)</option>
              <option value="Section 15">Section 15 (Hearing Notice)</option>
              <option value="Section 19">Section 19 (Declaration)</option>
              <option value="Section 23">Section 23 (Award)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Project Filter
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Projects</option>
              <option value="NLAMS-2026-NHAI-0089">NHAI Expressway Corridor</option>
              <option value="NLAMS-2025-DFCCIL-0042">DFCCIL Railway Spur</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Language
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Languages</option>
              <option value="English">English</option>
              <option value="Gujarati">Gujarati / Regional</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Document Cards List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded text-slate-500">
            <FileText className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="font-semibold">No statutory notifications found</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filter parameters or search keywords.</p>
          </div>
        ) : (
          filteredNotifs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs hover:border-[#C5A059] transition-all space-y-3"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs bg-[#1B365D] text-white px-2 py-0.5 rounded">
                      {doc.section}
                    </span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {doc.gazetteNo}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Class-3 DSC Verified
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {doc.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{doc.issuingAuthority}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Published: <span className="font-semibold text-slate-800">{doc.publishedDate}</span></span>
                    </span>
                    <span>•</span>
                    <span>Language: <span className="font-semibold text-slate-800">{doc.language}</span></span>
                  </div>
                </div>

                {/* Actions: View PDF, Download, Verify QR */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => setActiveDocModal({
                      title: doc.title,
                      authority: doc.issuingAuthority,
                      date: doc.publishedDate,
                      section: doc.section,
                      qrVerified: doc.qrVerified
                    })}
                    className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>VIEW PDF</span>
                  </button>

                  <button
                    onClick={() => showToast(`Downloading ${doc.gazetteNo} (${doc.fileSize})...`)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>DOWNLOAD ({doc.fileSize})</span>
                  </button>

                  <button
                    onClick={() => showToast(`QR Digital Signature verified with Controller of Certifying Authorities (CCA).`)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Verify QR Cryptographic Stamp"
                  >
                    <QrCode className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                {doc.summary}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
