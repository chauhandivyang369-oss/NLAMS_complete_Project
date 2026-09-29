import React, { useState } from 'react';
import { useRRAuthority } from '../context/RRAuthorityContext.jsx';
import RRProjectContextBar from '../components/layout/RRProjectContextBar.jsx';
import RRResettlementMap from '../components/gis/RRResettlementMap.jsx';
import { 
  Home, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Download, 
  Award, 
  Building2, 
  Filter, 
  Search, 
  Plus, 
  ShieldCheck,
  Eye,
  Key
} from 'lucide-react';

export default function RRAllotmentPage({ onSwitchWorkspace }) {
  const { 
    selectedProject, 
    plots, 
    setPlots, 
    families,
    setDocumentModal,
    setESignModal,
    addAuditLog 
  } = useRRAuthority();

  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPlot, setSelectedPlot] = useState(plots?.[0] || null);
  const [isAllotModalOpen, setIsAllotModalOpen] = useState(false);
  const [targetFamilyId, setTargetFamilyId] = useState(families?.[4]?.familyId || families?.[0]?.familyId || '');

  const filteredPlots = (plots || []).filter(p => {
    const matchesSector = selectedSector === 'ALL' || p.sector === selectedSector;
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    return matchesSector && matchesStatus;
  });

  const handleIssueAllotmentOrder = () => {
    if (!selectedPlot) return;

    const matchedFamily = families.find(f => f.familyId === targetFamilyId) || families[0];

    setESignModal({
      isOpen: true,
      context: {
        title: `Issue Statutory Allotment Order for ${selectedPlot.plotId}`,
        actionTitle: 'PLOT_ALLOTMENT_ORDER_ISSUED_SECTION_31',
        entityName: `Plot ${selectedPlot.plotId} -> Beneficiary: ${matchedFamily.headName}`,
        documentName: `ALLOTMENT_SANAD_${selectedPlot.plotId}.pdf`
      },
      onSignComplete: (signHash) => {
        const orderNo = `ORDER-ALLOT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setPlots(prev => prev.map(p => {
          if (p.plotId === selectedPlot.plotId) {
            return {
              ...p,
              status: 'Allotted',
              allottedFamilyId: matchedFamily.familyId,
              allotteeName: matchedFamily.headName,
              allotmentOrderNo: orderNo,
              allotmentDate: new Date().toLocaleDateString('en-GB')
            };
          }
          return p;
        }));

        addAuditLog(
          'PHYSICAL_PLOT_ALLOTMENT_SANCTIONED',
          `Plot ${selectedPlot.plotId}`,
          'Status: Available',
          `Status: Allotted to ${matchedFamily.headName} (${orderNo})`,
          `ALLOTMENT_SANAD_${selectedPlot.plotId}.pdf`
        );

        setIsAllotModalOpen(false);
        alert(`Statutory Allotment Order (${orderNo}) has been e-Signed and issued!`);
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
                R&amp;R Award Execution &amp; Physical Allotment Desk
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#C5A059]/20 text-[#8c6b22] border border-[#C5A059]/40">
                Section 31 &amp; Resettlement Colony GIS
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Demarcated layout, individual plot allottee assignment, house construction progress tracking, and Allotment Sanad issuance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setDocumentModal({
                  isOpen: true,
                  doc: {
                    name: 'Statutory Allotment Sanad & Possession Certificate',
                    code: 'DOC-SANAD-PETLAD-SEC7.pdf'
                  }
                });
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sample Allotment Sanad</span>
            </button>

            <button
              onClick={() => setIsAllotModalOpen(true)}
              className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Issue New Allotment Order</span>
            </button>
          </div>
        </div>

        {/* 3. Colony Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Plots Demarcated</span>
            <div className="text-xl font-bold font-mono text-slate-900">{plots.length} Units</div>
            <div className="text-[10px] text-slate-500 font-sans">Petlad Gaothan Sector 7</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Allotted to Families</span>
            <div className="text-xl font-bold font-mono text-emerald-700">
              {plots.filter(p => p.status === 'Allotted').length} Plots
            </div>
            <div className="text-[10px] text-emerald-800 font-sans">Sanad Issued</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Reserved for SC / ST</span>
            <div className="text-xl font-bold font-mono text-amber-600">
              {plots.filter(p => p.status === 'Reserved').length} Plots
            </div>
            <div className="text-[10px] text-amber-800 font-sans">Section 41 Compact Block</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Available Pool</span>
            <div className="text-xl font-bold font-mono text-blue-700">
              {plots.filter(p => p.status === 'Available').length} Plots
            </div>
            <div className="text-[10px] text-blue-800 font-sans">Ready for Assignment</div>
          </div>
        </div>

        {/* 4. GIS Layout Map + Plot Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B365D]" />
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Resettlement Colony Cadastral Layout (Sector 7)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Click any plot marker to view allotment record
              </span>
            </div>

            <RRResettlementMap 
              height="360px"
              onSelectPlot={(pId) => {
                const found = plots.find(p => p.plotId === pId);
                if (found) setSelectedPlot(found);
              }}
            />
          </div>

          {/* Selected Plot Inspector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            {selectedPlot ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="font-bold text-slate-900 text-sm">{selectedPlot.plotId}</div>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    selectedPlot.status === 'Allotted' ? 'bg-emerald-100 text-emerald-900' : 'bg-blue-100 text-blue-900'
                  }`}>
                    {selectedPlot.status}
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">SECTOR &amp; LOCATION</span>
                    <strong className="text-slate-900">{selectedPlot.sector}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">DIMENSIONS &amp; AREA</span>
                    <strong className="text-slate-900">{selectedPlot.dimensions} ({selectedPlot.areaSqM} sq. meters)</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">ALLOTTEE HEAD OF HOUSEHOLD</span>
                    <strong className="text-[#1B365D] font-sans text-xs">{selectedPlot.allotteeName}</strong>
                    <div className="text-[10px] text-slate-500 font-mono">ID: {selectedPlot.allottedFamilyId}</div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">HOUSE CONSTRUCTION STATUS</span>
                    <span className="font-bold text-indigo-900">{selectedPlot.houseConstructionStatus}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">STATUTORY SANAD / ORDER NO</span>
                    <span className="text-slate-700 font-bold">{selectedPlot.allotmentOrderNo}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">POSSESSION HANDOVER DATE</span>
                    <span className="text-slate-700">{selectedPlot.possessionHandoverDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => {
                      setDocumentModal({
                        isOpen: true,
                        doc: {
                          name: `Allotment Sanad for ${selectedPlot.plotId}`,
                          code: `${selectedPlot.allotmentOrderNo}.pdf`
                        }
                      });
                    }}
                    className="w-full py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Certified Sanad</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-slate-400 font-mono">
                Select a plot to view details.
              </div>
            )}

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600 font-mono">
              GPS Geo-tagged Boundary: 22.4880° N, 72.8035° E
            </div>
          </div>

        </div>

        {/* 5. Master Plots Inventory Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Home className="w-4 h-4 text-[#1B365D]" />
              <span>COLONY PLOTS DEMARCATION &amp; ALLOTMENT REGISTER</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-1 px-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="Allotted">Allotted</option>
                <option value="Reserved">Reserved</option>
                <option value="Available">Available</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-[10px] font-mono text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Plot ID</th>
                  <th className="p-2.5">Sector</th>
                  <th className="p-2.5">Size / Dimensions</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Allottee Name &amp; Family ID</th>
                  <th className="p-2.5">House Construction</th>
                  <th className="p-2.5">Sanad Order</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(filteredPlots || []).map((p) => (
                  <tr key={p.plotId} className="hover:bg-slate-50 font-mono">
                    <td className="p-2.5 font-bold text-[#1B365D]">{p.plotId}</td>
                    <td className="p-2.5 text-slate-700">{p.sector}</td>
                    <td className="p-2.5 text-slate-900">{p.dimensions} ({p.areaSqM} m²)</td>
                    <td className="p-2.5">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        p.status === 'Allotted' 
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                          : p.status === 'Reserved' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-2.5 font-sans">
                      <div className="font-semibold text-slate-900">{p.allotteeName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{p.allottedFamilyId}</div>
                    </td>
                    <td className="p-2.5 font-sans text-indigo-900 font-medium">
                      {p.houseConstructionStatus}
                    </td>
                    <td className="p-2.5 text-slate-600 text-[10px]">
                      {p.allotmentOrderNo}
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => setSelectedPlot(p)}
                        className="px-2 py-1 bg-slate-100 hover:bg-[#1B365D] hover:text-white rounded font-bold cursor-pointer transition-colors"
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

      {/* 6. Issue Allotment Order Modal */}
      {isAllotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-bold text-sm">Issue Statutory Allotment Sanad</h3>
              </div>
              <button
                onClick={() => setIsAllotModalOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Resettlement Plot *</label>
                <select
                  value={selectedPlot?.plotId || ''}
                  onChange={(e) => {
                    const found = (plots || []).find(p => p.plotId === e.target.value);
                    if (found) setSelectedPlot(found);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono font-bold text-slate-900"
                >
                  {(plots || []).map(p => (
                    <option key={p.plotId} value={p.plotId}>
                      {p.plotId} ({p.sector} - {p.dimensions} - {p.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Eligible Beneficiary Family *</label>
                <select
                  value={targetFamilyId}
                  onChange={(e) => setTargetFamilyId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                >
                  {(families || []).map(f => (
                    <option key={f.familyId} value={f.familyId}>
                      {f.headName} ({f.familyId} - {f.village} - {f.casteCategory})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
                <strong>Statutory Note:</strong> Under Section 31(1), every physically displaced family is entitled to a free-of-cost homestead plot of not less than 50 sq. meters in rural areas.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAllotModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleIssueAllotmentOrder}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Affix DSC &amp; Issue Sanad</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
