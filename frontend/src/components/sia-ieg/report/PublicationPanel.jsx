import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Download, 
  Share2, 
  ShieldCheck, 
  History, 
  FileText,
  Building2,
  AlertCircle
} from 'lucide-react';
import { 
  PUBLICATION_CHANNELS, 
  REPORT_VERSIONS, 
  REPORT_AUDIT_TRAIL,
  REPORT_PROJECT_CONTEXT 
} from '../../../services/siaReportService.js';

export default function PublicationPanel({ 
  reportState, 
  onPublishReport,
  onOpenPreview 
}) {
  const [channels, setChannels] = useState(PUBLICATION_CHANNELS);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const toggleChannel = (id) => {
    setChannels(channels.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      onPublishReport({
        publicationStatus: 'Published',
        publishedAt: new Date().toLocaleDateString('en-GB'),
        gazetteId: 'GZ-GUJ-2026-PT2-8419'
      });
      setTimeout(() => setPublishSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-6 text-xs">
      
      {/* 1. Publication Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#1B365D]" />
            <h3 className="text-sm font-bold text-slate-900">
              GAZETTE &amp; MULTI-CHANNEL PUBLIC NOTIFICATION (RFCTLARR Sec. 6)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Mandatory publication in Official Gazette, District Portal &amp; affected Gram Panchayats
          </p>
        </div>

        <div className="flex items-center gap-2">
          {publishSuccess && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Published Successfully!
            </span>
          )}

          <button
            onClick={handlePublish}
            disabled={isPublishing || reportState.publicationStatus === 'Published'}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              reportState.publicationStatus === 'Published'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{reportState.publicationStatus === 'Published' ? 'Published in Gazette ✓' : 'Publish Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. Publication Channels List */}
      <div>
        <h4 className="font-bold text-slate-900 text-xs mb-2">
          Authorized Statutory Publication Channels
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {channels.map((ch) => (
            <label
              key={ch.id}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                ch.selected 
                  ? 'bg-blue-50/50 border-blue-200 text-slate-900' 
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={ch.selected}
                  onChange={() => toggleChannel(ch.id)}
                  className="rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold block text-xs">{ch.name}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Status: {reportState.publicationStatus === 'Published' ? 'Dispatched / Live' : ch.status}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                reportState.publicationStatus === 'Published' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
              }`}>
                {reportState.publicationStatus === 'Published' ? 'LIVE' : 'QUEUED'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Versions & Audit Trail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
        
        {/* Version History */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <History className="w-4 h-4 text-[#1B365D]" />
            <span>Report Snapshot Version History</span>
          </div>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden bg-slate-50/50">
            {REPORT_VERSIONS.map((v, idx) => (
              <div key={idx} className="p-2.5 hover:bg-white text-[11px] space-y-0.5">
                <div className="flex items-center justify-between font-mono">
                  <strong className="text-[#1B365D] font-bold">{v.version} ({v.language})</strong>
                  <span className="text-slate-400">{v.createdAt}</span>
                </div>
                <div className="text-slate-600">{v.summary}</div>
                <div className="text-[10px] text-slate-400 font-mono">Compiled by: {v.createdBy}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Lineage */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
            <span>Cryptographic &amp; Process Audit Trail</span>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-2 text-[11px] font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Created:</span>
              <span className="text-slate-800 text-right">{REPORT_AUDIT_TRAIL.createdAt} ({REPORT_AUDIT_TRAIL.createdBy.split('(')[0]})</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Last Generated:</span>
              <span className="text-slate-800 text-right">{reportState.lastGenerated}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">e-Signature:</span>
              <span className="text-purple-800 font-bold text-right">{reportState.lastSigned}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">IEG Submission:</span>
              <span className="text-blue-800 font-bold text-right">{reportState.lastSubmitted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gazette Publication:</span>
              <span className="text-emerald-800 font-bold text-right">{reportState.publicationStatus}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
