import React from 'react';
import { 
  Scale, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  AlertTriangle, 
  Landmark, 
  Users,
  ChevronRight
} from 'lucide-react';

export default function StatutoryActOverviewSection() {
  const pillars = [
    {
      title: 'Mandatory Social Impact Assessment (SIA)',
      sections: 'Sections 4 to 9',
      desc: 'No land can be acquired without an independent SIA study assessing whether the potential benefits outweigh social costs, followed by an Independent Expert Group (IEG) recommendation.',
      icon: Users
    },
    {
      title: 'Prior Informed Consent Requirement',
      sections: 'Section 2(2)',
      desc: 'Mandates prior consent of 70% of affected landholders for Public-Private Partnership (PPP) projects and 80% consent for private company acquisitions.',
      icon: FileCheck
    },
    {
      title: 'Guaranteed 4x Rural & 2x Urban Compensation',
      sections: 'Sections 26 to 30',
      desc: 'First Schedule fixes base market value multiplied by up to 2.0x for rural land, plus a mandatory 100% Solatium and 12% additional interest per annum.',
      icon: Scale
    },
    {
      title: 'Mandatory Rehabilitation & Resettlement',
      sections: 'Second & Third Schedules',
      desc: 'Every displaced family is legally entitled to constructed housing, 12-month subsistence allowance (₹3,000/mo), cattle shed grants, and 25 civic amenities in resettlement colonies.',
      icon: Landmark
    },
    {
      title: 'Independent Judicial Tribunal (LARR Authority)',
      sections: 'Sections 51 to 74',
      desc: 'Quasi-judicial authority headed by a District Judge qualified Presiding Officer to resolve compensation enhancement references within 6 months.',
      icon: ShieldCheck
    }
  ];

  const slaTimers = [
    {
      stage: 'SIA Study & Report Submission',
      actLimit: '6 Months from Section 4(1)',
      consequence: 'Report void if not completed within 6 months'
    },
    {
      stage: 'Section 11 to Section 19 Declaration',
      actLimit: 'Strict 12 Months (Section 19(7))',
      consequence: 'Entire acquisition automatically LAPSES if breached'
    },
    {
      stage: 'Collector Award under Section 23',
      actLimit: 'Strict 12 Months from Section 19 (Section 25)',
      consequence: 'Acquisition lapses unless extended with recorded reasons'
    },
    {
      stage: 'Physical Possession Taking (Section 38)',
      actLimit: 'Post 100% Compensation Disbursal',
      consequence: 'Illegal to take possession prior to full DBT crediting'
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B365D]/10 text-[#1B365D] text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#C5A059]" />
            <span>Statutory Cornerstone • Act No. 30 of 2013</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D] font-serif mt-2">
            The RFCTLARR Act 2013 Legal Framework
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Passed by Parliament to ensure a humane, participatory, informed, and transparent process for land acquisition with fair compensation and comprehensive rehabilitation.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#1B365D] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#1B365D] mb-3">
                    <Icon className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {pillar.sections}
                  </span>
                  <h3 className="text-base font-bold text-[#1B365D] font-serif mt-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strict SLA Timers & Auto-Lapse Protection Table */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-lg font-bold text-[#1B365D] font-serif">
              Strict Statutory SLA Timers &amp; Citizen Anti-Lapse Protections
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4 max-w-3xl">
            Unlike pre-2013 colonial legislation where land was frozen for decades without compensation, the RFCTLARR Act 2013 mandates statutory SLA timers. Failure by authorities to adhere to these limits results in the legal lapse of the acquisition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slaTimers.map((timer, i) => (
              <div key={i} className="bg-[#FAF8F5] p-4 rounded-lg border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">
                  SLA Stage {i + 1}
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1">
                  {timer.stage}
                </div>
                <div className="text-xs font-mono font-bold text-[#1B365D] mt-2 bg-white p-1.5 rounded border border-slate-200 text-center">
                  {timer.actLimit}
                </div>
                <div className="text-[11px] text-red-700 font-medium mt-2 flex items-start gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{timer.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
