import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  CheckCircle,
  Landmark
} from 'lucide-react';

export default function PublicFooter({ onOpenOfficerLogin }) {
  return (
    <footer className="bg-[#0f1f38] text-slate-300 font-sans border-t-2 border-[#C5A059]">
      
      {/* Top Footer Banner: Government Directory & Portals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Government Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1B365D] border border-[#C5A059]/40 flex items-center justify-center text-[#E6CA85]">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-serif uppercase tracking-wider">
                  NLAMS
                </div>
                <div className="text-xs text-amber-200/90 font-medium">
                  National Land Acquisition &amp; Management System
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An apex e-Governance initiative by the Department of Land Resources (DoLR), Ministry of Rural Development, Government of India. Designed for transparent, time-bound, and legally sound execution under the RFCTLARR Act 2013.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>NBO Building, Nirman Bhawan, New Delhi - 110011</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>National Helpline: 1800-11-NLAMS (6526) / 011-23061234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>helpdesk-nlams@gov.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Statutory Legislation & Acts */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif border-b border-slate-700 pb-2">
              Statutory Acts &amp; Rules
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#rfctlarr" className="hover:text-amber-300 transition-colors">
                  RFCTLARR Act, 2013 (Full Text)
                </a>
              </li>
              <li>
                <a href="#first-schedule" className="hover:text-amber-300 transition-colors">
                  First Schedule (Compensation)
                </a>
              </li>
              <li>
                <a href="#second-schedule" className="hover:text-amber-300 transition-colors">
                  Second Schedule (R&amp;R Entitlements)
                </a>
              </li>
              <li>
                <a href="#third-schedule" className="hover:text-amber-300 transition-colors">
                  Third Schedule (Civic Amenities)
                </a>
              </li>
              <li>
                <a href="#state-rules" className="hover:text-amber-300 transition-colors">
                  State Specific RFCTLARR Rules
                </a>
              </li>
              <li>
                <a href="#dilrmp" className="hover:text-amber-300 transition-colors">
                  DILRMP Technical Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Services */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif border-b border-slate-700 pb-2">
              Citizen Self-Service
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#track-land" className="hover:text-amber-300 transition-colors">
                  Track My Land (ULPIN)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-300 transition-colors">
                  Section 26-30 Calculator
                </a>
              </li>
              <li>
                <a href="#gazette-vault" className="hover:text-amber-300 transition-colors">
                  Search Gazette Notifications
                </a>
              </li>
              <li>
                <a href="#passbook" className="hover:text-amber-300 transition-colors">
                  R&amp;R Family Passbook
                </a>
              </li>
              <li>
                <a href="#objection-filing" className="hover:text-amber-300 transition-colors">
                  Section 15 Objection Filing
                </a>
              </li>
              <li>
                <a href="#dbt-status" className="hover:text-amber-300 transition-colors">
                  Check PFMS DBT Payment Status
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: National Portals & Integrations */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif border-b border-slate-700 pb-2">
              National Portals
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer">
                  <span>Digital India Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer">
                  <span>Bhuvan ISRO Geo-Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer">
                  <span>BharatMaps (NIC GIS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer">
                  <span>PFMS Direct Benefit Transfer</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer">
                  <span>PM Gati Shakti Master Plan</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenOfficerLogin}
                className="w-full py-1.5 px-3 bg-[#1B365D] hover:bg-[#142642] text-amber-300 border border-[#C5A059] rounded text-xs font-bold transition-colors cursor-pointer"
              >
                Officer SSO Login
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Compliance & Standards Verification Bar */}
      <div className="bg-[#091322] border-t border-slate-800 py-3 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-slate-400">
          
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Website Policies</span>
            <span>·</span>
            <span>Hyperlinking Policy</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Copyright Policy</span>
            <span>·</span>
            <span>Terms &amp; Conditions</span>
            <span>·</span>
            <span>Help / FAQ</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3 h-3" />
              <span>CERT-In Security Cleared</span>
            </span>
            <span>·</span>
            <span>W3C WAI-AA Compliant</span>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Visitor Counter Bar */}
      <div className="bg-[#050b14] py-3 text-[11px] text-slate-500 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} National Land Acquisition &amp; Management System (NLAMS), Department of Land Resources, Ministry of Rural Development, Government of India. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>Last Updated: 25 Sep 2026</span>
            <span>·</span>
            <span className="text-amber-300/80">Visitors: 2,84,19,412</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
