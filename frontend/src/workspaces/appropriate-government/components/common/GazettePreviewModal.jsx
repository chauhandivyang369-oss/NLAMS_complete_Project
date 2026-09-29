import React from 'react';
import { ShieldCheck, Download, Printer, QrCode, X, CheckCircle, FileText } from 'lucide-react';

export default function GazettePreviewModal({ doc, isOpen, onClose }) {
  if (!isOpen || !doc) return null;

  const isCentral = doc.jurisdictionType === 'CENTRAL';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 max-w-3xl w-full my-8 overflow-hidden text-slate-800">
        {/* Top Control Bar */}
        <div className="bg-[#1B365D] text-white px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>OFFICIAL STATUTORY GAZETTE PREVIEW • ELECTRONIC EDITION</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gazette Document Container */}
        <div className="p-8 bg-[#FAFAFA] font-serif border-x border-b text-slate-900 space-y-6 select-text max-h-[75vh] overflow-y-auto">
          {/* Gazette Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4">
            <div className="text-[12px] font-sans font-bold tracking-widest text-slate-600 uppercase">
              {isCentral ? 'REPUBLIC OF INDIA • EXTRAORDINARY' : 'STATE GOVERNMENT • EXTRAORDINARY'}
            </div>
            <div className="w-12 h-12 mx-auto border-2 border-slate-800 rounded-full flex items-center justify-center font-sans font-extrabold text-[10px] tracking-tighter bg-amber-50 text-slate-900">
              सत्यमेव जयते
            </div>
            <h1 className="text-2xl font-bold tracking-wider uppercase font-serif text-slate-900">
              {isCentral ? 'The Gazette of India' : 'The State Government Gazette'}
            </h1>
            <h2 className="text-sm font-semibold tracking-widest uppercase font-sans text-slate-700">
              {isCentral
                ? 'PART II — Section 3 — Sub-section (ii)'
                : 'EXTRAORDINARY — PART I-A (STATUTORY NOTIFICATIONS)'}
            </h2>
            <div className="text-xs font-sans text-slate-600 flex justify-between border-t border-slate-400 pt-1 mt-2">
              <span>PUBLISHED BY AUTHORITY</span>
              <span className="font-bold">{doc.publicationDate || '2025-08-14'}</span>
              <span>NO. {doc.notificationNo || 'S.O. 2489(E)'}</span>
            </div>
          </div>

          {/* Ministry / Department Header */}
          <div className="text-center space-y-1 font-sans text-xs">
            <div className="font-bold uppercase tracking-wide text-slate-800">
              {isCentral ? 'MINISTRY OF ROAD TRANSPORT AND HIGHWAYS' : 'REVENUE & FOREST DEPARTMENT'}
            </div>
            <div className="font-semibold text-slate-700 uppercase">
              {isCentral ? '(DEPARTMENT OF LAND ACQUISITION)' : '(LAND REFORMS WING)'}
            </div>
            <div className="italic text-slate-600 pt-1">
              New Delhi / State Capital, the {doc.publicationDate || '14th August, 2025'}
            </div>
          </div>

          {/* Statutory Notification Body */}
          <div className="text-justify text-xs leading-relaxed space-y-3 font-serif">
            <p className="font-bold text-center uppercase tracking-wide font-sans text-slate-800">
              NOTIFICATION UNDER {doc.section || 'SECTION 11(1)'} OF THE RIGHT TO FAIR COMPENSATION AND TRANSPARENCY IN LAND ACQUISITION, REHABILITATION AND RESETTLEMENT ACT, 2013 (30 OF 2013)
            </p>

            <p>
              <strong>{doc.notificationNo || 'S.O. 2489(E)'}.—</strong> Whereas it appears to the Appropriate Government that a total of{' '}
              <strong>48.60 Hectares</strong> of land is required or likely to be required in the District(s) of{' '}
              <strong>Patiala &amp; Ludhiana</strong> for a public purpose, namely,{' '}
              <em>“Construction of access-controlled 6-lane Delhi-Amritsar-Katra Expressway (Package 3)”</em> under Project Code{' '}
              <span className="font-mono">{doc.projectCode || 'NH-44-PKG3'}</span>.
            </p>

            <p>
              And whereas the Social Impact Assessment (SIA) study has been duly conducted under sub-section (1) of Section 4 and appraised by the independent Multi-Disciplinary Expert Group under Section 7, and the Appropriate Government has recorded its satisfaction that the social benefits outweigh the potential adverse impacts.
            </p>

            <p>
              Now, therefore, in exercise of the powers conferred by sub-section (1) of Section 11 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, the Appropriate Government hereby issues this preliminary notification.
            </p>

            <p>
              Under sub-section (4) of Section 11 of the said Act, no person shall make any transaction or cause any transaction of land specified in this notification, or create any encumbrances on such land without the prior approval of the District Collector.
            </p>

            <p>
              Any person interested in any land which has been notified may, within <strong>sixty days</strong> from the date of publication of this notification, object to the acquisition, the public purpose, or the suitability of the land before the Collector in writing under Section 15 of the Act.
            </p>
          </div>

          {/* Land Schedule Preview Table */}
          <div className="border border-slate-300 p-2 font-sans text-[11px] bg-white">
            <div className="font-bold pb-1 text-slate-800 uppercase">Brief Schedule of Land:</div>
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-1">State</th>
                  <th className="border border-slate-300 p-1">District</th>
                  <th className="border border-slate-300 p-1">Tehsil</th>
                  <th className="border border-slate-300 p-1">Village</th>
                  <th className="border border-slate-300 p-1">Survey / Khasra</th>
                  <th className="border border-slate-300 p-1">ULPIN</th>
                  <th className="border border-slate-300 p-1 text-right">Area (Ha)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-1">Punjab</td>
                  <td className="border border-slate-300 p-1">Patiala</td>
                  <td className="border border-slate-300 p-1">Rajpura</td>
                  <td className="border border-slate-300 p-1">Sultanpur Khurd</td>
                  <td className="border border-slate-300 p-1 font-mono">142/1, 142/2</td>
                  <td className="border border-slate-300 p-1 font-mono text-[10px]">19U28746219801</td>
                  <td className="border border-slate-300 p-1 text-right font-mono">2.27</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-1">Punjab</td>
                  <td className="border border-slate-300 p-1">Patiala</td>
                  <td className="border border-slate-300 p-1">Rajpura</td>
                  <td className="border border-slate-300 p-1">Payal Khurd</td>
                  <td className="border border-slate-300 p-1 font-mono">143/4, 144/2</td>
                  <td className="border border-slate-300 p-1 font-mono text-[10px]">19U28746219803</td>
                  <td className="border border-slate-300 p-1 text-right font-mono">3.12</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Digital Signature & Verification Seal */}
          <div className="pt-4 border-t-2 border-slate-800 flex items-center justify-between font-sans text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-slate-300 rounded bg-white">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="space-y-0.5 text-[10px] text-slate-600">
                <div className="font-bold text-slate-900">VERIFIED OFFICIAL e-GAZETTE</div>
                <div>Hash: <span className="font-mono">{doc.sha256Hash?.slice(0, 20)}...</span></div>
                <div>Issued by Directorate of Printing, Govt of India</div>
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <div className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                DIGITALLY SIGNED (DSC)
              </div>
              <div className="font-bold text-slate-800 pt-1">{doc.signedBy || 'Joint Secretary to the Govt of India'}</div>
              <div className="text-slate-500 text-[10px]">Appropriate Government Authority</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-300 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Statutory Document ID: {doc.id} • Version: {doc.version}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#142642] text-white font-medium rounded cursor-pointer"
          >
            Close Gazette
          </button>
        </div>
      </div>
    </div>
  );
}
