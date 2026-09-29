import React, { useState, useMemo } from 'react';
import { useSiaIeg } from '../../contexts/SiaIegContext.jsx';
import { 
  REPORT_PROJECT_CONTEXT, 
  REPORT_VALIDATION_RULES, 
  REPORT_SECTIONS_LIST,
  VALIDATION_ISSUES_LIST 
} from '../../services/siaReportService.js';

import ReportHeaderBar from '../../components/sia-ieg/report/ReportHeaderBar.jsx';
import ReportOutlineSection from '../../components/sia-ieg/report/ReportOutlineSection.jsx';
import ReportSectionViewer from '../../components/sia-ieg/report/ReportSectionViewer.jsx';
import ReportValidationDrawer from '../../components/sia-ieg/report/ReportValidationDrawer.jsx';
import ReportPreviewModal from '../../components/sia-ieg/report/ReportPreviewModal.jsx';
import ReportSigningModal from '../../components/sia-ieg/report/ReportSigningModal.jsx';
import ReportSubmissionModal from '../../components/sia-ieg/report/ReportSubmissionModal.jsx';
import PublicationPanel from '../../components/sia-ieg/report/PublicationPanel.jsx';

import { 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

export default function FinalSiaReportPage() {
  const { setActiveMenu } = useSiaIeg();

  // Primary Workspace States
  const [activeSectionId, setActiveSectionId] = useState(1);
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'publication'
  const [currentLanguage, setCurrentLanguage] = useState('en'); // 'en' | 'gu'
  
  const [reportState, setReportState] = useState({
    reportStatus: 'Generated', // Draft | In Preparation | Validation Required | Ready for Generation | Generated | Ready for Signature | Signed | Submitted | Published
    currentVersion: 'Generated v1.0',
    lastGenerated: '19/09/2026 11:15 AM',
    publicationStatus: 'Publication Pending',
    lastSigned: 'Pending e-Signature',
    lastSubmitted: 'Pending Submission'
  });

  // Modal & Drawer visibility
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [bannerToast, setBannerToast] = useState(null);

  // Validation Metrics Summary
  const validationSummary = useMemo(() => {
    const passCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'PASS').length;
    const warnCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'WARNING').length;
    const failCount = REPORT_VALIDATION_RULES.filter(r => r.status === 'FAIL').length;
    return { passCount, warnCount, failCount };
  }, []);

  const showToast = (msg) => {
    setBannerToast(msg);
    setTimeout(() => setBannerToast(null), 3500);
  };

  // Workflow Handlers
  const handleValidate = () => {
    setIsValidationOpen(true);
  };

  const handleGenerateReport = () => {
    const timestamp = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setReportState(prev => ({
      ...prev,
      reportStatus: 'Generated',
      currentVersion: 'Generated v1.1',
      lastGenerated: timestamp
    }));
    showToast('Report generated successfully! Snapshot compiled for 22 statutory chapters.');
  };

  const handleSignComplete = ({ signedBy, signedAt, hash }) => {
    setReportState(prev => ({
      ...prev,
      reportStatus: 'Signed',
      lastSigned: `${signedAt} by ${signedBy}`
    }));
    showToast('Digital Signature applied successfully! Cryptographic hash recorded in audit log.');
  };

  const handleSubmitComplete = ({ submittedAt, submittedBy, iegReference }) => {
    setReportState(prev => ({
      ...prev,
      reportStatus: 'Submitted',
      lastSubmitted: `${submittedAt} (${iegReference})`
    }));
    showToast('Final SIA Report & SIMP submitted to Independent Expert Group (IEG) under Section 7.');
  };

  const handlePublishReport = ({ publicationStatus, publishedAt, gazetteId }) => {
    setReportState(prev => ({
      ...prev,
      reportStatus: 'Published',
      publicationStatus: 'Published'
    }));
    showToast(`Published in Gujarat State e-Gazette under notification #${gazetteId}`);
  };

  // Traceability Navigator to other menus
  const handleNavigateToSource = (key) => {
    if (['project_description', 'public_purpose'].includes(key)) {
      setActiveMenu('sia-overview');
    } else if (['land_requirement', 'affected_area', 'affected_families', 'displacement', 'livelihood_impact', 'landowners', 'community_assets', 'infrastructure', 'alternatives', 'bare_minimum_assessment', 'survey_methodology'].includes(key)) {
      setActiveMenu('survey-impact-census');
    } else if (['public_hearing'].includes(key)) {
      setActiveMenu('public-hearing');
    } else if (['simp', 'cost_of_social_impact'].includes(key)) {
      setActiveMenu('simp-builder');
    } else {
      showToast(`Inspecting source records for: ${key}`);
    }
  };

  return (
    <div id="page-final-sia-report" className="w-full h-full min-h-full bg-slate-100 flex-1 flex flex-col font-sans">
      
      {/* 1. Header & Project Master Bar */}
      <ReportHeaderBar
        reportState={reportState}
        onValidate={handleValidate}
        onGenerateReport={handleGenerateReport}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenESign={() => setIsSigningOpen(true)}
        onSubmitReport={() => setIsSubmissionOpen(true)}
        onSaveDraft={() => showToast('Draft saved.')}
        onRefresh={() => showToast('Source data refreshed.')}
        currentLanguage={currentLanguage}
        onChangeLanguage={(lang) => {
          setCurrentLanguage(lang);
          showToast(`Report language switched to ${lang === 'en' ? 'English' : 'Gujarati (Local)'}`);
        }}
        validationSummary={validationSummary}
      />

      {/* Toast Notification Banner */}
      {bannerToast && (
        <div className="bg-emerald-800 text-white px-6 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>{bannerToast}</span>
          </div>
          <button onClick={() => setBannerToast(null)} className="text-white/80 hover:text-white font-bold text-xs">✕</button>
        </div>
      )}

      {/* 2. Main Page Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-[#1B365D] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>22 Statutory Report Chapters</span>
          </button>

          <button
            onClick={() => setActiveTab('publication')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'publication'
                ? 'bg-[#1B365D] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Gazette Publication &amp; Audit Trail</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          RFCTLARR Act 2013 Section 4(1), 5(1), 6(1) &amp; 7(1) Assembly
        </div>
      </div>

      {/* 3. Main Body Content Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {activeTab === 'sections' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 4 Cols: 22 Statutory Outline Navigator */}
            <div className="lg:col-span-4 sticky top-0">
              <ReportOutlineSection
                activeSectionId={activeSectionId}
                onSelectSection={(id) => setActiveSectionId(id)}
                validationSummary={validationSummary}
              />
            </div>

            {/* Right 8 Cols: Detailed Section Viewer with data & edit capabilities */}
            <div className="lg:col-span-8">
              <ReportSectionViewer
                activeSectionId={activeSectionId}
                language={currentLanguage}
                onNavigateToSource={handleNavigateToSource}
              />
            </div>

          </div>
        )}

        {activeTab === 'publication' && (
          <div className="max-w-5xl mx-auto">
            <PublicationPanel
              reportState={reportState}
              onPublishReport={handlePublishReport}
              onOpenPreview={() => setIsPreviewOpen(true)}
            />
          </div>
        )}
      </div>

      {/* 4. Modals and Drawers */}
      <ReportValidationDrawer
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
        onResolveIssue={(issueId) => {
          showToast(`Issue ${issueId} resolved.`);
        }}
        onRevalidate={() => {
          showToast('Pre-generation audit completed. 13 of 13 statutory checks validated.');
        }}
        onNavigateToRecord={(issue) => {
          setIsValidationOpen(false);
          if (issue.module.includes('Menu 2')) setActiveMenu('survey-impact-census');
          else if (issue.module.includes('Menu 3')) setActiveMenu('public-hearing');
        }}
      />

      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        currentLanguage={currentLanguage}
        reportState={reportState}
      />

      <ReportSigningModal
        isOpen={isSigningOpen}
        onClose={() => setIsSigningOpen(false)}
        onSignComplete={handleSignComplete}
        reportState={reportState}
      />

      <ReportSubmissionModal
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        onSubmitComplete={handleSubmitComplete}
        reportState={reportState}
      />

    </div>
  );
}
