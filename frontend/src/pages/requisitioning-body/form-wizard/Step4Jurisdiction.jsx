import React from 'react';
import { 
  MapPin, 
  Building, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Globe, 
  Layers, 
  Star, 
  Plus, 
  Trash2,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { 
  INDIAN_STATES, 
  DISTRICTS_BY_STATE, 
  VILLAGES_BY_DISTRICT 
} from '../../../services/referenceDataService.js';

export default function Step4Jurisdiction({ formData, updateFormData, errors }) {
  const jurisdictionLevel = formData.jurisdictionLevel || 'SINGLE_DISTRICT';
  
  // Selected states list for multi-state
  const selectedStates = formData.selectedStates && formData.selectedStates.length > 0 
    ? formData.selectedStates 
    : [formData.selectedState || 'Gujarat'];

  // Map of selected districts grouped by state
  // e.g. { Gujarat: ['Anand', 'Vadodara'], Maharashtra: ['Pune', 'Thane'] }
  const selectedDistrictsByState = formData.selectedDistrictsByState || {
    [formData.selectedState || 'Gujarat']: formData.selectedDistricts || ['Anand']
  };

  // Helper to recompute unified selectedDistricts and districtAuthorities
  const syncStateAndAuthorities = (newJurisdictionLevel, newSelectedStates, newDistByState, leadDistrictCode) => {
    let allDistricts = [];
    let allAuthorities = [];

    if (newJurisdictionLevel === 'SINGLE_DISTRICT') {
      const primaryState = newSelectedStates[0] || 'Gujarat';
      const stateDistricts = newDistByState[primaryState] || [];
      const singleDist = stateDistricts[0] || DISTRICTS_BY_STATE[primaryState]?.[0]?.name || 'Anand';
      const distInfo = (DISTRICTS_BY_STATE[primaryState] || []).find(d => d.name === singleDist);
      
      allDistricts = [singleDist];
      if (distInfo) {
        allAuthorities = [{
          state: primaryState,
          district: distInfo.name,
          districtCode: distInfo.code,
          calaOffice: distInfo.calaOffice,
          calaOfficer: distInfo.calaOfficer,
          email: distInfo.email,
          phone: distInfo.phone,
          address: distInfo.address,
          status: 'Lead CALA Collectorate',
          isLead: true
        }];
      }

      updateFormData({
        jurisdictionLevel: newJurisdictionLevel,
        selectedState: primaryState,
        selectedStates: [primaryState],
        selectedDistricts: allDistricts,
        selectedDistrictsByState: { [primaryState]: allDistricts },
        districtAuthorities: allAuthorities
      });
      return;
    }

    if (newJurisdictionLevel === 'MULTI_DISTRICT') {
      const primaryState = newSelectedStates[0] || formData.selectedState || 'Gujarat';
      const targetDistricts = newDistByState[primaryState] || formData.selectedDistricts || [];
      
      allDistricts = targetDistricts;
      const stateDists = DISTRICTS_BY_STATE[primaryState] || [];
      
      allAuthorities = targetDistricts.map((dName, idx) => {
        const info = stateDists.find(d => d.name === dName) || {
          name: dName,
          code: `${primaryState.slice(0, 2).toUpperCase()}-${dName.slice(0, 3).toUpperCase()}`,
          calaOffice: `Collector & CALA, Collectorate ${dName}`,
          calaOfficer: `District Magistrate, IAS`,
          email: `collector-${dName.toLowerCase().replace(/\s+/g, '')}@nic.in`,
          phone: '+91-XX-XXXXXXX',
          address: `District Collectorate Campus, ${dName}`
        };
        const isLead = leadDistrictCode ? info.code === leadDistrictCode : idx === 0;
        return {
          state: primaryState,
          district: info.name,
          districtCode: info.code,
          calaOffice: info.calaOffice,
          calaOfficer: info.calaOfficer,
          email: info.email,
          phone: info.phone,
          address: info.address,
          status: isLead ? 'Lead CALA Collectorate' : 'Participating CALA',
          isLead
        };
      });

      updateFormData({
        jurisdictionLevel: newJurisdictionLevel,
        selectedState: primaryState,
        selectedStates: [primaryState],
        selectedDistricts: allDistricts,
        selectedDistrictsByState: { [primaryState]: allDistricts },
        districtAuthorities: allAuthorities
      });
      return;
    }

    // MULTI_STATE
    newSelectedStates.forEach((st, stIdx) => {
      const distsForState = newDistByState[st] || [];
      allDistricts.push(...distsForState);
      const stateDists = DISTRICTS_BY_STATE[st] || [];

      distsForState.forEach((dName) => {
        const info = stateDists.find(d => d.name === dName) || {
          name: dName,
          code: `${st.slice(0, 2).toUpperCase()}-${dName.slice(0, 3).toUpperCase()}`,
          calaOffice: `Collector & CALA, Collectorate ${dName}`,
          calaOfficer: `District Magistrate, IAS`,
          email: `collector-${dName.toLowerCase().replace(/\s+/g, '')}@nic.in`,
          phone: '+91-XX-XXXXXXX',
          address: `District Collectorate, ${dName}, ${st}`
        };
        
        const isLead = leadDistrictCode 
          ? info.code === leadDistrictCode 
          : allAuthorities.length === 0;

        allAuthorities.push({
          state: st,
          district: info.name,
          districtCode: info.code,
          calaOffice: info.calaOffice,
          calaOfficer: info.calaOfficer,
          email: info.email,
          phone: info.phone,
          address: info.address,
          status: isLead ? 'Lead CALA (Inter-State Lead)' : 'State Participating CALA',
          isLead
        });
      });
    });

    updateFormData({
      jurisdictionLevel: newJurisdictionLevel,
      selectedState: newSelectedStates[0] || 'Gujarat',
      selectedStates: newSelectedStates,
      selectedDistricts: allDistricts,
      selectedDistrictsByState: newDistByState,
      districtAuthorities: allAuthorities
    });
  };

  const handleJurisdictionLevelChange = (level) => {
    let newStates = [...selectedStates];
    let newDistByState = { ...selectedDistrictsByState };

    if (level === 'SINGLE_DISTRICT') {
      const primaryState = newStates[0] || 'Gujarat';
      const firstDist = DISTRICTS_BY_STATE[primaryState]?.[0]?.name || 'Anand';
      newStates = [primaryState];
      newDistByState = { [primaryState]: [firstDist] };
    } else if (level === 'MULTI_DISTRICT') {
      const primaryState = newStates[0] || 'Gujarat';
      const existing = newDistByState[primaryState] || [];
      const firstDists = existing.length > 0 
        ? existing 
        : (DISTRICTS_BY_STATE[primaryState]?.slice(0, 2).map(d => d.name) || ['Anand']);
      newStates = [primaryState];
      newDistByState = { [primaryState]: firstDists };
    } else if (level === 'MULTI_STATE') {
      if (newStates.length < 2) {
        newStates = ['Gujarat', 'Maharashtra'];
      }
      // Ensure each selected state has initial districts
      newStates.forEach(st => {
        if (!newDistByState[st] || newDistByState[st].length === 0) {
          const defaultDists = (DISTRICTS_BY_STATE[st] || []).slice(0, 2).map(d => d.name);
          newDistByState[st] = defaultDists.length > 0 ? defaultDists : [];
        }
      });
    }

    syncStateAndAuthorities(level, newStates, newDistByState);
  };

  // Toggle state in Multi-State mode
  const handleToggleStateInMultiState = (st) => {
    let updatedStates = [...selectedStates];
    let updatedDistByState = { ...selectedDistrictsByState };

    if (updatedStates.includes(st)) {
      if (updatedStates.length <= 1) {
        alert('At least one state must remain selected in multi-state mode.');
        return;
      }
      updatedStates = updatedStates.filter(s => s !== st);
      delete updatedDistByState[st];
    } else {
      updatedStates.push(st);
      const defaultDists = (DISTRICTS_BY_STATE[st] || []).slice(0, 2).map(d => d.name);
      updatedDistByState[st] = defaultDists;
    }

    syncStateAndAuthorities('MULTI_STATE', updatedStates, updatedDistByState);
  };

  // Toggle district for a specific state
  const handleToggleDistrictForState = (st, distName) => {
    let updatedDistByState = { ...selectedDistrictsByState };
    let currentDists = updatedDistByState[st] ? [...updatedDistByState[st]] : [];

    if (jurisdictionLevel === 'SINGLE_DISTRICT') {
      updatedDistByState = { [st]: [distName] };
      syncStateAndAuthorities('SINGLE_DISTRICT', [st], updatedDistByState);
      return;
    }

    if (currentDists.includes(distName)) {
      currentDists = currentDists.filter(d => d !== distName);
    } else {
      currentDists.push(distName);
    }

    updatedDistByState[st] = currentDists;
    syncStateAndAuthorities(jurisdictionLevel, selectedStates, updatedDistByState);
  };

  // Select all districts for a state
  const handleSelectAllDistrictsForState = (st) => {
    const allDists = (DISTRICTS_BY_STATE[st] || []).map(d => d.name);
    const updatedDistByState = {
      ...selectedDistrictsByState,
      [st]: allDists
    };
    syncStateAndAuthorities(jurisdictionLevel, selectedStates, updatedDistByState);
  };

  // Clear all districts for a state
  const handleClearDistrictsForState = (st) => {
    const updatedDistByState = {
      ...selectedDistrictsByState,
      [st]: []
    };
    syncStateAndAuthorities(jurisdictionLevel, selectedStates, updatedDistByState);
  };

  // Set lead CALA
  const handleSetLeadCala = (districtCode) => {
    syncStateAndAuthorities(jurisdictionLevel, selectedStates, selectedDistrictsByState, districtCode);
  };

  // Handle single state change in single/multi district mode
  const handleSingleStateChange = (newSt) => {
    const newDistricts = (DISTRICTS_BY_STATE[newSt] || []).slice(0, 1).map(d => d.name);
    const updatedDistByState = { [newSt]: newDistricts };
    syncStateAndAuthorities(jurisdictionLevel, [newSt], updatedDistByState);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-700" />
          Step 4: Jurisdiction & Collectorate Alignment
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Map statutory revenue jurisdiction across single or multiple states/districts, and route cadastral dockets to authorized District Collectors (CALA).
        </p>
      </div>

      {/* 1. Jurisdiction Level Selection */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Jurisdictional Geographic Scope <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { 
              id: 'SINGLE_DISTRICT', 
              title: 'Single District Project', 
              desc: 'Corridor and all cadastral parcels fall strictly within one revenue district jurisdiction.' 
            },
            { 
              id: 'MULTI_DISTRICT', 
              title: 'Multi-District Project', 
              desc: 'Linear corridor traverses multiple revenue districts within a single State.' 
            },
            { 
              id: 'MULTI_STATE', 
              title: 'Multi-State / Inter-State Corridor', 
              desc: 'National infrastructure (Expressway / Freight Rail) spanning across multiple State jurisdictions.' 
            }
          ].map(lvl => {
            const isSelected = jurisdictionLevel === lvl.id;
            return (
              <label
                key={lvl.id}
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {lvl.id === 'MULTI_STATE' && <Globe className="w-3.5 h-3.5 text-blue-700" />}
                    {lvl.id === 'MULTI_DISTRICT' && <Layers className="w-3.5 h-3.5 text-blue-700" />}
                    {lvl.id === 'SINGLE_DISTRICT' && <MapPin className="w-3.5 h-3.5 text-blue-700" />}
                    {lvl.title}
                  </span>
                  <input
                    type="radio"
                    name="jurisdictionLevel"
                    value={lvl.id}
                    checked={isSelected}
                    onChange={() => handleJurisdictionLevelChange(lvl.id)}
                    className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <span className="text-[11px] text-slate-500 leading-snug">{lvl.desc}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. MULTI-STATE SELECTOR INTERFACE */}
      {jurisdictionLevel === 'MULTI_STATE' && (
        <div className="bg-white border-2 border-blue-200 rounded-lg p-4 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-700" />
                Select Traversed States / Union Territories ({selectedStates.length} Selected)
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click to add or remove states traversed by the inter-state corridor:
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-800 font-semibold bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              <span>Selected States:</span>
              <span className="font-bold">{selectedStates.join(', ')}</span>
            </div>
          </div>

          {/* State Badges Grid */}
          <div className="flex flex-wrap gap-2">
            {INDIAN_STATES.slice(0, 10).map(st => {
              const isSelected = selectedStates.includes(st);
              const districtCount = (selectedDistrictsByState[st] || []).length;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleToggleStateInMultiState(st)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold">{st}</span>
                  {isSelected && (
                    <span className="bg-blue-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                      {districtCount} Dist
                    </span>
                  )}
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />}
                </button>
              );
            })}
          </div>

          {/* State-wise District Selectors */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-blue-700" />
              State-Wise Revenue Districts Selection
            </div>

            {selectedStates.map((st) => {
              const availableDistricts = DISTRICTS_BY_STATE[st] || [];
              const selectedInThisState = selectedDistrictsByState[st] || [];

              return (
                <div key={st} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-white tracking-wider uppercase">
                        State
                      </span>
                      <span className="text-xs font-bold text-slate-900">{st}</span>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        {selectedInThisState.length} of {availableDistricts.length} Districts Selected
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleSelectAllDistrictsForState(st)}
                        className="text-blue-700 hover:underline font-semibold"
                      >
                        Select All
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleClearDistrictsForState(st)}
                        className="text-slate-500 hover:text-red-600 font-semibold"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* District Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableDistricts.map(dist => {
                      const isChecked = selectedInThisState.includes(dist.name);
                      return (
                        <button
                          key={dist.name}
                          type="button"
                          onClick={() => handleToggleDistrictForState(st, dist.name)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-all ${
                            isChecked
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span>{dist.name}</span>
                          <span className={`text-[10px] font-mono ${isChecked ? 'text-blue-200' : 'text-slate-400'}`}>
                            ({dist.code})
                          </span>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedInThisState.length === 0 && (
                    <p className="text-[11px] text-amber-700 italic">
                      ⚠️ No districts selected in {st}. Please select at least one district to align its Collectorate.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SINGLE / MULTI-DISTRICT SELECTOR (Same State) */}
      {jurisdictionLevel !== 'MULTI_STATE' && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State / Union Territory <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedStates[0] || 'Gujarat'}
                onChange={(e) => handleSingleStateChange(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
              >
                {INDIAN_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {jurisdictionLevel === 'SINGLE_DISTRICT' ? 'Target District' : `Districts in ${selectedStates[0] || 'Gujarat'}`}
              </label>
              <div className="text-xs text-slate-500">
                {jurisdictionLevel === 'SINGLE_DISTRICT' 
                  ? 'Select the single administrative district for this requisition:' 
                  : 'Select two or more revenue districts traversed within this state:'}
              </div>
            </div>
          </div>

          {/* District Badges Selection */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {(DISTRICTS_BY_STATE[selectedStates[0] || 'Gujarat'] || []).map(dist => {
              const currentList = selectedDistrictsByState[selectedStates[0] || 'Gujarat'] || [];
              const isChecked = currentList.includes(dist.name);
              return (
                <button
                  key={dist.name}
                  type="button"
                  onClick={() => handleToggleDistrictForState(selectedStates[0] || 'Gujarat', dist.name)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{dist.name}</span>
                  <span className={`text-[10px] font-mono ${isChecked ? 'text-blue-200' : 'text-slate-400'}`}>
                    ({dist.code})
                  </span>
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {errors?.selectedDistricts && (
        <p className="text-xs text-red-600 font-semibold">{errors.selectedDistricts}</p>
      )}

      {/* 4. STATE-WISE STATUTORY CALA / COLLECTORATE DIRECTORY */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-700" />
              Statutory CALA / District Collectorates Directory ({formData.districtAuthorities?.length || 0} Activated)
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              All selected District Collectors will receive statutory Form-I requisition notices, cadastral schedules, and escrow deposits.
            </p>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            💡 Star (★) indicates Lead Coordinating CALA Node
          </div>
        </div>

        {/* Group by State */}
        {selectedStates.map(st => {
          const authoritiesForState = (formData.districtAuthorities || []).filter(a => a.state === st);
          if (authoritiesForState.length === 0) return null;

          return (
            <div key={st} className="space-y-3 bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-white tracking-wider uppercase">
                    State Jurisdiction
                  </span>
                  <span className="text-sm font-bold text-slate-900">{st}</span>
                  <span className="text-xs text-slate-500">
                    ({authoritiesForState.length} District Collectorate{authoritiesForState.length > 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Collectors Grid */}
              <div className="grid grid-cols-1 gap-3">
                {authoritiesForState.map((auth) => (
                  <div 
                    key={auth.districtCode || auth.district}
                    className={`border rounded-lg p-3.5 transition-all ${
                      auth.isLead
                        ? 'bg-blue-50/50 border-blue-300 ring-1 ring-blue-300 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 font-mono">
                          {auth.districtCode}
                        </span>
                        <span className="font-bold text-xs text-slate-900">
                          {auth.calaOffice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {auth.isLead ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                            Lead Coordinating CALA
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetLeadCala(auth.districtCode)}
                            className="text-[11px] text-blue-700 hover:underline font-semibold"
                          >
                            Set as Lead CALA
                          </button>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified CALA Node
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Competent Authority (CALA / Collector):</span>
                        <span className="font-bold text-slate-900">{auth.calaOfficer}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Official Communication Email:</span>
                        <span className="font-mono text-blue-700 flex items-center gap-1 text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" /> {auth.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Contact Desk:</span>
                        <span className="font-medium text-slate-800 flex items-center gap-1 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" /> {auth.phone}
                        </span>
                      </div>
                      <div className="md:col-span-3 pt-1 text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-700">Official Collectorate Campus Address:</span> {auth.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {(!formData.districtAuthorities || formData.districtAuthorities.length === 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800">
            ⚠️ No District Collectorates aligned yet. Please select at least one district above.
          </div>
        )}
      </div>
    </div>
  );
}
