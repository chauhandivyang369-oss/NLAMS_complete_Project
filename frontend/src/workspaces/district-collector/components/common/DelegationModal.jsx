import React, { useState } from 'react';
import { X, ShieldCheck, UserPlus } from 'lucide-react';
import { useDistrictCollector } from '../../context/DistrictCollectorContext.jsx';

export default function DelegationModal() {
  const {
    isDelegationModalOpen,
    setIsDelegationModalOpen,
    handleCreateDelegation,
    activeDistrict,
    activeProject
  } = useDistrictCollector();

  const [officerName, setOfficerName] = useState('');
  const [designation, setDesignation] = useState('Sub-Divisional Magistrate (SDM)');
  const [talukasAssigned, setTalukasAssigned] = useState('');
  const [selectedPowers, setSelectedPowers] = useState([
    'Section 12 Entry, Survey & Soil Soundings',
    'Section 13 Spot Damage Valuation Tender',
    'Section 15 Personal Hearing Recording'
  ]);

  if (!isDelegationModalOpen) return null;

  const powersOptions = [
    'Section 12 Entry, Survey & Soil Soundings',
    'Section 13 Spot Damage Valuation Tender',
    'Section 15 Personal Hearing Recording',
    'Section 21 Public Notice Issuance',
    'Section 23 Award Formulation',
    'Section 38 Taking Possession of Land',
    'Revenue Record Mutation Endorsement'
  ];

  const togglePower = (power) => {
    if (selectedPowers.includes(power)) {
      setSelectedPowers(selectedPowers.filter(p => p !== power));
    } else {
      setSelectedPowers([...selectedPowers, power]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officerName.trim()) return;

    handleCreateDelegation({
      authorizedOfficer: officerName,
      designation,
      assignedProject: activeProject?.name || 'All District Corridors',
      talukasAssigned: talukasAssigned.split(',').map(t => t.trim()).filter(Boolean),
      statutoryScope: selectedPowers
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-lg shadow-2xl border border-slate-300 flex flex-col">
        {/* Top Header */}
        <div className="bg-[#142642] text-white p-3 border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-bold text-sm tracking-wide">
              ISSUE STATUTORY SUB-DELEGATION ORDER (SECTION 3(g))
            </h3>
          </div>
          <button
            onClick={() => setIsDelegationModalOpen(false)}
            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs text-slate-800">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Authorized Officer Name:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smt. Neha Sharma, Dy. Collector"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="w-full border border-slate-300 p-2 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Designation / Cadre:
            </label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full border border-slate-300 p-2 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="Sub-Divisional Magistrate (SDM)">Sub-Divisional Magistrate (SDM / SDO)</option>
              <option value="Special Land Acquisition Officer (SLO)">Special Land Acquisition Officer (SLO / CALA)</option>
              <option value="Tahsildar & Executive Magistrate">Tahsildar &amp; Executive Magistrate</option>
              <option value="Deputy Collector (Land Acquisition)">Deputy Collector (Land Acquisition)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Assigned Talukas (comma separated):
            </label>
            <input
              type="text"
              placeholder="e.g. Bhiwandi, Kalyan"
              value={talukasAssigned}
              onChange={(e) => setTalukasAssigned(e.target.value)}
              className="w-full border border-slate-300 p-2 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Statutory Delegated Powers (RFCTLARR Sections):
            </label>
            <div className="space-y-1.5 border border-slate-200 p-2 max-h-36 overflow-y-auto bg-slate-50">
              {powersOptions.map((power) => (
                <label key={power} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedPowers.includes(power)}
                    onChange={() => togglePower(power)}
                    className="cursor-pointer"
                  />
                  <span>{power}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed">
            <span className="font-bold">Statutory Note:</span> Under Section 3(g) of the RFCTLARR Act 2013, the District Collector
            may designate any officer not below the rank of Deputy Collector / Tahsildar to perform the functions of Collector.
            All orders passed by delegatee remain subject to Collector oversight.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDelegationModalOpen(false)}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#C5A059] hover:bg-[#b5924d] text-slate-950 font-bold shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Issue Delegation Order with DSC</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
