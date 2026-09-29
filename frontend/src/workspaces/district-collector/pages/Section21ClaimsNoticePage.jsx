import React, { useState } from 'react';
import { 
  Megaphone, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Send, 
  ShieldCheck,
  Search,
  Printer
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';

export default function Section21ClaimsNoticePage() {
  const {
    claims,
    handleVerifyClaim,
    activeProject,
    setNoticeModalData,
    setIsNoticeModalOpen
  } = useDistrictCollector();

  const [selectedClaimId, setSelectedClaimId] = useState(claims[0]?.id || null);
  const selectedClaim = claims.find(c => c.id === selectedClaimId) || claims[0];

  const handlePublishSec21Notice = () => {
    setNoticeModalData({
      title: 'SECTION 21 PUBLIC NOTICE CALLING FOR CLAIMS',
      refNo: `REV/LAQ/SEC21/${Date.now().toString().slice(-6)}`,
      recipient: 'All Persons Interested in Lands to be Acquired in Project ' + (activeProject?.name || ''),
      subject: 'Public Notice under Section 21(1) calling for claims to compensation and R&R',
      bodyText: `Notice is hereby given that the Government intends to take possession of the lands specified in the declaration under Section 19.
      All persons interested in the said lands are hereby invited to state the nature of their respective interests in the land,
      and the amount and particulars of their claims to compensation for such interests, their claims to rehabilitation and resettlement,
      and their objections (if any) to the measurements made under Section 20.
      All claims must be presented in person or by agent to the undersigned within thirty (30) days from this notice.`,
      statutoryClause: 'Section 21(2): "Such notice shall state the particulars of the land so needed, and shall require all persons interested in the land to appear personally or by agent or advocate before the Collector at a time and place therein mentioned (such time not being earlier than thirty days and not later than six months after the date of publication of the notice)."'
    });
    setIsNoticeModalOpen(true);
  };

  const handleIssueSec22Notice = () => {
    if (!selectedClaim) return;
    setNoticeModalData({
      title: 'SECTION 22 STATUTORY REQUISITION FOR STATEMENT OF INTEREST',
      refNo: `REV/LAQ/SEC22/${selectedClaim.surveyNumber}`,
      recipient: `${selectedClaim.khatedarName} (${selectedClaim.surveyNumber})`,
      subject: 'Requisition to deliver statement of co-sharers, mortgagees, leases & encumbrances',
      bodyText: `Under the powers vested in the Collector under Section 22 of the RFCTLARR Act, 2013, you are hereby required to deliver
      to the undersigned within fifteen (15) days a statement in writing containing the name of every other person possessing any interest
      in the said land or any part thereof as co-proprietor, sub-proprietor, mortgagee, tenant or otherwise, and of the nature of such interest,
      and of the rents and profits (if any), received or receivable on account thereof for three years next preceding the date of the statement.`,
      statutoryClause: 'Section 22(2): "Every person required to make or deliver a statement under this section shall be deemed to be legally bound to do so within the meaning of section 175 and section 176 of the Indian Penal Code."'
    });
    setIsNoticeModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              CLAIMS INTAKE &amp; STATUTORY NOTICE
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sections 21 &amp; 22 RFCTLARR Act • Public Notice Calling for Claims &amp; Statements of Interest
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Section 21 Public Claims Notice &amp; Section 22 Statements of Interest Desk
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Publish Section 21 notices across 5 statutory channels, examine 30-day claims for compensation, requisition co-sharer/mortgagee statements under Section 22, and verify land title deeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePublishSec21Notice}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Publish Section 21 Public Notice</span>
          </button>
        </div>
      </div>

      {/* 2-Column: Claims List & Claim Scrutiny Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims Intake List */}
        <div className="bg-white border border-slate-200 shadow-xs p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            RECEIVED CLAIMS ({claims.length})
          </div>

          <div className="space-y-2">
            {claims.map((clm) => (
              <button
                key={clm.id}
                onClick={() => setSelectedClaimId(clm.id)}
                className={`w-full text-left p-3 border transition-all cursor-pointer ${
                  selectedClaim?.id === clm.id
                    ? 'border-[#C5A059] bg-slate-50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono font-bold text-slate-500">{clm.id}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 ${
                      clm.scrutinyStatus === 'VERIFIED_OK'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {clm.scrutinyStatus === 'VERIFIED_OK' ? 'VERIFIED' : 'ACTION REQ.'}
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs mt-1">
                  {clm.khatedarName}
                </div>
                <div className="text-[11px] text-slate-600">
                  Survey: {clm.surveyNumber} • {clm.village}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100 font-mono">
                  <span>Claimed: {clm.claimedAreaHa} Ha</span>
                  <span>Date: {clm.claimDate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Claim Scrutiny & Section 22 Requisition Desk */}
        {selectedClaim && (
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">CLAIM DOSSIER</span>
                  <h2 className="font-bold text-slate-900 text-sm">{selectedClaim.id}: {selectedClaim.khatedarName}</h2>
                </div>
                <button
                  onClick={handleIssueSec22Notice}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Issue Sec 22 Requisition</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">SURVEY NUMBER</div>
                  <div className="font-bold text-slate-900 font-mono">{selectedClaim.surveyNumber}</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">CLAIMED AREA</div>
                  <div className="font-bold text-slate-900 font-mono">{selectedClaim.claimedAreaHa} Ha</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">TENURE TYPE</div>
                  <div className="font-bold text-slate-900">{selectedClaim.tenureType}</div>
                </div>
              </div>

              {/* Assets & Encumbrances */}
              <div className="p-3 bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 uppercase text-[10px]">Attached Assets Claimed:</div>
                <div className="text-slate-700 font-mono text-[11px]">
                  {JSON.stringify(selectedClaim.assetsClaimed, null, 2)}
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Mortgage / Encumbrance Disclosed:</span>{' '}
                  <span className="text-rose-700 font-medium font-mono">{selectedClaim.mortgageeOrTenantClaim}</span>
                </div>
              </div>

              {/* Title Documents Attached */}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-800 uppercase text-[10px]">Furnished Statutory Documents:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClaim.documentsFurnished?.map((doc, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-1 border border-slate-300 font-mono text-[10px]">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scrutiny Decision */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Current Status: <span className="font-bold text-slate-800 font-mono">{selectedClaim.scrutinyStatus}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerifyClaim(selectedClaim.id, 'BANK_NOC_REQUIRED_BEFORE_DISBURSEMENT', 'Bank lien verification required')}
                    className="px-3 py-1.5 bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-semibold cursor-pointer"
                  >
                    Flag Encumbrance / Bank NOC Required
                  </button>
                  <button
                    onClick={() => handleVerifyClaim(selectedClaim.id, 'VERIFIED_OK', 'Title and claim validated')}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                  >
                    Approve Claim &amp; Send to Award Roll
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
