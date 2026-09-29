import React, { useState } from 'react';
import { 
  Map, 
  ShieldCheck, 
  FileText, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';
import LeafletGisMap from '../../../components/gis/LeafletGisMap.jsx';

export default function CadastralMutationAuditPage() {
  const {
    parcels,
    auditLogs,
    activeProject,
    activeDistrict
  } = useDistrictCollector();

  const [activeTab, setActiveTab] = useState('mutation'); // 'mutation' | 'audit' | 'gis'
  const [selectedParcel, setSelectedParcel] = useState(parcels[0] || null);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              REVENUE MUTATION &amp; AUDIT VAULT
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Form VI Mutation Entries, ULPIN Bhu-Aadhaar &amp; Cryptographic Statutory Logs
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            District Cadastral GIS, Revenue Mutation &amp; Statutory Audit Vault
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Synchronize Post-acquisition 7/12 RoR records in favour of Requisitioning Body, generate 14-digit ULPIN Bhu-Aadhaar identifiers, and inspect immutable audit trail.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 border border-slate-300">
          <button
            onClick={() => setActiveTab('mutation')}
            className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mutation'
                ? 'bg-[#142642] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            RoR Form VI Mutation
          </button>
          <button
            onClick={() => setActiveTab('gis')}
            className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gis'
                ? 'bg-[#142642] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cadastral GIS Map
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#142642] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statutory Audit Vault
          </button>
        </div>
      </div>

      {/* TAB 1: REVENUE MUTATION & 7/12 ROR UPDATE */}
      {activeTab === 'mutation' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Revenue Record of Rights (RoR) Mutation Register (Form VI)
                </h3>
                <div className="text-[11px] text-slate-500">
                  Government of Maharashtra / Land Records Directorate • Land Transfer to {activeProject?.requiringBody}
                </div>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-mono px-2.5 py-1 font-bold">
                DILRMP Live Sync Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">ULPIN (Bhu-Aadhaar)</th>
                    <th className="p-3">Khasra / Gat No.</th>
                    <th className="p-3">Prior Khatedar (Owner)</th>
                    <th className="p-3">New Title Entry (Post-Acquisition)</th>
                    <th className="p-3 text-right">Acquired Area</th>
                    <th className="p-3">Mutation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parcels.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-blue-900">
                        {p.ulpin}
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {p.khasraGat}
                      </td>
                      <td className="p-3 text-slate-800">
                        {p.khatedarName}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {p.mutationStatus === 'MUTATED_IN_GOVT_FAVOR' ? (
                          <span className="text-emerald-700">
                            Govt of India / {activeProject?.requiringBody}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Pending Award Finalization</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-800">
                        {p.areaHa} Ha
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 ${
                            p.mutationStatus === 'MUTATED_IN_GOVT_FAVOR'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.mutationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CADASTRAL GIS SPATIAL CANVAS */}
      {activeTab === 'gis' && (
        <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                PostGIS Cadastral Alignment &amp; Boundary Demarcation Canvas
              </h3>
              <div className="text-[11px] text-slate-500">
                Layer: {activeProject?.name} • Coordinate System: EPSG:4326 (WGS 84)
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>GeoServer WMS Connected</span>
              </span>
            </div>
          </div>

          {/* Interactive Cadastral Leaflet GIS Studio */}
          <LeafletGisMap
            onSelectParcel={(p) => setSelectedParcel(p)}
          />
        </div>
      )}

      {/* TAB 3: STATUTORY AUDIT VAULT */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Immutable Audit Trail (RFCTLARR Section Compliance)</span>
              </h3>
              <div className="text-[11px] text-slate-500">
                Cryptographically hashed audit log for all legal orders, notices, awards, and possession certificates.
              </div>
            </div>
            <span className="text-xs bg-slate-100 font-mono text-slate-700 px-2.5 py-1 font-bold">
              SHA-256 Verified
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold bg-[#142642] text-[#C5A059] px-2 py-0.5 text-[10px]">
                      {log.sectionRef}
                    </span>
                    <span className="font-bold text-slate-900">{log.action}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                </div>

                <p className="text-slate-700 text-[11px] leading-relaxed">
                  {log.details}
                </p>

                <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Authorizing Officer: <strong className="text-slate-800">{log.officer}</strong></span>
                  <span className="font-mono text-emerald-700 font-bold">{log.ipHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
