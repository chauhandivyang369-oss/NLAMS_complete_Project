import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  MapPin, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  User, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  Send,
  Download
} from 'lucide-react';

export default function ContextualActionDrawer({ 
  isOpen, 
  onClose, 
  drawerType = 'EVIDENCE', // 'EVIDENCE' | 'DISCREPANCY' | 'CLARIFICATION' | 'AUDIT_EVENT' | 'PARCEL' | 'MEMBER'
  data = null,
  onResolveDiscrepancy = null,
  onSubmitClarificationResponse = null
}) {
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !data) return null;

  const handleSendResponse = () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitClarificationResponse) {
        onSubmitClarificationResponse(data.requestId || data.id, replyText);
      }
      setReplyText('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#1B365D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {drawerType === 'EVIDENCE' && <FileText className="w-5 h-5 text-[#C5A059]" />}
            {drawerType === 'DISCREPANCY' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            {drawerType === 'CLARIFICATION' && <HelpCircle className="w-5 h-5 text-sky-400" />}
            {drawerType === 'AUDIT_EVENT' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
            {drawerType === 'PARCEL' && <Layers className="w-5 h-5 text-[#C5A059]" />}
            {drawerType === 'MEMBER' && <User className="w-5 h-5 text-purple-300" />}

            <div>
              <h3 className="text-sm font-bold tracking-wide">
                {drawerType === 'EVIDENCE' && 'EVIDENCE RECORD INSPECTION'}
                {drawerType === 'DISCREPANCY' && 'IEG DISCREPANCY AUDIT DETAILS'}
                {drawerType === 'CLARIFICATION' && 'CLARIFICATION TRANSMITTAL RECORD'}
                {drawerType === 'AUDIT_EVENT' && 'IMMUTABLE AUDIT LOG ENTRY'}
                {drawerType === 'PARCEL' && 'CADASTRAL PARCEL & RoR DOSSIER'}
                {drawerType === 'MEMBER' && 'IEG MEMBER ASSESSMENT DOSSIER'}
              </h3>
              <p className="text-[10px] font-mono text-slate-300">
                Independent Expert Group Traceability System
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">

          {/* 1. EVIDENCE RECORD TYPE */}
          {drawerType === 'EVIDENCE' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">Evidence ID:</span>
                  <strong className="text-[#1B365D] text-sm">{data.evidenceId || data.id}</strong>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">Classification:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                    {data.type || 'Primary Evidence'}
                  </span>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">Source Module:</span>
                  <span className="text-slate-800 font-bold">{data.sourceModule || 'SIA Survey'}</span>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">Related Master:</span>
                  <span className="text-slate-900 font-mono font-bold">{data.relatedRecord || 'FAM-001'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">Description &amp; Evidentiary Purpose</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                  {data.description}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px]">Uploaded By:</span>
                  <strong className="text-slate-900">{data.uploadedBy || 'Field Officer'}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px]">Upload Timestamp:</span>
                  <strong className="text-slate-900">{data.uploadedAt}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px]">GPS Coordinates:</span>
                  <strong className="text-slate-900">{data.gps || '22.4789° N, 72.8104° E'}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px]">Integrity Seal:</span>
                  <strong className="text-emerald-700 font-bold">SHA-256 Validated</strong>
                </div>
              </div>

              {/* Media preview simulation */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-900 text-white p-6 flex flex-col items-center justify-center text-center space-y-2">
                <FileText className="w-10 h-10 text-[#C5A059]" />
                <span className="font-mono text-xs">{data.evidenceId || 'Evidence'}.pdf / media</span>
                <span className="text-[10px] text-slate-400">File Size: {data.fileSize || '3.4 MB'} | Encrypted Storage</span>
                <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Download className="w-3.5 h-3.5" /> Download Certified Evidence
                </button>
              </div>
            </div>
          )}

          {/* 2. DISCREPANCY RECORD TYPE */}
          {drawerType === 'DISCREPANCY' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1.5">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-amber-700 font-bold">Discrepancy ID:</span>
                  <strong className="text-amber-900 text-sm">{data.discrepancyId}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-mono">Target Module:</span>
                  <strong className="text-slate-900">{data.module}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-mono">Severity:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    data.severity === 'High' ? 'bg-red-100 text-red-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {data.severity} Severity
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-mono">Review Status:</span>
                  <span className="font-mono font-bold text-slate-900">{data.status}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">SIA Report Claim</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-medium">
                  {data.claim}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">IEG Observed Evidence / Data Difference</label>
                <div className="p-2.5 bg-red-50/70 border border-red-200 rounded text-red-900">
                  {data.observedEvidence}
                  <div className="mt-1 font-bold text-[11px] font-mono text-red-700">
                    Difference: {data.difference}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">IEG Member Observation</label>
                <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-slate-800">
                  {data.iegObservation}
                </div>
              </div>

              {data.resolution ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Resolution Recorded</span>
                  </div>
                  <p className="text-slate-700 text-[11px]">{data.resolution}</p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Resolved by {data.resolvedBy} on {data.resolvedAt}
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={() => onResolveDiscrepancy && onResolveDiscrepancy(data.discrepancyId)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    Mark Discrepancy as Resolved / Accepted
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. CLARIFICATION TRANSMITTAL */}
          {drawerType === 'CLARIFICATION' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Request ID:</span>
                  <strong className="text-[#1B365D] text-sm">{data.requestId}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Module / Record:</span>
                  <span className="text-slate-800 font-bold">{data.module} ({data.recordId})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                    {data.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Requested By:</span>
                  <span className="text-slate-700">{data.requestedBy}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">Question / Query to SIA Agency</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium">
                  {data.question}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 block">Statutory Reason &amp; Reference</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px]">
                  {data.reason}
                </div>
              </div>

              {data.responseText ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded space-y-1">
                  <span className="font-bold text-emerald-900 block">SIA Agency Formal Response</span>
                  <p className="text-slate-800 text-[11px]">{data.responseText}</p>
                  <span className="text-[10px] text-slate-500 font-mono block">Received: {data.responseReceivedAt}</span>
                </div>
              ) : (
                <div className="space-y-2 border-t border-slate-200 pt-3">
                  <label className="font-bold text-slate-900 block">Record SIA Clarification Response</label>
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter formal response text received from SIA Agency / Requiring Body..."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-900 focus:bg-white"
                  />
                  <button
                    onClick={handleSendResponse}
                    disabled={isSubmitting || !replyText.trim()}
                    className="px-4 py-2 bg-[#1B365D] hover:bg-[#152a48] disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isSubmitting ? 'Recording Response...' : 'Submit Official Response'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. AUDIT EVENT ENTRY */}
          {drawerType === 'AUDIT_EVENT' && (
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-[11px]">
                <div className="flex justify-between"><span className="text-slate-500">Audit ID:</span><strong>{data.auditId}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Action:</span><strong className="text-[#1B365D]">{data.action}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">User / Role:</span><span>{data.user} ({data.role})</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Timestamp:</span><span>{data.timestamp}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">IP / Device:</span><span>{data.ip}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Entity:</span><span>{data.entityType} ({data.entityId})</span></div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 font-sans block">Old Value</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px]">
                  {data.oldValue || 'None / Initial'}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 font-sans block">New Recorded Value</label>
                <div className="p-2 bg-blue-50/60 border border-blue-200 rounded text-blue-900 text-[11px]">
                  {data.newValue}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 font-sans block">Statutory Reason</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700 text-[11px] font-sans">
                  {data.reason}
                </div>
              </div>

              {data.digitalSignature && (
                <div className="p-2 bg-purple-50 border border-purple-200 rounded text-[10px] text-purple-900">
                  <span className="font-bold block">Cryptographic Hash Seal:</span>
                  <span>{data.digitalSignature}</span>
                </div>
              )}
            </div>
          )}

          {/* 5. PARCEL / MEMBER DOSSIER */}
          {(drawerType === 'PARCEL' || drawerType === 'MEMBER') && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <pre className="text-[11px] font-mono whitespace-pre-wrap text-slate-800">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg cursor-pointer"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
}
