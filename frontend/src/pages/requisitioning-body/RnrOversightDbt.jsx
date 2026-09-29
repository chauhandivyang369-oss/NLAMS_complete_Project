import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { 
  Search, 
  Filter, 
  Users, 
  Home, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  Info, 
  Eye, 
  Download, 
  FileText, 
  X, 
  Copy, 
  Flag, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  ShieldCheck, 
  Banknote,
  Send,
  ExternalLink,
  RefreshCw,
  Landmark,
  FileCheck
} from 'lucide-react';

export default function RnrOversightDbt() {
  const { showToast } = useWorkspace();

  // Active Tab state: maximum 2 simple tabs
  const [activeTab, setActiveTab] = useState('family-rnr'); // 'family-rnr' | 'dbt-monitoring'

  // Search & Filter states for Family & R&R Register
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [villageFilter, setVillageFilter] = useState('ALL');
  const [classificationFilter, setClassificationFilter] = useState('ALL'); // Affected vs Displaced
  const [rnrStatusFilter, setRnrStatusFilter] = useState('ALL');
  const [benefitStatusFilter, setBenefitStatusFilter] = useState('ALL');
  const [housingStatusFilter, setHousingStatusFilter] = useState('ALL');
  const [dbtStatusFilter, setDbtStatusFilter] = useState('ALL');

  // Search & Filter for DBT tab
  const [dbtSearchQuery, setDbtSearchQuery] = useState('');
  const [dbtCreditFilter, setDbtCreditFilter] = useState('ALL');

  // Detail Drawer state
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Authoritative Requisitioning Body R&R & DBT Monitoring Dataset
  const familiesList = [
    {
      id: 'RNR-FAM-001',
      pafId: 'PAF-GJ-2026-0412',
      headOfFamily: 'Shri Ram Charan Lal',
      aadhaarMasked: 'XXXX-XXXX-3310',
      familySize: 5,
      district: 'Vadodara',
      village: 'Sultanpur Khurd',
      khasraNo: '142/2',
      classification: 'Displaced', // 'Displaced' | 'Affected'
      displacementType: 'Displaced (Loss of Homestead & Livelihood)',
      category: 'SC / Artisan Household',
      rnrStatus: 'In Progress', // 'Pending' | 'In Progress' | 'Completed' | 'Exception'
      benefitStatus: 'Partially Disbursed', // 'Pending' | 'Partially Disbursed' | 'Fully Disbursed'
      housingStatus: 'Allotted', // 'Not Applicable' | 'Pending' | 'Allotted' | 'In Progress' | 'Completed'
      housingDetails: {
        colony: 'Sardar Patel R&R Enclave, Sanand',
        plotNo: 'Plot #24, Sector B',
        plotArea: '150 sq. m developed homestead',
        constructionStatus: 'Foundation & plinth completed (Stage 2)',
        possessionDate: '15-May-2026 (Scheduled)'
      },
      dbtStatus: 'Credited', // 'Credited' | 'Active' | 'Initiated' | 'Pending' | 'Exception'
      lastUpdated: '14 Sep 2026',
      totalEntitlementValue: '₹7,11,000',
      totalDisbursedValue: '₹6,36,000',
      bankInfo: {
        bankName: 'Punjab National Bank',
        accountMasked: 'XXXX-XXXX-3310',
        ifscMasked: 'PUNB0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-VAD-2026-0982'
      },
      benefits: [
        {
          benefit: 'Constructed House / Homestead',
          clause: 'Schedule II Para 1(1)',
          amount: '₹5,50,000',
          status: 'Allotted',
          statusColor: 'emerald',
          lastUpdated: '12 Aug 2026',
          details: '150 sq.m developed residential plot + dwelling grant'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '20 Jul 2026',
          details: 'Direct transfer to Aadhaar seeded account'
        },
        {
          benefit: 'Monthly Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Active (Month 3/12)',
          statusColor: 'blue',
          lastUpdated: '10 Sep 2026',
          details: 'Dispatched through monthly PFMS DBT cycle'
        },
        {
          benefit: 'Cattle Shed & Transport Allowance',
          clause: 'Schedule II Para 7',
          amount: '₹50,000',
          status: 'Sanctioned',
          statusColor: 'amber',
          lastUpdated: '02 Sep 2026',
          details: 'Sanction order approved by CALA / R&R Administrator'
        },
        {
          benefit: 'Artisan / Small Craft Grant',
          clause: 'Schedule II Para 8',
          amount: '₹25,000',
          status: 'Pending Verification',
          statusColor: 'amber',
          lastUpdated: '28 Aug 2026',
          details: 'Awaiting local Mamlatdar artisan certification'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00412-A',
          benefitCategory: 'Resettlement Allowance (Sec II Para 5)',
          amount: '₹50,000',
          initiatedDate: '18 Jul 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-092834190)',
          lastUpdated: '20 Jul 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00412-B',
          benefitCategory: 'Subsistence Allowance (Month 1)',
          amount: '₹3,000',
          initiatedDate: '08 Jul 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-093411029)',
          lastUpdated: '10 Jul 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00412-C',
          benefitCategory: 'Subsistence Allowance (Month 2)',
          amount: '₹3,000',
          initiatedDate: '08 Aug 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-094992104)',
          lastUpdated: '10 Aug 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00412-D',
          benefitCategory: 'Subsistence Allowance (Month 3)',
          amount: '₹3,000',
          initiatedDate: '08 Sep 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-096884102)',
          lastUpdated: '10 Sep 2026'
        }
      ],
      documents: [
        { title: 'Form-C R&R Baseline Census Record', ref: 'RNR-CENSUS-VAD-0412.pdf', size: '2.1 MB', date: '14 Feb 2026' },
        { title: 'Homestead Allotment Order (Sanand Colony)', ref: 'ALLOT-SANAND-PL-24.pdf', size: '1.4 MB', date: '12 Aug 2026' },
        { title: 'PFMS Consolidated Bank Receipt Acknowledgement', ref: 'PFMS-ACK-00412-Q2.pdf', size: '640 KB', date: '10 Sep 2026' }
      ],
      auditTrail: [
        { date: '10 Sep 2026, 14:15 IST', action: 'Month 3 subsistence DBT credited via PFMS', officer: 'PFMS Nodal Gateway' },
        { date: '02 Sep 2026, 11:30 IST', action: 'Cattle shed grant sanctioned under Schedule II Para 7', officer: 'R&R Administrator' },
        { date: '12 Aug 2026, 16:40 IST', action: 'Homestead Plot #24 allotment order generated', officer: 'CALA Collectorate' },
        { date: '14 Feb 2026, 10:00 IST', action: 'Draft R&R Census record verified and notified', officer: 'District Census Incharge' }
      ],
      aiNote: 'R&R Compliance Verified: Allotment satisfies RFCTLARR Schedule II Para 1(1) mandatory homestead criteria. Subsistence transfers automated on 8th of every calendar month.'
    },
    {
      id: 'RNR-FAM-002',
      pafId: 'PAF-GJ-2026-0413',
      headOfFamily: 'Smt. Preeto Devi (Widow Head)',
      aadhaarMasked: 'XXXX-XXXX-7104',
      familySize: 3,
      district: 'Vadodara',
      village: 'Sultanpur Khurd',
      khasraNo: '142/3',
      classification: 'Affected',
      displacementType: 'Affected (Loss of Agricultural Livelihood & Tenancy)',
      category: 'OBC / Vulnerable Widow-Headed Household',
      rnrStatus: 'In Progress',
      benefitStatus: 'Partially Disbursed',
      housingStatus: 'Not Applicable',
      housingDetails: {
        colony: 'N/A - Residential dwelling unaffected',
        plotNo: 'N/A',
        plotArea: 'N/A',
        constructionStatus: 'Not Applicable (Land-only acquisition)',
        possessionDate: 'N/A'
      },
      dbtStatus: 'Active',
      lastUpdated: '12 Sep 2026',
      totalEntitlementValue: '₹6,36,000',
      totalDisbursedValue: '₹1,50,000',
      bankInfo: {
        bankName: 'State Bank of India',
        accountMasked: 'XXXX-XXXX-7104',
        ifscMasked: 'SBIN0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-VAD-2026-0983'
      },
      benefits: [
        {
          benefit: 'Livelihood Assistance Lump Sum Option',
          clause: 'Schedule II Para 4',
          amount: '₹5,00,000',
          status: 'Sanctioned',
          statusColor: 'emerald',
          lastUpdated: '05 Aug 2026',
          details: 'Lump-sum grant in lieu of alternative employment'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '22 Jul 2026',
          details: 'Statutory displacement / transition allowance'
        },
        {
          benefit: 'Monthly Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Active (Month 4/12)',
          statusColor: 'blue',
          lastUpdated: '08 Sep 2026',
          details: 'Monthly PFMS DBT direct to SBI account'
        },
        {
          benefit: 'Vulnerable Family Additional Grant',
          clause: 'Schedule II Para 11',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '22 Jul 2026',
          details: 'Special rehabilitation package for widow-headed household'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00413-A',
          benefitCategory: 'Resettlement & Vulnerability Grants',
          amount: '₹1,00,000',
          initiatedDate: '20 Jul 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-092994812)',
          lastUpdated: '22 Jul 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00413-B',
          benefitCategory: 'Subsistence Allowance (Month 1-4)',
          amount: '₹12,000',
          initiatedDate: '08 Sep 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-096894002)',
          lastUpdated: '10 Sep 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00413-C',
          benefitCategory: 'Livelihood Assistance Lump Sum',
          amount: '₹5,00,000',
          initiatedDate: '12 Sep 2026',
          creditStatus: 'Initiated',
          bankReceiptStatus: 'Awaiting Bank Settlement (PFMS Batch 108)',
          lastUpdated: '12 Sep 2026'
        }
      ],
      documents: [
        { title: 'Vulnerable Family Entitlement Certificate', ref: 'VULN-CERT-0413.pdf', size: '1.2 MB', date: '10 Jun 2026' },
        { title: 'Schedule II Livelihood Lump Sum Sanction Memo', ref: 'LIVELIHOOD-SANCTION-413.pdf', size: '1.8 MB', date: '05 Aug 2026' }
      ],
      auditTrail: [
        { date: '12 Sep 2026, 17:05 IST', action: 'Lump-sum ₹5,00,000 DBT batch queued to RBI gateway', officer: 'PFMS Nodal Officer' },
        { date: '08 Sep 2026, 11:20 IST', action: 'Month 4 subsistence allowance successfully disbursed', officer: 'Automated PFMS' },
        { date: '05 Aug 2026, 15:30 IST', action: 'Livelihood lump sum option sanctioned by Administrator', officer: 'R&R Administrator' }
      ],
      aiNote: 'Priority Entitlement: Vulnerability grant disbursed. Livelihood annuity batch under banking settlement; no discrepancy noted.'
    },
    {
      id: 'RNR-FAM-003',
      pafId: 'PAF-GJ-2026-0414',
      headOfFamily: 'Sardar Jagir Singh S/o Kartar Singh',
      aadhaarMasked: 'XXXX-XXXX-9821',
      familySize: 6,
      district: 'Vadodara',
      village: 'Fatehpur Gujran',
      khasraNo: '119/1A',
      classification: 'Affected',
      displacementType: 'Affected (Loss of >70% Agricultural Holding)',
      category: 'General / Marginal Farmer',
      rnrStatus: 'Completed',
      benefitStatus: 'Fully Disbursed',
      housingStatus: 'Not Applicable',
      housingDetails: {
        colony: 'N/A - Residential structure intact',
        plotNo: 'N/A',
        plotArea: 'N/A',
        constructionStatus: 'Not Applicable',
        possessionDate: 'N/A'
      },
      dbtStatus: 'Credited',
      lastUpdated: '08 Sep 2026',
      totalEntitlementValue: '₹86,000 + Employment',
      totalDisbursedValue: '₹86,000',
      bankInfo: {
        bankName: 'Punjab & Sind Bank',
        accountMasked: 'XXXX-XXXX-9821',
        ifscMasked: 'PSIB0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-VAD-2026-0984'
      },
      benefits: [
        {
          benefit: 'Mandatory Employment / Annuity Option',
          clause: 'Schedule II Para 4(1)',
          amount: 'Contractual Allotment',
          status: 'Completed',
          statusColor: 'emerald',
          lastUpdated: '15 Aug 2026',
          details: 'Toll plaza technical support operator (NHAI Concessionaire)'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '10 Jun 2026',
          details: 'PFMS DBT credited successfully'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Completed (12/12 Months)',
          statusColor: 'emerald',
          lastUpdated: '08 Sep 2026',
          details: '12-month tenure completed; final receipt verified'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00414-FINAL',
          benefitCategory: 'Subsistence Allowance (Month 12/12)',
          amount: '₹3,000',
          initiatedDate: '06 Sep 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-096774129)',
          lastUpdated: '08 Sep 2026'
        }
      ],
      documents: [
        { title: 'Concessionaire Employment Allotment Letter', ref: 'EMP-NHAI-TOLL-0414.pdf', size: '940 KB', date: '15 Aug 2026' },
        { title: 'Final R&R Discharge & Completion Certificate', ref: 'RNR-DISCHARGE-414.pdf', size: '1.5 MB', date: '08 Sep 2026' }
      ],
      auditTrail: [
        { date: '08 Sep 2026, 16:00 IST', action: 'R&R dossier closed; all Schedule II entitlements satisfied', officer: 'R&R Commissioner' },
        { date: '15 Aug 2026, 10:30 IST', action: 'Offer letter accepted for NHAI toll operations role', officer: 'RB Liaison Officer' }
      ],
      aiNote: 'Audit Milestone: 100% statutory entitlements satisfied. Full closure acknowledged by CALA R&R audit team.'
    },
    {
      id: 'RNR-FAM-004',
      pafId: 'PAF-GJ-2026-0415',
      headOfFamily: 'Shri Manilal Somabhai Vankar',
      aadhaarMasked: 'XXXX-XXXX-4291',
      familySize: 4,
      district: 'Vadodara',
      village: 'Porbandar Rural',
      khasraNo: '204/B',
      classification: 'Displaced',
      displacementType: 'Displaced (Homestead Loss - Rural)',
      category: 'SC / Weaver Family',
      rnrStatus: 'Exception',
      benefitStatus: 'Pending Release',
      housingStatus: 'Pending',
      housingDetails: {
        colony: 'Proposed R&R Nagar Phase II, Vadodara',
        plotNo: 'Pending Layout Demarcation (Block 12)',
        plotArea: '150 sq. m developed homestead',
        constructionStatus: 'Pending (Layout site clearance underway)',
        possessionDate: 'Awaiting CALA site hand-over'
      },
      dbtStatus: 'Exception',
      lastUpdated: '13 Sep 2026',
      totalEntitlementValue: '₹6,86,000',
      totalDisbursedValue: '₹0',
      bankInfo: {
        bankName: 'Bank of Baroda',
        accountMasked: 'XXXX-XXXX-4291',
        ifscMasked: 'BARB0******',
        seedingStatus: 'Aadhaar Seeding Exception (Name Mismatch in NPCI Mapper)',
        pfmsId: 'PFMS-VAD-2026-0985'
      },
      benefits: [
        {
          benefit: 'Constructed House / Homestead',
          clause: 'Schedule II Para 1(1)',
          amount: '₹5,50,000',
          status: 'Pending Allotment',
          statusColor: 'amber',
          lastUpdated: '13 Sep 2026',
          details: 'Awaiting survey clearance of proposed colony parcel'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Exception (PFMS Hold)',
          statusColor: 'rose',
          lastUpdated: '11 Sep 2026',
          details: 'DBT failed: Name on Aadhaar ("Manilal S Vankar") differs from Bank ("Mani Somabhai")'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Pending Seeding Rectification',
          statusColor: 'rose',
          lastUpdated: '11 Sep 2026',
          details: 'PFMS transaction hold pending bank KYC updation'
        },
        {
          benefit: 'Weaving Shed / Livelihood Grant',
          clause: 'Schedule II Para 8',
          amount: '₹50,000',
          status: 'Sanctioned',
          statusColor: 'amber',
          lastUpdated: '01 Sep 2026',
          details: 'Grant approved; release tied to DBT account validation'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00415-ERR',
          benefitCategory: 'Resettlement Allowance (Sec II Para 5)',
          amount: '₹50,000',
          initiatedDate: '08 Sep 2026',
          creditStatus: 'Exception',
          bankReceiptStatus: 'Returned (NPCI Code: 07 - Name Mismatch)',
          lastUpdated: '11 Sep 2026'
        }
      ],
      documents: [
        { title: 'NPCI Aadhaar Seeding Rejection Notice', ref: 'NPCI-ERR-4291-SEP26.pdf', size: '420 KB', date: '11 Sep 2026' },
        { title: 'Mamlatdar Name Rectification Order', ref: 'MAMLATDAR-NAME-AFFIDAVIT.pdf', size: '980 KB', date: '13 Sep 2026' }
      ],
      auditTrail: [
        { date: '13 Sep 2026, 15:40 IST', action: 'Rectification affidavit submitted to Lead District Manager for NPCI re-map', officer: 'Revenue Talati' },
        { date: '11 Sep 2026, 09:15 IST', action: 'PFMS DBT transfer rejected due to demographic mismatch', officer: 'PFMS Gateway' },
        { date: '08 Sep 2026, 12:00 IST', action: 'Initial DBT payment batch generated by CALA treasury', officer: 'CALA Accountant' }
      ],
      aiNote: 'Anomaly Detected: PFMS demographic mismatch code 07. Mamlatdar affidavit uploaded; re-initiation required after bank mapper sync.'
    },
    {
      id: 'RNR-FAM-005',
      pafId: 'PAF-GJ-2026-0416',
      headOfFamily: 'Shri Bhikhubhai Dahyabhai Patel',
      aadhaarMasked: 'XXXX-XXXX-6602',
      familySize: 5,
      district: 'Surat',
      village: 'Vesu',
      khasraNo: '88/1',
      classification: 'Displaced',
      displacementType: 'Displaced (Homestead & Commercial Compound)',
      category: 'General / Small Trader',
      rnrStatus: 'In Progress',
      benefitStatus: 'Partially Disbursed',
      housingStatus: 'In Progress',
      housingDetails: {
        colony: 'Surat Urban Resettlement Scheme, Bhestan',
        plotNo: 'Tenement 4B-102',
        plotArea: 'Flat of 50 sq. m built-up area in G+3 apartment',
        constructionStatus: 'Structural finishing & water connection in progress',
        possessionDate: '30-Oct-2026 (Expected)'
      },
      dbtStatus: 'Credited',
      lastUpdated: '11 Sep 2026',
      totalEntitlementValue: '₹6,61,000',
      totalDisbursedValue: '₹1,00,000',
      bankInfo: {
        bankName: 'HDFC Bank',
        accountMasked: 'XXXX-XXXX-6602',
        ifscMasked: 'HDFC0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-SUR-2026-0441'
      },
      benefits: [
        {
          benefit: 'Constructed Tenement (Urban)',
          clause: 'Schedule II Para 1(2)',
          amount: '₹5,50,000',
          status: 'In Progress',
          statusColor: 'blue',
          lastUpdated: '28 Aug 2026',
          details: '50 sq.m carpet area tenement in SUDA R&R Complex'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '15 Jul 2026',
          details: 'Directly credited into verified account'
        },
        {
          benefit: 'Shopkeeper / Trader Rehabilitation Grant',
          clause: 'Schedule II Para 8',
          amount: '₹25,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '15 Jul 2026',
          details: 'Commercial structure loss grant under Schedule II'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Active (Month 2/12)',
          statusColor: 'blue',
          lastUpdated: '08 Sep 2026',
          details: 'Monthly PFMS DBT active'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00416-A',
          benefitCategory: 'Resettlement & Trader Grant',
          amount: '₹75,000',
          initiatedDate: '12 Jul 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-092100418)',
          lastUpdated: '15 Jul 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00416-B',
          benefitCategory: 'Subsistence Allowance (Month 1-2)',
          amount: '₹6,000',
          initiatedDate: '05 Sep 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-096700192)',
          lastUpdated: '08 Sep 2026'
        }
      ],
      documents: [
        { title: 'SUDA Urban Tenement Allotment Memorandum', ref: 'SUDA-RNR-TENEMENT-102.pdf', size: '1.9 MB', date: '28 Aug 2026' },
        { title: 'Commercial Shop Valuation & Grant Order', ref: 'SHOP-VAL-RNR-0416.pdf', size: '820 KB', date: '10 Jul 2026' }
      ],
      auditTrail: [
        { date: '08 Sep 2026, 11:30 IST', action: 'Month 2 subsistence allowance credited via PFMS', officer: 'PFMS Gateway' },
        { date: '28 Aug 2026, 14:20 IST', action: 'Tenement 4B-102 inspection cleared by Executive Engineer SUDA', officer: 'SUDA Engineer' }
      ],
      aiNote: 'Urban Entitlement Verification: Tenement area matches 50 sq.m statutory minimum under Schedule II Para 1(2). All DBT transactions verified.'
    },
    {
      id: 'RNR-FAM-006',
      pafId: 'PAF-GJ-2026-0417',
      headOfFamily: 'Smt. Kamlaben Chhotabhai Rathod',
      aadhaarMasked: 'XXXX-XXXX-1903',
      familySize: 4,
      district: 'Navsari',
      village: 'Fatehpur Gujran',
      khasraNo: '155/3',
      classification: 'Displaced',
      displacementType: 'Displaced (Loss of Dwelling & Cattle Yard)',
      category: 'ST / Agro-pastoralist',
      rnrStatus: 'Scheme Approved',
      benefitStatus: 'Pending Release',
      housingStatus: 'Allotted',
      housingDetails: {
        colony: 'Navsari Tribal Resettlement Cluster, Kabilpore',
        plotNo: 'Plot #09 (With Attached Cattle Shed Enclave)',
        plotArea: '200 sq. m rural homestead allotment',
        constructionStatus: 'Site ready for construction grant disbursement',
        possessionDate: '01-Jul-2026'
      },
      dbtStatus: 'Pending Initiation',
      lastUpdated: '09 Sep 2026',
      totalEntitlementValue: '₹7,61,000',
      totalDisbursedValue: '₹0',
      bankInfo: {
        bankName: 'Canara Bank',
        accountMasked: 'XXXX-XXXX-1903',
        ifscMasked: 'CNRB0******',
        seedingStatus: 'Aadhaar Seeded (Verification in Progress)',
        pfmsId: 'PFMS-NAV-2026-0102'
      },
      benefits: [
        {
          benefit: 'Constructed House / Homestead',
          clause: 'Schedule II Para 1(1)',
          amount: '₹5,50,000',
          status: 'Sanctioned',
          statusColor: 'emerald',
          lastUpdated: '09 Sep 2026',
          details: '200 sq.m plot in Scheduled Area R&R cluster'
        },
        {
          benefit: 'Cattle Shed & Transport Grant',
          clause: 'Schedule II Para 7',
          amount: '₹50,000',
          status: 'Sanctioned',
          statusColor: 'amber',
          lastUpdated: '09 Sep 2026',
          details: 'Mandatory grant for rural cattle-owning family'
        },
        {
          benefit: 'Tribal Family Additional Resettlement Grant',
          clause: 'RFCTLARR Section 41(4)',
          amount: '₹50,000',
          status: 'Sanctioned',
          statusColor: 'emerald',
          lastUpdated: '09 Sep 2026',
          details: 'Mandatory 1/3rd additional grant for ST families in Scheduled areas'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Awaiting DBT Batch Initiation',
          statusColor: 'amber',
          lastUpdated: '09 Sep 2026',
          details: 'Scheduled in next PFMS district treasury dispatch'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Awaiting DBT Batch Initiation',
          statusColor: 'amber',
          lastUpdated: '09 Sep 2026',
          details: 'To begin upon formal physical relocation'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00417-QUEUED',
          benefitCategory: 'Resettlement & Sec 41(4) Tribal Package',
          amount: '₹1,50,000',
          initiatedDate: 'Pending Batch Dispatch',
          creditStatus: 'Pending',
          bankReceiptStatus: 'Awaiting Treasury Authorization',
          lastUpdated: '09 Sep 2026'
        }
      ],
      documents: [
        { title: 'Section 41 Tribal R&R Development Plan Extract', ref: 'SEC-41-TRIBAL-PLAN-NAV.pdf', size: '2.8 MB', date: '01 Sep 2026' },
        { title: 'Cattle Yard & Homestead Sanction Docket', ref: 'CATTLE-HOMESTEAD-SANCTION-417.pdf', size: '1.1 MB', date: '09 Sep 2026' }
      ],
      auditTrail: [
        { date: '09 Sep 2026, 12:45 IST', action: 'R&R Scheme approved under Section 41 by Commissioner', officer: 'R&R Commissioner' },
        { date: '01 Sep 2026, 10:15 IST', action: 'Grama Sabha concurrence obtained for tribal resettlement layout', officer: 'Mamlatdar Navsari' }
      ],
      aiNote: 'Statutory Protection: Section 41(4) mandatory 1/3rd additional grant for Scheduled Tribe families correctly provisioned. Awaiting PFMS batch release.'
    },
    {
      id: 'RNR-FAM-007',
      pafId: 'PAF-GJ-2026-0418',
      headOfFamily: 'Shri Dinesh Chandra Trivedi',
      aadhaarMasked: 'XXXX-XXXX-8820',
      familySize: 4,
      district: 'Bharuch',
      village: 'Bahadurgarh Patti',
      khasraNo: '71/4',
      classification: 'Affected',
      displacementType: 'Affected (Partial Agricultural Holding Severance)',
      category: 'General / Agricultural Owner',
      rnrStatus: 'Scheme Approved',
      benefitStatus: 'Partially Disbursed',
      housingStatus: 'Not Applicable',
      housingDetails: {
        colony: 'N/A - Non-displaced household',
        plotNo: 'N/A',
        plotArea: 'N/A',
        constructionStatus: 'Not Applicable',
        possessionDate: 'N/A'
      },
      dbtStatus: 'Credited',
      lastUpdated: '06 Sep 2026',
      totalEntitlementValue: '₹86,000',
      totalDisbursedValue: '₹50,000',
      bankInfo: {
        bankName: 'Union Bank of India',
        accountMasked: 'XXXX-XXXX-8820',
        ifscMasked: 'UBIN0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-BHA-2026-0211'
      },
      benefits: [
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Credited',
          statusColor: 'emerald',
          lastUpdated: '28 Aug 2026',
          details: 'Credited directly via PFMS'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Active (Month 1/12)',
          statusColor: 'blue',
          lastUpdated: '06 Sep 2026',
          details: 'First monthly cycle completed'
        }
      ],
      dbtTransactions: [
        {
          paymentRef: 'PFMS-DBT-2026-00418-A',
          benefitCategory: 'Resettlement Allowance (Sec II Para 5)',
          amount: '₹50,000',
          initiatedDate: '25 Aug 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-095510982)',
          lastUpdated: '28 Aug 2026'
        },
        {
          paymentRef: 'PFMS-DBT-2026-00418-B',
          benefitCategory: 'Subsistence Allowance (Month 1)',
          amount: '₹3,000',
          initiatedDate: '02 Sep 2026',
          creditStatus: 'Credited',
          bankReceiptStatus: 'UTR Confirmed (RBI-096441029)',
          lastUpdated: '06 Sep 2026'
        }
      ],
      documents: [
        { title: 'Award & R&R Entitlement Slip (Form-D)', ref: 'FORM-D-RNR-0418.pdf', size: '1.3 MB', date: '20 Aug 2026' }
      ],
      auditTrail: [
        { date: '06 Sep 2026, 10:20 IST', action: 'Month 1 subsistence grant confirmed', officer: 'PFMS Gateway' },
        { date: '28 Aug 2026, 17:15 IST', action: 'Resettlement allowance ₹50,000 successfully credited', officer: 'CALA Accountant' }
      ],
      aiNote: 'Standard Affected Family Profile: Resettlement grant delivered; monthly subsistence cycle operational with zero exceptions.'
    },
    {
      id: 'RNR-FAM-008',
      pafId: 'PAF-GJ-2026-0419',
      headOfFamily: 'Shri Arvindbhai Nathubhai Rohit',
      aadhaarMasked: 'XXXX-XXXX-5511',
      familySize: 3,
      district: 'Vadodara',
      village: 'Sultanpur Khurd',
      khasraNo: '143/1',
      classification: 'Displaced',
      displacementType: 'Displaced (Homestead & Livelihood - Kuccha House)',
      category: 'SC / Agricultural Labourer',
      rnrStatus: 'Pending',
      benefitStatus: 'Pending Release',
      housingStatus: 'Pending',
      housingDetails: {
        colony: 'Sardar Patel R&R Enclave, Sanand',
        plotNo: 'Plot #38 (Under Allotment Lottery)',
        plotArea: '150 sq. m developed homestead',
        constructionStatus: 'Pending Allotment Order',
        possessionDate: 'Scheduled 30-Jul-2026'
      },
      dbtStatus: 'Pending Initiation',
      lastUpdated: '05 Sep 2026',
      totalEntitlementValue: '₹6,86,000',
      totalDisbursedValue: '₹0',
      bankInfo: {
        bankName: 'Bank of India',
        accountMasked: 'XXXX-XXXX-5511',
        ifscMasked: 'BKID0******',
        seedingStatus: 'Aadhaar Seeded (NPCI Validated)',
        pfmsId: 'PFMS-VAD-2026-0988'
      },
      benefits: [
        {
          benefit: 'Constructed House / Homestead',
          clause: 'Schedule II Para 1(1)',
          amount: '₹5,50,000',
          status: 'Pending Verification',
          statusColor: 'amber',
          lastUpdated: '05 Sep 2026',
          details: 'Claim in final survey verification round'
        },
        {
          benefit: 'One-Time Resettlement Allowance',
          clause: 'Schedule II Para 5',
          amount: '₹50,000',
          status: 'Pending Sanction',
          statusColor: 'amber',
          lastUpdated: '05 Sep 2026',
          details: 'Scheduled in next R&R sanction docket'
        },
        {
          benefit: 'Subsistence Grant (₹3,000 x 12m)',
          clause: 'Schedule II Para 3',
          amount: '₹36,000',
          status: 'Pending Sanction',
          statusColor: 'amber',
          lastUpdated: '05 Sep 2026',
          details: 'Pending sanction from CALA'
        }
      ],
      dbtTransactions: [],
      documents: [
        { title: 'Baseline Socio-Economic Survey Dossier', ref: 'SIA-SURVEY-ROHIT-0419.pdf', size: '2.4 MB', date: '15 Jan 2026' }
      ],
      auditTrail: [
        { date: '05 Sep 2026, 11:00 IST', action: 'Family census baseline record entered into R&R register', officer: 'Revenue Talati' }
      ],
      aiNote: 'Notice: Landless agricultural labourer entitled to mandatory homestead and resettlement assistance under RFCTLARR Section 31.'
    }
  ];

  // Districts and Villages for filtering
  const districts = ['ALL', 'Vadodara', 'Surat', 'Navsari', 'Bharuch'];
  const villages = ['ALL', 'Sultanpur Khurd', 'Fatehpur Gujran', 'Bahadurgarh Patti', 'Porbandar Rural', 'Vesu'];

  // Summary Metrics (Strictly max 4 compact indicators, no charts)
  const summary = useMemo(() => {
    const totalAffected = familiesList.length;
    const displacedCount = familiesList.filter(f => f.classification === 'Displaced').length;
    const benefitsPending = familiesList.filter(f => f.benefitStatus === 'Pending Release' || f.benefitStatus === 'Partially Disbursed').length;
    const dbtExceptions = familiesList.filter(f => f.dbtStatus === 'Exception').length;
    return {
      totalAffected,
      displacedCount,
      benefitsPending,
      dbtExceptions
    };
  }, [familiesList]);

  // Filtered families list for Tab 1
  const filteredFamilies = useMemo(() => {
    return familiesList.filter(item => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.id.toLowerCase().includes(q) ||
          item.pafId.toLowerCase().includes(q) ||
          item.headOfFamily.toLowerCase().includes(q) ||
          item.aadhaarMasked.toLowerCase().includes(q) ||
          item.khasraNo.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          item.village.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // District
      if (districtFilter !== 'ALL' && item.district !== districtFilter) return false;

      // Village
      if (villageFilter !== 'ALL' && item.village !== villageFilter) return false;

      // Classification (Affected / Displaced)
      if (classificationFilter !== 'ALL' && item.classification !== classificationFilter) return false;

      // R&R Status
      if (rnrStatusFilter !== 'ALL' && item.rnrStatus !== rnrStatusFilter) return false;

      // Benefit Status
      if (benefitStatusFilter !== 'ALL' && item.benefitStatus !== benefitStatusFilter) return false;

      // Housing Status
      if (housingStatusFilter !== 'ALL' && item.housingStatus !== housingStatusFilter) return false;

      // DBT Status
      if (dbtStatusFilter !== 'ALL' && item.dbtStatus !== dbtStatusFilter) return false;

      return true;
    });
  }, [
    familiesList, 
    searchQuery, 
    districtFilter, 
    villageFilter, 
    classificationFilter, 
    rnrStatusFilter, 
    benefitStatusFilter, 
    housingStatusFilter, 
    dbtStatusFilter
  ]);

  // Consolidated DBT Transactions for Tab 2
  const allDbtTransactions = useMemo(() => {
    const list = [];
    familiesList.forEach(fam => {
      fam.dbtTransactions.forEach(tx => {
        list.push({
          familyId: fam.id,
          pafId: fam.pafId,
          headOfFamily: fam.headOfFamily,
          district: fam.district,
          village: fam.village,
          bankName: fam.bankInfo.bankName,
          accountMasked: fam.bankInfo.accountMasked,
          ...tx,
          rawFamily: fam
        });
      });
    });
    return list;
  }, [familiesList]);

  // Filtered DBT list for Tab 2
  const filteredDbtTransactions = useMemo(() => {
    return allDbtTransactions.filter(tx => {
      if (dbtSearchQuery.trim()) {
        const q = dbtSearchQuery.toLowerCase();
        const matches = 
          tx.pafId.toLowerCase().includes(q) ||
          tx.headOfFamily.toLowerCase().includes(q) ||
          tx.paymentRef.toLowerCase().includes(q) ||
          tx.benefitCategory.toLowerCase().includes(q) ||
          tx.district.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (dbtCreditFilter !== 'ALL' && tx.creditStatus !== dbtCreditFilter) return false;

      return true;
    });
  }, [allDbtTransactions, dbtSearchQuery, dbtCreditFilter]);

  // DBT Tab Summary Counts
  const dbtSummary = useMemo(() => {
    const total = allDbtTransactions.length;
    const credited = allDbtTransactions.filter(t => t.creditStatus === 'Credited').length;
    const pending = allDbtTransactions.filter(t => t.creditStatus === 'Pending' || t.creditStatus === 'Initiated').length;
    const exceptions = allDbtTransactions.filter(t => t.creditStatus === 'Exception').length;
    return { total, credited, pending, exceptions };
  }, [allDbtTransactions]);

  // Handle open drawer
  const handleSelectFamily = (family) => {
    setSelectedFamily(family);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${text} to clipboard`);
  };

  const handleFlagException = (familyRef) => {
    showToast(`Flagged ${familyRef} for Nodal R&R Officer attention.`);
  };

  const handleFollowUp = (familyRef) => {
    showToast(`Follow-up inquiry registered with District R&R Administrator for ${familyRef}.`);
  };

  // Helper badge styles
  const getClassificationBadge = (classification) => {
    if (classification === 'Displaced') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200">
          <Home className="w-3 h-3 text-amber-600" />
          <span>Displaced (PDF)</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200">
        <Users className="w-3 h-3 text-sky-600" />
        <span>Affected (PAF)</span>
      </span>
    );
  };

  const getRnrStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>In Progress</span>
          </span>
        );
      case 'Scheme Approved':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldCheck className="w-3 h-3 text-purple-600" />
            <span>Scheme Approved</span>
          </span>
        );
      case 'Exception':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span>Exception</span>
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Pending</span>
          </span>
        );
    }
  };

  const getHousingStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'Allotted':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Home className="w-3 h-3 text-emerald-600" />
            <span>Allotted</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>In Progress</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
      case 'Not Applicable':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium font-mono text-slate-400 bg-slate-100 border border-slate-200">
            N/A
          </span>
        );
    }
  };

  const getDbtStatusBadge = (status) => {
    switch (status) {
      case 'Credited':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Credited</span>
          </span>
        );
      case 'Active':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200">
            <RefreshCw className="w-3 h-3 text-blue-600" />
            <span>Active</span>
          </span>
        );
      case 'Initiated':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200">
            <Send className="w-3 h-3 text-sky-600" />
            <span>Initiated</span>
          </span>
        );
      case 'Exception':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span>Exception</span>
          </span>
        );
      case 'Pending':
      case 'Pending Initiation':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div id="rnr-oversight-module-root" className="bg-[#f8fafc] text-slate-900 rounded-xl border border-slate-200/90 p-3 sm:p-5 lg:p-6 space-y-4 shadow-sm min-h-[calc(100vh-140px)] max-w-full overflow-x-hidden">
      
      {/* Top Header: Institutional Government Banner */}
      <div 
        id="rnr-oversight-header"
        className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full max-w-full overflow-hidden"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
            <span>PORTAL</span>
            <span>/</span>
            <span>REQUISITION MONITORING</span>
            <span>/</span>
            <span className="text-[#1B365D]">MODULE 08: R&R OVERSIGHT & DBT</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-1">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              R&R OVERSIGHT & DBT
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold font-mono inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              REHABILITATION & DBT SURVEILLANCE
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-0.5">
            Affected Family, Rehabilitation & DBT Monitoring • Surveillance of PAFs/PDFs, Schedule II entitlements, and PFMS credits
          </p>
        </div>

        {/* Current Proposal Context Box (Responsive) */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs flex flex-wrap items-center gap-3 md:gap-4 w-full xl:w-auto shrink min-w-0 max-w-full overflow-x-auto">
          <div className="min-w-0 shrink-0">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">PROPOSAL</div>
            <div className="font-mono font-bold text-[#1B365D] text-xs mt-0.5 truncate">NLAMS-RB-2026-00124</div>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block shrink-0"></div>
          <div className="min-w-0 max-w-xs truncate">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">PROJECT</div>
            <div className="font-semibold text-slate-800 text-xs mt-0.5 truncate">National Highway Corridor</div>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block shrink-0"></div>
          <div className="min-w-0 shrink-0">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">REQUISITIONING BODY</div>
            <div className="font-semibold text-slate-800 text-xs mt-0.5 truncate">NHAI / Project Division</div>
          </div>
        </div>
      </div>

      {/* Statutory Role Boundary Notice */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Requisitioning Body Surveillance Mandate:</span> Under RFCTLARR Act 2013, the Requisitioning Body operates in an <strong>oversight and tracking capacity</strong> to monitor affected family census, draft R&R scheme execution, and DBT credit logs. Authoritative statutory entitlement determination, R&R scheme approval, and award adjudication rest exclusively with the designated <strong>R&R Administrator & Collectorate</strong>.
        </div>
      </div>

      {/* Top Summary: Maximum 4 Compact Indicators (No large charts or 12 cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Indicator 1: Affected Families */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">Affected Families (PAFs)</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {summary.totalAffected}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
            <span>Verified in R&R Census</span>
          </div>
        </div>

        {/* Indicator 2: Displaced Families */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">Displaced Families (PDFs)</span>
            <Home className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
            {summary.displacedCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
            <span>Homestead / Habitation loss</span>
          </div>
        </div>

        {/* Indicator 3: Benefits Pending */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">Benefits Pending</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
            {summary.benefitsPending}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
            <span>Awaiting dispatch / verification</span>
          </div>
        </div>

        {/* Indicator 4: DBT Exceptions */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">DBT Exceptions</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
            {summary.dbtExceptions}
          </div>
          <div className="text-[10px] text-rose-600 mt-1 flex items-center gap-1 font-mono font-medium">
            <span>Aadhaar / Bank seed mismatch</span>
          </div>
        </div>
      </div>

      {/* Simple 2-Tab Navigation (Maximum 2 Simple Tabs as requested) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pt-1">
        <button
          onClick={() => setActiveTab('family-rnr')}
          className={`px-4 py-2 text-xs font-bold font-mono tracking-wide transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'family-rnr'
              ? 'border-[#1B365D] text-[#1B365D] bg-white rounded-t-md shadow-2xs'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-md'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>FAMILY & R&R MONITORING</span>
          <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 text-[10px] rounded-full">
            {familiesList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('dbt-monitoring')}
          className={`px-4 py-2 text-xs font-bold font-mono tracking-wide transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'dbt-monitoring'
              ? 'border-[#1B365D] text-[#1B365D] bg-white rounded-t-md shadow-2xs'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-md'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>DBT MONITORING</span>
          {summary.dbtExceptions > 0 ? (
            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] rounded-full font-bold">
              {summary.dbtExceptions} Alert
            </span>
          ) : (
            <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 text-[10px] rounded-full">
              {allDbtTransactions.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: FAMILY & R&R MONITORING WORKSPACE */}
      {activeTab === 'family-rnr' && (
        <div className="space-y-4">
          
          {/* Main Register Header & Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#1B365D]" />
                  <span>R&R / Affected Family Monitoring Register</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Census of surveyed project affected and displaced families with statutory Schedule II entitlements
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Showing <strong>{filteredFamilies.length}</strong> of {familiesList.length} Records</span>
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 text-xs">
              
              {/* Search */}
              <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Family Ref / Head / Khasra..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#1B365D] focus:bg-white text-slate-800 placeholder:text-slate-400 font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* District Filter */}
              <div>
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All Districts</option>
                  {districts.filter(d => d !== 'ALL').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Village Filter */}
              <div>
                <select
                  value={villageFilter}
                  onChange={(e) => setVillageFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All Villages</option>
                  {villages.filter(v => v !== 'ALL').map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Classification: Affected vs Displaced */}
              <div>
                <select
                  value={classificationFilter}
                  onChange={(e) => setClassificationFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All Classifications</option>
                  <option value="Displaced">Displaced (PDF)</option>
                  <option value="Affected">Affected (PAF)</option>
                </select>
              </div>

              {/* Housing Status */}
              <div>
                <select
                  value={housingStatusFilter}
                  onChange={(e) => setHousingStatusFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All Housing</option>
                  <option value="Allotted">Allotted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Applicable">N/A</option>
                </select>
              </div>

              {/* DBT Status */}
              <div>
                <select
                  value={dbtStatusFilter}
                  onChange={(e) => setDbtStatusFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All DBT Status</option>
                  <option value="Credited">Credited</option>
                  <option value="Active">Active</option>
                  <option value="Initiated">Initiated</option>
                  <option value="Pending Initiation">Pending</option>
                  <option value="Exception">Exception</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Register Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-2.5 px-3">Family Reference</th>
                    <th className="py-2.5 px-3">Head of Family</th>
                    <th className="py-2.5 px-3">District / Village</th>
                    <th className="py-2.5 px-3">Affected / Displaced</th>
                    <th className="py-2.5 px-3">R&R Status</th>
                    <th className="py-2.5 px-3">Benefit Status</th>
                    <th className="py-2.5 px-3">Housing Status</th>
                    <th className="py-2.5 px-3">DBT Status</th>
                    <th className="py-2.5 px-3">Last Updated</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredFamilies.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        <AlertCircle className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                        <span>No family records found matching the active filter criteria.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredFamilies.map((fam) => (
                      <tr 
                        key={fam.id} 
                        onClick={() => handleSelectFamily(fam)}
                        className={`hover:bg-slate-50/90 transition-colors cursor-pointer ${
                          selectedFamily?.id === fam.id ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        {/* Family Reference */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <div className="font-mono font-bold text-[#1B365D] text-xs">
                            {fam.pafId}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Khasra: {fam.khasraNo}
                          </div>
                        </td>

                        {/* Head of Family */}
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-800">
                            {fam.headOfFamily}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-mono">
                            <span>Family of {fam.familySize}</span>
                            <span>•</span>
                            <span className="text-slate-400">{fam.aadhaarMasked}</span>
                          </div>
                        </td>

                        {/* District / Village */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <div className="font-medium text-slate-800">{fam.district}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{fam.village}</div>
                        </td>

                        {/* Affected / Displaced */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {getClassificationBadge(fam.classification)}
                        </td>

                        {/* R&R Status */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {getRnrStatusBadge(fam.rnrStatus)}
                        </td>

                        {/* Benefit Status */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`text-[11px] font-medium ${
                            fam.benefitStatus === 'Fully Disbursed'
                              ? 'text-emerald-700'
                              : fam.benefitStatus === 'Partially Disbursed'
                              ? 'text-blue-700'
                              : 'text-amber-700'
                          }`}>
                            {fam.benefitStatus}
                          </span>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {fam.totalDisbursedValue} / {fam.totalEntitlementValue}
                          </div>
                        </td>

                        {/* Housing Status */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {getHousingStatusBadge(fam.housingStatus)}
                        </td>

                        {/* DBT Status */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {getDbtStatusBadge(fam.dbtStatus)}
                        </td>

                        {/* Last Updated */}
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-500">
                          {fam.lastUpdated}
                        </td>

                        {/* Action */}
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectFamily(fam);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#1B365D] hover:bg-slate-100 rounded transition-colors inline-flex items-center gap-1 text-[11px] font-medium"
                            title="Inspect Family R&R Dossier"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                            <span className="hidden sm:inline">Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="font-mono text-[11px]">
                Showing {filteredFamilies.length} families • Aadhaar numbers masked per UIDAI compliance standards
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Exported R&R Census Register (PDF) for Nodal Division')}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 text-[11px] font-medium inline-flex items-center gap-1 shadow-2xs"
                >
                  <Download className="w-3 h-3 text-slate-500" />
                  <span>Export Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DBT MONITORING WORKSPACE */}
      {activeTab === 'dbt-monitoring' && (
        <div className="space-y-4">
          
          {/* DBT Top Mini-Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs">
              <div className="text-slate-500 font-medium">Transfers Initiated</div>
              <div className="text-xl font-bold font-mono text-slate-800 mt-1">
                {dbtSummary.total}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">PFMS Batch entries</div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs">
              <div className="text-slate-500 font-medium">Credited to Beneficiary</div>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
                {dbtSummary.credited}
              </div>
              <div className="text-[10px] text-emerald-600 font-mono mt-0.5">Bank UTR Confirmed</div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs">
              <div className="text-slate-500 font-medium">Pending Settlement</div>
              <div className="text-xl font-bold font-mono text-amber-700 mt-1">
                {dbtSummary.pending}
              </div>
              <div className="text-[10px] text-amber-600 font-mono mt-0.5">In banking transit</div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-2xs">
              <div className="text-slate-500 font-medium">DBT Exceptions</div>
              <div className="text-xl font-bold font-mono text-rose-600 mt-1">
                {dbtSummary.exceptions}
              </div>
              <div className="text-[10px] text-rose-600 font-mono mt-0.5">Aadhaar / KYC hold</div>
            </div>
          </div>

          {/* DBT Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#1B365D]" />
                  <span>Direct Benefit Transfer (DBT) Credit Logs</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Electronic benefit disbursement tracking through Public Financial Management System (PFMS)
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Showing <strong>{filteredDbtTransactions.length}</strong> transfers</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="sm:col-span-2 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Payment Ref / Beneficiary / PFMS batch..."
                  value={dbtSearchQuery}
                  onChange={(e) => setDbtSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#1B365D] focus:bg-white text-slate-800 placeholder:text-slate-400 font-sans"
                />
              </div>

              <div>
                <select
                  value={dbtCreditFilter}
                  onChange={(e) => setDbtCreditFilter(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B365D]"
                >
                  <option value="ALL">All Credit Statuses</option>
                  <option value="Credited">Credited</option>
                  <option value="Initiated">Initiated</option>
                  <option value="Pending">Pending</option>
                  <option value="Exception">Exception</option>
                </select>
              </div>
            </div>
          </div>

          {/* DBT Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-2.5 px-3">Family Ref</th>
                    <th className="py-2.5 px-3">Beneficiary</th>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">Benefit Category</th>
                    <th className="py-2.5 px-3">Payment Reference</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Masked Bank Account</th>
                    <th className="py-2.5 px-3">Initiated Date</th>
                    <th className="py-2.5 px-3">Credit Status</th>
                    <th className="py-2.5 px-3">Bank Receipt Status</th>
                    <th className="py-2.5 px-3">Last Updated</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredDbtTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-8 text-center text-slate-400">
                        <AlertCircle className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                        <span>No DBT transfer records found matching the active filter.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredDbtTransactions.map((tx, idx) => (
                      <tr 
                        key={idx}
                        onClick={() => handleSelectFamily(tx.rawFamily)}
                        className="hover:bg-slate-50/90 transition-colors cursor-pointer"
                      >
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-[#1B365D]">
                          {tx.pafId}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-medium text-slate-800">
                          {tx.headOfFamily}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {tx.district}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[11px] font-semibold text-slate-700">
                            {tx.benefitCategory}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-slate-600 text-[11px]">
                          {tx.paymentRef}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-slate-900">
                          {tx.amount}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-slate-500 text-[11px]">
                          {tx.bankName} ({tx.accountMasked})
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-500">
                          {tx.initiatedDate}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {getDbtStatusBadge(tx.creditStatus)}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap text-[11px]">
                          <span className={tx.creditStatus === 'Exception' ? 'text-rose-600 font-medium' : 'text-slate-600'}>
                            {tx.bankReceiptStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-400">
                          {tx.lastUpdated}
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectFamily(tx.rawFamily);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#1B365D] hover:bg-slate-100 rounded transition-colors inline-flex items-center gap-1 text-[11px] font-medium"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="font-mono text-[11px]">
                Sensitive beneficiary bank account details masked per Government cybersecurity & PFMS guidelines.
              </span>
              <button
                onClick={() => showToast('Exported Consolidated DBT Transaction Ledger')}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 text-[11px] font-medium inline-flex items-center gap-1 shadow-2xs"
              >
                <Download className="w-3 h-3 text-slate-500" />
                <span>Export DBT Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT CONTEXTUAL SLIDE-OVER DRAWER (When Family Record Selected) */}
      {isDrawerOpen && selectedFamily && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 text-slate-800 animate-in slide-in-from-right duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Drawer Header */}
            <div className="bg-[#1B365D] text-white p-4 border-b border-slate-800 flex items-start justify-between gap-3 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold font-mono tracking-wider text-amber-300 uppercase">
                  <span>R&R DOSSIER</span>
                  <span>•</span>
                  <span>{selectedFamily.pafId}</span>
                  <button 
                    onClick={() => copyToClipboard(selectedFamily.pafId)}
                    className="text-slate-300 hover:text-white p-0.5 rounded transition-colors"
                    title="Copy Reference"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mt-1">
                  {selectedFamily.headOfFamily}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1">
                  <span>{selectedFamily.district}, {selectedFamily.village}</span>
                  <span>•</span>
                  <span>Khasra: <strong className="text-white font-mono">{selectedFamily.khasraNo}</strong></span>
                  <span>•</span>
                  <span>{selectedFamily.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={closeDrawer}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                  title="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs">
              
              {/* Status Alert Banner */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <div className="text-[10px] font-bold font-mono text-slate-500 uppercase">DISPLACEMENT STATUS</div>
                  <div className="mt-0.5">
                    {getClassificationBadge(selectedFamily.classification)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold font-mono text-slate-500 uppercase">R&R PROGRESS</div>
                  <div className="mt-0.5">
                    {getRnrStatusBadge(selectedFamily.rnrStatus)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold font-mono text-slate-500 uppercase">DBT TRANSFER</div>
                  <div className="mt-0.5">
                    {getDbtStatusBadge(selectedFamily.dbtStatus)}
                  </div>
                </div>
              </div>

              {/* SECTION 1: FAMILY INFORMATION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 1: Family Census Information</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Last Updated: {selectedFamily.lastUpdated}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/70 p-3 rounded-lg border border-slate-200">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Family Reference</div>
                    <div className="font-mono font-bold text-slate-800 text-xs mt-0.5">{selectedFamily.pafId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Head of Household</div>
                    <div className="font-medium text-slate-800 text-xs mt-0.5">{selectedFamily.headOfFamily}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Family Members</div>
                    <div className="font-medium text-slate-800 text-xs mt-0.5">{selectedFamily.familySize} Persons</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Social Category</div>
                    <div className="font-medium text-slate-800 text-xs mt-0.5">{selectedFamily.category}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Aadhaar (Masked)</div>
                    <div className="font-mono text-slate-800 text-xs mt-0.5">{selectedFamily.aadhaarMasked}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Displacement Type</div>
                    <div className="font-medium text-slate-800 text-xs mt-0.5">{selectedFamily.displacementType}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: R&R BENEFITS (Schedule II Entitlements) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 2: Statutory R&R Entitlements (Schedule II)</span>
                  </h4>
                  <div className="text-[10px] font-mono text-slate-600">
                    Total: <strong className="text-emerald-700">{selectedFamily.totalEntitlementValue}</strong>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="py-2 px-3">Statutory Benefit</th>
                        <th className="py-2 px-3">Statutory Provision</th>
                        <th className="py-2 px-3">Amount / Ref</th>
                        <th className="py-2 px-3 text-right">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedFamily.benefits.map((b, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2 px-3 font-medium text-slate-800">
                            <div>{b.benefit}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{b.details}</div>
                          </td>
                          <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                            {b.clause}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-slate-800">
                            {b.amount}
                          </td>
                          <td className="py-2 px-3 text-right">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                              b.statusColor === 'emerald'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : b.statusColor === 'rose'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : b.statusColor === 'blue'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 3: HOUSING / REHABILITATION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 3: Housing & Resettlement Tracking</span>
                  </h4>
                  <div>
                    {getHousingStatusBadge(selectedFamily.housingStatus)}
                  </div>
                </div>

                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Colony / Site Location</div>
                      <div className="font-semibold text-slate-800 text-xs mt-0.5">{selectedFamily.housingDetails.colony}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Plot / Dwelling Reference</div>
                      <div className="font-mono text-slate-800 text-xs mt-0.5">{selectedFamily.housingDetails.plotNo}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Allotted Area Specification</div>
                      <div className="text-slate-800 text-xs mt-0.5">{selectedFamily.housingDetails.plotArea}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Physical Construction Status</div>
                      <div className="text-slate-800 text-xs mt-0.5 font-medium">{selectedFamily.housingDetails.constructionStatus}</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Possession / Handover Schedule: <strong>{selectedFamily.housingDetails.possessionDate}</strong></span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DBT STATUS & BANK LOGS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 4: Direct Benefit Transfer (DBT) Status</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">PFMS Seeded</span>
                </div>

                {/* Bank Account Overview Card */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Aadhaar-Seeded Bank Account</div>
                    <div className="font-mono font-bold text-slate-800 text-xs mt-0.5">
                      {selectedFamily.bankInfo.bankName} — {selectedFamily.bankInfo.accountMasked}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      IFSC: {selectedFamily.bankInfo.ifscMasked} • PFMS Beneficiary ID: {selectedFamily.bankInfo.pfmsId}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-flex items-center gap-1 ${
                      selectedFamily.bankInfo.seedingStatus.includes('Exception')
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {selectedFamily.bankInfo.seedingStatus.includes('Exception') ? (
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      )}
                      <span>{selectedFamily.bankInfo.seedingStatus}</span>
                    </span>
                  </div>
                </div>

                {/* DBT Transactions Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="py-2 px-3">Payment Ref</th>
                        <th className="py-2 px-3">Benefit Category</th>
                        <th className="py-2 px-3">Amount</th>
                        <th className="py-2 px-3">Credit Status</th>
                        <th className="py-2 px-3 text-right">Bank Receipt Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedFamily.dbtTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-slate-400">
                            No DBT payments initiated yet for this family record.
                          </td>
                        </tr>
                      ) : (
                        selectedFamily.dbtTransactions.map((tx, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70">
                            <td className="py-2 px-3 font-mono font-medium text-slate-800 text-[11px]">
                              {tx.paymentRef}
                            </td>
                            <td className="py-2 px-3 text-slate-700 text-[11px]">
                              {tx.benefitCategory}
                            </td>
                            <td className="py-2 px-3 font-mono font-bold text-slate-900">
                              {tx.amount}
                            </td>
                            <td className="py-2 px-3">
                              {getDbtStatusBadge(tx.creditStatus)}
                            </td>
                            <td className="py-2 px-3 text-right text-[11px] text-slate-600 font-mono">
                              {tx.bankReceiptStatus}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 5: RELATED SUPPORTING DOCUMENTS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 5: Supporting Documents & Records</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedFamily.documents.length} Files</span>
                </div>

                <div className="space-y-1.5">
                  {selectedFamily.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FileText className="w-4 h-4 text-[#1B365D] shrink-0" />
                        <div className="truncate">
                          <div className="font-semibold text-slate-800 text-xs truncate">{doc.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                            <span>{doc.ref}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => showToast(`Opening document: ${doc.ref}`)}
                          className="p-1 text-slate-600 hover:text-[#1B365D] hover:bg-white rounded transition-colors text-[11px] font-medium inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => showToast(`Downloaded: ${doc.ref}`)}
                          className="p-1 text-slate-600 hover:text-[#1B365D] hover:bg-white rounded transition-colors"
                          title="Download Document"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 6: STATUS HISTORY & AUDIT LOG */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Section 6: Status History & Audit Updates</span>
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedFamily.auditTrail.map((log, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200/80 bg-white text-xs flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B365D] mt-1.5 shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-slate-800 font-medium">{log.action}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                          <span>{log.date}</span>
                          <span>•</span>
                          <span className="text-slate-600 font-semibold">{log.officer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 7: SUBTLE AI ADVISORY LAYER */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold font-mono text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#1B365D]" />
                  <span>BHUMI MITRA LEGAL R&R ADVISORY (NON-BINDING)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedFamily.aiNote}
                </p>
                <div className="text-[9px] text-slate-400 font-mono">
                  *AI analysis is advisory. Authoritative statutory decisions remain with the R&R Administrator under Section 31.
                </div>
              </div>

            </div>

            {/* Drawer Footer: Requisitioning Body Monitoring Actions ONLY (No statutory approval buttons) */}
            <div className="bg-slate-50 border-t border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <span>RB Mandate: Surveillance & Tracking</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleFlagException(selectedFamily.pafId)}
                  className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5 text-rose-600" />
                  <span>Flag Exception</span>
                </button>

                <button
                  onClick={() => handleFollowUp(selectedFamily.pafId)}
                  className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#1B365D]" />
                  <span>Follow Up with Administrator</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Exported R&R Dossier for ${selectedFamily.pafId}`);
                  }}
                  className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#142947] text-white rounded text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Dossier (PDF)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

