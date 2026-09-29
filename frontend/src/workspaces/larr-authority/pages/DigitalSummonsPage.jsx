import React, { useState } from 'react';
import { useLarrAuthority } from '../context/LarrAuthorityContext.jsx';
import { 
  Send, 
  Mail, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  QrCode, 
  Download, 
  Printer, 
  ExternalLink, 
  ShieldCheck, 
  UserCheck,
  Calendar,
  Building2
} from 'lucide-react';
import OfficialDocumentViewerModal from '../components/modals/OfficialDocumentViewerModal.jsx';

export default function DigitalSummonsPage() {
  const { selectedCase, showToast, permissions } = useLarrAuthority();

  const [isSummonsPdfOpen, setIsSummonsPdfOpen] = useState(false);
  const [isCertPdfOpen, setIsCertPdfOpen] = useState(false);
  const [selectedPartyCert, setSelectedPartyCert] = useState(null);

  // Multi-party recipients for active case (Section 12: Collector, Requiring Body, Claimant, Landowner, R&R Administrator, Other)
  const [parties, setParties] = useState([
    {
      partyId: 'PTY-001',
      name: selectedCase?.claimantName || 'Rameshwar Laljibhai Patel',
      role: 'Claimant / Landowner',
      partyType: 'Claimant / Interested Person',
      designation: 'Principal Landholder',
      organization: 'Individual / Agriculturalist',
      citizenId: 'AADHAAR: XXXX-XXXX-4812',
      address: selectedCase?.claimantAddress || 'Station Road, Petlad, Anand - 388450',
      email: 'rameshwar.patel@gmail.com',
      mobile: '+91 98250 84910',
      serviceMode: 'Speed Post + Citizen Portal Push',
      trackingNumber: 'EG884129188IN',
      serviceStatus: 'Delivered',
      servedOn: '28/04/2026',
      acknowledgmentHash: 'ACK-POS-IND-2026-9921'
    },
    {
      partyId: 'PTY-002',
      name: selectedCase?.collectorName || 'Collector & District Magistrate, Anand',
      role: 'Respondent No. 1 (Collector)',
      partyType: 'Statutory Acquisition Authority',
      designation: 'Collector & DM, Anand',
      organization: 'Government of Gujarat',
      citizenId: 'OFFICER-CADRE-IAS-GJ-2012',
      address: 'Collectorate Complex, Anand - 388001',
      email: 'collector-anand@gujarat.gov.in',
      mobile: '+91 2692 261200',
      serviceMode: 'Official e-Office Intranet + Email',
      trackingNumber: 'EOFF-GUJ-2026-4491',
      serviceStatus: 'Acknowledged',
      servedOn: '25/04/2026',
      acknowledgmentHash: 'ACK-EOFF-GUJ-2026-8812'
    },
    {
      partyId: 'PTY-003',
      name: selectedCase?.requiringBody || 'Ministry of Railways / Western Railway (Vadodara Division)',
      role: 'Respondent No. 2 (Requiring Body)',
      partyType: 'Requiring Body / Project Proponent',
      designation: 'Chief Engineer (Construction)',
      organization: 'Ministry of Railways',
      citizenId: 'ORG-RAIL-WR-VAD-01',
      address: 'Divisional Railway Manager Office, Pratapnagar, Vadodara - 390004',
      email: 'cecon-wr@wr.railnet.gov.in',
      mobile: '+91 265 2410881',
      serviceMode: 'Speed Post + Dedicated Railway Portal',
      trackingNumber: 'EG884129191IN',
      serviceStatus: 'Delivered',
      servedOn: '29/04/2026',
      acknowledgmentHash: 'ACK-POS-IND-2026-9924'
    },
    {
      partyId: 'PTY-004',
      name: 'R&R Administrator, Anand & Petlad Sub-Division',
      role: 'Statutory Authority (Section 43)',
      partyType: 'R&R Administrator',
      designation: 'Prant Officer & SDM Petlad',
      organization: 'Revenue Department, Gujarat',
      citizenId: 'OFFICER-GAS-2016-88',
      address: 'Prant Officer & SDM Office, Petlad, Anand - 388450',
      email: 'sdm-petlad@gujarat.gov.in',
      mobile: '+91 2697 222100',
      serviceMode: 'e-Office Dispatch',
      trackingNumber: 'EOFF-GUJ-2026-4495',
      serviceStatus: 'Acknowledged',
      servedOn: '26/04/2026',
      acknowledgmentHash: 'ACK-EOFF-GUJ-2026-8833'
    }
  ]);

  const [summonsForm, setSummonsForm] = useState({
    caseId: selectedCase?.caseId || 'LARR/2026/GJ/001',
    courtName: selectedCase?.courtName || 'LARR Authority Central Gujarat Bench, Anand',
    presidingOfficer: selectedCase?.presidingOfficer || 'Hon\'ble Presiding Officer',
    hearingDate: '12/10/2026',
    hearingTime: '10:30 AM',
    venue: 'Court Hall No. 1, LARR Authority Bench, District Court Annex, Anand',
    purpose: 'Filing of Written Statement, Counter-Affidavit, and Examination of Expert Valuation Documents',
    documentsRequired: 'Certified copy of Jantar circle rate notifications, original registered exemplar sale deeds, and survey map',
    complianceDate: '08/10/2026',
    virtualLink: 'https://vcourt.gov.in/meet/larr-anand-001'
  });

  const handleGenerateSummons = () => {
    setIsSummonsPdfOpen(true);
    showToast('Digitally Signed Judicial Summons PDF generated with QR Code & Case Hash!', 'success');
  };

  const handleOpenCert = (party) => {
    setSelectedPartyCert(party);
    setIsCertPdfOpen(true);
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold border border-amber-300">
              REGISTRY PROCESS SERVICE
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#1B365D]">
              Digital Summons &amp; Multi-Party Notice Desk
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Automated issuance and electronic service tracking of judicial summons under the Code of Civil Procedure (Order V) and RFCTLARR Act 2013 across Collector, Requiring Body, Claimants, and R&R Administrator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateSummons}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B365D] hover:bg-[#0F2342] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Generate Digitally Signed Summons</span>
          </button>
        </div>
      </div>

      {/* 2. Multi-Party Service Status Grid (Section 12: Party Name, Party Type, Designation, Organization, Address, Email, Mobile, Citizen ID, Preferred Service Mode, Service Status) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
              Process Server &amp; Multi-Party Tracking Grid ({parties.length} Designated Parties)
            </h3>
            <p className="text-[11px] text-slate-500">
              Case Context: <strong className="font-mono text-[#1B365D]">{selectedCase?.caseId}</strong> • ULPIN: <strong className="font-mono text-blue-700">{selectedCase?.ulpin}</strong>
            </p>
          </div>
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 font-bold">
            100% SERVICE VERIFIED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#1B365D] text-white uppercase text-[10px] font-mono">
              <tr>
                <th className="p-2.5">Party &amp; Capacity</th>
                <th className="p-2.5">Type &amp; Designation</th>
                <th className="p-2.5">Official Address &amp; Citizen ID</th>
                <th className="p-2.5">Service Mode</th>
                <th className="p-2.5">Tracking / Dispatch Ref</th>
                <th className="p-2.5">Service Status</th>
                <th className="p-2.5">Served Date</th>
                <th className="p-2.5 text-center">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parties.map((p) => (
                <tr key={p.partyId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-2.5">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[10px] text-[#1B365D] font-semibold">{p.role}</div>
                  </td>

                  <td className="p-2.5 text-[11px] text-slate-700">
                    <div className="font-semibold text-slate-800">{p.partyType}</div>
                    <div className="text-[10px] text-slate-500">{p.designation} • {p.organization}</div>
                  </td>

                  <td className="p-2.5 max-w-xs">
                    <div className="text-slate-700 truncate" title={p.address}>{p.address}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.citizenId} • {p.email}</div>
                  </td>

                  <td className="p-2.5 text-[11px] font-medium text-slate-800">
                    {p.serviceMode}
                  </td>

                  <td className="p-2.5 font-mono text-[11px] text-blue-700 font-bold">
                    {p.trackingNumber}
                  </td>

                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {p.serviceStatus}
                    </span>
                  </td>

                  <td className="p-2.5 font-mono text-[11px] text-slate-700">
                    {p.servedOn}
                  </td>

                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => handleOpenCert(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[10px] rounded border border-slate-300 font-bold cursor-pointer transition-colors"
                    >
                      View Cert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Judicial Summons Generator Panel (Section 12 Fields) */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
              STATUTORY SUMMONS GENERATOR (SECTION 12)
            </div>
            <h3 className="font-extrabold text-[#1B365D] text-sm">
              Notice of Reference Hearing under Section 64 (Form-IX / Judicial Summons)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Armed with National Judicial Digital Stamp &amp; QR
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Scheduled Hearing Date &amp; Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={summonsForm.hearingDate}
                  onChange={(e) => setSummonsForm({ ...summonsForm, hearingDate: e.target.value })}
                  className="p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
                <input
                  type="text"
                  value={summonsForm.hearingTime}
                  onChange={(e) => setSummonsForm({ ...summonsForm, hearingTime: e.target.value })}
                  className="p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Hearing Venue &amp; Court Hall
              </label>
              <input
                type="text"
                value={summonsForm.venue}
                onChange={(e) => setSummonsForm({ ...summonsForm, venue: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Virtual Courtroom Link (e-Courts Phase-III)
              </label>
              <input
                type="text"
                value={summonsForm.virtualLink}
                onChange={(e) => setSummonsForm({ ...summonsForm, virtualLink: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono text-blue-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Purpose of Judicial Summons
              </label>
              <textarea
                rows={2}
                value={summonsForm.purpose}
                onChange={(e) => setSummonsForm({ ...summonsForm, purpose: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Documents Required from Parties
              </label>
              <textarea
                rows={2}
                value={summonsForm.documentsRequired}
                onChange={(e) => setSummonsForm({ ...summonsForm, documentsRequired: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Statutory Compliance Deadline Date
              </label>
              <input
                type="text"
                value={summonsForm.complianceDate}
                onChange={(e) => setSummonsForm({ ...summonsForm, complianceDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 font-mono"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-600 text-[11px] font-mono">
            <QrCode className="w-4 h-4 text-slate-700" />
            <span>Encrypted QR Code will encode Case ID {selectedCase?.caseId} and summons hash</span>
          </div>

          <button
            onClick={handleGenerateSummons}
            className="px-4 py-2 bg-[#1B365D] hover:bg-[#0F2342] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
          >
            Preview Digitally Signed Judicial Summons
          </button>
        </div>

      </div>

      {/* Digitally Signed Summons PDF Modal (Section 12) */}
      <OfficialDocumentViewerModal
        isOpen={isSummonsPdfOpen}
        onClose={() => setIsSummonsPdfOpen(false)}
        title={`Judicial Summons — Case ${selectedCase?.caseId}`}
        documentType="JUDICIAL_SUMMONS"
        caseData={selectedCase}
        metadata={{
          docId: `SUMMONS-LARR-2026-${selectedCase?.caseId?.replace(/\//g, '-')}`,
          date: new Date().toLocaleDateString('en-GB')
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-slate-900 uppercase underline text-sm">
              SUMMONS TO PARTIES IN LAND ACQUISITION REFERENCE (FORM-IX / ORDER V CPC)
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
              <div><strong>HEARING DATE:</strong> {summonsForm.hearingDate} AT {summonsForm.hearingTime}</div>
              <div><strong>VENUE:</strong> {summonsForm.venue}</div>
              <div><strong>VIRTUAL LINK:</strong> {summonsForm.virtualLink}</div>
              <div><strong>COMPLIANCE DEADLINE:</strong> {summonsForm.complianceDate}</div>
            </div>
            <p className="text-justify">
              <strong>WHEREAS</strong> a statutory reference has been received under Section 64 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 from the Collector, Anand regarding acquisition of Survey No. <strong>{selectedCase?.surveyNumber}</strong> (ULPIN: <strong>{selectedCase?.ulpin}</strong>) for the project <em>"{selectedCase?.projectName}"</em>.
            </p>
            <p className="text-justify">
              <strong>YOU ARE HEREBY SUMMONED</strong> to appear before this Authority in person or by a pleader duly instructed and able to answer all material questions relating to the reference on the <strong>{summonsForm.hearingDate} at {summonsForm.hearingTime}</strong>.
            </p>
            <p className="text-justify">
              <strong>TAKE FURTHER NOTICE</strong> that you are required to produce on the said date: <em>{summonsForm.documentsRequired}</em>. In default of your appearance, the reference will be heard and determined in your absence ex-parte.
            </p>
          </div>
        }
      />

      {/* Service Verification Certificate Modal (Section 12) */}
      <OfficialDocumentViewerModal
        isOpen={isCertPdfOpen}
        onClose={() => setIsCertPdfOpen(false)}
        title={`Service Verification Certificate — ${selectedPartyCert?.name}`}
        documentType="SERVICE_CERTIFICATE"
        caseData={selectedCase}
        metadata={{
          docId: selectedPartyCert?.acknowledgmentHash || 'CERT-SRV-2026-001',
          date: selectedPartyCert?.servedOn || '28/04/2026'
        }}
        customContent={
          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <h4 className="font-bold text-center text-emerald-900 uppercase underline text-sm">
              CERTIFICATE OF EFFECTED PROCESS SERVICE UNDER CIVIL PROCEDURE CODE
            </h4>
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded font-mono text-[11px] space-y-1 text-emerald-950">
              <div><strong>PARTY SERVED:</strong> {selectedPartyCert?.name} ({selectedPartyCert?.role})</div>
              <div><strong>ADDRESS:</strong> {selectedPartyCert?.address}</div>
              <div><strong>DISPATCH MODE:</strong> {selectedPartyCert?.serviceMode}</div>
              <div><strong>TRACKING IDENTIFIER:</strong> {selectedPartyCert?.trackingNumber}</div>
              <div><strong>DATE OF DELIVERY:</strong> {selectedPartyCert?.servedOn}</div>
              <div><strong>SERVICE STATUS:</strong> {selectedPartyCert?.serviceStatus} (PROVED)</div>
            </div>
            <p className="text-justify">
              I, the Process Server / Bailiff / e-Service Registrar of the LARR Authority, hereby certify that the judicial summons in Reference Case No. <strong>{selectedCase?.caseId}</strong> was duly transmitted, tendered, and delivered to the aforesaid party in accordance with the provisions of Order V of the Code of Civil Procedure, 1908 and statutory rules framed under Act No. 30 of 2013.
            </p>
          </div>
        }
      />

    </div>
  );
}
