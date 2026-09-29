import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  FileText, 
  Coins, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Camera,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { useDistrictCollector } from '../context/DistrictCollectorContext.jsx';
import { formatIndianCurrency } from '../services/compensationCalculator.js';

export default function Section12SurveyValuationPage() {
  const {
    surveys,
    handleRecordSection13Damage,
    activeProject,
    setNoticeModalData,
    setIsNoticeModalOpen
  } = useDistrictCollector();

  const [selectedSurveyId, setSelectedSurveyId] = useState(surveys[0]?.id || null);
  const [newItem, setNewItem] = useState('');
  const [newKhasra, setNewKhasra] = useState('142/1A');
  const [newOwner, setNewOwner] = useState('Dattatray Mahadev Patil');
  const [newAmount, setNewAmount] = useState('');

  const selectedSurvey = surveys.find(s => s.id === selectedSurveyId) || surveys[0];

  const handleAddDamage = async (e) => {
    e.preventDefault();
    if (!newItem || !newAmount) return;

    await handleRecordSection13Damage(selectedSurvey.id, {
      item: newItem,
      khasra: newKhasra,
      owner: newOwner,
      tenderedAmount: parseFloat(newAmount),
      paidOnSpot: true,
      receiptNo: `RCPT-SEC13-${Math.floor(1000 + Math.random() * 9000)}`
    });

    setNewItem('');
    setNewAmount('');
  };

  const handleGenerate7DayNotice = () => {
    setNoticeModalData({
      title: 'SECTION 12 STATUTORY ENTRY & SURVEY PRIOR NOTICE',
      refNo: `REV/LAQ/SEC12/${Date.now().toString().slice(-6)}`,
      recipient: 'All Occupiers & Khatedars of Survey Parcels in Village Anjur',
      subject: 'Prior Notice of Entry upon Land for Survey, Soundings & Demarcation under Section 12',
      bodyText: `Notice is hereby given under the proviso to Section 12 of the RFCTLARR Act, 2013 that revenue survey teams,
      engineers, and accredited surveyors shall enter upon the subject land after the expiration of not less than seven (7) days
      from the service of this notice to take levels, conduct sub-soil borings, and set out boundaries. Any damage done during said survey
      shall be assessed and paid at the spot under Section 13.`,
      statutoryClause: 'Section 12 proviso: "Provided that no person shall enter into any building or upon any enclosed court or garden attached to a dwelling-house without the consent of the occupier, without previously giving seven days notice in writing."'
    });
    setIsNoticeModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-[#C5A059] p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-900 text-[#C5A059] font-mono px-2 py-0.5 font-bold uppercase">
              FIELD ENTRY &amp; SOUNDING GATEWAY
            </span>
            <span className="text-xs text-slate-500 font-medium">
              RFCTLARR Sections 12 &amp; 13 • Survey Demarcation &amp; Immediate Damage Tender
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Section 12 &amp; 13 Preliminary Survey &amp; Damage Valuation Desk
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Entry authorization, mandatory 7-day prior notice serving to occupiers, sub-soil sounding logs, and spot compensation tender for standing crop/tree damages under Section 13.
          </p>
        </div>

        <button
          onClick={handleGenerate7DayNotice}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#142642] hover:bg-slate-800 text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#C5A059]" />
          <span>Generate Section 12 (7-Day) Notice</span>
        </button>
      </div>

      {/* Survey Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-3 border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">SURVEY CAMPAIGN</div>
          <div className="font-bold text-slate-900 mt-1 text-sm">{selectedSurvey?.village} Village</div>
          <div className="text-slate-500 text-[11px] mt-0.5">Team Lead: {selectedSurvey?.surveyTeamLead}</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">7-DAY NOTICE STATUS</div>
          <div className="font-bold text-emerald-700 font-mono mt-1 text-sm flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{selectedSurvey?.sevenDayNoticeProof}</span>
          </div>
          <div className="text-slate-500 text-[11px] mt-0.5">Notice Date: {selectedSurvey?.notice7DayServedDate}</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">BOUNDARY PILLARS</div>
          <div className="font-bold text-blue-900 font-mono mt-1 text-sm">
            {selectedSurvey?.boundaryPillarsErected} Pillars Geo-tagged
          </div>
          <div className="text-slate-500 text-[11px] mt-0.5">Drone &amp; Soil Boring Done</div>
        </div>
        <div className="bg-white p-3 border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">SEC 13 TENDER PAID</div>
          <div className="font-bold text-emerald-800 font-mono mt-1 text-sm">
            {formatIndianCurrency(selectedSurvey?.totalSec13TenderPaid)}
          </div>
          <div className="text-slate-500 text-[11px] mt-0.5">Spot Cash / Direct Receipt</div>
        </div>
      </div>

      {/* 2-Column: Damage Items Tender Table & Add Damage Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Damage Tender Logs (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-[#C5A059]" />
              <span>Section 13 Spot Damage Compensation Tender Registry</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 font-bold">
              100% PAID ON SPOT
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Damage Description</th>
                  <th className="p-2.5">Khasra / Gat</th>
                  <th className="p-2.5">Landowner / Occupier</th>
                  <th className="p-2.5 text-right">Tendered Amount</th>
                  <th className="p-2.5 text-right">Receipt Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedSurvey?.damagesIncurred?.map((dmg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-800">{dmg.item}</td>
                    <td className="p-2.5 font-mono text-slate-600">{dmg.khasra}</td>
                    <td className="p-2.5 text-slate-700">{dmg.owner}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-800">
                      {formatIndianCurrency(dmg.tenderedAmount)}
                    </td>
                    <td className="p-2.5 text-right font-mono text-[10px] text-slate-500">
                      {dmg.receiptNo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Spot Damage Tender Form */}
        <div className="bg-white border border-slate-200 shadow-xs p-4 space-y-3">
          <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Record Section 13 Spot Damage Tender
          </div>

          <form onSubmit={handleAddDamage} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Khasra / Survey Number:
              </label>
              <input
                type="text"
                required
                value={newKhasra}
                onChange={(e) => setNewKhasra(e.target.value)}
                className="w-full border border-slate-300 p-1.5 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Landowner / Occupier Name:
              </label>
              <input
                type="text"
                required
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full border border-slate-300 p-1.5 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Damage Description (Crop/Tree/Fence):
              </label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Damage to standing vegetable crop and fencing wire"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="w-full border border-slate-300 p-1.5 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Tendered Compensation Amount (INR):
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 15000"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full border border-slate-300 p-1.5 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
            >
              Issue Spot Tender &amp; Generate Receipt (Sec 13)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
