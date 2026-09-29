import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  Layers, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Users, 
  Scale, 
  AlertTriangle, 
  Briefcase, 
  FileCheck, 
  Compass, 
  Sparkles, 
  ExternalLink, 
  MapPin, 
  Building,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

// 1. Appropriate Government Context & Pages
import { AppropriateGovernmentProvider } from '../appropriate-government/context/AppropriateGovernmentContext.jsx';
import ExecutiveDashboardPage from '../appropriate-government/pages/ExecutiveDashboardPage.jsx';
import CollectorProposalInboxPage from '../appropriate-government/pages/CollectorProposalInboxPage.jsx';
import SiaSurveyLaunchHubPage from '../appropriate-government/pages/SiaSurveyLaunchHubPage.jsx';
import Section11NotificationHubPage from '../appropriate-government/pages/Section11NotificationHubPage.jsx';
import RnRReviewObjectionsPage from '../appropriate-government/pages/RnRReviewObjectionsPage.jsx';
import Section19DeclarationEnginePage from '../appropriate-government/pages/Section19DeclarationEnginePage.jsx';
import RbacAccessControlHubPage from '../appropriate-government/pages/RbacAccessControlHubPage.jsx';
import GazetteBroadcastVaultPage from '../appropriate-government/pages/GazetteBroadcastVaultPage.jsx';

// 2. Policy Maker Context & Pages
import { PolicyMakerProvider } from '../../contexts/PolicyMakerContext.jsx';
import ExecutiveOverviewPage from '../../pages/policy-maker/ExecutiveOverviewPage.jsx';
import PipelinePage from '../../pages/policy-maker/PipelinePage.jsx';
import RiskEnginePage from '../../pages/policy-maker/RiskEnginePage.jsx';
import FinanceOversightPage from '../../pages/policy-maker/FinanceOversightPage.jsx';
import MeetingsMoMPage from '../../pages/policy-maker/MeetingsMoMPage.jsx';
import BottleneckResolverPage from '../../pages/policy-maker/BottleneckResolverPage.jsx';
import RnRSocialAuditPage from '../../pages/policy-maker/RnRSocialAuditPage.jsx';
import MisReportsPage from '../../pages/policy-maker/MisReportsPage.jsx';

// 3. SIA & IEG Context & Pages
import { SiaIegProvider } from '../../contexts/SiaIegContext.jsx';
import SiaOverviewPage from '../../pages/sia-ieg/SiaOverviewPage.jsx';
import SurveyImpactCensusPage from '../../pages/sia-ieg/SurveyImpactCensusPage.jsx';
import PublicHearingPage from '../../pages/sia-ieg/PublicHearingPage.jsx';
import SimpBuilderPage from '../../pages/sia-ieg/SimpBuilderPage.jsx';
import FinalSiaReportPage from '../../pages/sia-ieg/FinalSiaReportPage.jsx';
import IegDashboardPage from '../../pages/sia-ieg/IegDashboardPage.jsx';
import SiaReviewEvidencePage from '../../pages/sia-ieg/SiaReviewEvidencePage.jsx';
import StatutoryAppraisalPage from '../../pages/sia-ieg/StatutoryAppraisalPage.jsx';
import FinalRecommendationAuditPage from '../../pages/sia-ieg/FinalRecommendationAuditPage.jsx';

// 4. R&R Authority Context & Pages
import { RRAuthorityProvider } from '../rr-authority/context/RRAuthorityContext.jsx';
import RRDashboardPage from '../rr-authority/pages/RRDashboardPage.jsx';
import AffectedFamiliesPage from '../rr-authority/pages/AffectedFamiliesPage.jsx';
import RRSchemeBuilderPage from '../rr-authority/pages/RRSchemeBuilderPage.jsx';
import SCSTPlanBuilderPage from '../rr-authority/pages/SCSTPlanBuilderPage.jsx';
import RRPublicHearingPage from '../rr-authority/pages/RRPublicHearingPage.jsx';
import RRAllotmentPage from '../rr-authority/pages/RRAllotmentPage.jsx';
import RRDBTPage from '../rr-authority/pages/RRDBTPage.jsx';
import CommissionerApprovalPage from '../rr-authority/pages/CommissionerApprovalPage.jsx';
import RRMonitoringPage from '../rr-authority/pages/RRMonitoringPage.jsx';
import RRAuditVaultPage from '../rr-authority/pages/RRAuditVaultPage.jsx';

