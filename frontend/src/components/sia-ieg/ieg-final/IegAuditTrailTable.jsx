import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Eye, 
  Lock, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { INITIAL_IEG_AUDIT_TRAIL } from '../../../services/iegService.js';

export default function IegAuditTrailTable({ onInspectAuditEvent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = INITIAL_IEG_AUDIT_TRAIL.filter(item => {
    const matchesSearch = item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.auditId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || item.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Immutable Statutory Audit Trail &amp; Verification Register
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Cryptographically Sealed Activity Logs (Menus 6, 7, 8 &amp; 9)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1 text-xs text-slate-900 w-44 lg:w-56 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="ALL">All Roles</option>
            <option value="Chairperson">Chairperson</option>
            <option value="Member">Member</option>
            <option value="System">System Engine</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase border-b border-slate-200">
            <tr>
              <th className="p-2.5">Audit ID</th>
              <th className="p-2.5">Timestamp</th>
              <th className="p-2.5">User / Role</th>
              <th className="p-2.5">Action Performed</th>
              <th className="p-2.5">Target Entity</th>
              <th className="p-2.5">Statutory Reason</th>
              <th className="p-2.5 text-right">Inspection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filteredLogs.map((log) => (
              <tr key={log.auditId} className="hover:bg-slate-50 transition-colors">
                <td className="p-2.5 font-bold text-[#1B365D] whitespace-nowrap">
                  {log.auditId}
                </td>

                <td className="p-2.5 text-slate-600 whitespace-nowrap">
                  {log.timestamp}
                </td>

                <td className="p-2.5 whitespace-nowrap">
                  <div className="font-bold text-slate-900 font-sans">{log.user}</div>
                  <div className="text-[10px] text-slate-500">{log.role}</div>
                </td>

                <td className="p-2.5 font-sans font-semibold text-slate-800 whitespace-nowrap">
                  {log.action}
                </td>

                <td className="p-2.5 text-blue-900 whitespace-nowrap">
                  {log.entityType} ({log.entityId})
                </td>

                <td className="p-2.5 font-sans text-slate-600 max-w-xs truncate" title={log.reason}>
                  {log.reason}
                </td>

                <td className="p-2.5 text-right font-sans whitespace-nowrap">
                  <button
                    onClick={() => onInspectAuditEvent && onInspectAuditEvent(log)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded text-[10px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#C5A059]" />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
