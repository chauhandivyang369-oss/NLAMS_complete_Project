import React, { useState } from 'react';
import {
  X,
  Download,
  QrCode,
  ShieldCheck,
  FileText,
  Printer,
  Globe,
  CheckCircle2,
  Building
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext.jsx';

export default function DocumentViewerModal() {
  const { activeDocModal, setActiveDocModal, showToast } = useCitizen();
  const [docLang, setDocLang] = useState('en'); // 'en' | 'hi' | 'gu'

  if (!activeDocModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveDocModal(null)}
      />

      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] border border-slate-300 animate-in zoom-in-95 duration-150">
        {/* Modal Top Action Header */}
        <div className="p-3 bg-[#1B365D] text-white border-b-2 border-[#C5A059] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C5A059]" />
            <div>
              <div className="font-bold text-sm text-white truncate max-w-md sm:max-w-xl">
                {activeDocModal.title}
              </div>
              <div className="text-[10px] text-[#E6CA85]">
                {activeDocModal.authority} • {activeDocModal.section || 'Statutory Publication'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <div className="flex items-center bg-slate-800 rounded p-0.5 text-[11px]">
              <button
                onClick={() => setDocLang('en')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${docLang === 'en' ? 'bg-[#C5A059] text-[#1B365D]' : 'text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setDocLang('hi')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${docLang === 'hi' ? 'bg-[#C5A059] text-[#1B365D]' : 'text-slate-300'}`}
              >
                HI
              </button>
              <button
                onClick={() => setDocLang('gu')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${docLang === 'gu' ? 'bg-[#C5A059] text-[#1B365D]' : 'text-slate-300'}`}
              >
                GU
              </button>
            </div>

            <button
              onClick={() => showToast('Downloading digitally signed statutory PDF...')}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#C5A059] hover:bg-[#d6b268] text-[#1B365D] font-bold text-xs rounded transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Signed PDF</span>
            </button>

            <button
              onClick={() => setActiveDocModal(null)}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Gazette / Publication Canvas Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex justify-center">
          <div className="w-full max-w-2xl bg-white border border-slate-300 shadow-md p-8 sm:p-12 text-slate-800 space-y-6 font-serif relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none text-9xl font-bold tracking-widest text-[#1B365D]">
              NLAMS GOI
            </div>

            {/* Official Header Emblem */}
            <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
              <div className="font-sans text-[11px] font-bold tracking-widest uppercase text-slate-600">
                GOVERNMENT OF GUJARAT • REVENUE DEPARTMENT
              </div>
              <h2 className="text-lg font-black tracking-wide text-slate-900 uppercase">
                THE GUJARAT GOVERNMENT GAZETTE
              </h2>
              <div className="font-sans text-xs italic text-slate-600">
                EXTRAORDINARY • PUBLISHED BY AUTHORITY
              </div>
              <div className="font-sans text-[11px] font-bold text-slate-700">
                Gandhinagar, {activeDocModal.date || '12 August 2026'} / Shravana 21, 1948
              </div>
            </div>

            {/* Notification Title & Body */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="font-sans text-center font-bold text-slate-900">
                PART IV-A — STATUTORY NOTIFICATIONS UNDER RFCTLARR ACT, 2013
              </div>

              <div className="p-3 bg-slate-50 border-l-4 border-[#1B365D] font-sans text-xs space-y-1">
                <div className="font-bold text-slate-900">Notification Reference: {activeDocModal.title}</div>
                <div className="text-slate-600">Issuing Authority: {activeDocModal.authority}</div>
                <div className="text-slate-600">Applicable Statutory Section: {activeDocModal.section || 'Section 11(1)'}</div>
              </div>

              <p className="text-justify indent-6">
                {docLang === 'hi' ? (
                  'उचित सरकार को यह प्रतीत होता है कि अनुसूची में निर्दिष्ट भूमि सार्वजनिक प्रयोजन के लिए अर्थात् राष्ट्रीय राजमार्ग एवं समर्पित फ्रेट कॉरिडोर विस्तार परियोजना के निर्माण हेतु आवश्यक है। एतद्द्वारा भूमि अर्जन, पुनर्वासन और पुनर्व्यवस्थापन में उचित प्रतिकर और पारदर्शिता अधिकार अधिनियम, 2013 की धारा 11(1) के अधीन सभी हितबद्ध व्यक्तियों के सूचनार्थ यह प्रारंभिक अधिसूचना प्रकाशित की जाती है।'
                ) : docLang === 'gu' ? (
                  'યોગ્ય સરકારને એવું જણાય છે કે પરિશિષ્ટમાં દર્શાવેલ જમીન જાહેર હેતુ માટે એટલે કે રાષ્ટ્રીય ધોરીમાર્ગ અને સમર્પિત ફ્રેઇટ કોરિડોર વિકાસ પરિયોજના માટે જરૂરી છે. આથી જમીન સંપાદન, પુનર્વસન અને પુનર્વ્યવસ્થાપનમાં વાજબી વળતર અને પારદર્શિતા અધિકાર અધિનિયમ, ૨૦૧૩ ની કલમ ૧૧(૧) હેઠળ તમામ હિત ધરાવતી વ્યક્તિઓની જાણ સારુ આ પ્રાથમિક જાહેરનામું પ્રસિદ્ધ કરવામાં આવે છે.'
                ) : (
                  'Whereas it appears to the Appropriate Government that a total of 324.50 Hectares of land in Petlad and Borsad Talukas of Anand District is required for a public purpose, namely the execution of the National Highway Corridor Alignment. Now, therefore, in exercise of the powers conferred by sub-section (1) of Section 11 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (Act No. 30 of 2013), this preliminary notification is published for information of all persons interested in the said land.'
                )}
              </p>

              <p className="text-justify indent-6">
                Under sub-section (4) of Section 11, no person shall make any transaction or cause any transaction of land specified in the notification, or create any encumbrance on such land, from the date of publication without prior sanction of the Collector.
              </p>

              <p className="text-justify indent-6">
                Under Section 15(1), any person interested in any land may within sixty (60) days from the date of publication object to the acquisition, the area and suitability of the land proposed to be acquired, or the justification offered for public purpose.
              </p>
            </div>

            {/* Schedule Table Summary */}
            <div className="font-sans text-xs border border-slate-300 rounded overflow-hidden">
              <div className="bg-slate-100 p-2 font-bold text-slate-800 text-center border-b border-slate-300">
                ABSTRACT SCHEDULE OF CITIZEN PARCEL UNDER NOTIFICATION
              </div>
              <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">District:</span>
                  <span className="font-bold text-slate-800">Anand</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Taluka:</span>
                  <span className="font-bold text-slate-800">Petlad</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Village:</span>
                  <span className="font-bold text-slate-800">Petlad Rural</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Survey / ULPIN:</span>
                  <span className="font-bold text-blue-900 font-mono">142/1 • 24051234567890</span>
                </div>
              </div>
            </div>

            {/* Digital Seal & QR Verification Footer */}
            <div className="pt-6 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-100 border border-slate-400 p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cryptographically Signed Gazette Copy</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Cert Thumbprint: 88F9-2A41-B83C-7721
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    Valid Indian IT Act 2000 Class-3 DSC Sign
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-500">By order and in the name of the Governor of Gujarat,</div>
                <div className="font-bold text-slate-900 mt-1">Special Secretary to Government</div>
                <div className="text-[10px] text-slate-600">Revenue Department, Sachivalaya</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="text-[11px] text-slate-600">
            Official Public Document under Section 11/19 of RFCTLARR Act 2013 • Authenticated via NLAMS Gazette Engine
          </div>
          <button
            onClick={() => setActiveDocModal(null)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
