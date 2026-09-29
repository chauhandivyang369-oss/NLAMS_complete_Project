import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Upload, 
  Eye, 
  Lock, 
  Clock, 
  Layers, 
  Download, 
  Printer, 
  Building, 
  Users, 
  Search,
  CheckSquare,
  Square,
  FileCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAppropriateGovernment } from '../context/AppropriateGovernmentContext.jsx';
import StatutoryChecklist from '../components/common/StatutoryChecklist.jsx';
import PublicationMatrix from '../components/common/PublicationMatrix.jsx';
import StatutoryTimerBadge from '../components/common/StatutoryTimerBadge.jsx';

export default function Section11NotificationHubPage() {
  const {
    sec11Records,
    selectedSec11,
    selectedSec11Id,
    setSelectedSec11Id,
    parcels,
    jurisdiction,
    handleVerifyPublicationEvidence,
    handleGrantFreezeExemption,
    setGazetteModalDoc,
    openParcelDrawer
  } = useAppropriateGovernment();

  const [activeTab, setActiveTab] = useState('eligibility'); 
  // 'eligibility' | 'parcels' | 'draft-builder' | 'publication-matrix' | 'gram-sabha' | 'freeze-bar' | 'ror-update' | 'sec15-objections'

  // Exemption Form Modal
  const [showExemptionModal, setShowExemptionModal] = useState(false);
  const [exempOwner, setExempOwner] = useState('');
  const [exempUlpin, setExempUlpin] = useState('');
  const [exempKhasra, setExempKhasra] = useState('');
  const [exempReason, setExempReason] = useState('Medical emergency mortgage exemption');

  // Multi-parcel selection state
  const [selectedUlpinList, setSelectedUlpinList] = useState(parcels.map(p => p.ulpin));

  // Draft DSC state
  const [dscSigning, setDscSigning] = useState(false);
  const [dscSigned, setDscSigned] = useState(selectedSec11?.dscSignStatus === 'DSC_SHA256_VERIFIED');

  const current = selectedSec11 || sec11Records[0];

  const handleToggleSelectAll = () => {
    if (selectedUlpinList.length === parcels.length) {
      setSelectedUlpinList([]);
    } else {
      setSelectedUlpinList(parcels.map(p => p.ulpin));
    }
  };

  const handleToggleParcel = (ulpin) => {
    if (selectedUlpinList.includes(ulpin)) {
      setSelectedUlpinList(selectedUlpinList.filter(u => u !== ulpin));
    } else {
      setSelectedUlpinList([...selectedUlpinList, ulpin]);
    }
  };

  const triggerDscSign = () => {
    setDscSigning(true);
    setTimeout(() => {
      setDscSigning(false);
      setDscSigned(true);
    }, 1200);
  };

  const handleSaveExemption = async (e) => {
    e.preventDefault();
    await handleGrantFreezeExemption({
      notifId: current.id,
      projectId: current.projectId,
      ownerName: exempOwner,
      ulpin: exempUlpin,
      khasraNo: exempKhasra,
      specialCircumstance: 'Genuine Family Medical Emergency',
      reason: exempReason
    });
    setShowExemptionModal(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto text-slate-800">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1B365D] tracking-tight">
              Section 11 Preliminary Notification Master Hub
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-slate-950 px-2 py-0.5 rounded">
              MENU 4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory prerequisites gate, 12-channel mandatory publication, Section 11(4) transaction freeze &amp; Section 15 objection trigger
          </p>
        </div>

        {/* View Gazette Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setGazetteModalDoc({
                id: current?.id,
                notificationNo: current?.gazetteNotificationNo || 'S.O. 2489(E)',
                section: 'SECTION 11(1)',
                publicationDate: current?.publicationDate || '2025-08-14',
                jurisdictionType: jurisdiction,
                projectCode: current?.projectId,
                signedBy: 'Joint Secretary to Govt of India',
                sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                version: 'V1.0 FINAL'
              })
            }
            className="px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-amber-800" />
            <span>View Official Gazette</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs (8 Dedicated Sub-views) */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap pb-1">
        <button
          onClick={() => setActiveTab('eligibility')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'eligibility'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Statutory Eligibility Gate
        </button>

        <button
          onClick={() => setActiveTab('parcels')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'parcels'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Land Schedule &amp; ULPIN Selection ({selectedUlpinList.length})
        </button>

        <button
          onClick={() => setActiveTab('draft-builder')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'draft-builder'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Notification Builder &amp; DSC e-Sign
        </button>

        <button
          onClick={() => setActiveTab('publication-matrix')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'publication-matrix'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          4. 12-Channel Publication Matrix
        </button>

        <button
          onClick={() => setActiveTab('gram-sabha')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'gram-sabha'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          5. Gram Sabha / PESA Intimation
        </button>

        <button
          onClick={() => setActiveTab('freeze-bar')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'freeze-bar'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          6. Sec 11(4) Transaction Freeze
        </button>

        <button
          onClick={() => setActiveTab('ror-update')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'ror-update'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          7. 2-Month RoR Update (Sec 11(5))
        </button>

        <button
          onClick={() => setActiveTab('sec15-objections')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'sec15-objections'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          8. 60-Day Objection Trigger (Sec 15)
        </button>

        <button
          onClick={() => setActiveTab('revenue-stack')}
          className={`px-3 py-2 border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'revenue-stack'
              ? 'border-[#1B365D] text-[#1B365D] bg-slate-50 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {jurisdiction === 'CENTRAL' ? '9. Central Cadastral Exchange' : '9. State Revenue Stack (RoR & SRO)'}
        </button>
      </div>

      {/* ================= TAB 1: ELIGIBILITY CHECKLIST GATE ================= */}
      {activeTab === 'eligibility' && (
        <div className="space-y-4">
          <StatutoryChecklist
            title="Section 11(1) Mandatory Statutory Eligibility Gate"
            items={current?.eligibilityChecklist || []}
          />
        </div>
      )}

      {/* ================= TAB 2: LAND SCHEDULE & ULPIN SELECTION ================= */}
      {activeTab === 'parcels' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Cadastral Land Schedule &amp; ULPIN Bulk Selector
              </h3>
              <p className="text-xs text-slate-500">
                Verified against State Bhu-Naksha &amp; Jamabandi RoR; only active selected parcels will be published
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSelectAll}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                {selectedUlpinList.length === parcels.length ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    Deselect All
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-3.5 h-3.5" />
                    Select All
                  </>
                )}
              </button>
              <button className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Export Land Schedule CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center">Select</th>
                  <th className="py-2.5 px-3">ULPIN &amp; Khasra No</th>
                  <th className="py-2.5 px-3">Location (Village / Tehsil)</th>
                  <th className="py-2.5 px-3">Recorded Titleholder</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3 text-right">Required Area (Ha)</th>
                  <th className="py-2.5 px-3 text-center">GIS Verified</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {parcels.map(p => {
                  const isChecked = selectedUlpinList.includes(p.ulpin);
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isChecked ? 'bg-amber-50/30' : 'opacity-60 bg-slate-50/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleParcel(p.ulpin)}
                          className="w-4 h-4 accent-[#1B365D] cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-mono font-bold text-slate-900">{p.ulpin}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">
                          Khasra {p.khasraNo}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800">{p.village}</div>
                        <div className="text-[10px] text-slate-500">
                          {p.tehsil}, {p.district}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{p.ownerName}</div>
                        {p.coOwners?.length > 0 && (
                          <div className="text-[10px] text-slate-500 line-clamp-1">
                            +{p.coOwners.length} Co-owners
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-700">
                        {p.category}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {p.requiredAreaHa}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          POSTGIS OK
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => openParcelDrawer(p.id)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: DRAFT BUILDER & DSC e-SIGN ================= */}
      {activeTab === 'draft-builder' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Section 11(1) Statutory Notification Draft &amp; DSC e-Sign
              </h3>
              <p className="text-xs text-slate-500">
                Form 3A compliant gazette text with cryptographic digital signature under IT Act 2000
              </p>
            </div>
            <div>
              {dscSigned ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  DSC SIGNATURE VERIFIED (SHA-256)
                </span>
              ) : (
                <button
                  onClick={triggerDscSign}
                  disabled={dscSigning}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <FileCheck className="w-4 h-4" />
                  {dscSigning ? 'Signing with Class 3 DSC...' : 'Execute Digital Signature (DSC)'}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded border border-slate-300 font-serif text-xs leading-relaxed space-y-3 max-h-96 overflow-y-auto">
            <div className="text-center space-y-1 font-sans">
              <div className="font-bold text-sm tracking-wide text-slate-900 uppercase">
                {jurisdiction === 'CENTRAL' ? 'THE GAZETTE OF INDIA : EXTRAORDINARY' : 'STATE GOVERNMENT GAZETTE : EXTRAORDINARY'}
              </div>
              <div className="text-xs text-slate-600 uppercase font-semibold">
                PART II — SECTION 3 — SUB-SECTION (ii)
              </div>
              <div className="text-[11px] text-slate-500">
                Notification No: <span className="font-mono font-bold text-slate-800">S.O. 2489(E)</span>
              </div>
            </div>

            <p className="pt-2 text-justify">
              <strong>S.O. 2489(E).—</strong> In exercise of the powers conferred by sub-section (1) of Section 11 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (30 of 2013), the Appropriate Government hereby publishes this preliminary notification declaring that land described in the Schedule hereto is required for public purpose:
            </p>
            <p className="text-justify">
              <strong>1. Public Purpose:</strong> Construction of access-controlled 6-lane Delhi-Amritsar-Katra Expressway (Package 3), being an infrastructure project under Section 2(1)(b) of the Act.
            </p>
            <p className="text-justify">
              <strong>2. Social Impact Assessment:</strong> The SIA report prepared by Punjab State Institute of Public Administration (PSIPA) has been duly appraised by the Multi-Disciplinary Expert Group under Section 7, and the Appropriate Government has recorded satisfaction that the public purpose outweighs adverse social impacts.
            </p>
            <p className="text-justify">
              <strong>3. Section 11(4) Transaction Bar:</strong> Under sub-section (4) of Section 11, from the date of publication of this notification, no person shall make any transaction or cause any transaction of land specified in this notification, or create any encumbrances on such land without the prior approval of the District Collector.
            </p>
            <p className="text-justify">
              <strong>4. Section 15 Objections:</strong> Any person interested in any land notified herein may, within sixty days from the date of publication, submit objections in writing to the District Collector.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PUBLICATION MATRIX ================= */}
      {activeTab === 'publication-matrix' && (
        <PublicationMatrix
          matrix={current?.publicationMatrix || []}
          notifTitle="Section 11(1) Mandatory 12-Channel Publication Checklist"
          onVerifyEvidence={(pubId) => handleVerifyPublicationEvidence(current.id, pubId)}
          onViewGazette={() =>
            setGazetteModalDoc({
              id: current?.id,
              notificationNo: current?.gazetteNotificationNo || 'S.O. 2489(E)',
              section: 'SECTION 11(1)',
              publicationDate: current?.publicationDate || '2025-08-14',
              jurisdictionType: jurisdiction,
              projectCode: current?.projectId,
              signedBy: 'Joint Secretary to Govt of India',
              sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              version: 'V1.0 FINAL'
            })
          }
        />
      )}

      {/* ================= TAB 5: GRAM SABHA / PESA INTIMATION ================= */}
      {activeTab === 'gram-sabha' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Gram Sabha &amp; Local Body Consultation (PESA Act Compliance)
              </h3>
              <p className="text-xs text-slate-500">
                Mandatory resolution records from Gram Panchayats and Fifth Schedule Scheduled Areas
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              RESOLUTIONS VERIFIED
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {current?.gramSabhaMeetings?.map((gs, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">
                    Gram Panchayat {gs.village}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Meeting Date: <span className="font-mono">{gs.meetingDate}</span> • Quorum:{' '}
                    <span className="font-semibold text-emerald-700">{gs.quorumAttended} Attendees</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Res. No. {gs.resolutionNo}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {gs.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 6: TRANSACTION FREEZE ================= */}
      {activeTab === 'freeze-bar' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-600" />
                Section 11(4) Statutory Land Transaction Freeze Engine
              </h3>
              <p className="text-xs text-slate-500">
                Direct integration with State Sub-Registrar Offices (SRO) &amp; NGDRS registry
              </p>
            </div>
            <button
              onClick={() => setShowExemptionModal(true)}
              className="px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Collector Exemption Desk</span>
            </button>
          </div>

          <div className="p-3 bg-rose-50 rounded border border-rose-200 text-xs space-y-1">
            <div className="font-bold text-rose-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              Statutory Bar Active:
            </div>
            <p className="text-rose-800 leading-relaxed text-[11px]">
              No person shall make any transaction or create encumbrances on the notified land without prior written approval of the District Collector. Any transaction made in violation is void ab initio.
            </p>
          </div>

          {/* Exemption Records List */}
          <div className="space-y-2">
            <div className="font-bold text-slate-700 text-xs uppercase tracking-wide">
              Recorded Collector Exemptions ({current?.exemptionRecords?.length || 0})
            </div>
            {current?.exemptionRecords?.length > 0 ? (
              current.exemptionRecords.map((ex, i) => (
                <div key={ex.id || i} className="p-2.5 rounded border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{ex.ownerName}</span>
                    <span className="font-mono text-emerald-700 font-semibold">{ex.collectorDecision}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    ULPIN: <span className="font-mono">{ex.ulpin}</span> • Khasra: {ex.khasraNo}
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    Reason: {ex.reason}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400 text-xs italic bg-slate-50 rounded">
                No special circumstance exemptions requested yet
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 7: 2-MONTH RoR UPDATE ================= */}
      {activeTab === 'ror-update' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Section 11(5) Statutory 2-Month Land Records (RoR) Update Monitor
              </h3>
              <p className="text-xs text-slate-500">
                Mandatory 60-day window for updating Jamabandi, recording mutations &amp; correcting title records
              </p>
            </div>
            <StatutoryTimerBadge
              daysRemaining={current?.statutory2MonthClock?.daysRemaining || 18}
              daysElapsed={42}
              totalWindowDays={60}
              status="NORMAL"
              compact={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Revenue Mutations</div>
              <div className="text-xl font-bold font-mono text-slate-900">42 Recorded</div>
              <div className="text-[10px] text-emerald-700">38 Verified by Tehsildar</div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Bhu-Naksha Corrections</div>
              <div className="text-xl font-bold font-mono text-slate-900">8 Boundaries</div>
              <div className="text-[10px] text-slate-500">All updated in GIS base</div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Statutory Target</div>
              <div className="text-xl font-bold font-mono text-[#1B365D]">15-Oct-2025</div>
              <div className="text-[10px] text-slate-500">60 days from Section 11 publication</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 8: SECTION 15 OBJECTIONS TRIGGER ================= */}
      {activeTab === 'sec15-objections' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide">
                Section 15 Statutory 60-Day Objection Filing Window
              </h3>
              <p className="text-xs text-slate-500">
                Triggered from the last publication date across all 12 mandatory statutory channels
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs">
              OBJECTION WINDOW ACTIVE (18 DAYS LEFT)
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span>Section 15 Window Start: 14-Aug-2025</span>
              <span>Statutory Close Date: 13-Oct-2025</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              District Collector is conducting statutory public hearings under Section 15(2). Upon conclusion of hearings, the Collector prepares a comprehensive report with recommendations and submits to the Appropriate Government for review in Menu 5.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 9: STATE REVENUE STACK & SRO ADAPTERS ================= */}
      {activeTab === 'revenue-stack' && (
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C5A059]" />
                {jurisdiction === 'CENTRAL' ? 'Central Cadastral Sync & Inter-State Registry Adapters' : 'State Revenue Stack & NGDRS Registry Adapters'}
              </h3>
              <p className="text-xs text-slate-500">
                {jurisdiction === 'CENTRAL'
                  ? 'National DILRMP coordination, multi-state boundary reconciliation and Central CALA registry gateway'
                  : 'State Jamabandi RoR, e-Mutation, Bhu-Naksha GIS cadastre, Circle Rate registry and Sub-Registrar SRO/NGDRS sync'}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
              MOCK ADAPTERS ACTIVE • API READY
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 min-w-[700px]">
              <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">System Name</th>
                  <th className="py-2.5 px-3">Statutory Purpose</th>
                  <th className="py-2.5 px-3 text-center">Configured</th>
                  <th className="py-2.5 px-3 text-center">Mock Status</th>
                  <th className="py-2.5 px-3 text-center">Request Status</th>
                  <th className="py-2.5 px-3 text-center">Last Sync</th>
                  <th className="py-2.5 px-3">Error / Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {(jurisdiction === 'STATE' ? [
                  { name: 'State RoR / Jamabandi', purpose: 'Ownership title, Khatedar verification & land classification', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 11:20', err: 'None (Clean)' },
                  { name: 'e-Mutation Engine', purpose: 'Automated 60-day mutation entry under Section 11(5)', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 10:45', err: 'None (Clean)' },
                  { name: 'Bhu-Naksha GIS Cadastre', purpose: 'Spatial polygon geometry, ULPIN mapping & boundary shifts', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 09:15', err: 'None (Clean)' },
                  { name: 'Circle Rates Registry', purpose: 'Sub-Registrar guidance market value for Section 26 calculation', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '24-Sep-2026 18:00', err: 'None (Clean)' },
                  { name: 'SRO / NGDRS Gateway', purpose: 'Section 11(4) automated encumbrance transaction freeze', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 11:00', err: 'None (Bar Active)' },
                  { name: 'Survey Settlement Office', purpose: 'Village boundary ground-truthing & sub-division verification', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '24-Sep-2026 14:30', err: 'None (Clean)' }
                ] : [
                  { name: 'DILRMP Central Sync', purpose: 'National Land Records Modernization Programme alignment', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 11:15', err: 'None (Clean)' },
                  { name: 'Inter-State Cadastre Link', purpose: 'Multi-state corridor boundary reconciliation (Punjab-Haryana)', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 10:30', err: 'None (Clean)' },
                  { name: 'Central Ministry CALA Gateway', purpose: 'Competent Authority Land Acquisition delegation under Special Acts', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 09:40', err: 'None (Clean)' },
                  { name: 'PFMS / CNA Escrow Hook', purpose: 'Section 19(2) 100% cost deposit automated ledger check', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 11:22', err: 'None (Funded)' },
                  { name: 'Central e-Gazette Gateway', purpose: 'Directorate of Printing S.O. publication dispatch', configured: 'YES', mock: 'ACTIVE', status: '200 OK', sync: '25-Sep-2026 08:00', err: 'None (Clean)' }
                ]).map((ad, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{ad.name}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600">{ad.purpose}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[10px] text-emerald-700 font-bold">{ad.configured}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold">
                        {ad.mock}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-[10px] text-emerald-800 font-bold">{ad.status}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[10px] text-slate-500">{ad.sync}</td>
                    <td className="py-2.5 px-3 text-[11px] text-emerald-800 font-semibold">{ad.err}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Exemption Request Modal */}
      {showExemptionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-xl max-w-md w-full p-4 space-y-3 text-xs">
            <div className="font-bold text-[#1B365D] text-sm flex items-center gap-2 border-b pb-2">
              <Lock className="w-4 h-4 text-amber-600" />
              Collector Exemption Desk (Section 11(4) Proviso)
            </div>
            <form onSubmit={handleSaveExemption} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Titleholder Name:</label>
                <input
                  type="text"
                  value={exempOwner}
                  onChange={e => setExempOwner(e.target.value)}
                  placeholder="e.g. S. Gurmeet Singh"
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">ULPIN:</label>
                  <input
                    type="text"
                    value={exempUlpin}
                    onChange={e => setExempUlpin(e.target.value)}
                    placeholder="19U28746219801"
                    className="w-full p-2 rounded border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block pb-1">Khasra No:</label>
                  <input
                    type="text"
                    value={exempKhasra}
                    onChange={e => setExempKhasra(e.target.value)}
                    placeholder="142/1"
                    className="w-full p-2 rounded border border-slate-300 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block pb-1">Collector Reason &amp; Order:</label>
                <textarea
                  rows={3}
                  value={exempReason}
                  onChange={e => setExempReason(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowExemptionModal(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-800 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white rounded font-bold"
                >
                  Record Exemption Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
