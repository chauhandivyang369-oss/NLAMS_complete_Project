import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Printer,
  FileSpreadsheet,
  Layers
} from 'lucide-react';

export default function RRAuditVaultPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    auditLogs, 
    setAuditDrawer, 
    setDocumentModal 
  } = useRRAuthority();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  const filteredLogs = (auditLogs || []).filter(log => {
    const matchesSearch = 
      !searchTerm ||
      log?.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log?.entity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log?.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log?.auditId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'ALL' || log?.role?.includes(filterRole);

    return matchesSearch && matchesRole;
  });

  const handleGenerateStatutoryReport = (reportType) => {
    setDocumentModal({
      isOpen: true,
      doc: {
        name: reportType,
        code: `STAT-REPORT-${Date.now().toString().slice(-6)}.pdf`
      }
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 text-xs">
      
      {/* 1. Global Project Context Header */}
      <RRProjectContextBar onSwitchWorkspace={onSwitchWorkspace} />

      {/* 2. Main Page Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        
        {/* Header Title & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                Inter-Agency Audit &amp; Statutory Reporting Vault
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#1B365D] text-white">
                Immutable Ledger • Section 45 &amp; IT Act 2000
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Cryptographically sealed append-only audit stream, forensic mutation trail, and Section 45/48 statutory report generators.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleGenerateStatutoryReport('Section 45 Quarterly Progress Report (QPR)')}
              className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Generate Sec 45 QPR Report</span>
            </button>
          </div>
        </div>

        {/* 3. Statutory Reports Generation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#1B365D]">RFCTLARR SEC 45</span>
                <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-emerald-100 text-emerald-900 font-bold">STATE</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-1">Quarterly Progress Report (QPR)</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Mandatory quarterly reporting by Administrator to State Government.
              </p>
            </div>
            <button
              onClick={() => handleGenerateStatutoryReport('Section 45 Quarterly Progress Report (QPR)')}
              className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] cursor-pointer"
            >
              Export Dossier →
            </button>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-indigo-900">RFCTLARR SEC 48</span>
                <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-blue-100 text-blue-900 font-bold">CENTRAL</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-1">National Monitoring Dossier</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Central submission for National Monitoring Committee review at MoRD.
              </p>
            </div>
            <button
              onClick={() => handleGenerateStatutoryReport('Section 48 National Monitoring Committee Dossier')}
              className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] cursor-pointer"
            >
              Export Dossier →
            </button>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-amber-700">RFCTLARR SEC 50</span>
                <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-amber-100 text-amber-900 font-bold">COMMITTEE</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-1">State Monitoring Committee Dossier</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Comprehensive multi-district compliance dossier for Chief Secretary review.
              </p>
            </div>
            <button
              onClick={() => handleGenerateStatutoryReport('Section 50 State Monitoring Committee Comprehensive Review')}
              className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] cursor-pointer"
            >
              Export Dossier →
            </button>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-emerald-800">CAG / AG AUDIT</span>
                <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-purple-100 text-purple-900 font-bold">FINANCIAL</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-1">CAG &amp; Escrow Reconciliation</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Immutable financial disbursement logs for statutory external audit.
              </p>
            </div>
            <button
              onClick={() => handleGenerateStatutoryReport('Comptroller & Auditor General (CAG) Financial Audit Dossier')}
              className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] cursor-pointer"
            >
              Export Dossier →
            </button>
          </div>

        </div>

        {/* 4. Filter & Search Controls */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Audit ID / Action / Officer..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 w-64 focus:bg-white focus:border-[#1B365D]"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Officer Roles</option>
              <option value="Administrator">R&amp;R Administrator</option>
              <option value="Commissioner">R&amp;R Commissioner</option>
            </select>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cryptographic Chain: Healthy (Zero tampering detected)</span>
          </div>
        </div>

        {/* 5. Immutable Audit Logs Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#1B365D]" />
              <span>IMMUTABLE STATUTORY AUDIT LEDGER (APPEND-ONLY BLOCK STREAM)</span>
            </div>

            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Signed Cryptographic Audit Ledger Export',
                    code: 'AUDIT_LEDGER_MASTER.csv'
                  }
                });
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded border border-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Export Audit Trail</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100 text-[10px] text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Audit ID</th>
                  <th className="p-2.5">Timestamp (IST)</th>
                  <th className="p-2.5">Executing Officer &amp; Role</th>
                  <th className="p-2.5">Action Executed</th>
                  <th className="p-2.5">Target Entity</th>
                  <th className="p-2.5">Cryptographic Status</th>
                  <th className="p-2.5 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(filteredLogs || []).map((log) => (
                  <tr key={log.auditId} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#1B365D] whitespace-nowrap">
                      {log.auditId}
                    </td>

                    <td className="p-2.5 text-slate-500 whitespace-nowrap text-[11px]">
                      {log.timestamp}
                    </td>

                    <td className="p-2.5 whitespace-nowrap font-sans">
                      <div className="font-semibold text-slate-900">{log.user}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{log.role}</div>
                    </td>

                    <td className="p-2.5 font-sans font-bold text-slate-900">
                      {log.action}
                    </td>

                    <td className="p-2.5 text-blue-900 font-semibold max-w-xs truncate" title={log.entity}>
                      {log.entity}
                    </td>

                    <td className="p-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{log.signatureStatus}</span>
                      </span>
                    </td>

                    <td className="p-2.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setAuditDrawer({ isOpen: true, record: log })}
                        className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded font-bold cursor-pointer transition-colors text-[11px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
