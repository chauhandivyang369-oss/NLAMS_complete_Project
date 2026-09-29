import React, { useState } from 'react';
import PublicHeader from './PublicHeader.jsx';
import LandingHeroSection from './LandingHeroSection.jsx';
import NationalMetricsSection from './NationalMetricsSection.jsx';
import RbacRoleDirectorySection from './RbacRoleDirectorySection.jsx';
import TrackMyLandTab from './TrackMyLandTab.jsx';
import CompensationExplainerTab from './CompensationExplainerTab.jsx';
import RnrPassbookTab from './RnrPassbookTab.jsx';
import PublicGazetteVaultTab from './PublicGazetteVaultTab.jsx';
import PublicGisExplorerTab from './PublicGisExplorerTab.jsx';
import StatutoryActOverviewSection from './StatutoryActOverviewSection.jsx';
import OfficerLoginModal from './OfficerLoginModal.jsx';
import PublicFooter from './PublicFooter.jsx';

export default function LandingPage({ 
  onLaunchWorkspace,
  onOpenLogin,
  onOpenSignUp
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'track-land' | 'compensation' | 'rnr-passbook' | 'gazette-vault' | 'gis-explorer' | 'rbac-directory'
  const [textSize, setTextSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [highContrast, setHighContrast] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOfficerLoginOpen, setIsOfficerLoginOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setIsOfficerLoginOpen(true);
    }
  };

  const handleOpenSignUp = () => {
    if (onOpenSignUp) {
      onOpenSignUp();
    } else {
      onLaunchWorkspace('citizen');
    }
  };

  const textSizeClass = textSize === 'small' 
    ? 'text-[92%]' 
    : textSize === 'large' 
    ? 'text-[108%]' 
    : 'text-[100%]';

  const contrastClass = highContrast 
    ? 'contrast-125 saturate-150' 
    : '';

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans ${textSizeClass} ${contrastClass}`}>
      
      {/* Top Nav Bar */}
      <PublicHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOfficerLogin={handleOpenLogin}
        onLaunchCitizenWorkspace={handleOpenSignUp}
      />

      {/* Main Body Content Based on Active Tab */}
      <main id="main-content" className="flex-1">
        {activeTab === 'overview' && (
          <>
            <LandingHeroSection
              onSelectTab={(tabId) => setActiveTab(tabId)}
              onOpenOfficerLogin={handleOpenLogin}
            />
            <NationalMetricsSection />
            <RbacRoleDirectorySection
              onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
            />
            <StatutoryActOverviewSection />
          </>
        )}

        {activeTab === 'track-land' && (
          <TrackMyLandTab 
            onSwitchToCalculator={() => setActiveTab('compensation')}
          />
        )}

        {activeTab === 'compensation' && (
          <CompensationExplainerTab />
        )}

        {activeTab === 'rnr-passbook' && (
          <RnrPassbookTab />
        )}

        {activeTab === 'gazette-vault' && (
          <PublicGazetteVaultTab />
        )}

        {activeTab === 'gis-explorer' && (
          <PublicGisExplorerTab />
        )}

        {activeTab === 'rbac-directory' && (
          <RbacRoleDirectorySection
            onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
          />
        )}
      </main>

      {/* 4. Comprehensive Government Footer */}
      <PublicFooter
        onOpenOfficerLogin={() => setIsOfficerLoginOpen(true)}
      />

      {/* 6. Officer Login / RBAC Gateway Modal */}
      <OfficerLoginModal
        isOpen={isOfficerLoginOpen}
        initialMode={authInitialMode}
        onClose={() => setIsOfficerLoginOpen(false)}
        onLaunchWorkspace={(wsKey) => onLaunchWorkspace(wsKey)}
      />

    </div>
  );
}
