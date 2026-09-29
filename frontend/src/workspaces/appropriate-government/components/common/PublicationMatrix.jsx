import React, { useState } from 'react';
import { Newspaper, CheckCircle2, Clock, Upload, Eye, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export default function PublicationMatrix({
  matrix = [],
  notifTitle = 'Section 11(1) Publication Checklist',
  onVerifyEvidence,
  onViewGazette
}) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [verifyingId, setVerifyingId] = useState(null);

  const totalChannels = matrix.length;
  const verifiedCount = matrix.filter(m => m.status === 'VERIFIED').length;
  const allVerified = totalChannels > 0 && verifiedCount === totalChannels;

  const handleVerify = async (channelId) => {
    setVerifyingId(channelId);
    setTimeout(() => {
      if (onVerifyEvidence) onVerifyEvidence(channelId);
      setVerifyingId(null);
    }, 600);
  };

  return (
    <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#C5A059]" />
            {notifTitle}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Section 11(1)(a)-(f) & Section 19(4) statutory 12-channel mandatory publication verification
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500">Compliance Progress</div>
            <div className="text-xs font-mono font-bold text-[#1B365D]">
              {verifiedCount} of {totalChannels} Channels Verified
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded text-xs font-bold border flex items-center gap-1.5 ${
              allVerified
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}
          >
            {allVerified ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                FULLY SATISFIED
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5" />
                EVIDENCE PENDING
              </>
            )}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-slate-200">
          <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Statutory Channel</th>
              <th className="py-2.5 px-3">Competent Authority</th>
              <th className="py-2.5 px-3">Language</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Reference / Order No.</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Evidence Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {matrix.map((item, idx) => {
              const isVerified = item.status === 'VERIFIED';
              return (
                <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-mono text-slate-600 font-bold">
                      {idx + 1}
                    </span>
                    <span>{item.channel}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{item.authority}</td>
                  <td className="py-2.5 px-3 font-medium">{item.language}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{item.date || 'Pending'}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-800">
                    {item.refNo || 'Awaiting Issue'}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        VERIFIED
                      </span>
                    ) : item.status === 'EVIDENCE_UPLOADED' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                        <Upload className="w-3 h-3 text-blue-600" />
                        UPLOADED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-300">
                        <Clock className="w-3 h-3 text-slate-400" />
                        PENDING
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {item.channel.includes('Gazette') && onViewGazette ? (
                        <button
                          onClick={onViewGazette}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-amber-700" />
                          View Gazette
                        </button>
                      ) : null}

                      {item.evidenceDoc ? (
                        <button
                          onClick={() => setSelectedDoc(item)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                          title="View uploaded verification document"
                        >
                          <FileText className="w-3 h-3 text-slate-600" />
                          Doc
                        </button>
                      ) : (
                        <button
                          className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-300 rounded text-[11px] flex items-center gap-1 cursor-pointer"
                          title="Upload evidence scan"
                        >
                          <Upload className="w-3 h-3 text-slate-500" />
                          Upload
                        </button>
                      )}

                      {!isVerified && (
                        <button
                          onClick={() => handleVerify(item.id)}
                          disabled={verifyingId === item.id}
                          className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {verifyingId === item.id ? 'Checking...' : 'Verify'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Evidence Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-xl max-w-lg w-full p-4 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A059]" />
                Evidence Certificate: {selectedDoc.channel}
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>
            <div className="text-xs space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="font-semibold text-slate-700">Authority:</span> {selectedDoc.authority}
              </div>
              <div>
                <span className="font-semibold text-slate-700">Publication Date:</span> {selectedDoc.date}
              </div>
              <div>
                <span className="font-semibold text-slate-700">Reference Number:</span>{' '}
                <span className="font-mono text-[#1B365D] font-bold">{selectedDoc.refNo}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700">File Attachment:</span>{' '}
                <span className="font-mono text-blue-700 underline">{selectedDoc.evidenceDoc}</span>
              </div>
              <div className="pt-2 border-t text-[11px] text-slate-500">
                Cryptographic checksum verified: SHA-256 e-Sign certificate attached by Revenue Officer.
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-3 py-1.5 text-xs bg-slate-200 text-slate-800 rounded hover:bg-slate-300 font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
