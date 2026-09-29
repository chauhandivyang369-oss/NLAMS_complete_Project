import React, { useState } from 'react';
import { LANDOWNER_CENSUS_RECORDS } from '../../../services/siaSurveyService.js';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  UserX, 
  Clock, 
  X,
  Info
} from 'lucide-react';

export default function LandownerCensusSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState(LANDOWNER_CENSUS_RECORDS);

  const filtered = records.filter(r => {
    const matchesSearch = 
      r.sourceOwnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.surveyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.khataNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || r.verificationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Statutory Guidance Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">Authoritative Record Protection Rule: </strong>
          SIA field enumerators record empirical ground verification observations. Authoritative 7/12 RoR revenue records 
          are never overwritten in this module. Observed discrepancies (e.g., unmutated inheritance, unrecorded tenant possession) 
          are flagged for formal verification during the Section 5 Public Hearing.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Owner / Survey / ULPIN / Khata..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-mono">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Statuses ({records.length})</option>
            <option value="Verified">Verified ({records.filter(r => r.verificationStatus === 'Verified').length})</option>
            <option value="Mismatch">Mismatch / Succession Pending ({records.filter(r => r.verificationStatus === 'Mismatch').length})</option>
          </select>
        </div>
      </div>

      {/* Scalable Landowner Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3">Owner ID</th>
                <th className="py-2.5 px-3">Survey &amp; ULPIN</th>
                <th className="py-2.5 px-3">Khata</th>
                <th className="py-2.5 px-3">Source RoR Owner</th>
                <th className="py-2.5 px-3">SIA Ground Observation</th>
                <th className="py-2.5 px-3 text-right">Affected Area</th>
                <th className="py-2.5 px-3 text-center">Verification Status</th>
                <th className="py-2.5 px-3 text-center">Consent / Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((record) => {
                const isVerified = record.verificationStatus === 'Verified';
                const isMismatch = record.verificationStatus === 'Mismatch';

                return (
                  <tr 
                    key={record.ownerId}
                    onClick={() => setSelectedRecord(record)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                      {record.ownerId}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      <div>{record.surveyNo}</div>
                      <div className="text-[10px] text-slate-500">{record.ulpin}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {record.khataNo}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {record.sourceOwnerName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">
                      <div className="max-w-[220px] truncate" title={record.siaObservedClaimant}>
                        {record.siaObservedClaimant}
                      </div>
                      {isMismatch && (
                        <div className="text-[10px] text-rose-600 font-medium">
                          {record.mismatchDetails}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {record.affectedAreaHa} ha
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        isVerified 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}>
                        {isVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {record.verificationStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        record.consentRecorded 
                          ? 'bg-slate-100 text-slate-800 border border-slate-300' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {record.consentRecorded ? 'Recorded' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Landowner Record Drawer */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end p-0">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-300">
            <div>
              <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#C5A059] uppercase font-bold">Landowner Census Dossier</div>
                  <div className="text-base font-bold mt-0.5">{selectedRecord.ownerId} — {selectedRecord.sourceOwnerName}</div>
                </div>
                <button onClick={() => setSelectedRecord(null)} className="p-1 rounded hover:bg-white/20 text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-mono text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 pb-1">
                    RoR 7/12 Baseline Record
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Khata Number:</span>
                      <div className="font-mono font-bold text-slate-900">{selectedRecord.khataNo}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Survey / ULPIN:</span>
                      <div className="font-mono font-bold text-slate-900">{selectedRecord.surveyNo}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Share Ratio:</span>
                      <div className="font-mono text-slate-800">{selectedRecord.sharePercent}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Landholding:</span>
                      <div className="font-mono text-slate-800">{selectedRecord.landholdingHa} ha</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-mono text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 pb-1">
                    SIA Field Observation
                  </div>
                  <div>
                    <span className="text-slate-500">Observed Claimant / Possessor:</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedRecord.siaObservedClaimant}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Relationship to Record:</span>
                    <div className="text-slate-800 font-medium">{selectedRecord.relationship}</div>
                  </div>
                  {selectedRecord.mismatchDetails && (
                    <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
                      <strong>Observation:</strong> {selectedRecord.mismatchDetails}
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Enumerator: {selectedRecord.enumerator}</span>
                    <span>{selectedRecord.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-[#1B365D] text-white rounded-lg text-xs font-semibold hover:bg-[#152a48] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
