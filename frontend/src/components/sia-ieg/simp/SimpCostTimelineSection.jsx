import React, { useState } from 'react';
import { 
  IndianRupee, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Building2, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Download 
} from 'lucide-react';

export default function SimpCostTimelineSection({ mitigations, impacts }) {
  const totalCost = mitigations.reduce((sum, m) => sum + (Number(m.estimatedCost) || 0), 0);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Group costs by Category
  const categoryCosts = {};
  mitigations.forEach(m => {
    const parent = impacts.find(i => i.impactId === m.impactId);
    const cat = parent?.category || 'General';
    categoryCosts[cat] = (categoryCosts[cat] || 0) + Number(m.estimatedCost || 0);
  });

  // Group costs by Responsible Agency
  const agencyCosts = {};
  mitigations.forEach(m => {
    const agency = m.responsibleAgency.split('(')[0].trim();
    agencyCosts[agency] = (agencyCosts[agency] || 0) + Number(m.estimatedCost || 0);
  });

  return (
    <div className="space-y-4">
      {/* 1. Master Financial & Milestone KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">
            Total Estimated Mitigation Outlay:
          </span>
          <span className="text-xl font-bold font-mono text-[#1B365D] block">
            {formatINR(totalCost)}
          </span>
          <span className="text-[10px] text-slate-500 block">
            ₹{totalCost.toLocaleString('en-IN')} Consolidated Project Escrow
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">
            R&amp;R Housing &amp; Gaothan Infrastructure:
          </span>
          <span className="text-xl font-bold font-mono text-purple-700 block">
            {formatINR(categoryCosts['Housing'] || 372000000)}
          </span>
          <span className="text-[10px] text-purple-800 block">
            186 Model Housing Units (Second Schedule)
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">
            Civil Underpasses &amp; Irrigation:
          </span>
          <span className="text-xl font-bold font-mono text-blue-700 block">
            {formatINR((categoryCosts['Roads'] || 0) + (categoryCosts['Water'] || 0))}
          </span>
          <span className="text-[10px] text-blue-800 block">
            VUP, PUPs &amp; Inverted Syphon Aqueduct
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">
            Implementation Window:
          </span>
          <span className="text-base font-bold font-mono text-slate-900 block">
            May 2026 → June 2029
          </span>
          <span className="text-[10px] text-emerald-700 block font-medium">
            36-Month Milestone Horizon
          </span>
        </div>
      </div>

      {/* 2. Category & Agency Financial Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-mono font-bold text-slate-900 uppercase tracking-wider">
                Mitigation Budget Allocation by Domain
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {Object.keys(categoryCosts).length} Categories
            </span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(categoryCosts).map(([cat, amount]) => {
              const pct = totalCost > 0 ? ((amount / totalCost) * 100).toFixed(1) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800">{cat}</span>
                    <span className="font-mono font-bold text-[#1B365D]">
                      {formatINR(amount)} <span className="text-slate-400 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#1B365D] h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agency Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1B365D]" />
              <h3 className="font-mono font-bold text-slate-900 uppercase tracking-wider">
                Escrow Responsibility by Executing Agency
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {Object.keys(agencyCosts).length} Agencies
            </span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(agencyCosts).map(([agency, amount]) => {
              const pct = totalCost > 0 ? ((amount / totalCost) * 100).toFixed(1) : 0;
              return (
                <div key={agency} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 truncate max-w-[240px]">{agency}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {formatINR(amount)} <span className="text-slate-400 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#C5A059] h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Implementation Horizon & Milestone Track */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1B365D]" />
            <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Statutory Civil Works &amp; Mitigation Timeline Schedule
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Chronologically Sequenced Against Section 11 &amp; Section 19 Notifications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Measure ID</th>
                <th className="py-2.5 px-3">Mitigation Scope</th>
                <th className="py-2.5 px-3">Start Date</th>
                <th className="py-2.5 px-3">Target Date</th>
                <th className="py-2.5 px-3">Critical Milestone</th>
                <th className="py-2.5 px-3">Cost Basis</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mitigations.map((m) => {
                const isOverdue = new Date(m.targetCompletionDate) < new Date() && m.status !== 'Completed';

                return (
                  <tr key={m.mitigationId} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                      {m.mitigationId}
                    </td>
                    <td className="py-2.5 px-3 max-w-xs">
                      <div className="font-semibold text-slate-900 leading-snug truncate">
                        {m.measureDescription}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{m.responsibleAgency}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{m.startDate}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{m.targetCompletionDate}</td>
                    <td className="py-2.5 px-3 text-slate-700 text-[11px]">{m.milestone}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[10px] max-w-[140px] truncate" title={m.costBasis}>
                      {m.costBasis}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        m.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : m.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : isOverdue
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : 'bg-slate-100 text-slate-800 border-slate-300'
                      }`}>
                        {isOverdue ? 'Overdue' : m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
