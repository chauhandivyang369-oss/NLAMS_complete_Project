import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  Download, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  Flag, 
  Copy, 
  Building2, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpDown,
  History
} from 'lucide-react';

export default function ObjectionsHearings() {
  const { showToast } = useWorkspace();

  // Internal dataset of Section 15 objections matching NLAMS Government Portal standards
  const initialObjections = [
    {
      id: 'OBJ-2026-081',
      district: 'Vadodara',
      village: 'Sultanpur Khurd',
      khasraNo: '142/2',
      ulpin: '19U28746219802',
      claimant: 'Ram Charan Lal & 2 Co-owners',
      category: 'Residential Displacement & R&R Resettlement Allotment',
      dateFiled: '08 Jan 2026',
      hearingDate: '24 Mar 2026',
      hearingTime: '11:00 AM',
      hearingVenue: 'Court of CALA / SDM Rajpura',
      presidingOfficer: 'Shri S. K. Pathak, GAS (CALA)',
      currentStatus: 'Hearing Scheduled',
      hearingStatus: 'Scheduled',
      lastUpdated: '14 Sep 2026',
      lastUpdatedBy: 'CALA Office (Hearing Notice Dispatched)',
      nextUpdate: 'Appearance of petitioner & RB nodal counsel on 24 Mar 2026',
      description: 'Claimant states ancestral pucca home of 35 years is situated on acquired alignment. Requests physical allotment of 150 sq.m developed residential plot in approved R&R colony under Schedule-II in addition to cash compensation.',
      aiSummary: 'Schedule II Homestead Entitlement: RFCTLARR Schedule II Para 1(1) provides mandatory plot or ₹1.5L grant for displaced rural families.',
      priorityFlag: 'Medium Attention',
      documents: [
        { name: 'Form_B_Objection_Petition_081.pdf', size: '1.4 MB', date: '08 Jan 2026', type: 'Objection Petition' },
        { name: 'CALA_Hearing_Summons_Memo_448.pdf', size: '820 KB', date: '12 Feb 2026', type: 'Hearing Notice' },
        { name: 'Site_Inspection_Report_Patwari.pdf', size: '2.1 MB', date: '05 Mar 2026', type: 'Revenue Report' }
      ],
      auditTrail: [
        { date: '14 Sep 2026, 11:20 IST', event: 'Hearing calendar entry re-confirmed by CALA Bench', actor: 'CALA Court Clerk' },
        { date: '12 Feb 2026, 15:45 IST', event: 'Statutory hearing summons issued under Section 15(2)', actor: 'CALA / SDM Rajpura' },
        { date: '08 Jan 2026, 10:15 IST', event: 'Section 15 objection petition received and registered', actor: 'Revenue Registry Desk' }
      ]
    },
    {
      id: 'OBJ-2026-079',
      district: 'Surat',
      village: 'Mandi Gobindgarh',
      khasraNo: '119/1A',
      ulpin: '19U28746219809',
      claimant: 'Kulwant Singh & Brothers',
      category: 'Market Value Rate Dispute (Chahi vs Commercial Potential)',
      dateFiled: '22 Dec 2025',
      hearingDate: '18 Mar 2026',
      hearingTime: '02:30 PM',
      hearingVenue: 'Court of CALA / SDM Payal',
      presidingOfficer: 'Dr. Neha Sharma, PCS (CALA)',
      currentStatus: 'Under Review',
      hearingStatus: 'Scheduled',
      lastUpdated: '11 Sep 2026',
      lastUpdatedBy: 'Sub-Registrar (Sales Deeds Verification)',
      nextUpdate: 'Submission of 3-year verified sale deed average by Sub-Registrar',
      description: 'Claimants contend circle rate used is rural agricultural (₹48L/Ha) whereas land is situated on NH-48 frontage with commercial conversion potential. Demand ₹1.2 Cr/Ha based on registered sale deed dated 14-Oct-2024.',
      aiSummary: 'Section 26 Valuation Review: Preceding 3-year top 50% transactions within 1.5 km corridor average ₹62L/Ha.',
      priorityFlag: 'High Attention',
      documents: [
        { name: 'Form_B_Rate_Dispute_Petition.pdf', size: '2.2 MB', date: '22 Dec 2025', type: 'Objection Petition' },
        { name: 'Registered_Sale_Deed_Copy_2024.pdf', size: '3.8 MB', date: '28 Dec 2025', type: 'Supporting Evidence' }
      ],
      auditTrail: [
        { date: '11 Sep 2026, 16:30 IST', event: 'Sub-Registrar sale transaction report submitted to CALA', actor: 'Sub-Registrar Office' },
        { date: '18 Jan 2026, 14:00 IST', event: 'Preliminary hearing conducted; sales records summoned', actor: 'CALA Bench' },
        { date: '22 Dec 2025, 12:00 IST', event: 'Section 15 rate objection filed within statutory window', actor: 'Revenue Registry Desk' }
      ]
    },
    {
      id: 'OBJ-2026-064',
      district: 'Bharuch',
      village: 'Ghaggar Pind',
      khasraNo: '88/3',
      ulpin: '19U28746219815',
      claimant: 'Amrik Singh S/o Pritam Singh',
      category: 'Boundary Misalignment & Severance of Balance Land',
      dateFiled: '15 Nov 2025',
      hearingDate: '12 Jan 2026',
      hearingTime: '11:30 AM',
      hearingVenue: 'Court of CALA / SDM Ambala',
      presidingOfficer: 'Shri Vikramaditya Sen, IAS (CALA)',
      currentStatus: 'Closed',
      hearingStatus: 'Concluded',
      lastUpdated: '28 Jan 2026',
      lastUpdatedBy: 'District Collectorate (Speaking Order Passed)',
      nextUpdate: 'Speaking order incorporated into Section 19 final declaration',
      description: 'Expressway corridor bisects 5-acre agricultural holding into two non-viable slivers of 0.4 acre and 0.3 acre without canal irrigation access.',
      aiSummary: 'Section 94 Residual Parcel Acquisition: Statutory mandate requires whole parcel acquisition when severance leaves residual parcel unviable.',
      priorityFlag: 'Normal',
      documents: [
        { name: 'CALA_Speaking_Order_Sec15_064.pdf', size: '1.9 MB', date: '28 Jan 2026', type: 'Speaking Order' },
        { name: 'Amended_Cadastral_Map_Severance.pdf', size: '4.1 MB', date: '20 Jan 2026', type: 'GIS Map' }
      ],
      auditTrail: [
        { date: '28 Jan 2026, 17:00 IST', event: 'Speaking Order passed: Acquisition of residual 0.70 acre approved', actor: 'District Collector' },
        { date: '12 Jan 2026, 11:30 IST', event: 'Final hearing concluded with RB Chief Engineer attendance', actor: 'CALA Court' }
      ]
    },
    {
      id: 'OBJ-2026-092',
      district: 'Vadodara',
      village: 'Porbandar Rural',
      khasraNo: '204/B',
      ulpin: '19U28746219821',
      claimant: 'Hasmukhbhai Patel & 4 Legal Heirs',
      category: 'Co-Sharer Partition & Ownership Succession Dispute',
      dateFiled: '14 Jan 2026',
      hearingDate: '02 Apr 2026',
      hearingTime: '10:30 AM',
      hearingVenue: 'Court of CALA / Dy. Collector Vadodara',
      presidingOfficer: 'Smt. R. K. Desai, GAS (CALA)',
      currentStatus: 'Hearing Scheduled',
      hearingStatus: 'Scheduled',
      lastUpdated: '12 Sep 2026',
      lastUpdatedBy: 'Revenue Talati (Family Tree Verified)',
      nextUpdate: 'Pedhinama (Genealogy Verification) report submission by Mamlatdar',
      description: 'Dispute among legal heirs of deceased original titleholder regarding apportionment of compensation shares in 1.25 Ha parcel.',
      aiSummary: 'Section 64/76 Apportionment Reference: If title dispute remains contested before CALA, compensation will be deposited into Reference Court escrow.',
      priorityFlag: 'Medium Attention',
      documents: [
        { name: 'Succession_Claim_Pedhinama_Form.pdf', size: '1.1 MB', date: '14 Jan 2026', type: 'Succession Affidavit' },
        { name: 'Revenue_RoR_7_12_Extract.pdf', size: '1.8 MB', date: '18 Jan 2026', type: 'Land Record' }
      ],
      auditTrail: [
        { date: '12 Sep 2026, 14:10 IST', event: 'Mamlatdar genealogical inquiry report attached', actor: 'Revenue Talati' },
        { date: '15 Feb 2026, 11:00 IST', event: 'First joint hearing adjourned for heir affidavits', actor: 'CALA Bench' }
      ]
    },
    {
      id: 'OBJ-2026-095',
      district: 'Navsari',
      village: 'Fatehpur Gujran',
      khasraNo: '155/3',
      ulpin: '19U28746219830',
      claimant: 'Shree Krishna Gaushala Trust',
      category: 'Community & Religious Asset Preservation',
      dateFiled: '28 Jan 2026',
      hearingDate: '10 Apr 2026',
      hearingTime: '03:00 PM',
      hearingVenue: 'Court of CALA / SDM Navsari',
      presidingOfficer: 'Shri Amit Barot, GAS (CALA)',
      currentStatus: 'Under Review',
      hearingStatus: 'Pending Schedule',
      lastUpdated: '08 Sep 2026',
      lastUpdatedBy: 'NHAI Project Engineer (Alignment Review)',
      nextUpdate: 'Joint technical report on proposed service road 6m buffer shift',
      description: 'Trust states boundary fence encroaches on 200 sq.m perimeter shed of registered cow shelter. Requests minor 8-meter curve adjustment in service road alignment.',
      aiSummary: 'Alignment Feasibility: Curve modification under examination by Technical Consultant; does not impact main expressway RoW.',
      priorityFlag: 'High Attention',
      documents: [
        { name: 'Trust_Memorial_Objection_Petition.pdf', size: '2.5 MB', date: '28 Jan 2026', type: 'Objection Petition' },
        { name: 'Trust_Registration_TrustDeed.pdf', size: '3.1 MB', date: '30 Jan 2026', type: 'Trust Certificate' }
      ],
      auditTrail: [
        { date: '08 Sep 2026, 16:40 IST', event: 'Technical liaison memo sent by RB Project Director to CALA', actor: 'RB Project Director' },
        { date: '28 Jan 2026, 11:30 IST', event: 'Objection received from Gaushala trustees', actor: 'Revenue Desk' }
      ]
    },
    {
      id: 'OBJ-2026-101',
      district: 'Surat',
      village: 'Mandi Gobindgarh',
      khasraNo: '74/1',
      ulpin: '19U28746219837',
      claimant: 'Meena Ben Solanki',
      category: 'Borewell & Standing Tube-well Valuation Variance',
      dateFiled: '04 Feb 2026',
      hearingDate: '20 Feb 2026',
      hearingTime: '12:00 PM',
      hearingVenue: 'Court of CALA / SDM Surat South',
      presidingOfficer: 'Dr. Neha Sharma, PCS (CALA)',
      currentStatus: 'Outcome Awaited',
      hearingStatus: 'Order Reserved',
      lastUpdated: '13 Sep 2026',
      lastUpdatedBy: 'CALA Bench (Hearing Concluded)',
      nextUpdate: 'Pronouncement of Speaking Order under Section 15(2)',
      description: 'Claimant contends deep submersible tube-well (400 ft) and drip irrigation pipeline were omitted in initial joint measurement survey.',
      aiSummary: 'Asset Verification: Sub-divisional Agricultural Engineer verified existence of functional tube-well; estimated valuation variance is ₹3.20 Lakhs.',
      priorityFlag: 'Normal',
      documents: [
        { name: 'Agri_Engineer_TubeWell_Valuation.pdf', size: '1.6 MB', date: '05 Mar 2026', type: 'Valuation Memo' },
        { name: 'Electricity_Discom_Connection_Bill.pdf', size: '750 KB', date: '04 Feb 2026', type: 'Evidence' }
      ],
      auditTrail: [
        { date: '13 Sep 2026, 15:30 IST', event: 'Speaking order draft reserved for pronouncement', actor: 'CALA Bench' },
        { date: '20 Feb 2026, 12:00 IST', event: 'Personal hearing completed with claimant & SLAO', actor: 'CALA Court' }
      ]
    },
    {
      id: 'OBJ-2026-108',
      district: 'Bharuch',
      village: 'Ghaggar Pind',
      khasraNo: '112/5',
      ulpin: '19U28746219844',
      claimant: 'Tribal Welfare Co-op Society',
      category: 'Forest Rights & Community Common Land (FRA 2006)',
      dateFiled: '10 Feb 2026',
      hearingDate: '15 Mar 2026',
      hearingTime: '11:00 AM',
      hearingVenue: 'Court of CALA / Collectorate Bharuch',
      presidingOfficer: 'Shri Vikramaditya Sen, IAS (CALA)',
      currentStatus: 'Hearing Completed',
      hearingStatus: 'Order Reserved',
      lastUpdated: '14 Sep 2026',
      lastUpdatedBy: 'District Collectorate Desk',
      nextUpdate: 'District Level Committee (DLC) concurrence on FRA rights',
      description: 'Society claims community customary gathering rights under Forest Rights Act over 0.85 Ha gair mumkin land included in linear alignment.',
      aiSummary: 'Statutory FRA Compliance: Collectorate DLC verification underway; mandatory resolution before final Section 19 gazette.',
      priorityFlag: 'High Attention',
      documents: [
        { name: 'FRA_Community_Rights_Petition.pdf', size: '2.9 MB', date: '10 Feb 2026', type: 'FRA Petition' },
        { name: 'Gram_Sabha_Resolution_Signed.pdf', size: '1.4 MB', date: '12 Feb 2026', type: 'Panchayat Res' }
      ],
      auditTrail: [
        { date: '14 Sep 2026, 10:00 IST', event: 'District Forest Officer report summoned by Collector', actor: 'District Collector' },
        { date: '15 Mar 2026, 11:00 IST', event: 'Hearing conducted with Gram Sabha representatives', actor: 'CALA Bench' }
      ]
    },
    {
      id: 'OBJ-2026-114',
      district: 'Navsari',
      village: 'Fatehpur Gujran',
      khasraNo: '160/1',
      ulpin: '19U28746219851',
      claimant: 'Devangbhai Joshi',
      category: 'Classification Discrepancy (Jirayat vs Bagayat)',
      dateFiled: '18 Feb 2026',
      hearingDate: '—',
      hearingTime: '—',
      hearingVenue: 'Court of CALA / SDM Navsari',
      presidingOfficer: 'Shri Amit Barot, GAS (CALA)',
      currentStatus: 'Filed',
      hearingStatus: 'Pending Schedule',
      lastUpdated: '02 Sep 2026',
      lastUpdatedBy: 'SLAO Inward Desk (Filing Registered)',
      nextUpdate: 'Issuance of hearing notice under Section 15(2)',
      description: 'Petitioner asserts land has been perennial irrigated (Bagayat) since 2018 with registered canal water receipts, wrongly surveyed as seasonal dry (Jirayat).',
      aiSummary: 'Classification Verification: Revenue 5-year Pahani / Khasra Girdawari records to be authenticated by Mamlatdar.',
      priorityFlag: 'Normal',
      documents: [
        { name: 'Canal_Water_Duty_Receipts.pdf', size: '1.2 MB', date: '18 Feb 2026', type: 'Canal Receipts' }
      ],
      auditTrail: [
        { date: '02 Sep 2026, 09:45 IST', event: 'Scrutiny completed; listed for CALA hearing roster', actor: 'SLAO Reader' },
        { date: '18 Feb 2026, 14:20 IST', event: 'Objection registered at SDM Inward window', actor: 'Inward Registry' }
      ]
    }
  ];

  // State management
  const [objectionsList, setObjectionsList] = useState(initialObjections);
  const [selectedObjection, setSelectedObjection] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [villageFilter, setVillageFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [hearingFilter, setHearingFilter] = useState('ALL');
  const [dateRangeFilter, setDateRangeFilter] = useState('ALL');

  // Filter options derived from data
  const districts = useMemo(() => {
    return Array.from(new Set(objectionsList.map(o => o.district)));
  }, [objectionsList]);

  const villages = useMemo(() => {
    return Array.from(new Set(objectionsList.map(o => o.village)));
  }, [objectionsList]);

  // Filtered objections
  const filteredObjections = useMemo(() => {
    return objectionsList.filter(item => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.id.toLowerCase().includes(q) ||
          item.khasraNo.toLowerCase().includes(q) ||
          item.claimant.toLowerCase().includes(q) ||
          item.village.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // District
      if (districtFilter !== 'ALL' && item.district !== districtFilter) return false;
      // Village
      if (villageFilter !== 'ALL' && item.village !== villageFilter) return false;
      // Status
      if (statusFilter !== 'ALL' && item.currentStatus !== statusFilter) return false;
      // Hearing Status
      if (hearingFilter !== 'ALL' && item.hearingStatus !== hearingFilter) return false;

      return true;
    });
  }, [objectionsList, searchQuery, districtFilter, villageFilter, statusFilter, hearingFilter]);

  // Upcoming hearings (ordered with valid hearing dates)
  const upcomingHearings = useMemo(() => {
    return objectionsList
      .filter(o => o.hearingDate && o.hearingDate !== '—' && (o.hearingStatus === 'Scheduled' || o.hearingStatus === 'Order Reserved'))
      .sort((a, b) => a.hearingDate.localeCompare(b.hearingDate));
  }, [objectionsList]);

  // Summary counts
  const summaryCounts = useMemo(() => {
    const total = objectionsList.length;
    const pendingHearing = objectionsList.filter(o => o.currentStatus === 'Filed' || o.currentStatus === 'Under Review').length;
    const hearingsScheduled = objectionsList.filter(o => o.currentStatus === 'Hearing Scheduled').length;
    const awaitingOutcome = objectionsList.filter(o => o.currentStatus === 'Hearing Completed' || o.currentStatus === 'Outcome Awaited').length;
    return { total, pendingHearing, hearingsScheduled, awaitingOutcome };
  }, [objectionsList]);

  const handleRowClick = (objection) => {
    setSelectedObjection(objection);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${text} to clipboard`);
  };

  const handleFlagForNodal = (objectionId) => {
    showToast(`Flagged ${objectionId} for Requisitioning Body Nodal Legal Officer review.`);
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Closed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Closed</span>
          </span>
        );
      case 'Hearing Scheduled':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Hearing Scheduled</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Under Review</span>
          </span>
        );
      case 'Outcome Awaited':
      case 'Hearing Completed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200">
            <Info className="w-3 h-3 text-blue-600" />
            <span>{status}</span>
          </span>
        );
      case 'Filed':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Filed</span>
          </span>
        );
    }
  };

  return (
    <div id="objections-hearings-module-root" className="bg-[#f8fafc] text-slate-900 rounded-xl border border-slate-200/90 p-3 sm:p-5 lg:p-6 space-y-4 shadow-sm min-h-[calc(100vh-140px)] max-w-full overflow-x-hidden">
      
      {/* Top Header: Institutional Government Banner */}
      <div 
        id="objections-hearings-header"
        className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full max-w-full overflow-hidden"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
            <span>PORTAL</span>
            <span>/</span>
            <span>REQUISITION MONITORING</span>
            <span>/</span>
            <span className="text-[#1B365D]">MODULE 07: OBJECTIONS & HEARINGS</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-1">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              OBJECTIONS & HEARINGS
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold font-mono inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              SECTION 15 SURVEILLANCE
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-0.5">
            Section 15 Objection & Hearing Monitoring • Real-time tracking of landowner petitions and CALA proceedings
          </p>
        </div>

        {/* Current Proposal Context Box (Responsive) */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs flex flex-wrap items-center gap-3 md:gap-4 w-full xl:w-auto shrink min-w-0 max-w-full overflow-x-auto">
          <div className="min-w-0 shrink-0">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">PROPOSAL REF</div>
            <div className="font-mono font-bold text-[#1B365D] text-xs mt-0.5 truncate">NLAMS-RB-2026-00124</div>
          </div>
          <div className="hidden sm:block border-l border-slate-200 h-6 shrink-0"></div>
          <div className="min-w-0 max-w-xs truncate">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">PROJECT NAME</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5 truncate">National Highway Corridor (Vadodara - Surat)</div>
          </div>
          <div className="hidden sm:block border-l border-slate-200 h-6 shrink-0"></div>
          <div className="min-w-0 shrink-0">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">STATUTORY BENCH</div>
            <div className="font-semibold text-slate-700 text-xs mt-0.5 flex items-center gap-1 truncate">
              <Building2 className="w-3 h-3 text-[#1B365D] shrink-0" />
              <span className="truncate">CALA / SDM Courts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Compact Summary Indicators (3-4 small status summaries, NO charts, NO large KPI cards) */}
      <div 
        id="objections-compact-summary-row"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {/* Metric 1: Objections Filed */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Objections Filed
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {summaryCounts.total}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Registered Petitions</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 2: Pending Hearing */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Pending Hearing
            </div>
            <div className="text-xl font-bold font-mono text-amber-700 mt-0.5">
              {summaryCounts.pendingHearing}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Awaiting CALA Listing</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 3: Hearings Scheduled */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Hearings Scheduled
            </div>
            <div className="text-xl font-bold font-mono text-blue-700 mt-0.5">
              {summaryCounts.hearingsScheduled}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Notices Served</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 4: Awaiting Outcome */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Awaiting Outcome
            </div>
            <div className="text-xl font-bold font-mono text-slate-800 mt-0.5">
              {summaryCounts.awaitingOutcome}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Order Reserved</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Statutory Mandate Advisory Notice (Confirms RB Monitoring Role) */}
      <div 
        id="statutory-boundary-alert"
        className="bg-amber-50/70 border border-amber-200/90 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-900"
      >
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">
          <strong>Requisitioning Body Monitoring Protocol:</strong> Under Section 15 of RFCTLARR Act 2013 and Section 3C of NH Act 1956, statutory adjudication and speaking orders rest solely with the Competent Authority for Land Acquisition (CALA / District Collector). The Requisitioning Body monitors proceedings and coordinates technical or legal rebuttals through the designated Nodal Counsel.
        </div>
      </div>

      {/* Main Area: Section 15 Objection Register Data Table */}
      <div 
        id="section-15-objection-register-card"
        className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden"
      >
        {/* Table Header with Search & Filter Bar */}
        <div className="p-3.5 border-b border-slate-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1B365D]" />
                <span>Section 15 Objection Register</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive tracking of public objection petitions filed under Section 15(1)
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Showing <strong className="text-slate-900">{filteredObjections.length}</strong> of {objectionsList.length} Petitions
            </div>
          </div>

          {/* Filters Bar: District, Village, Status, Hearing Status, Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 pt-1">
            {/* Search Input */}
            <div className="relative sm:col-span-2 md:col-span-3 xl:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                id="search-objections-input"
                type="text"
                placeholder="Search by Objection Ref, Khasra, Claimant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs bg-slate-50/60 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#1B365D]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* District Filter */}
            <div>
              <select
                id="filter-district-select"
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full py-1.5 px-2.5 border border-slate-200 rounded text-xs bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
              >
                <option value="ALL">All Districts</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Village Filter */}
            <div>
              <select
                id="filter-village-select"
                value={villageFilter}
                onChange={(e) => setVillageFilter(e.target.value)}
                className="w-full py-1.5 px-2.5 border border-slate-200 rounded text-xs bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
              >
                <option value="ALL">All Villages</option>
                {villages.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Objection Status Filter */}
            <div>
              <select
                id="filter-status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-1.5 px-2.5 border border-slate-200 rounded text-xs bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
              >
                <option value="ALL">All Statuses</option>
                <option value="Filed">Filed</option>
                <option value="Under Review">Under Review</option>
                <option value="Hearing Scheduled">Hearing Scheduled</option>
                <option value="Hearing Completed">Hearing Completed</option>
                <option value="Outcome Awaited">Outcome Awaited</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1B365D] text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">Objection Reference</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Village</th>
                <th className="py-2.5 px-3">Land / Survey Ref</th>
                <th className="py-2.5 px-3">Date Filed</th>
                <th className="py-2.5 px-3">Hearing Date</th>
                <th className="py-2.5 px-3">Current Status</th>
                <th className="py-2.5 px-3">Last Updated</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredObjections.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 text-xs">
                    No objection petitions match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredObjections.map((item) => {
                  const isSelected = selectedObjection?.id === item.id && isDrawerOpen;
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => handleRowClick(item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-amber-50/80 hover:bg-amber-50' 
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Objection Reference */}
                      <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{item.id}</span>
                          {item.priorityFlag === 'High Attention' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="High Attention Required"></span>
                          )}
                        </div>
                      </td>

                      {/* District */}
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {item.district}
                      </td>

                      {/* Village */}
                      <td className="py-2.5 px-3 text-slate-600">
                        {item.village}
                      </td>

                      {/* Land / Survey Reference */}
                      <td className="py-2.5 px-3">
                        <span className="font-mono font-bold text-slate-800">Khasra {item.khasraNo}</span>
                        <div className="text-[10px] text-slate-400 font-mono">{item.ulpin}</div>
                      </td>

                      {/* Date Filed */}
                      <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                        {item.dateFiled}
                      </td>

                      {/* Hearing Date */}
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-800 whitespace-nowrap">
                        {item.hearingDate === '—' ? (
                          <span className="text-slate-400">Not scheduled</span>
                        ) : (
                          <span className="text-amber-800 font-semibold">{item.hearingDate}</span>
                        )}
                      </td>

                      {/* Current Status */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {getStatusBadge(item.currentStatus)}
                      </td>

                      {/* Last Updated */}
                      <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                        {item.lastUpdated}
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(item);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[#1B365D] font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3 h-3 text-slate-500" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hearing Information: Upcoming Hearings (Compact monitoring section on the SAME SCREEN) */}
      <div 
        id="upcoming-hearings-monitoring-section"
        className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1B365D]" />
            <h3 className="font-bold text-slate-900 text-sm">
              Upcoming Hearings Schedule (CALA Bench Surveillance)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Compact monitoring list • Requisitioning Body nodal representation schedule
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2 px-3">Date & Time</th>
                <th className="py-2 px-3">District</th>
                <th className="py-2 px-3">Village & Khasra</th>
                <th className="py-2 px-3">Objection Reference</th>
                <th className="py-2 px-3">Petitioner / Claimant</th>
                <th className="py-2 px-3">Hearing Venue / Court</th>
                <th className="py-2 px-3">Hearing Status</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {upcomingHearings.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    <span>{h.hearingDate}</span>
                    <span className="text-[10px] text-slate-500 font-normal ml-1.5">{h.hearingTime}</span>
                  </td>

                  <td className="py-2 px-3 text-slate-800 font-medium">
                    {h.district}
                  </td>

                  <td className="py-2 px-3 text-slate-700">
                    <span>{h.village}</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-1.5">(Kh {h.khasraNo})</span>
                  </td>

                  <td className="py-2 px-3 font-mono font-bold text-[#1B365D]">
                    {h.id}
                  </td>

                  <td className="py-2 px-3 text-slate-800 font-medium max-w-xs truncate">
                    {h.claimant}
                  </td>

                  <td className="py-2 px-3 text-slate-600 text-[11px] max-w-xs truncate">
                    {h.hearingVenue}
                  </td>

                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 ${
                      h.hearingStatus === 'Scheduled'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{h.hearingStatus}</span>
                    </span>
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleRowClick(h)}
                      className="text-slate-600 hover:text-[#1B365D] font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPACT RIGHT-SIDE CONTEXTUAL DRAWER (VIEW-ORIENTED, STRICTLY NO STATUTORY DECISION BUTTONS) */}
      {isDrawerOpen && selectedObjection && (
        <div 
          id="objection-contextual-drawer-overlay"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end transition-opacity duration-200"
          onClick={closeDrawer}
        >
          <div 
            id="objection-contextual-drawer-body"
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden text-slate-900 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                    OBJECTION DOSSIER
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono font-bold text-sm text-white">
                    {selectedObjection.id}
                  </span>
                </div>
                <div className="text-xs text-slate-200 mt-0.5 flex items-center gap-1.5">
                  <span>Khasra {selectedObjection.khasraNo}</span>
                  <span>•</span>
                  <span>{selectedObjection.village} ({selectedObjection.district})</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedObjection.id)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Copy Reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Close Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {/* Section 1: Petitioner & Land Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    PETITIONER & LAND REFERENCE
                  </span>
                  {getStatusBadge(selectedObjection.currentStatus)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Petitioner / Claimant</span>
                    <strong className="text-slate-900 block mt-0.5">{selectedObjection.claimant}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ULPIN Unique Id</span>
                    <strong className="font-mono text-slate-900 block mt-0.5">{selectedObjection.ulpin}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Date Filed (Sec 15)</span>
                    <strong className="font-mono text-slate-900 block mt-0.5">{selectedObjection.dateFiled}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Jurisdiction</span>
                    <strong className="text-slate-900 block mt-0.5">{selectedObjection.village}, {selectedObjection.district}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Grounds of Objection */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  GROUNDS OF OBJECTION (FORM-B SUBMISSION)
                </span>
                <div className="bg-white border border-slate-200 rounded-lg p-3 text-slate-800 leading-relaxed shadow-2xs">
                  <div className="font-semibold text-slate-900 pb-1.5 mb-1.5 border-b border-slate-100">
                    {selectedObjection.category}
                  </div>
                  <p className="text-slate-700 text-xs">
                    {selectedObjection.description}
                  </p>
                </div>
              </div>

              {/* Section 3: Statutory Process Progression */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  STATUTORY PROCESS PROGRESSION (RFCTLARR SEC 15)
                </span>

                {/* Micro Progression Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-medium text-slate-600 font-mono">
                    <span className="text-emerald-700 font-bold">1. Filed</span>
                    <span className="text-emerald-700 font-bold">2. Scrutiny</span>
                    <span className={selectedObjection.hearingDate !== '—' ? 'text-amber-800 font-bold' : 'text-slate-400'}>3. Hearing</span>
                    <span className={selectedObjection.currentStatus === 'Closed' ? 'text-emerald-700 font-bold' : 'text-slate-400'}>4. Order</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1B365D] transition-all"
                      style={{ 
                        width: selectedObjection.currentStatus === 'Closed' ? '100%' :
                               selectedObjection.currentStatus === 'Outcome Awaited' ? '80%' :
                               selectedObjection.currentStatus === 'Hearing Scheduled' ? '60%' : '35%'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hearing Date & Time</span>
                    <strong className="font-mono text-slate-900 block mt-0.5">
                      {selectedObjection.hearingDate} {selectedObjection.hearingTime !== '—' && `(${selectedObjection.hearingTime})`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Presiding Statutory Authority</span>
                    <strong className="text-slate-900 block mt-0.5">{selectedObjection.presidingOfficer}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block">Next Expected Update</span>
                    <strong className="text-slate-800 block mt-0.5 font-normal">{selectedObjection.nextUpdate}</strong>
                  </div>
                </div>
              </div>

              {/* Section 4: Subtle AI Advisory Flag (Advisory Only, Never Decisional) */}
              <div className="bg-amber-50/60 border border-amber-200/90 rounded-lg p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI Advisory Assessment (Bhumi Mitra)</span>
                  </div>
                  <span className="px-2 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold font-mono">
                    ADVISORY ONLY
                  </span>
                </div>
                <p className="text-amber-950 text-xs leading-relaxed">
                  {selectedObjection.aiSummary}
                </p>
                <div className="text-[10px] text-amber-800/80 pt-0.5">
                  Advisory note for Requisitioning Body counsel. Statutory speaking orders are solely pronounced by CALA.
                </div>
              </div>

              {/* Section 5: Available Related Documents */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  AVAILABLE RELATED DOCUMENTS ({selectedObjection.documents?.length || 0})
                </span>
                <div className="space-y-1.5">
                  {selectedObjection.documents?.map((doc, idx) => (
                    <div 
                      key={idx}
                      className="border border-slate-200 rounded-lg p-2.5 bg-white flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900 truncate max-w-xs">{doc.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{doc.size} • {doc.date} • {doc.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => showToast(`Opening preview of ${doc.name}`)}
                          className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => showToast(`Downloading ${doc.name}`)}
                          className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: Status History & Audit Updates */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  STATUS HISTORY & AUDIT TRAIL
                </span>
                <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2.5">
                  {selectedObjection.auditTrail?.map((entry, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B365D] mt-1.5 shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-slate-800 font-medium">{entry.event}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {entry.date} • Authority: {entry.actor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions (STRICTLY NON-DECISIONAL RB ACTIONS) */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={() => handleFlagForNodal(selectedObjection.id)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                <span>Flag for Nodal Officer</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    showToast(`Exported briefing brief for ${selectedObjection.id}`);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export Brief</span>
                </button>

                <button
                  onClick={closeDrawer}
                  className="bg-[#1B365D] hover:bg-[#142a4a] text-white px-4 py-1.5 rounded text-xs font-semibold transition-colors"
                >
                  <span>Close Drawer</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