// 5. LARR Authority Context & Pages
import { LarrAuthorityProvider } from '../larr-authority/context/LarrAuthorityContext.jsx';
import JudicialDashboardPage from '../larr-authority/pages/JudicialDashboardPage.jsx';
import Section64InwardPage from '../larr-authority/pages/Section64InwardPage.jsx';
import DigitalSummonsPage from '../larr-authority/pages/DigitalSummonsPage.jsx';
import PleadingsEvidencePage from '../larr-authority/pages/PleadingsEvidencePage.jsx';
import VirtualCourtroomPage from '../larr-authority/pages/VirtualCourtroomPage.jsx';
import Section69AwardEnginePage from '../larr-authority/pages/Section69AwardEnginePage.jsx';
import EscrowApportionmentPage from '../larr-authority/pages/EscrowApportionmentPage.jsx';
import SlaPipelineMonitorPage from '../larr-authority/pages/SlaPipelineMonitorPage.jsx';
import AppealExecutionPage from '../larr-authority/pages/AppealExecutionPage.jsx';
import JudicialAuditVaultPage from '../larr-authority/pages/JudicialAuditVaultPage.jsx';

// 6. Requisitioning Body / PIA Context & Pages
import { WorkspaceProvider } from '../../contexts/WorkspaceContext.jsx';
import ExecutiveDashboard from '../../pages/requisitioning-body/ExecutiveDashboard.jsx';
import MasterRequisitionHub from '../../pages/requisitioning-body/MasterRequisitionHub.jsx';
import FormISmartWizard from '../../pages/requisitioning-body/FormISmartWizard.jsx';
import GisSpatialCanvas from '../../pages/requisitioning-body/GisSpatialCanvas.jsx';
import FinancialEscrowLedger from '../../pages/requisitioning-body/FinancialEscrowLedger.jsx';
import StatutoryTimelineTracker from '../../pages/requisitioning-body/StatutoryTimelineTracker.jsx';
import ObjectionsHearings from '../../pages/requisitioning-body/ObjectionsHearings.jsx';
import RnrOversightDbt from '../../pages/requisitioning-body/RnrOversightDbt.jsx';
import PiaDelegationRbac from '../../pages/requisitioning-body/PiaDelegationRbac.jsx';
import DocumentGazetteVault from '../../pages/requisitioning-body/DocumentGazetteVault.jsx';

