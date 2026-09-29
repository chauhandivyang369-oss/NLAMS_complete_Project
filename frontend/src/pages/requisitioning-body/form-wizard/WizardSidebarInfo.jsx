import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  FileCheck2, 
  AlertTriangle, 
  Compass, 
  IndianRupee, 
  Building2,
  ExternalLink,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useWorkspace } from '../../../contexts/WorkspaceContext.jsx';

export default function WizardSidebarInfo({ currentStep }) {
  const { formIDraft, openAiAssistant } = useWorkspace();

  const stepStatutoryNotes = {
    1: {
      clause: 'RFCTLARR Act 2013 — Section 3(u) & Section 4(1)',
      title: 'Requisitioning Body Definition',
      points: [
        'Requisitioning Body includes any Department of Central / State Govt or local authority.',
        'Must specify Administrative Approval (AA) order number and date of financial sanction.',
        'Authorised signatory must hold designated authority under Section 3(u).'
      ]
    },
    2: {
      clause: 'RFCTLARR Act 2013 — Section 2(1) & Minimum Land Rule',
      title: 'Public Purpose Criteria',
      points: [
        'Infrastructure corridors (Highways, Rail, Metros) qualify under Section 2(1)(a).',
        'Mandatory Certificate: Non-availability of alternative feasible government land.',
        'Must state minimum bare-essential land requirement justified by alignment engineering.'
      ]
    },
    3: {
      clause: 'RFCTLARR Act 2013 — Section 4(1) & Schedule Form-I',
      title: 'Cadastral Schedule Specifications',
      points: [
        'Khasra/Survey schedule must sync with State Revenue Bhulekh records.',
        '14-digit Unique Land Parcel Identification Number (ULPIN) is required for each parcel.',
        'Linear corridors require chainage (start/end km) and Right-of-Way (RoW) width.'
      ]
    },
    4: {
      clause: 'RFCTLARR Act 2013 — Section 10(1) & 10(2)',
      title: 'Food Security & Multi-Crop Protections',
      points: [
        'Multi-crop irrigated land acquisition cannot exceed statutory ceiling of district net sown area.',
        'Requires equivalent allocation of culturable wasteland for compensatory development.',
        'Mandatory clearance from District Agriculture Officer / Collector required.'
      ]
    },
    5: {
      clause: 'RFCTLARR Act 2013 — Chapter II & Section 40',
      title: 'SIA Exemption & Urgency Powers',
      points: [
        'Section 10A & Central notifications allow exemption of linear infrastructure from Chapter II SIA.',
        'Section 40 Urgency power can only be invoked for national defence or emergency.',
        'Invoking Section 40 mandates 80% compensation deposit before physical possession.'
      ]
    },
    6: {
      clause: 'RFCTLARR Act 2013 — 2nd & 3rd Schedule & Section 41',
      title: 'R&R Entitlements Matrix',
      points: [
        'Mandatory provision of alternative housing or lump-sum allowance for displaced families.',
        'Section 41 mandates special safeguards and prior consultation in Scheduled Areas.',
        'One-time resettlement allowance and annuity/employment assistance must be provisioned.'
      ]
    },
    7: {
      clause: 'RFCTLARR Act 2013 — Section 26 to 30 & Section 77',
      title: '4-Tier Valuation & Escrow Deposit',
      points: [
        'Base Market Value + Rural Multiplier (1.0x to 2.0x) + 100% Solatium + 12% Additional Interest.',
        '10% statutory administrative & establishment cost to be deposited with CALA.',
        'Full compensation must be guaranteed via PFMS Treasury Escrow under Major Head 8443.'
      ]
    },
    8: {
      clause: 'MoRTH & NLAMS Technical Guidelines',
      title: 'GIS Alignment & Cadastral Overlay',
      points: [
        'KML/KMZ or Shapefile must be projected in WGS84 / EPSG:4326 coordinate system.',
        'Spatial overlay must intersect verified Bhu-Naksha village boundaries.',
        'Automated collision detection identifies forest, waterbody and eco-sensitive buffers.'
      ]
    },
    9: {
      clause: 'Statutory Requisition Rules — Rule 3 Enclosures',
      title: 'Mandatory Certified Enclosures',
      points: [
        'Key Alignment Plan (KAP) and General Arrangement Drawing (GAD) approved by CE.',
        'Certified RoR / Jamabandi extract signed by Tehsildar with revenue seal.',
        'Tree enumeration report by DFO and preliminary statutory clearances.'
      ]
    },
    10: {
      clause: 'Statutory Pre-Screening Rule Engine',
      title: 'AI Compliance Audit Verification',
      points: [
        '18 statutory rules cross-checked against RFCTLARR Act 2013 sections.',
        'Validates mathematical parity between financial sanction and escrow commitment.',
        'Ensures 0 defect rate to prevent rejection or remittal by District Collector.'
      ]
    },
    11: {
      clause: 'Official Gazette Format — Form-I Schedule',
      title: 'Statutory Gazette Draft Preview',
      points: [
        'Draft prepared in official bilingual gazette format for Section 11(1) preliminary notification.',
        'Contains full schedules of land, owners, boundaries, and public purpose rationale.',
        'Ready for gazette publication upon Collector approval.'
      ]
    },
    12: {
      clause: 'Information Technology Act 2000 & RFCTLARR Act',
      title: 'Level-3 DSC e-Sign & CALA Dispatch',
      points: [
        'Signed using Class-3 Organization Digital Signature Certificate (DSC Token).',
        'Official electronic consignment generated and logged in statutory audit registry.',
        'Real-time webhook notification dispatched to CALA Patiala statutory inbox.'
      ]
    }
  };

  const currentInfo = stepStatutoryNotes[currentStep] || stepStatutoryNotes[1];

  return (
    <div className="space-y-4 text-slate-800">
      
      {/* Live Requisition Summary Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            PROPOSAL SNAPSHOT
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
            CALA Patiala
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="text-[10px] text-slate-500">Executing Agency</div>
            <div className="font-semibold text-slate-900 truncate">
              {formIDraft.executingAgency || 'NHAI (PIU Patiala)'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            <div>
              <div className="text-[10px] text-slate-500">Total Land Extent</div>
              <div className="font-mono font-bold text-slate-900 text-sm">
                {formIDraft.extentRequiredHa || 342.85} Ha
              </div>
              <div className="text-[10px] text-slate-500">847.20 Acres</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500">Estimated Budget</div>
              <div className="font-mono font-bold text-blue-700 text-sm">
                ₹{formIDraft.estimatedCostCr || 685.50} Cr
              </div>
              <div className="text-[10px] text-slate-500">+10% Admin Escrow</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px]">
            <div>
              <span className="text-slate-500">Districts:</span>{' '}
              <strong className="text-slate-800">{formIDraft.district || 'Patiala'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Villages:</span>{' '}
              <strong className="text-slate-800">3 Villages</strong>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-100 text-[11px] flex items-center justify-between">
            <span className="text-slate-500">Total Khasras:</span>
            <span className="font-mono font-bold text-slate-900">248 Parcels</span>
          </div>
        </div>
      </div>

      {/* Statutory Guidance Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs mb-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
          <span>Statutory Legal Notes</span>
        </div>

        <div className="text-[10px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-200 mb-2">
          {currentInfo.clause}
        </div>

        <h4 className="text-xs font-bold text-slate-900 mb-2">
          {currentInfo.title}
        </h4>

        <ul className="space-y-1.5 text-[11px] text-slate-600 leading-snug">
          {currentInfo.points.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <button
            onClick={() => openAiAssistant(`Provide authoritative legal guidance under ${currentInfo.clause} for Form-I requisition filing.`)}
            className="w-full bg-slate-50 hover:bg-slate-100 text-blue-800 border border-slate-200 rounded py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Consult Bhumi Mitra Legal AI</span>
          </button>
        </div>
      </div>

      {/* Real-time Pre-Flight Readiness Checklist */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          STATUTORY READINESS CHECKLIST
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>AA & ES Sanction Order</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700">Attached</span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Section 10 Food Security</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700">1.42% (Pass)</span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Khasra-RoR Sync</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700">248/248 ULPIN</span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>PFMS Escrow Linked</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700">Verified</span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>DSC Token Level-3</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700">Online</span>
          </div>
        </div>
      </div>

    </div>
  );
}
