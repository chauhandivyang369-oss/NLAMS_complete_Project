import React, { useState } from 'react';
import { 
  FileCheck, 
  Home, 
  Truck, 
  Users, 
  IndianRupee, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Search,
  Building,
  Sparkles
} from 'lucide-react';

export default function RnrPassbookTab() {
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 'ALL' | 'LANDOWNER' | 'TENANT' | 'ARTISAN' | 'SC_ST'
  const [demoPassbookId, setDemoPassbookId] = useState('RNR-GJ-BHR-2025-042');

  const entitlements = [
    {
      id: 1,
      code: 'SCH2-01',
      title: 'Provision of Housing Units',
      actReference: 'Second Schedule, Element 1',
      target: 'Displaced rural or urban families whose house is acquired',
      grantDetail: 'Constructed house (min. 100 sq.m rural / 50 sq.m urban) OR ₹3,50,000 financial grant in lieu of house.',
      category: ['LANDOWNER', 'TENANT', 'SC_ST'],
      amount: '₹3,50,000 or Constructed House',
      status: 'Sanctioned & Allocated',
      icon: Home
    },
    {
      id: 2,
      code: 'SCH2-02',
      title: 'Subsistence Allowance',
      actReference: 'Second Schedule, Element 5',
      target: 'All affected families whose livelihoods are impacted',
      grantDetail: 'Monthly grant of ₹3,000 per month for a period of 12 months (Total ₹36,000 credited directly to DBT account).',
      category: ['LANDOWNER', 'TENANT', 'ARTISAN', 'SC_ST'],
      amount: '₹36,000 (₹3,000/mo × 12)',
      status: 'Active Monthly DBT',
      icon: IndianRupee
    },
    {
      id: 3,
      code: 'SCH2-03',
      title: 'Transportation / Shifting Allowance',
      actReference: 'Second Schedule, Element 6',
      target: 'Families required to relocate from acquired area',
      grantDetail: 'One-time lump sum grant of ₹50,000 for transportation of household building materials, belongings, and cattle.',
      category: ['LANDOWNER', 'TENANT', 'ARTISAN', 'SC_ST'],
      amount: '₹50,000 Lump Sum',
      status: '100% Disbursed',
      icon: Truck
    },
    {
      id: 4,
      code: 'SCH2-04',
      title: 'Cattle Shed / Petty Shop Grant',
      actReference: 'Second Schedule, Element 7',
      target: 'Displaced rural families possessing cattle or petty shop',
      grantDetail: 'One-time grant of ₹25,000 for construction of working cattle shed or small kiosk.',
      category: ['LANDOWNER', 'TENANT'],
      amount: '₹25,000 One-Time',
      status: '100% Disbursed',
      icon: Building
    },
    {
      id: 5,
      code: 'SCH2-05',
      title: 'One-Time Grant for Artisans & Small Traders',
      actReference: 'Second Schedule, Element 8',
      target: 'Rural artisans, self-employed persons, craftsmen, shopkeepers',
      grantDetail: 'One-time financial assistance of ₹25,000 for construction of working shed or re-establishing commercial livelihood.',
      category: ['ARTISAN'],
      amount: '₹25,000 One-Time',
      status: 'Sanctioned',
      icon: Briefcase
    },
    {
      id: 6,
      code: 'SCH2-06',
      title: 'Special Additional Grant for SC / ST Families',
      actReference: 'Second Schedule, Element 11 & Section 41',
      target: 'Scheduled Caste and Scheduled Tribe affected families',
      grantDetail: 'Additional lump sum grant of ₹50,000 over and above standard entitlements + 1/3 compensation advance.',
      category: ['SC_ST'],
      amount: '₹50,000 Special Grant',
      status: 'Sanctioned & Verified',
      icon: ShieldCheck
    },
    {
      id: 7,
      code: 'SCH2-07',
      title: 'Mandatory Employment or Lump Sum Annuity',
      actReference: 'Second Schedule, Element 4',
      target: 'Affected families losing predominant source of livelihood',
      grantDetail: 'Mandatory employment in project OR one-time lump-sum grant of ₹5,00,000 OR annuity of ₹2,000/month for 20 years.',
      category: ['LANDOWNER', 'TENANT'],
      amount: '₹5,00,000 or Project Employment',
      status: 'Exercised (₹5L Option)',
      icon: Users
    }
  ];

  const civicAmenities = [
    'Paved Internal Roads & Street Lighting',
    'Safe Drinking Water Supply & Over-head Tank',
    'Underground Sewerage & Paved Drainage System',
    'Primary Health Centre (PHC) & Sub-Centre',
    'Primary & Middle School within 500 Meters',
    'Community Centre / Panchayat Ghar',
    'Fair Price Shop (PDS) & Post Office Kiosk',
    'Anganwadi Centre & Children Play Park',
    'Dedicated Cremation & Burial Ground',
    'Veterinary Care Centre & Cattle Pond',
    'Dedicated Grazing Land / Fodder Plot',
    'Broadband Connectivity & CSC Service Centre'
  ];

  const filteredEntitlements = selectedCategory === 'ALL'
    ? entitlements
    : entitlements.filter(e => e.category.includes(selectedCategory));

  return (
    <div className="py-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Rehabilitation &amp; Resettlement • Second &amp; Third Schedules</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B365D] font-serif mt-1">
                R&amp;R Entitlements &amp; Digital Passbook
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                The RFCTLARR Act 2013 legally guarantees rehabilitation entitlements for all affected persons — including landowners, agricultural tenants, agricultural labourers, and rural artisans.
              </p>
            </div>

            {/* Passbook Search Box */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-300">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={demoPassbookId}
                onChange={(e) => setDemoPassbookId(e.target.value)}
                placeholder="Enter R&R Passbook ID..."
                className="bg-transparent text-xs font-mono text-slate-900 focus:outline-none w-44"
              />
              <button
                type="button"
                className="px-2.5 py-1 bg-[#1B365D] text-amber-300 text-xs font-bold rounded cursor-pointer hover:bg-[#142642]"
              >
                Fetch
              </button>
            </div>
          </div>
        </div>

        {/* Digital Passbook Header Dossier */}
        <div className="bg-[#142642] text-white p-6 rounded-xl border-2 border-[#C5A059] shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  PASSBOOK: {demoPassbookId}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-emerald-400">R&amp;R COMMISSIONER SANCTIONED</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif mt-1">
                Beneficiary: Rameshbhai Somabhai Patel (Family ID: FAM-GJ-BHR-0142)
              </h3>
              <div className="text-xs text-slate-300 mt-0.5">
                Village Vadadla, Bharuch (Gujarat) • Project: Western Dedicated Freight Corridor (WDFC)
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-bold text-xs cursor-pointer shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified Passbook (PDF)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <div className="text-slate-400 text-[10px]">Total R&amp;R Sanctioned</div>
              <div className="text-base font-bold text-amber-300 font-mono">₹6,61,000</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Disbursed to Date</div>
              <div className="text-base font-bold text-emerald-400 font-mono">₹6,25,000 (94.5%)</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Colony Plot Allotted</div>
              <div className="text-base font-bold text-white font-mono">Plot #B-14 (150 Sq.m)</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">R&amp;R Administrator</div>
              <div className="text-base font-bold text-slate-200">CALA &amp; Collector Bharuch</div>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-slate-700 mr-2 shrink-0">Filter by Entitlement Class:</span>
          {[
            { id: 'ALL', label: 'All Statutory Grants (7)' },
            { id: 'LANDOWNER', label: 'Recorded Landowner' },
            { id: 'TENANT', label: 'Agricultural Tenant / Labourer' },
            { id: 'ARTISAN', label: 'Rural Artisans & Traders' },
            { id: 'SC_ST', label: 'SC / ST Protected Category' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#1B365D] text-white border-[#1B365D] font-bold shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Entitlements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntitlements.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#1B365D] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#1B365D]">
                      <Icon className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1B365D] font-serif mt-3">
                    {item.title}
                  </h4>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {item.actReference}
                  </div>

                  <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {item.grantDetail}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">Statutory Entitlement Value</div>
                    <div className="text-xs font-bold text-slate-900 font-mono">{item.amount}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Third Schedule: 25 Mandatory Civic Amenities in Resettlement Colony */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-base font-bold text-[#1B365D] font-serif">
              Third Schedule: Mandatory Civic Infrastructure in Resettlement Colonies
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Under Section 32 and the Third Schedule of RFCTLARR Act 2013, the Requisitioning Body is legally obligated to provide 25 core civic amenities in every rehabilitation colony before physical possession is transferred.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {civicAmenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