// MASTER REGISTRY: Maps every key produced by RBAC Access Control Hub to its real component
const MASTER_MENU_DEFINITIONS = {
  // === 1. COMMITTEE SUB-MENU KEYS ===
  'pm_exec_gis': { label: 'Executive Overview & GIS', icon: BarChart3, group: 'policy-maker', Component: ExecutiveOverviewPage },
  'pm_pipeline': { label: 'National/State Pipeline', icon: Layers, group: 'policy-maker', Component: PipelinePage },
  'pm_lapsing_risk': { label: 'Lapsing Risk Engine', icon: AlertTriangle, group: 'policy-maker', Component: RiskEnginePage },
  'pm_pfms_dbt': { label: 'PFMS & DBT Oversight', icon: Briefcase, group: 'policy-maker', Component: FinanceOversightPage },
  'pm_meetings_mom': { label: 'NMC/SMC Meetings & MoM', icon: Users, group: 'policy-maker', Component: MeetingsMoMPage },
  'pm_bottleneck': { label: 'Bottleneck Resolver', icon: CheckCircle2, group: 'policy-maker', Component: BottleneckResolverPage },
  'pm_rnr_audit': { label: 'R&R & Social Audit Review', icon: FileCheck, group: 'policy-maker', Component: RnRSocialAuditPage },
  'pm_mis_reports': { label: 'MIS & Cabinet Reports', icon: FileText, group: 'policy-maker', Component: MisReportsPage },

  // Appropriate Gov Menus inside Committee SubMenu
  'app_dashboard': { label: 'Appropriate Govt Dashboard', icon: BarChart3, group: 'appropriate-gov', Component: ExecutiveDashboardPage },
  'app_proposal_inbox': { label: 'Collector Proposal Inbox', icon: FileText, group: 'appropriate-gov', Component: CollectorProposalInboxPage },
  'app_sia_launch': { label: 'SIA Survey & Launch Hub', icon: Compass, group: 'appropriate-gov', Component: SiaSurveyLaunchHubPage },
  'app_sec11_notif': { label: 'Section 11 Notification Hub', icon: FileCheck, group: 'appropriate-gov', Component: Section11NotificationHubPage },
  'app_rnr_portal': { label: 'R&R Review & Objections Hub', icon: Users, group: 'appropriate-gov', Component: RnRReviewObjectionsPage },
  'app_sec19_engine': { label: 'Section 19 Declaration Engine', icon: ShieldCheck, group: 'appropriate-gov', Component: Section19DeclarationEnginePage },
  'app_rbac_hub': { label: 'RBAC Access Control Hub', icon: Lock, group: 'appropriate-gov', Component: RbacAccessControlHubPage },
  'app_gazette_vault': { label: 'Gazette Broadcast Vault', icon: FileText, group: 'appropriate-gov', Component: GazetteBroadcastVaultPage },

  // === 2. SIA & IEG SUB-MENU KEYS ===
  'sia_exec_overview': { label: 'SIA Executive Overview', icon: BarChart3, group: 'sia-ieg', Component: SiaOverviewPage },
  'sia_survey_census': { label: 'Survey & Impact Census', icon: Users, group: 'sia-ieg', Component: SurveyImpactCensusPage },
  'sia_sec5_hearing': { label: 'Section 5 Public Hearing', icon: Users, group: 'sia-ieg', Component: PublicHearingPage },
  'sia_sec6_simp': { label: 'Section 6 SIMP Builder', icon: Layers, group: 'sia-ieg', Component: SimpBuilderPage },
  'sia_final_report': { label: 'Final SIA Report & Publication', icon: FileText, group: 'sia-ieg', Component: FinalSiaReportPage },
  'ieg_dashboard': { label: 'IEG Appraisal Dashboard', icon: BarChart3, group: 'sia-ieg', Component: IegDashboardPage },
  'ieg_review_evidence': { label: 'SIA Review & Evidence', icon: FileCheck, group: 'sia-ieg', Component: SiaReviewEvidencePage },
  'ieg_sec7_appraisal': { label: 'Section 7 Statutory Appraisal', icon: ShieldCheck, group: 'sia-ieg', Component: StatutoryAppraisalPage },
  'ieg_final_rec': { label: 'Final Recommendation & Audit', icon: CheckCircle2, group: 'sia-ieg', Component: FinalRecommendationAuditPage },

  // === 3. R&R AUTHORITY SUB-MENU KEYS ===
  'rnr_1_admin_dashboard': { label: 'R&R Administrator Dashboard', icon: BarChart3, group: 'rr-authority', Component: RRDashboardPage },
  'rnr_2_census_survey': { label: 'Affected Families Census & Survey', icon: Users, group: 'rr-authority', Component: AffectedFamiliesPage },
  'rnr_3_scheme_builder': { label: 'Draft Form-V R&R Scheme Builder', icon: Layers, group: 'rr-authority', Component: RRSchemeBuilderPage },
  'rnr_4_sc_st_plan': { label: 'SC/ST Special Plan Sec 41', icon: ShieldCheck, group: 'rr-authority', Component: SCSTPlanBuilderPage },
  'rnr_5_public_hearing': { label: 'Sec 16(5) Public Hearing & Claims', icon: Users, group: 'rr-authority', Component: RRPublicHearingPage },
  'rnr_6_award_execution': { label: 'R&R Award Allotment Desk', icon: Building2, group: 'rr-authority', Component: RRAllotmentPage },
  'rnr_7_pfms_dbt': { label: 'PFMS DBT Annuity Disbursement', icon: Briefcase, group: 'rr-authority', Component: RRDBTPage },
  'rnr_8_commissioner_approval': { label: 'Commissioner Master Sanction Sec 18', icon: CheckCircle2, group: 'rr-authority', Component: CommissionerApprovalPage },
  'rnr_9_monitoring_compliance': { label: 'R&R Monitoring & Compliance', icon: Clock, group: 'rr-authority', Component: RRMonitoringPage },
  'rnr_10_statutory_audit': { label: 'Statutory Audit Vault (NMC/SMC)', icon: FileText, group: 'rr-authority', Component: RRAuditVaultPage },

  // === 4. LARR AUTHORITY SUB-MENU KEYS ===
  'larr_1_judicial_dashboard': { label: 'Judicial Tribunal Dashboard', icon: BarChart3, group: 'larr-authority', Component: JudicialDashboardPage },
  'larr_2_sec64_reference': { label: 'Section 64 Reference Inward', icon: Scale, group: 'larr-authority', Component: Section64InwardPage },
  'larr_3_summons_notice': { label: 'Digital Summons & Multi-Party Notice', icon: Clock, group: 'larr-authority', Component: DigitalSummonsPage },
  'larr_4_pleadings_evidence': { label: 'Pleadings & Spatial Evidence Vault', icon: FileText, group: 'larr-authority', Component: PleadingsEvidencePage },
  'larr_5_cause_list_courtroom': { label: 'Virtual Courtroom & Daily Board', icon: Users, group: 'larr-authority', Component: VirtualCourtroomPage },
  'larr_6_sec69_award': { label: 'Section 69 Enhanced Award Engine', icon: CheckCircle2, group: 'larr-authority', Component: Section69AwardEnginePage },
  'larr_7_sec77_escrow': { label: 'Section 77 Escrow Apportionment', icon: Briefcase, group: 'larr-authority', Component: EscrowApportionmentPage },
  'larr_8_sla_pipeline': { label: 'Statutory 180-Day SLA Monitor', icon: Clock, group: 'larr-authority', Component: SlaPipelineMonitorPage },
  'larr_9_hc_appeal': { label: 'Section 74 High Court Appeals', icon: FileCheck, group: 'larr-authority', Component: AppealExecutionPage },
  'larr_10_audit_vault': { label: 'Judicial Audit & Performance Vault', icon: FileText, group: 'larr-authority', Component: JudicialAuditVaultPage },

  // === 5. ALIAS / HYPHENATED KEYS (Backward & Forward Compatibility) ===
  'executive-overview': { label: 'Executive Overview', icon: BarChart3, group: 'policy-maker', Component: ExecutiveOverviewPage },
  'pipeline-monitoring': { label: 'Pipeline Monitoring', icon: Layers, group: 'policy-maker', Component: PipelinePage },
  'pipeline': { label: 'Pipeline Monitoring', icon: Layers, group: 'policy-maker', Component: PipelinePage },
  'risk-engine': { label: 'Risk Engine & Lapsing Radar', icon: AlertTriangle, group: 'policy-maker', Component: RiskEnginePage },
  'finance-oversight': { label: 'Finance & Escrow Oversight', icon: Briefcase, group: 'policy-maker', Component: FinanceOversightPage },
  'meetings-mom': { label: 'Statutory Committee Meetings', icon: Users, group: 'policy-maker', Component: MeetingsMoMPage },
  'bottleneck-resolver': { label: 'Bottleneck Escalation Resolver', icon: CheckCircle2, group: 'policy-maker', Component: BottleneckResolverPage },
  'rr-social-audit': { label: 'R&R Social Audit Monitoring', icon: FileCheck, group: 'policy-maker', Component: RnRSocialAuditPage },
  'mis-reports': { label: 'MIS Reports & Gazette Archive', icon: FileText, group: 'policy-maker', Component: MisReportsPage },

  'executive-dashboard': { label: 'Appropriate Govt Dashboard', icon: BarChart3, group: 'appropriate-gov', Component: ExecutiveDashboardPage },
  'collector-proposals': { label: 'Collector Proposals Scrutiny', icon: FileText, group: 'appropriate-gov', Component: CollectorProposalInboxPage },
  'collector-proposal-inbox': { label: 'Collector Proposals Scrutiny', icon: FileText, group: 'appropriate-gov', Component: CollectorProposalInboxPage },
  'sia-surveys': { label: 'SIA Survey & Appraisal Hub', icon: Compass, group: 'appropriate-gov', Component: SiaSurveyLaunchHubPage },
  'sia-survey-launch': { label: 'SIA Survey & Appraisal Hub', icon: Compass, group: 'appropriate-gov', Component: SiaSurveyLaunchHubPage },
  'sec11-notifications': { label: 'Section 11 Gazette Hub', icon: FileCheck, group: 'appropriate-gov', Component: Section11NotificationHubPage },
  'sec11-notification': { label: 'Section 11 Gazette Hub', icon: FileCheck, group: 'appropriate-gov', Component: Section11NotificationHubPage },
  'rnr-review': { label: 'R&R Review & Objections Hub', icon: Users, group: 'appropriate-gov', Component: RnRReviewObjectionsPage },
  'rnr-review-objections': { label: 'R&R Review & Objections Hub', icon: Users, group: 'appropriate-gov', Component: RnRReviewObjectionsPage },
  'sec19-declarations': { label: 'Section 19 Declaration Engine', icon: ShieldCheck, group: 'appropriate-gov', Component: Section19DeclarationEnginePage },
  'sec19-declaration': { label: 'Section 19 Declaration Engine', icon: ShieldCheck, group: 'appropriate-gov', Component: Section19DeclarationEnginePage },
  'rbac-hub': { label: 'RBAC Access Control Hub', icon: Lock, group: 'appropriate-gov', Component: RbacAccessControlHubPage },
  'rbac-access-control': { label: 'RBAC Access Control Hub', icon: Lock, group: 'appropriate-gov', Component: RbacAccessControlHubPage },
  'gazette-vault': { label: 'Gazette & Legal Vault', icon: FileText, group: 'appropriate-gov', Component: GazetteBroadcastVaultPage },

  'sia-overview': { label: 'SIA Executive Overview', icon: BarChart3, group: 'sia-ieg', Component: SiaOverviewPage },
  'survey-impact-census': { label: 'Survey & Impact Census', icon: Users, group: 'sia-ieg', Component: SurveyImpactCensusPage },
  'public-hearing': { label: 'Section 5 Public Hearing', icon: Users, group: 'sia-ieg', Component: PublicHearingPage },
  'simp-builder': { label: 'Section 6 SIMP Builder', icon: Layers, group: 'sia-ieg', Component: SimpBuilderPage },
  'final-sia-report': { label: 'Final SIA Report', icon: FileText, group: 'sia-ieg', Component: FinalSiaReportPage },
  'ieg-dashboard': { label: 'IEG Appraisal Dashboard', icon: BarChart3, group: 'sia-ieg', Component: IegDashboardPage },
  'sia-review': { label: 'SIA Review & Evidence', icon: FileCheck, group: 'sia-ieg', Component: SiaReviewEvidencePage },
  'statutory-appraisal': { label: 'Section 7 Appraisal', icon: ShieldCheck, group: 'sia-ieg', Component: StatutoryAppraisalPage },
  'final-recommendation': { label: 'Final Recommendation Audit', icon: CheckCircle2, group: 'sia-ieg', Component: FinalRecommendationAuditPage },

  'rnr-dashboard': { label: 'R&R Statutory Dashboard', icon: BarChart3, group: 'rr-authority', Component: RRDashboardPage },
  'affected-families': { label: 'Affected Families Census', icon: Users, group: 'rr-authority', Component: AffectedFamiliesPage },
  'rnr-scheme-builder': { label: 'Form-V R&R Scheme Builder', icon: Layers, group: 'rr-authority', Component: RRSchemeBuilderPage },
  'sc-st-plan': { label: 'SC/ST Special Plan Sec 41', icon: ShieldCheck, group: 'rr-authority', Component: SCSTPlanBuilderPage },
  'sc-st-plan-builder': { label: 'SC/ST Special Plan Sec 41', icon: ShieldCheck, group: 'rr-authority', Component: SCSTPlanBuilderPage },
  'rnr-public-hearing': { label: 'R&R Public Hearing & Claims', icon: Users, group: 'rr-authority', Component: RRPublicHearingPage },
  'rnr-allotment': { label: 'Rehabilitation Allotment Engine', icon: Building2, group: 'rr-authority', Component: RRAllotmentPage },
  'rnr-dbt': { label: 'Direct Benefit Transfer (DBT)', icon: Briefcase, group: 'rr-authority', Component: RRDBTPage },
  'commissioner-approval': { label: 'Commissioner Sec 44 Sanction', icon: CheckCircle2, group: 'rr-authority', Component: CommissionerApprovalPage },
  'rnr-monitoring': { label: 'Post-Relocation Monitoring', icon: Clock, group: 'rr-authority', Component: RRMonitoringPage },
  'rnr-audit-vault': { label: 'Statutory Audit Vault', icon: FileText, group: 'rr-authority', Component: RRAuditVaultPage },

  'larr-dashboard': { label: 'Judicial Tribunal Dashboard', icon: BarChart3, group: 'larr-authority', Component: JudicialDashboardPage },
  'case-inbox': { label: 'Section 64 Reference Cases', icon: Scale, group: 'larr-authority', Component: Section64InwardPage },
  'section64-inward': { label: 'Section 64 Reference Cases', icon: Scale, group: 'larr-authority', Component: Section64InwardPage },
  'cause-list': { label: 'Daily Cause List & Hearing Board', icon: Clock, group: 'larr-authority', Component: DigitalSummonsPage },
  'summons': { label: 'Digital Summons & Multi-Party Notice', icon: Clock, group: 'larr-authority', Component: DigitalSummonsPage },
  'pleadings': { label: 'Pleadings & Evidence Vault', icon: FileText, group: 'larr-authority', Component: PleadingsEvidencePage },
  'hearing-room': { label: 'Virtual Hearing Courtroom', icon: Users, group: 'larr-authority', Component: VirtualCourtroomPage },
  'virtual-courtroom': { label: 'Virtual Hearing Courtroom', icon: Users, group: 'larr-authority', Component: VirtualCourtroomPage },
  'judicial-awards': { label: 'Section 69 Award Engine', icon: CheckCircle2, group: 'larr-authority', Component: Section69AwardEnginePage },
  'award-engine': { label: 'Section 69 Award Engine', icon: CheckCircle2, group: 'larr-authority', Component: Section69AwardEnginePage },
  'escrow-apportionment': { label: 'Escrow Apportionment Ledger', icon: Briefcase, group: 'larr-authority', Component: EscrowApportionmentPage },
  'sla-pipeline': { label: 'Statutory 180-Day SLA Monitor', icon: Clock, group: 'larr-authority', Component: SlaPipelineMonitorPage },
  'appellate-decrees': { label: 'Appellate High Court Decrees', icon: FileCheck, group: 'larr-authority', Component: AppealExecutionPage },
  'appeal-execution': { label: 'Appeal & Execution Registry', icon: FileCheck, group: 'larr-authority', Component: AppealExecutionPage },
  'judicial-audit': { label: 'Judicial Audit Vault', icon: FileText, group: 'larr-authority', Component: JudicialAuditVaultPage },

  // === 6. REQUISITIONING BODY / PIA MENUS ===
  'form-i-wizard': { label: 'Form-I Statutory Wizard', icon: FileText, group: 'requiring-body', Component: FormISmartWizard },
  'gis-canvas': { label: 'GIS Cadastral Alignment Canvas', icon: Compass, group: 'requiring-body', Component: GisSpatialCanvas },
  'escrow-ledger': { label: 'Financial Escrow Ledger', icon: Briefcase, group: 'requiring-body', Component: FinancialEscrowLedger },
  'timeline-tracker': { label: 'Statutory Timeline Tracker', icon: Clock, group: 'requiring-body', Component: StatutoryTimelineTracker },
  'objections-hearings': { label: 'Section 15 Objections Desk', icon: Users, group: 'requiring-body', Component: ObjectionsHearings },
  'pia-rbac': { label: 'PIA Delegation & RBAC', icon: Lock, group: 'requiring-body', Component: PiaDelegationRbac }
};

