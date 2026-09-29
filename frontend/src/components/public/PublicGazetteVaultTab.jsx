import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Building2,
  Eye,
  X
} from 'lucide-react';

export default function PublicGazetteVaultTab() {
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);

  const gazetteRecords = [
    {
      id: 'GZ-2024-089',
      gazetteNo: 'SEC11-GUJ-VAD-2024-089',
      section: 'SEC_11',
      sectionTitle: 'Section 11(1) Preliminary Notification',
      authority: 'Revenue & Forest Department, Government of Gujarat',
      project: 'Western Dedicated Freight Corridor (WDFC) - Phase II',
      requiringBody: 'DFCCIL / Ministry of Railways',
      district: 'Bharuch',
      state: 'Gujarat',
      villages: 'Vadadla, Ankleshwar, Nabipur (Total 14 Villages)',
      affectedAreaHa: '48.2000 Hectares',
      publishedDate: '14 Jan 2024',
      slaStatus: '60-Day Objection Window Disposed',
      dscSignatory: 'IAS, Secretary (Revenue), Gandhinagar',
      docketSummary: 'Notification under Section 11(1) of RFCTLARR Act 2013 declaring intention of Central Government to acquire 48.20 Ha for dedicated railway freight line. All transactions after this date barred under Section 11(4).'
    },
    {
      id: 'GZ-2024-104',
      gazetteNo: 'SEC19-MAH-THN-2024-104',
      section: 'SEC_19',
      sectionTitle: 'Section 19(1) Final Declaration of Acquisition',
      authority: 'Revenue & Forest Department, Government of Maharashtra',
      project: 'Mumbai-Ahmedabad High Speed Rail (Bullet Train)',
      requiringBody: 'National High Speed Rail Corporation Ltd (NHSRCL)',
      district: 'Thane',
      state: 'Maharashtra',
      villages: 'Diva, Shilphata, Nilje (Total 8 Villages)',
      affectedAreaHa: '28.6500 Hectares',
      publishedDate: '22 Aug 2024',
      slaStatus: 'Under Section 21 Inquiry',
      dscSignatory: 'IAS, Divisional Commissioner, Konkan Division',
      docketSummary: 'Declaration under Section 19(1) that land is conclusively needed for public purpose of high-speed passenger rail connectivity. R&R scheme summary published under Section 19(2).'
    },
    {
      id: 'GZ-2023-341',
      gazetteNo: 'SEC38-UP-GZB-2023-341',
      section: 'SEC_38',
      sectionTitle: 'Section 38 Certificate of Vesting & Possession',
      authority: 'District Collectorate, Ghaziabad',
      project: 'Delhi-Meerut Regional Rapid Transit System (RRTS)',
      requiringBody: 'National Capital Region Transport Corporation (NCRTC)',
      district: 'Ghaziabad',
      state: 'Uttar Pradesh',
      villages: 'Muradnagar, Modinagar (Total 6 Villages)',
      affectedAreaHa: '16.4200 Hectares',
      publishedDate: '18 Nov 2023',
      slaStatus: 'Possession Transferred 100%',
      dscSignatory: 'District Magistrate & Collector, Ghaziabad',
      docketSummary: 'Statutory vesting order under Section 38(1) confirming that 100% of compensation and R&R entitlements have been deposited and disbursed. Land vests in Appropriate Government free from all encumbrances.'
    },
    {
      id: 'GZ-2024-210',
      gazetteNo: 'SEC04-HAR-GUR-2024-210',
      section: 'SEC_04',
      sectionTitle: 'Section 4(1) Social Impact Assessment Mandate',
      authority: 'Revenue Department, Government of Haryana',
      project: 'Delhi-Mumbai Expressway Spur Link (Southern Peripheral Road)',
      requiringBody: 'National Highways Authority of India (NHAI)',
      district: 'Gurugram',
      state: 'Haryana',
      villages: 'Kherki Daula, Badshahpur (Total 4 Villages)',
      affectedAreaHa: '22.1000 Hectares',
      publishedDate: '05 Mar 2024',
      slaStatus: 'SIA Census in Progress',
      dscSignatory: 'State SIA Nodal Officer, Chandigarh',
      docketSummary: 'Notification under Section 4(1) entrusting SIA unit to conduct baseline socio-economic census of affected families within 6 months. Public hearing date notified.'
    },
    {
      id: 'GZ-2025-015',
      gazetteNo: 'SEC23-GUJ-SUR-2025-015',
      section: 'SEC_23',
      sectionTitle: "Section 23 Collector's Sealed Award Notice",
      authority: 'Office of the District Collector, Surat',
      project: 'Surat Metro Rail Phase-I Corridor',
      requiringBody: 'Gujarat Metro Rail Corporation (GMRC)',
      district: 'Surat',
      state: 'Gujarat',
      villages: 'Sarthana, Varachha, Nanpura (Total 9 Villages)',
      affectedAreaHa: '12.8000 Hectares',
      publishedDate: '02 Feb 2025',
      slaStatus: 'PFMS DBT Active',
      dscSignatory: 'CALA & Collector, Surat',
      docketSummary: 'Sealed compensation award under Section 23 determining market value, 100% solatium, and 12% additional compensation. Notice served to Khatedars under Section 37(2).'
    }
  ];

  const filteredGazettes = gazetteRecords.filter(item => {
    const matchesSection = selectedSection === 'ALL' || item.section === selectedSection;
    const matchesState = selectedState === 'ALL' || item.state === selectedState;
    const matchesSearch = !searchQuery.trim() || 
      item.gazetteNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.villages.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesState && matchesSearch;
  });

  return (
    <div className="py-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>Statutory Publications Repository • RFCTLARR Act 2013</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B365D] font-serif mt-1">
                Official Gazette Notifications Vault
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Public access to digitally certified Gazette Publications. Every land acquisition in India must be officially gazetted under Section 4, Section 11, Section 19, or Section 38.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CCA 2048-bit DSC Verified</span>
            </div>
          </div>

          {/* Filters Row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Gazette No, Project, District, Village..."
                className="w-full bg-[#FAF8F5] border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#1B365D]"
              />
            </div>

            {/* Section Filter */}
            <div className="md:col-span-4 flex items-center gap-2 bg-[#FAF8F5] border border-slate-300 px-3 py-1 rounded-lg">
              <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-slate-500 font-medium shrink-0">Section:</span>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="bg-transparent w-full text-slate-900 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Sections (Sec 4 to 38)</option>
                <option value="SEC_04">Section 4 (SIA Mandate)</option>
                <option value="SEC_11">Section 11 (Preliminary Notification)</option>
                <option value="SEC_19">Section 19 (Final Declaration)</option>
                <option value="SEC_23">Section 23 (Collector's Award)</option>
                <option value="SEC_38">Section 38 (Vesting &amp; Possession)</option>
              </select>
            </div>

            {/* State Filter */}
            <div className="md:col-span-3 flex items-center gap-2 bg-[#FAF8F5] border border-slate-300 px-3 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-slate-500 font-medium shrink-0">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent w-full text-slate-900 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All States</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Haryana">Haryana</option>
              </select>
            </div>

          </div>
        </div>

        {/* Gazette Records Table / Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <span>Showing <strong className="text-slate-900">{filteredGazettes.length}</strong> certified statutory gazette publications</span>
            <span className="font-mono text-slate-500">Updated: Live Sync with e-Gazette Portal</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredGazettes.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#1B365D] text-amber-300">
                      {doc.gazetteNo}
                    </span>
                    <span className="text-xs font-bold text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                      {doc.sectionTitle}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {doc.publishedDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {doc.project}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                    {doc.docketSummary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span><strong className="text-slate-700">Jurisdiction:</strong> {doc.district} ({doc.state})</span>
                    <span><strong className="text-slate-700">Villages:</strong> {doc.villages}</span>
                    <span><strong className="text-slate-700">Area:</strong> <span className="font-mono font-semibold text-emerald-800">{doc.affectedAreaHa}</span></span>
                    <span><strong className="text-slate-700">Signatory:</strong> {doc.dscSignatory}</span>
                  </div>
                </div>

                <div className="flex sm:flex-row lg:flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer border border-slate-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>View Gazette</span>
                  </button>

                  <button
                    onClick={() => alert(`Downloading verified Gazette PDF: ${doc.gazetteNo}.pdf`)}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#1B365D] hover:bg-[#142642] text-amber-300 text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed PDF</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredGazettes.length === 0 && (
              <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                No statutory gazette records found matching your filters.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Gazette Modal Preview */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-2 border-[#1B365D] max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1B365D]" />
                <span className="font-bold text-sm text-[#1B365D] font-serif">Certified Gazette Docket Preview</span>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-serif text-slate-900 text-xs leading-relaxed space-y-3">
              <div className="text-center font-bold text-sm uppercase">
                {previewDoc.authority}
              </div>
              <div className="text-center font-mono text-[11px] text-slate-600">
                NOTIFICATION NO: {previewDoc.gazetteNo} | DATE: {previewDoc.publishedDate}
              </div>
              <div className="border-t border-b border-slate-300 py-2 text-center font-bold text-xs uppercase text-[#1B365D]">
                {previewDoc.sectionTitle}
              </div>

              <p>
                Whereas it appears to the Appropriate Government that a total of <strong>{previewDoc.affectedAreaHa}</strong> of land situated in District {previewDoc.district} ({previewDoc.state}) is required for a public purpose, namely for <strong>{previewDoc.project}</strong> by {previewDoc.requiringBody}.
              </p>

              <p>
                Now, therefore, in exercise of the powers conferred under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, this official notification is hereby published.
              </p>

              <div className="bg-white p-3 rounded border border-slate-200 font-sans text-[11px] space-y-1">
                <div><strong>Affected Villages:</strong> {previewDoc.villages}</div>
                <div><strong>Total Land Area:</strong> {previewDoc.affectedAreaHa}</div>
                <div><strong>DSC Signatory:</strong> {previewDoc.dscSignatory}</div>
                <div><strong>Digital Signature Status:</strong> Valid 2048-bit RSA DSC Verified</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  alert(`Downloading signed certified PDF: ${previewDoc.gazetteNo}.pdf`);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 rounded bg-[#1B365D] text-amber-300 text-xs font-bold cursor-pointer"
              >
                Download PDF Copy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
