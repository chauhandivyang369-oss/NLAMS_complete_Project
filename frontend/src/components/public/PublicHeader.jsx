import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShieldCheck, 
  MapPin, 
  Compass, 
  Bell, 
  Lock, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calculator,
  FileText,
  Users,
  BookOpen,
  Info,
  Scale,
  Landmark,
  Building,
  HelpCircle,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone
} from 'lucide-react';

export default function PublicHeader({
  activeTab,
  setActiveTab,
  onOpenOfficerLogin,
  onLaunchCitizenWorkspace
}) {
  // Navigation states
  const [activeMainMenu, setActiveMainMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeThirdMenu, setActiveThirdMenu] = useState(null);
  const [flyoutPosition, setFlyoutPosition] = useState('right'); // 'right' | 'left'
  
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavPath, setMobileNavPath] = useState([]); // Stack for drill-down navigation
  
  // Utility search overlay state
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  // Information modal state
  const [infoModalData, setInfoModalData] = useState(null);

  const navRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMainMenu(null);
        setActiveSubMenu(null);
        setActiveThirdMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation: Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (searchOverlayOpen) {
          setSearchOverlayOpen(false);
        } else if (infoModalData) {
          setInfoModalData(null);
        } else if (activeThirdMenu) {
          setActiveThirdMenu(null);
        } else if (activeSubMenu) {
          setActiveSubMenu(null);
        } else {
          setActiveMainMenu(null);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOverlayOpen, infoModalData, activeThirdMenu, activeSubMenu]);

  // Focus input when search overlay opens
  useEffect(() => {
    if (searchOverlayOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOverlayOpen]);

  // Check screen edge position for flyouts
  const handleSubMenuHover = (itemId, event) => {
    setActiveSubMenu(itemId);
    setActiveThirdMenu(null);
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const flyoutWidth = 260; // Estimated flyout width
      if (rect.right + flyoutWidth > window.innerWidth) {
        setFlyoutPosition('left');
      } else {
        setFlyoutPosition('right');
      }
    }
  };

  const handleThirdMenuHover = (itemId) => {
    setActiveThirdMenu(itemId);
  };

  // Action dispatcher when menu item is clicked
  const handleItemClick = (item) => {
    setActiveMainMenu(null);
    setActiveSubMenu(null);
    setActiveThirdMenu(null);
    setMobileMenuOpen(false);
    setMobileNavPath([]);

    if (item.tab) {
      setActiveTab(item.tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.action === 'login') {
      onOpenOfficerLogin();
    } else if (item.action === 'citizen') {
      onLaunchCitizenWorkspace();
    } else if (item.action === 'search') {
      setSearchOverlayOpen(true);
    } else if (item.info) {
      setInfoModalData(item.info);
    } else {
      // Default info dialog for statutory items
      setInfoModalData({
        title: item.label,
        category: item.category || 'Statutory Land Acquisition Reference',
        content: item.description || `Official public statutory information and procedures for "${item.label}" governed under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR).`,
        sections: item.sections || [
          { title: 'Statutory Authority', text: 'Department of Land Resources (DoLR), Ministry of Rural Development & Appropriate State Revenue Authority.' },
          { title: 'Citizen & Landowner Rights', text: 'All recorded Khatedars, tenants, and affected families are entitled to statutory notices, Section 15 objection hearings, and award compensation under Sections 26–30.' }
        ],
        targetTab: item.suggestedTab || null,
        tabLabel: item.suggestedTabLabel || null
      });
    }
  };

  // 10 Level-1 Menu Data Structure
  const menuData = [
    {
      id: 'home',
      label: 'Home',
      onClick: () => {
        setActiveTab('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'about',
      label: 'About NLAMS',
      children: [
        {
          id: 'about-nlams-info',
          label: 'About NLAMS',
          info: {
            title: 'About NLAMS',
            category: 'National Portal Overview',
            content: 'The National Land Acquisition & Management System (NLAMS) is India\'s unified national digital infrastructure designed to govern the statutory end-to-end lifecycle of land acquisition under the RFCTLARR Act, 2013. It integrates cadastral GIS parcel mapping with DGPS, automated statutory SLA timers, Section 15 objection management, and direct DBT compensation into Khatedar bank accounts.',
            sections: [
              { title: 'Mandate', text: 'Enacted to establish transparency, eliminate delay penalties, and guarantee statutory rehabilitation entitlements for all affected citizens.' },
              { title: 'Core Coverage', text: 'Covers linear mega-corridors (railways, highways, expressways), industrial zones, irrigation projects, and strategic defense acquisitions across all States and Union Territories.' }
            ]
          }
        },
        {
          id: 'vision-objectives',
          label: 'Vision & Objectives',
          info: {
            title: 'Vision & Strategic Objectives',
            category: 'Policy & Governance',
            content: 'To deliver transparent, spatial-first, and legally compliant land acquisition governance that protects the rights of landholders while expediting national development infrastructure.',
            sections: [
              { title: 'Zero Lapsing Guarantee', text: 'Prevent statutory lapsing under Sections 19, 25, and 38 through automated digital countdown timers and automated alerts.' },
              { title: '100% Direct DBT', text: 'Direct credit of award compensation, solatium, and interest into Khatedars\' verified bank accounts via PFMS integration.' },
              { title: 'Public Transparency', text: 'Public gazette notifications, interactive cadastral GIS tracking, and transparent compensation explainers.' }
            ]
          }
        },
        {
          id: 'institutional-framework',
          label: 'Institutional Framework',
          hasChildren: true,
          children: [
            { id: 'inst-ministry', label: 'Ministry / Department', info: { title: 'Ministry of Rural Development (DoLR)', content: 'The Department of Land Resources (DoLR) serves as the nodal central authority overseeing policy, statutory compliance, and national portal aggregation.' } },
            { id: 'inst-app-govt', label: 'Appropriate Government', info: { title: 'Appropriate Government Mandate', content: 'As defined under Section 3(e) of the Act, representing Central or State Governments empowered to initiate requisitions and issue Section 11/19 declarations.' } },
            { id: 'inst-district-admin', label: 'District Administration', info: { title: 'District Collector & SLAO', content: 'The District Collector acts as the statutory custodian, appointing Special Land Acquisition Officers (SLAO) and CALA to execute field surveys, hearings, and awards.' } },
            { id: 'inst-requiring-bodies', label: 'Requiring Bodies', info: { title: 'Requiring Bodies (NHAI, DFCCIL, MoRTH)', content: 'Agencies submitting requisitions, depositing project escrow funds, and monitoring linear corridor handover milestones.' } },
            { id: 'inst-statutory-auth', label: 'Statutory Authorities', info: { title: 'Land Acquisition & R&R Authority', content: 'Judicial bodies established under Section 51 of the Act for hearing references, title disputes, and compensation enhancement appeals.' } }
          ]
        },
        {
          id: 'stakeholders',
          label: 'Stakeholders',
          hasChildren: true,
          children: [
            { id: 'stk-citizens', label: 'Citizens', tab: 'track-land' },
            { id: 'stk-landowners', label: 'Landowners / Khatedars', tab: 'track-land' },
            { id: 'stk-affected-families', label: 'Affected Families', tab: 'rnr-passbook' },
            { id: 'stk-govt-auth', label: 'Government Authorities', action: 'login' },
            { id: 'stk-requiring-bodies', label: 'Requiring Bodies', action: 'login' },
            { id: 'stk-project-agencies', label: 'Project Agencies', action: 'login' }
          ]
        },
        {
          id: 'portal-info',
          label: 'Portal Information',
          info: {
            title: 'Technical & Operational Architecture',
            category: 'System Information',
            content: 'NLAMS is hosted on secure NIC cloud infrastructure featuring end-to-end DILRMP sync, 256-bit encryption, cryptographic DSC signing of Gazette awards, and WCAG 2.1 AA accessibility compliance.'
          }
        },
        {
          id: 'contact-directory',
          label: 'Contact & Directory',
          info: {
            title: 'Statutory Helpdesk & State Directories',
            category: 'National Contact Centre',
            content: 'Central Helpline: 1800-11-NLAMS (6526) | Email: support-nlams@gov.in | Address: Department of Land Resources, NBO Building, Nirman Bhawan, New Delhi - 110011.'
          }
        }
      ]
    },
    {
      id: 'acquisition-rnr',
      label: 'Land Acquisition & R&R',
      children: [
        {
          id: 'acq-process',
          label: 'Acquisition Process',
          hasChildren: true,
          children: [
            { id: 'proc-init', label: 'Project Initiation', info: { title: 'Stage 1: Requisition & Approval', content: 'Requiring Body submits formal requisition with corridor alignment and cost-benefit analysis.' } },
            { id: 'proc-sia', label: 'SIA Study & Public Hearing', info: { title: 'Stage 2: Social Impact Assessment', content: 'Social Impact Assessment conducted under Section 4 within 6 months, followed by mandatory public hearings.' } },
            { id: 'proc-hearing', label: 'Public Hearing Log', info: { title: 'Stage 3: Public Consultations', content: 'Video-recorded open consultations held in affected Panchayats to document affected families\' inputs.' } },
            { id: 'proc-sec11', label: 'Preliminary Notification (Sec 11)', tab: 'gazette-vault' },
            { id: 'proc-objections', label: 'Objections (Sec 15)', tab: 'track-land' },
            { id: 'proc-sec19', label: 'Declaration (Sec 19)', tab: 'gazette-vault' },
            { id: 'proc-award', label: 'Award & Compensation (Sec 23-30)', tab: 'compensation' },
            { id: 'proc-possession', label: 'Rehabilitation & Resettlement', tab: 'rnr-passbook' }
          ]
        },
        {
          id: 'sia-public',
          label: 'SIA & Public Participation',
          hasChildren: true,
          children: [
            { id: 'sia-study', label: 'Social Impact Assessment', info: { title: 'Social Impact Assessment', content: 'Comprehensive independent evaluation of potential impact on livelihood, community assets, and social ecology.' } },
            { id: 'sia-ieg', label: 'Expert Group / IEG', info: { title: 'Independent Expert Group', content: 'Multidisciplinary committee evaluating whether project serves bona fide public purpose under Section 7.' } },
            { id: 'sia-hearings', label: 'Public Hearing Proceedings', info: { title: 'Public Hearing Logs', content: 'Citizen submissions and audio-visual recordings deposited into the public audit record.' } },
            { id: 'sia-consult', label: 'Panchayat Consultations', info: { title: 'Local Governance Consultations', content: 'Gram Sabha consents and resolutions documented in scheduled areas (PESA Act alignment).' } },
            { id: 'sia-docs', label: 'SIA Published Documents', tab: 'gazette-vault' }
          ]
        },
        {
          id: 'notif-decl',
          label: 'Notification & Declaration',
          hasChildren: true,
          children: [
            { id: 'nd-prelim', label: 'Preliminary Notification (Sec 11)', tab: 'gazette-vault' },
            { id: 'nd-obj', label: 'Objection Filing (Sec 15)', tab: 'track-land' },
            { id: 'nd-decl', label: 'Declaration (Sec 19)', tab: 'gazette-vault' },
            { id: 'nd-gaz', label: 'Gazette Publication Vault', tab: 'gazette-vault' },
            { id: 'nd-search', label: 'Notification Search', tab: 'gazette-vault' }
          ]
        },
        {
          id: 'compensation-menu',
          label: 'Compensation',
          hasChildren: true,
          children: [
            { id: 'comp-overview', label: 'Compensation Overview', tab: 'compensation' },
            { id: 'comp-mv', label: 'Market Value Determination', tab: 'compensation' },
            { id: 'comp-stat', label: 'Statutory Components (Solatium 100%)', tab: 'compensation' },
            { id: 'comp-award', label: 'Award Information (Sec 23)', tab: 'compensation' },
            { id: 'comp-payment', label: 'Payment Status & DBT', tab: 'compensation' },
            { id: 'comp-explainer', label: 'Statutory Compensation Calculator', tab: 'compensation' }
          ]
        },
        {
          id: 'rnr-menu',
          label: 'Rehabilitation & Resettlement',
          hasChildren: true,
          children: [
            { id: 'rnr-overview', label: 'R&R Overview', tab: 'rnr-passbook' },
            { id: 'rnr-entitlements', label: 'Second Schedule Entitlements', tab: 'rnr-passbook' },
            { id: 'rnr-families', label: 'Affected Families Registry', tab: 'rnr-passbook' },
            { id: 'rnr-resettle', label: 'Resettlement Colony Amenities', tab: 'rnr-passbook' },
            { id: 'rnr-passbook-action', label: 'Digital R&R Passbook', tab: 'rnr-passbook' },
            { id: 'rnr-status-action', label: 'R&R Disbursement Status', tab: 'rnr-passbook' }
          ]
        },
        {
          id: 'acq-timeline',
          label: 'Land Acquisition Timeline',
          info: {
            title: 'Statutory Timeline (RFCTLARR Act)',
            content: 'SIA: 6 Months | Sec 11 to Sec 19 Declaration: 12 Months | Sec 19 to Sec 23 Award: 12 Months | Possession: Only upon full compensation deposit.'
          }
        },
        {
          id: 'acq-faq',
          label: 'Frequently Asked Questions',
          info: {
            title: 'Statutory FAQ for Citizens',
            content: 'Questions covering valuation formulas, multiplier factors (1.0x to 2.0x), mandatory 100% Solatium, interest under Section 30(3), and tribunal appeals under Section 64.'
          }
        }
      ]
    },
    {
      id: 'gis-records',
      label: 'GIS & Land Records',
      children: [
        {
          id: 'gis-public-map',
          label: 'Public GIS Map',
          hasChildren: true,
          children: [
            { id: 'gis-proj-map', label: 'Project Corridor Map', tab: 'gis-explorer' },
            { id: 'gis-parcels', label: 'Acquisition Parcels Overlay', tab: 'gis-explorer' },
            { id: 'gis-survey-search', label: 'Survey Number Search', tab: 'gis-explorer' },
            { id: 'gis-ulpin-search', label: 'ULPIN Bhu-Aadhaar Search', tab: 'gis-explorer' },
            { id: 'gis-village-search', label: 'Village / Tehsil Boundary', tab: 'gis-explorer' },
            { id: 'gis-layers', label: 'Bhuvan / Cadastral Map Layers', tab: 'gis-explorer' }
          ]
        },
        {
          id: 'gis-parcel-search',
          label: 'Parcel Search',
          hasChildren: true,
          children: [
            { id: 'ps-survey', label: 'By Survey / Khasra Number', tab: 'gis-explorer' },
            { id: 'ps-ulpin', label: 'By 14-Digit ULPIN', tab: 'gis-explorer' },
            { id: 'ps-village', label: 'By Village & Tehsil', tab: 'gis-explorer' },
            { id: 'ps-district', label: 'By District Administration', tab: 'gis-explorer' },
            { id: 'ps-project', label: 'By Linear Project Corridor', tab: 'gis-explorer' }
          ]
        },
        {
          id: 'gis-ulpin-bhu',
          label: 'ULPIN / Bhu-Aadhaar',
          tab: 'track-land'
        },
        {
          id: 'gis-land-records',
          label: 'Land Records',
          hasChildren: true,
          children: [
            { id: 'lr-info', label: 'Record of Rights (RoR) Info', tab: 'track-land' },
            { id: 'lr-survey', label: 'Cadastral Map Vector Data', tab: 'gis-explorer' },
            { id: 'lr-ulpin-info', label: 'ULPIN Authentication Gateway', tab: 'track-land' },
            { id: 'lr-state-services', label: 'State Revenue Portal Links', info: { title: 'State DILRMP Portals', content: 'Direct gateways to Bhulekh (UP), AnyROR (Gujarat), Mahabhumi (Maharashtra), and Dharani (Telangana).' } }
          ]
        },
        {
          id: 'gis-spatial-explorer',
          label: 'Spatial Explorer',
          tab: 'gis-explorer'
        },
        {
          id: 'gis-admin-bounds',
          label: 'Administrative Boundaries',
          tab: 'gis-explorer'
        }
      ]
    },
    {
      id: 'public-services',
      label: 'Public Services',
      children: [
        {
          id: 'ps-track-land',
          label: 'Track My Land',
          hasChildren: true,
          children: [
            { id: 'tml-ulpin', label: 'Search by 14-Digit ULPIN', tab: 'track-land' },
            { id: 'tml-survey', label: 'Search by Survey / Khasra No', tab: 'track-land' },
            { id: 'tml-project', label: 'Search by Project ID', tab: 'track-land' },
            { id: 'tml-status', label: 'Land Acquisition Lifecycle Status', tab: 'track-land' },
            { id: 'tml-stage', label: 'Check Current Statutory Stage', tab: 'track-land' }
          ]
        },
        {
          id: 'ps-proj-search',
          label: 'Project Search',
          hasChildren: true,
          children: [
            { id: 'pps-id', label: 'Search by Project ID', tab: 'track-land' },
            { id: 'pps-name', label: 'Search by Project Name', tab: 'track-land' },
            { id: 'pps-state', label: 'State-wise Project Catalog', tab: 'track-land' },
            { id: 'pps-dist', label: 'District Project Dashboard', tab: 'track-land' },
            { id: 'pps-status', label: 'Live Corridor Status', tab: 'track-land' }
          ]
        },
        {
          id: 'ps-comp-info',
          label: 'Compensation Information',
          hasChildren: true,
          children: [
            { id: 'pci-calc', label: 'Online Statutory Calculator', tab: 'compensation' },
            { id: 'pci-guide', label: 'Valuation & Multiplier Rules', tab: 'compensation' },
            { id: 'pci-solatium', label: 'Mandatory 100% Solatium', tab: 'compensation' },
            { id: 'pci-interest', label: '12% Additional Market Value', tab: 'compensation' }
          ]
        },
        {
          id: 'ps-rnr-info',
          label: 'R&R Information',
          hasChildren: true,
          children: [
            { id: 'pri-ent', label: 'Second Schedule Entitlements', tab: 'rnr-passbook' },
            { id: 'pri-schemes', label: 'Resettlement Housing Schemes', tab: 'rnr-passbook' },
            { id: 'pri-passbook', label: 'Citizen R&R Passbook Check', tab: 'rnr-passbook' }
          ]
        },
        { id: 'ps-gis-map-link', label: 'Public GIS Map', tab: 'gis-explorer' },
        { id: 'ps-notif-link', label: 'Public Notifications', tab: 'gazette-vault' },
        {
          id: 'ps-objections',
          label: 'Objection / Grievance',
          hasChildren: true,
          children: [
            { id: 'pso-sec15', label: 'Section 15 Statutory Objection Info', tab: 'track-land' },
            { id: 'pso-submit', label: 'File Online Objection (Requires Login)', action: 'citizen' },
            { id: 'pso-grievance', label: 'Register Public Grievance', info: { title: 'Public Grievance Portal', content: 'Citizens may lodge statutory grievances regarding survey boundary errors, Khatedar ownership omissions, or delayed awards.' } },
            { id: 'pso-track', label: 'Track Grievance Docket', tab: 'track-land' }
          ]
        },
        {
          id: 'ps-doc-verify',
          label: 'Document Verification',
          hasChildren: true,
          children: [
            { id: 'pdv-notif', label: 'Verify Section 11 Notification', tab: 'gazette-vault' },
            { id: 'pdv-gazette', label: 'Verify Digital e-Gazette Signature', tab: 'gazette-vault' },
            { id: 'pdv-award', label: 'Verify Section 23 Award Seal', tab: 'compensation' }
          ]
        }
      ]
    },
    {
      id: 'acts-rules',
      label: 'Acts, Rules & Policies',
      children: [
        {
          id: 'act-rfctlarr-2013',
          label: 'RFCTLARR Act, 2013',
          hasChildren: true,
          children: [
            { id: 'act-overview', label: 'Act Overview & Preamble', info: { title: 'RFCTLARR Act, 2013 Overview', content: 'An Act to ensure, in consultation with institutions of local self-government and Gram Sabhas established under the Constitution, a humane, participatory, informed and transparent process for land acquisition.' } },
            { id: 'act-defs', label: 'Key Definitions (Section 3)', info: { title: 'Statutory Definitions', content: 'Defines Affected Family, Agricultural Land, Appropriate Government, Collector, Displaced Family, Requiring Body, and Resettlement Area.' } },
            {
              id: 'act-sia-prov',
              label: 'SIA Provisions',
              hasChildren: true,
              children: [
                { id: 'act-sec4', label: 'Section 4: Preparation of SIA Study', info: { title: 'Section 4 SIA', content: 'Mandatory social impact assessment before notification, mapping livelihood impacts and multi-crop land restrictions.' } },
                { id: 'act-sec7', label: 'Section 7: Expert Group Evaluation', info: { title: 'Section 7 IEG', content: 'Independent Expert Group recommendation on whether public purpose justifies acquisition.' } }
              ]
            },
            {
              id: 'act-sec11-prov',
              label: 'Preliminary Notification',
              hasChildren: true,
              children: [
                { id: 'act-sec11', label: 'Section 11: Gazette Notification', tab: 'gazette-vault' },
                { id: 'act-sec12', label: 'Section 12: Preliminary Survey Rights', info: { title: 'Section 12', content: 'Authorized surveyor powers to enter, survey, and mark cadastral boundaries.' } }
              ]
            },
            {
              id: 'act-sec15-prov',
              label: 'Objections & Hearings',
              hasChildren: true,
              children: [
                { id: 'act-sec15', label: 'Section 15: Hearing of Objections', tab: 'track-land' },
                { id: 'act-sec15-2', label: 'Collector Report to Government', tab: 'track-land' }
              ]
            },
            {
              id: 'act-sec19-prov',
              label: 'Declaration & Award',
              hasChildren: true,
              children: [
                { id: 'act-sec19', label: 'Section 19: Final Declaration', tab: 'gazette-vault' },
                { id: 'act-sec23', label: 'Section 23: Collector Award', tab: 'compensation' },
                { id: 'act-sec26', label: 'Section 26-30: Compensation Matrix', tab: 'compensation' }
              ]
            },
            {
              id: 'act-rnr-prov',
              label: 'R&R Provisions',
              hasChildren: true,
              children: [
                { id: 'act-sec31', label: 'Section 31: R&R Scheme Formulation', tab: 'rnr-passbook' },
                { id: 'act-sec38', label: 'Section 38: Power to Take Possession', tab: 'rnr-passbook' }
              ]
            }
          ]
        },
        { id: 'act-rules-2015', label: 'RFCTLARR Rules, 2015', info: { title: 'RFCTLARR Compensation & R&R Rules, 2015', content: 'Central statutory rules governing the calculation of multiplier factor, procedure of SIA, expert group functioning, and tribunal docket management.' } },
        { id: 'act-sia-frame', label: 'SIA Framework Guidelines', info: { title: 'DoLR Social Impact Assessment Manual', content: 'National handbook for conducting socio-economic census, video-recorded public hearings, and mitigating displacement risks.' } },
        { id: 'act-rnr-frame', label: 'R&R Policy Framework', tab: 'rnr-passbook' },
        { id: 'act-notifications', label: 'Government Notifications', tab: 'gazette-vault' },
        { id: 'act-guidelines', label: 'Rules & Guidelines Repository', tab: 'gazette-vault' },
        { id: 'act-policies', label: 'National Policies on Linear Projects', info: { title: 'Linear Projects Policy', content: 'Special provisions for Railways, Expressways, and Energy corridors ensuring accelerated statutory execution without compromising Khatedar solatium.' } }
      ]
    },
    {
      id: 'projects-status',
      label: 'Projects & Status',
      children: [
        {
          id: 'ps-search-proj',
          label: 'Project Search',
          hasChildren: true,
          children: [
            { id: 'proj-wdfc', label: 'Western Dedicated Freight Corridor (WDFC)', tab: 'track-land' },
            { id: 'proj-mahsr', label: 'Mumbai-Ahmedabad High Speed Rail (MAHSR)', tab: 'track-land' },
            { id: 'proj-dme', label: 'Delhi-Mumbai Expressway', tab: 'track-land' },
            { id: 'proj-jewar', label: 'Jewar International Airport Corridor', tab: 'track-land' },
            { id: 'proj-nh48', label: 'NH-48 Expressway Expansion', tab: 'track-land' }
          ]
        },
        { id: 'ps-nat-overview', label: 'National Project Overview', tab: 'overview' },
        {
          id: 'ps-state-proj',
          label: 'State-wise Projects',
          hasChildren: true,
          children: [
            { id: 'sp-gujarat', label: 'Gujarat (28 Projects)', tab: 'gis-explorer' },
            { id: 'sp-maharashtra', label: 'Maharashtra (34 Projects)', tab: 'gis-explorer' },
            { id: 'sp-up', label: 'Uttar Pradesh (42 Projects)', tab: 'gis-explorer' },
            { id: 'sp-mp', label: 'Madhya Pradesh (26 Projects)', tab: 'gis-explorer' },
            { id: 'sp-rajasthan', label: 'Rajasthan (22 Projects)', tab: 'gis-explorer' }
          ]
        },
        { id: 'ps-dist-proj', label: 'District-wise Projects', tab: 'gis-explorer' },
        {
          id: 'ps-acq-status',
          label: 'Acquisition Status',
          hasChildren: true,
          children: [
            { id: 'as-sec11', label: 'Preliminary Notification (Sec 11)', tab: 'gazette-vault' },
            { id: 'as-sia', label: 'SIA Scrutiny Completed', tab: 'track-land' },
            { id: 'as-sec19', label: 'Declaration Sealed (Sec 19)', tab: 'gazette-vault' },
            { id: 'as-award', label: 'Award Finalized (Sec 23)', tab: 'compensation' },
            { id: 'as-possession', label: 'Possession Completed (Sec 38)', tab: 'rnr-passbook' }
          ]
        },
        { id: 'ps-rnr-status', label: 'R&R Status Tracker', tab: 'rnr-passbook' },
        { id: 'ps-comp-status', label: 'Compensation Disbursement Status', tab: 'compensation' }
      ]
    },
    {
      id: 'notif-gazette',
      label: 'Notifications & Gazette',
      children: [
        { id: 'ng-latest', label: 'Latest Notifications', tab: 'gazette-vault' },
        { id: 'ng-sec11', label: 'Section 11 Notifications', tab: 'gazette-vault' },
        { id: 'ng-sec19', label: 'Section 19 Declarations', tab: 'gazette-vault' },
        {
          id: 'ng-gazette-pubs',
          label: 'Gazette Publications',
          hasChildren: true,
          children: [
            { id: 'gp-central', label: 'The Gazette of India (Central)', tab: 'gazette-vault' },
            { id: 'gp-state', label: 'State Government Extraordinary Gazettes', tab: 'gazette-vault' },
            { id: 'gp-project', label: 'Project-wise Gazette Bulletins', tab: 'gazette-vault' },
            { id: 'gp-search', label: 'Search Gazette Number', tab: 'gazette-vault' },
            { id: 'gp-download', label: 'Download Signed e-Gazette PDF', tab: 'gazette-vault' }
          ]
        },
        { id: 'ng-gov-orders', label: 'Government Orders (GOs)', tab: 'gazette-vault' },
        { id: 'ng-notices', label: 'Public Notices & Corrigenda', tab: 'gazette-vault' },
        { id: 'ng-search', label: 'Gazette Notification Search', tab: 'gazette-vault' }
      ]
    },
    {
      id: 'reports-data',
      label: 'Reports & Data',
      children: [
        { id: 'rd-nat-stats', label: 'National Statistics Overview', tab: 'overview' },
        { id: 'rd-state-stats', label: 'State-wise Performance Metrics', tab: 'overview' },
        { id: 'rd-acq-stats', label: 'Acquisition Area Statistics (Acres)', tab: 'overview' },
        { id: 'rd-comp-stats', label: 'Compensation Disbursed via PFMS (₹ Cr)', tab: 'compensation' },
        { id: 'rd-rnr-stats', label: 'R&R Family Resettlement Rate', tab: 'rnr-passbook' },
        { id: 'rd-gis-stats', label: 'Georeferenced DGPS Cadastral Parcels', tab: 'gis-explorer' },
        {
          id: 'rd-public-reports',
          label: 'Public Reports',
          hasChildren: true,
          children: [
            { id: 'pr-annual', label: 'Annual Land Acquisition Audits', tab: 'gazette-vault' },
            { id: 'pr-stat', label: 'Quarterly Statistical Bulletins', tab: 'gazette-vault' },
            { id: 'pr-perf', label: 'SLA Performance Monitoring Reports', tab: 'gazette-vault' },
            { id: 'pr-rnr', label: 'R&R Socio-Economic Impact Studies', tab: 'rnr-passbook' },
            { id: 'pr-gaz', label: 'Gazette-Linked Award Archives', tab: 'gazette-vault' }
          ]
        },
        { id: 'rd-open-data', label: 'Open Data Catalog', tab: 'gis-explorer' }
      ]
    },
    {
      id: 'help-support',
      label: 'Help & Support',
      children: [
        { id: 'hs-help-centre', label: 'Help Centre', info: { title: 'NLAMS National Support Desk', content: 'Comprehensive public assistance for Khatedars, landowners, tenant farmers, and department officers.' } },
        { id: 'hs-faqs', label: 'Frequently Asked Questions', info: { title: 'Portal & Statutory FAQs', content: 'Answers to common questions regarding ULPIN land tracking, calculation multipliers, grievance filing, and award receipt.' } },
        {
          id: 'hs-user-guides',
          label: 'User Guides',
          hasChildren: true,
          children: [
            { id: 'ug-citizen', label: 'Citizen Portal Handbook', tab: 'track-land' },
            { id: 'ug-landowner', label: 'Khatedar Award Claim Guide', tab: 'compensation' },
            { id: 'ug-req', label: 'Requiring Body Requisition Manual', tab: 'track-land' },
            { id: 'ug-gis', label: 'Public GIS Navigation Guide', tab: 'gis-explorer' },
            { id: 'ug-comp', label: 'Compensation Calculation Guide', tab: 'compensation' },
            { id: 'ug-rnr', label: 'R&R Scheme Entitlement Guide', tab: 'rnr-passbook' }
          ]
        },
        {
          id: 'hs-citizen-help',
          label: 'Citizen Help',
          hasChildren: true,
          children: [
            { id: 'ch-helpline', label: 'Toll-Free: 1800-11-NLAMS (6526)', info: { title: 'Statutory Toll-Free Helpline', content: 'Available Monday to Saturday, 9:00 AM - 6:00 PM IST in English, Hindi, and regional languages.' } },
            { id: 'ch-slao', label: 'District SLAO Contact Directory', tab: 'track-land' },
            { id: 'ch-rnr-admin', label: 'R&R Administrator Grievance Cell', tab: 'rnr-passbook' },
            { id: 'ch-tribunal', label: 'Land Acquisition Tribunal Legal Aid Desk', tab: 'track-land' }
          ]
        },
        { id: 'hs-contact-us', label: 'Contact Us', info: { title: 'Department of Land Resources', content: 'Nirman Bhawan, New Delhi. Email: support-nlams@gov.in | Phone: +91-11-23061234' } },
        { id: 'hs-grievance', label: 'Grievance Support', info: { title: 'Statutory Grievance Redressal', content: 'Direct appeal routing to District Collector and appropriate state revenue commissioners.' } },
        { id: 'hs-accessibility', label: 'Accessibility Standards', info: { title: 'Web Accessibility Compliance', content: 'Designed in accordance with Guidelines for Indian Government Websites (GIGW) and WCAG 2.1 Level AA.' } }
      ]
    }
  ];

  // Mobile Drill-down Navigation Helpers
  const getCurrentMobileMenu = () => {
    if (mobileNavPath.length === 0) {
      return { title: 'NLAMS Main Menu', items: menuData };
    }
    let current = menuData;
    let title = 'Menu';
    for (const stepId of mobileNavPath) {
      const found = current.find(item => item.id === stepId);
      if (found && found.children) {
        current = found.children;
        title = found.label;
      }
    }
    return { title, items: current };
  };

  const handleMobileDrillDown = (item) => {
    if (item.children && item.children.length > 0) {
      setMobileNavPath([...mobileNavPath, item.id]);
    } else {
      handleItemClick(item);
    }
  };

  const handleMobileBack = () => {
    setMobileNavPath(mobileNavPath.slice(0, -1));
  };

  return (
    <header ref={navRef} className="w-full text-white bg-[#1B365D] shadow-2xl sticky top-0 z-50">
      
      {/* TIER 1: GOVERNMENT BRAND IDENTITY & PRIMARY ACTIONS ROW */}
      <div className="border-b border-blue-900/40 bg-[#1B365D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-6">
          
          {/* Left: Enhanced National Ashoka Emblem + Dignified Bilingual National Portal Identity */}
          <div 
            onClick={() => {
              setActiveTab('overview');
              setActiveMainMenu(null);
              setActiveSubMenu(null);
              setActiveThirdMenu(null);
            }}
            className="flex items-center gap-3.5 cursor-pointer hover:opacity-95 transition-opacity select-none shrink-0"
            title="NLAMS Portal Home"
          >
            {/* Prestigious National Emblem Medallion with Gold Filigree */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-md shrink-0 border-2 border-[#C5A059] select-none ring-2 ring-amber-400/30">
              <svg viewBox="0 0 100 120" className="w-9 h-9 sm:w-10 sm:h-10 text-[#1B365D]" fill="currentColor">
                {/* Capital Lion Crown */}
                <circle cx="50" cy="26" r="13" fill="#C5A059" />
                <path d="M42 18 C42 14, 58 14, 58 18 C64 20, 64 30, 58 33 C58 38, 42 38, 42 33 C36 30, 36 20, 42 18 Z" fill="#996E25" />
                <circle cx="33" cy="28" r="9.5" fill="#B38A3A" />
                <circle cx="67" cy="28" r="9.5" fill="#B38A3A" />
                {/* Abacus with Ashoka Chakra */}
                <rect x="23" y="44" width="54" height="13" rx="2" fill="#C5A059" />
                <circle cx="50" cy="50.5" r="5.5" fill="#1B365D" />
                <circle cx="50" cy="50.5" r="4.5" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
                <line x1="50" y1="46" x2="50" y2="55" stroke="#FFFFFF" strokeWidth="0.6" />
                <line x1="45.5" y1="50.5" x2="54.5" y2="50.5" stroke="#FFFFFF" strokeWidth="0.6" />
                <line x1="46.8" y1="47.3" x2="53.2" y2="53.7" stroke="#FFFFFF" strokeWidth="0.6" />
                <line x1="46.8" y1="53.7" x2="53.2" y2="47.3" stroke="#FFFFFF" strokeWidth="0.6" />
                {/* Inverted Lotus Bell */}
                <path d="M19 60 L81 60 L75 73 L25 73 Z" fill="#996E25" />
                {/* Plinth with Satyameva Jayate */}
                <rect x="16" y="77" width="68" height="15" rx="2" fill="#142947" stroke="#C5A059" strokeWidth="1.2" />
                <text x="50" y="87.5" fontSize="8" fill="#FAF5E6" fontWeight="bold" textAnchor="middle" fontFamily="serif">सत्यमेव जयते</text>
              </svg>
            </div>

            {/* Indian Flag Vertical Accent */}
            <div className="w-1.5 h-12 rounded-full overflow-hidden flex flex-col shadow-xs hidden xs:flex shrink-0">
              <div className="h-1/3 bg-[#FF9933]" />
              <div className="h-1/3 bg-white" />
              <div className="h-1/3 bg-[#138808]" />
            </div>

            {/* Comprehensive Bilingual Brand Typography */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] font-black text-xs sm:text-sm tracking-wider uppercase leading-none font-sans">
                  भारत सरकार
                </span>
                <span className="text-blue-200 text-[11px]">•</span>
                <span className="text-blue-100 font-semibold text-[11px] sm:text-xs tracking-wide uppercase leading-none font-sans">
                  Government of India
                </span>
                <span className="hidden md:inline-block text-[10px] text-amber-200 bg-amber-400/20 border border-amber-300/40 px-2 py-0.5 rounded font-mono font-medium">
                  DoLR • MoRD
                </span>
              </div>
              
              <div className="text-white font-black text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide uppercase font-sans leading-tight mt-1 flex items-baseline gap-2">
                <span className="text-white">NLAMS</span>
                <span className="text-xs sm:text-sm font-semibold text-[#E6CA85] hidden md:inline">
                  • राष्ट्रीय भूमि अधिग्रहण एवं प्रबंधन प्रणाली
                </span>
              </div>

              <div className="text-blue-100/90 text-[11px] sm:text-xs font-sans leading-tight mt-0.5 hidden sm:block">
                National Land Acquisition &amp; Management System • Statutory RFCTLARR Act, 2013
              </div>
            </div>
          </div>

          {/* Center: Official National Statutory Badge & Helpline (Fills the Central Void) */}
          <div className="hidden xl:flex items-center gap-4 px-4 py-2 rounded-xl bg-[#142947] border border-blue-900/60 shadow-inner shrink-0">
            <div className="flex flex-col text-left">
              <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Statutory Land Governance
              </span>
              <span className="text-[11px] text-blue-100 font-mono">
                DGPS Cadastral &amp; PFMS DBT
              </span>
            </div>
            <div className="h-7 w-[1px] bg-blue-800/40" />
            <div className="flex items-center gap-1.5 text-xs text-amber-200 font-mono font-bold">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>1800-11-NLAMS</span>
            </div>
          </div>

          {/* Right: Quick Action Controls - ALWAYS Prominently Visible on All Viewports */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#142947] hover:bg-[#203D66] border border-blue-900/60 text-slate-100 text-xs font-semibold cursor-pointer transition-colors shadow-xs"
              title="Search Projects, ULPIN, Khasra, Gazette"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Citizen Portal / Sign Up Button */}
            <button
              onClick={onLaunchCitizenWorkspace}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              title="Citizen Portal / Sign Up"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">Citizen Portal</span>
            </button>

            {/* Officer Login Button - Prominent Gold, Never Cut Off */}
            <button
              onClick={onOpenOfficerLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-black text-xs sm:text-sm cursor-pointer transition-all shadow-md hover:shadow-lg border border-amber-300/60 shrink-0"
              title="Official Department & Statutory Officer Login"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Officer Login</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileNavPath([]);
              }}
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* TIER 2: MAIN MULTI-LEVEL HORIZONTAL NAVIGATION MENU BAR (Full Width Dedicated Row) */}
      <nav aria-label="Main Navigation" className="hidden lg:block bg-[#142947] border-b border-amber-500/30 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-xs font-semibold py-1.5">
            {menuData.map((mainItem) => {
              const hasDropdown = mainItem.children && mainItem.children.length > 0;
              const isCurrentOpen = activeMainMenu === mainItem.id;

              return (
                <li
                  key={mainItem.id}
                  className="relative group py-1"
                  onMouseEnter={() => {
                    setActiveMainMenu(mainItem.id);
                    setActiveSubMenu(null);
                    setActiveThirdMenu(null);
                  }}
                >
                  {/* Top-Level Menu Button */}
                  <button
                    onClick={() => {
                      if (!hasDropdown && mainItem.onClick) {
                        mainItem.onClick();
                      } else {
                        setActiveMainMenu(isCurrentOpen ? null : mainItem.id);
                        setActiveSubMenu(null);
                        setActiveThirdMenu(null);
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      isCurrentOpen
                        ? 'bg-[#1E3A5F] text-amber-300 font-bold shadow-xs'
                        : 'text-slate-100 hover:text-white hover:bg-white/10'
                    }`}
                    aria-haspopup={hasDropdown ? 'true' : 'false'}
                    aria-expanded={isCurrentOpen ? 'true' : 'false'}
                  >
                    <span>{mainItem.label}</span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${isCurrentOpen ? 'rotate-180 text-amber-300' : ''}`} />
                    )}
                  </button>

                  {/* LEVEL 2 DROPDOWN */}
                  {hasDropdown && isCurrentOpen && (
                    <div 
                      className="absolute top-full left-0 mt-0.5 w-64 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="menu"
                    >
                      {mainItem.children.map((subItem) => {
                        const hasSubChildren = subItem.children && subItem.children.length > 0;
                        const isSubActive = activeSubMenu === subItem.id;

                        return (
                          <div
                            key={subItem.id}
                            className="relative"
                            onMouseEnter={(e) => handleSubMenuHover(subItem.id, e)}
                          >
                            <button
                              onClick={() => {
                                if (hasSubChildren) {
                                  setActiveSubMenu(isSubActive ? null : subItem.id);
                                } else {
                                  handleItemClick(subItem);
                                }
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                isSubActive
                                  ? 'bg-[#1E3A5F] text-white font-semibold'
                                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                              role="menuitem"
                            >
                              <span className="truncate pr-2">{subItem.label}</span>
                              {hasSubChildren && (
                                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-amber-300' : 'text-slate-400'}`} />
                              )}
                            </button>

                            {/* LEVEL 3 CASCADING FLYOUT */}
                            {hasSubChildren && isSubActive && (
                              <div
                                className={`absolute top-0 ${
                                  flyoutPosition === 'left' ? 'right-full mr-1' : 'left-full ml-1'
                                } w-64 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100`}
                                role="menu"
                              >
                                {subItem.children.map((thirdItem) => {
                                  const hasThirdChildren = thirdItem.children && thirdItem.children.length > 0;
                                  const isThirdActive = activeThirdMenu === thirdItem.id;

                                  return (
                                    <div 
                                      key={thirdItem.id} 
                                      className="relative"
                                      onMouseEnter={() => handleThirdMenuHover(thirdItem.id)}
                                    >
                                      <button
                                        onClick={() => {
                                          if (hasThirdChildren) {
                                            setActiveThirdMenu(isThirdActive ? null : thirdItem.id);
                                          } else {
                                            handleItemClick(thirdItem);
                                          }
                                        }}
                                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                          isThirdActive
                                            ? 'bg-[#1E3A5F] text-white font-semibold'
                                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                        role="menuitem"
                                      >
                                        <span className="truncate pr-2">{thirdItem.label}</span>
                                        {hasThirdChildren && (
                                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isThirdActive ? 'text-amber-300' : 'text-slate-400'}`} />
                                        )}
                                      </button>

                                      {/* OPTIONAL LEVEL 4 FLYOUT */}
                                      {hasThirdChildren && isThirdActive && (
                                        <div
                                          className={`absolute top-0 ${
                                            flyoutPosition === 'left' ? 'right-full mr-1' : 'left-full ml-1'
                                          } w-60 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100`}
                                          role="menu"
                                        >
                                          {thirdItem.children.map((fourthItem) => (
                                            <button
                                              key={fourthItem.id}
                                              onClick={() => handleItemClick(fourthItem)}
                                              className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-[#24548A] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                                              role="menuitem"
                                            >
                                              <span className="truncate">{fourthItem.label}</span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 3. MOBILE DRILL-DOWN DRAWER (Accordion / Stack Navigation) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C4472] border-t border-blue-400/30 max-h-[80vh] overflow-y-auto z-50">
          <div className="p-4 space-y-3">
            
            {/* Mobile Navigation Header & Back Button */}
            <div className="flex items-center justify-between border-b border-blue-300/30 pb-2">
              {mobileNavPath.length > 0 ? (
                <button
                  onClick={handleMobileBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Previous</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                  NLAMS Public Directory
                </span>
              )}

              <span className="text-xs font-mono text-blue-300">
                {getCurrentMobileMenu().title}
              </span>
            </div>

            {/* Menu Items List */}
            <div className="space-y-1.5">
              {getCurrentMobileMenu().items.map((item) => {
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileDrillDown(item)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-[#24548A] hover:bg-[#2e68a8] text-white text-xs font-medium flex items-center justify-between cursor-pointer transition-colors border border-blue-300/25 shadow-xs"
                  >
                    <span className="truncate">{item.label}</span>
                    {hasChildren ? (
                      <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Quick Action Buttons */}
            <div className="pt-3 border-t border-blue-300/30 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchCitizenWorkspace();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/20"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>Citizen Portal / Sign Up</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOfficerLogin();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#C5A059] text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Lock className="w-4 h-4 text-slate-950" />
                <span>Officer Workspace Login</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. UTILITY SEARCH OVERLAY MODAL */}
      {searchOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
          <div className="bg-[#0e1d33] border-2 border-[#C5A059]/70 rounded-2xl w-full max-w-3xl shadow-2xl p-5 text-white relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSearchOverlayOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Close Search (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1B365D] border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Universal NLAMS Statutory Search</h3>
                <p className="text-xs text-slate-300">Search projects, 14-digit ULPIN, survey numbers, gazette references, or legal clauses</p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Project Name, ULPIN, Survey Number, Village, or Gazette ID..."
                className="w-full bg-[#081220] border border-slate-600 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {/* Suggested Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
              <span className="text-slate-400 text-[11px]">Quick Suggestions:</span>
              <button
                onClick={() => {
                  setSearchOverlayOpen(false);
                  setActiveTab('track-land');
                }}
                className="px-2.5 py-1 rounded bg-[#1B365D] hover:bg-[#254673] text-amber-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
              >
                GJ-BRD-2024-8842-991A (Bharuch)
              </button>
              <button
                onClick={() => {
                  setSearchOverlayOpen(false);
                  setActiveTab('track-land');
                }}
                className="px-2.5 py-1 rounded bg-[#1B365D] hover:bg-[#254673] text-amber-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
              >
                Survey 142/A Rampura
              </button>
              <button
                onClick={() => {
                  setSearchOverlayOpen(false);
                  setActiveTab('gazette-vault');
                }}
                className="px-2.5 py-1 rounded bg-[#1B365D] hover:bg-[#254673] text-amber-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
              >
                SEC11-GUJ-VAD-2024-089
              </button>
              <button
                onClick={() => {
                  setSearchOverlayOpen(false);
                  setActiveTab('gis-explorer');
                }}
                className="px-2.5 py-1 rounded bg-[#1B365D] hover:bg-[#254673] text-emerald-300 border border-slate-700 text-[11px] cursor-pointer"
              >
                View Live Corridor GIS Map
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. PUBLIC INFORMATION MODAL (For Statutory Act, Vision, Institutional Framework) */}
      {infoModalData && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-300 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#0b1728] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1B365D] border border-amber-400/50 flex items-center justify-center text-amber-400">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                    {infoModalData.category || 'Statutory Portal Information'}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {infoModalData.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setInfoModalData(null)}
                className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {infoModalData.content}
              </p>

              {infoModalData.sections && (
                <div className="space-y-3 pt-2">
                  {infoModalData.sections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-[#1B365D] flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{sec.title}</span>
                      </div>
                      <div className="text-xs text-slate-600 leading-normal">
                        {sec.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                RFCTLARR Act, 2013 Statutory Compliance
              </span>

              <div className="flex items-center gap-2">
                {infoModalData.targetTab && (
                  <button
                    onClick={() => {
                      const tab = infoModalData.targetTab;
                      setInfoModalData(null);
                      setActiveTab(tab);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
                  >
                    {infoModalData.tabLabel || 'Open Live Tool'}
                  </button>
                )}
                <button
                  onClick={() => setInfoModalData(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