export default function DelegatedCommissionedWorkspace({ user, onSwitchWorkspace }) {
  // Normalize granted menus array from user profile
  const rawGrantedMenus = useMemo(() => {
    let menus = [];
    if (Array.isArray(user?.grantedMenus) && user.grantedMenus.length > 0) {
      menus = user.grantedMenus;
    } else if (user?.allowedMenus && Array.isArray(user.allowedMenus) && user.allowedMenus.length > 0) {
      menus = user.allowedMenus;
    } else if (user?.menuAccess && typeof user.menuAccess === 'object') {
      menus = Object.entries(user.menuAccess)
        .filter(([_, v]) => v === 'VIEW' || v === 'EDIT' || v === true)
        .map(([k]) => k);
    }

    if (menus.length === 0) {
      if (user?.category === 'COMMITTEE') return ['pm_exec_gis', 'pm_pipeline', 'pm_lapsing_risk'];
      if (user?.category === 'SIA_IEG') return ['sia_exec_overview', 'sia_survey_census'];
      if (user?.category === 'RNR_AUTHORITY') return ['rnr_1_admin_dashboard', 'rnr_2_census_survey', 'rnr_3_scheme_builder'];
      if (user?.category === 'LARR_AUTHORITY') return ['larr_1_judicial_dashboard', 'larr_2_sec64_reference'];
      return ['pm_exec_gis'];
    }

    return menus;
  }, [user]);

  // Construct structured authorized menu items mapped to MASTER_MENU_DEFINITIONS
  const authorizedMenus = useMemo(() => {
    return rawGrantedMenus.map(item => {
      const rawKey = typeof item === 'string' ? item : (item?.key || item?.id || String(item));
      const key = rawKey.trim();

      // Direct match
      if (MASTER_MENU_DEFINITIONS[key]) {
        return {
          key,
          ...MASTER_MENU_DEFINITIONS[key]
        };
      }

      // Check lowercase or hyphenated match
      const hyphenKey = key.replace(/_/g, '-').toLowerCase();
      if (MASTER_MENU_DEFINITIONS[hyphenKey]) {
        return {
          key,
          ...MASTER_MENU_DEFINITIONS[hyphenKey]
        };
      }

      const underKey = key.replace(/-/g, '_').toLowerCase();
      if (MASTER_MENU_DEFINITIONS[underKey]) {
        return {
          key,
          ...MASTER_MENU_DEFINITIONS[underKey]
        };
      }

      // Fallback sensible match
      return {
        key,
        label: key.replace(/[-_]/g, ' ').toUpperCase(),
        icon: Layers,
        group: 'policy-maker',
        Component: ExecutiveOverviewPage
      };
    });
  }, [rawGrantedMenus]);

  const [activeMenuKey, setActiveMenuKey] = useState(() => {
    return authorizedMenus[0]?.key || 'pm_exec_gis';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Ensure activeMenuKey points to a valid authorized menu
  useEffect(() => {
    if (authorizedMenus.length > 0 && !authorizedMenus.some(m => m.key === activeMenuKey)) {
      setActiveMenuKey(authorizedMenus[0].key);
    }
  }, [authorizedMenus, activeMenuKey]);

  const activeMenu = authorizedMenus.find(m => m.key === activeMenuKey) || authorizedMenus[0];

  // Render active component wrapped in its respective context provider
  const renderActiveModuleWithContext = () => {
    if (!activeMenu || !activeMenu.Component) {
      return (
        <div className="p-12 text-center text-slate-500">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <p className="font-semibold text-base text-slate-800">No authorized module selected.</p>
          <p className="text-xs text-slate-500 mt-1">Please select an authorized menu from the sidebar.</p>
        </div>
      );
    }

    const PageComponent = activeMenu.Component;
    const group = activeMenu.group;

    if (group === 'policy-maker') {
      return (
        <PolicyMakerProvider key={activeMenu.key}>
          <PageComponent />
        </PolicyMakerProvider>
      );
    }

    if (group === 'appropriate-gov') {
      return (
        <AppropriateGovernmentProvider initialJurisdiction="CENTRAL" key={activeMenu.key}>
          <PageComponent />
        </AppropriateGovernmentProvider>
      );
    }

    if (group === 'sia-ieg') {
      return (
        <SiaIegProvider key={activeMenu.key}>
          <PageComponent />
        </SiaIegProvider>
      );
    }

    if (group === 'rr-authority') {
      return (
        <RRAuthorityProvider key={activeMenu.key}>
          <PageComponent onSwitchWorkspace={onSwitchWorkspace} />
        </RRAuthorityProvider>
      );
    }

    if (group === 'larr-authority') {
      return (
        <LarrAuthorityProvider key={activeMenu.key}>
          <PageComponent onSwitchWorkspace={onSwitchWorkspace} />
        </LarrAuthorityProvider>
      );
    }

    if (group === 'requiring-body') {
      return (
        <WorkspaceProvider key={activeMenu.key}>
          <PageComponent onSwitchWorkspace={onSwitchWorkspace} />
        </WorkspaceProvider>
      );
    }

    return <PageComponent key={activeMenu.key} />;
  };

  const sidebarNavContent = (
    <aside className="w-64 bg-[#0e1a33] text-slate-200 border-r border-blue-950 flex flex-col h-full shrink-0">
      <div className="p-3 border-b border-blue-900/50 bg-[#091224] flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            <span>Authorized Menus ({authorizedMenus.length})</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Strictly restricted to granted statutory powers
          </p>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white cursor-pointer"
          title="Close Navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {authorizedMenus.map((menu, idx) => {
          const IconComponent = menu.icon || Layers;
          const isActive = activeMenuKey === menu.key;
          return (
            <button
              key={menu.key}
              onClick={() => {
                setActiveMenuKey(menu.key);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-slate-950 text-amber-400 font-bold' : 'text-slate-500'}`}>
                0{idx + 1}
              </span>
              <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span className="truncate flex-1">{menu.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 bg-[#091224] border-t border-blue-950 text-[10px] text-slate-400">
        <div className="flex items-center gap-1 text-emerald-400 font-semibold mb-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>RFCTLARR 2013 Compliant</span>
        </div>
        <span>Delegated under Section 3 & Section 15 statutory authority.</span>
      </div>
    </aside>
  );

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Top Statutory Header */}
      <header className="bg-[#0b1325] border-b border-blue-900/60 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg bg-[#142947] text-white hover:bg-[#203D66] border border-blue-900/60 transition-colors cursor-pointer"
            title="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4 text-amber-400" />}
          </button>

          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                COMMISSIONED STATUTORY WORKSPACE
              </span>
              <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded font-mono">
                RBAC RESTRICTED
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {user?.committeeType || user?.roleGroup || user?.role || 'Delegated Statutory Authority'}
            </h1>
          </div>
        </div>

        {/* Project & Gazette Reference */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          {user?.projectName && (
            <div className="bg-[#142947] border border-blue-900/60 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 max-w-xs truncate" title={user.projectName}>
                {user.projectName}
              </span>
            </div>
          )}
          {user?.gazetteOrderNo && (
            <div className="bg-[#142947] border border-blue-900/60 px-3 py-1.5 rounded-lg font-mono text-[11px] text-amber-300">
              Order: {user.gazetteOrderNo}
            </div>
          )}
        </div>

        {/* Officer Profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">{user?.fullName || 'Commissioned Officer'}</div>
            <div className="text-[10px] text-blue-200">{user?.designation || user?.email}</div>
          </div>
          <button
            onClick={() => onSwitchWorkspace?.('landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white text-xs font-semibold rounded cursor-pointer transition-colors"
            title="Logout from Statutory Workspace"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body with Filtered Sidebar & Dynamic Viewport */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-100 relative">
        
        {/* Left Statutory Sidebar - Desktop */}
        <div className="hidden md:flex shrink-0">
          {sidebarNavContent}
        </div>

        {/* Left Statutory Sidebar - Mobile Slide-over Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
              {sidebarNavContent}
            </div>
          </div>
        )}

        {/* Content Viewport: Renders the EXACT module corresponding to activeMenuKey */}
        <main className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 min-w-0">
          {renderActiveModuleWithContext()}
        </main>

      </div>
    </div>
  );
}
