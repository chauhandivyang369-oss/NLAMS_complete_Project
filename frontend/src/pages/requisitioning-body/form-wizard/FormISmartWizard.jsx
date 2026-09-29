import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  FileText, 
  FileCode, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { 
  INITIAL_FORM_STATE, 
  loadDraft, 
  saveDraft, 
  resetDraft 
} from '../../../services/form1Service.js';
import { validateStep } from '../../../validators/form1Validators.js';

// Step components
import Step1ProjectTypeLegal from './Step1ProjectTypeLegal.jsx';
import Step2PiaDetails from './Step2PiaDetails.jsx';
import Step3ProjectDetails from './Step3ProjectDetails.jsx';
import Step4Jurisdiction from './Step4Jurisdiction.jsx';
import Step5LandParcelUlpin from './Step5LandParcelUlpin.jsx';
import Step6LandClassificationAssets from './Step6LandClassificationAssets.jsx';
import Step7PreliminaryRnrCensus from './Step7PreliminaryRnrCensus.jsx';
import Step8FinancialCommitmentsEscrow from './Step8FinancialCommitmentsEscrow.jsx';
import Step9DocumentsEsign from './Step9DocumentsEsign.jsx';
import Step10ReviewSubmit from './Step10ReviewSubmit.jsx';

const WIZARD_STEPS = [
  { id: 1, label: 'Legal & Type', title: 'Project Type & Legal Framework' },
  { id: 2, label: 'PIA Details', title: 'Implementing Agency (PIA)' },
  { id: 3, label: 'Public Purpose', title: 'Project Details & Purpose' },
  { id: 4, label: 'Jurisdiction', title: 'Jurisdiction & Collectorate' },
  { id: 5, label: 'GIS & ULPIN', title: 'Land Parcel & ULPIN Studio' },
  { id: 6, label: 'Assets & Crops', title: 'Land Classification & Assets' },
  { id: 7, label: 'R&R Census', title: 'Preliminary R&R Census' },
  { id: 8, label: 'Escrow Budget', title: 'Financial Commitments & Escrow' },
  { id: 9, label: 'Enclosures & Sign', title: 'Documents & DSC e-Sign' },
  { id: 10, label: 'Review & Submit', title: 'Review, Sign & Submit' }
];

export default function FormISmartWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(loadDraft);
  const [errors, setErrors] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [showApiPdfModal, setShowApiPdfModal] = useState(false);

  // Auto-save on formData modification
  useEffect(() => {
    saveDraft(formData);
    const now = new Date();
    setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, [formData]);

  const updateFormData = (delta) => {
    setFormData((prev) => ({
      ...prev,
      ...delta
    }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll to top of wizard content
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber) => {
    setErrors({});
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleManualSave = () => {
    saveDraft(formData);
    const now = new Date();
    setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    alert('Draft Form-I proposal saved successfully to local storage.');
  };

  const handleReset = () => {
    if (window.confirm('Reset all Form-I fields to defaults? Any unsaved edits will be discarded.')) {
      const reset = resetDraft();
      setFormData(reset);
      setCurrentStep(1);
      setErrors({});
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Top Banner with Action Toolbar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-white tracking-wider uppercase">
              Form-I Smart Requisition
            </span>
            <span className="text-xs font-mono text-slate-500">
              Act Ref: RFCTLARR 2013 / Rule 3(1)
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-900 mt-1">
            Statutory Land Acquisition Proposal Wizard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {lastSaved && (
            <span className="text-[11px] text-slate-500 mr-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Draft Auto-Saved ({lastSaved})
            </span>
          )}

          <button
            type="button"
            onClick={handleManualSave}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" /> Save Draft
          </button>

          <button
            type="button"
            onClick={() => setShowApiPdfModal(true)}
            className="px-2.5 py-1.5 rounded-md border border-blue-300 bg-blue-50/70 hover:bg-blue-100 text-blue-800 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" /> API & PDF Specs
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-500 text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Reset Draft to initial test state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 10-Step Horizontal Stepper Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-1">
          {WIZARD_STEPS.map((step, idx) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => handleJumpToStep(step.id)}
                  className={`flex flex-col items-center flex-1 group transition-all text-center focus:outline-hidden ${
                    isCurrent ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-blue-700 text-white ring-2 ring-blue-300 shadow-sm'
                        : 'bg-slate-100 text-slate-600 border border-slate-300 group-hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1 whitespace-nowrap block ${
                      isCurrent
                        ? 'text-blue-900 font-bold'
                        : isCompleted
                        ? 'text-emerald-800'
                        : 'text-slate-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {idx < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 transition-colors ${
                      currentStep > idx + 1 ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Content Container */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs min-h-[480px]">
        {currentStep === 1 && (
          <Step1ProjectTypeLegal
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <Step2PiaDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <Step3ProjectDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <Step4Jurisdiction
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <Step5LandParcelUlpin
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 6 && (
          <Step6LandClassificationAssets
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 7 && (
          <Step7PreliminaryRnrCensus
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 8 && (
          <Step8FinancialCommitmentsEscrow
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 9 && (
          <Step9DocumentsEsign
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 10 && (
          <Step10ReviewSubmit
            formData={formData}
            updateFormData={updateFormData}
            onJumpToStep={handleJumpToStep}
            errors={errors}
          />
        )}

        {/* Global Step Validation Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Please resolve the following required fields before proceeding:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{typeof err === 'string' ? err : String(err)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Wizard Footer Navigation Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex items-center justify-between">
        <div>
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-md border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Step {currentStep} of {WIZARD_STEPS.length}:{' '}
          <strong className="text-slate-800">{WIZARD_STEPS[currentStep - 1].title}</strong>
        </div>

        <div>
          {currentStep < 10 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              Continue to Step {currentStep + 1} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Final Step
            </span>
          )}
        </div>
      </div>

      {/* API & PDF Schema Modal */}
      {showApiPdfModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-700" />
                <span className="font-bold text-sm text-slate-900">
                  Form-I REST API Contract & Legal PDF Gazette Specification
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowApiPdfModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-bold text-slate-900 mb-1">
                  1. Form-I Requisition Submission Endpoint
                </div>
                <div className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-2 rounded">
                  POST /api/v1/requisitioning-body/proposals/form-1/submit
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  Content-Type: multipart/form-data. Includes cryptographic payload containing 14-digit ULPIN arrays, RoR Khata JSON, and DSC Class 3 PKCS#7 signature bytes.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-bold text-slate-900 mb-1">
                  2. Bhuvan / BhuNaksha WMS / WFS Proxy Endpoints
                </div>
                <ul className="font-mono text-[11px] space-y-1 text-blue-800">
                  <li>• GET /api/gis/wms/cadastral-parcels?bbox=...&srs=EPSG:4326</li>
                  <li>• GET /api/gis/wfs/parcel-query?ulpin=24051234567890</li>
                  <li>• POST /api/gis/spatial/buffer-intersection (100m Corridor)</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="font-bold text-slate-900 mb-1">
                  3. Statutory PDF Template & Watermarking
                </div>
                <p className="text-[11px] text-slate-600">
                  Upon digital submission, the server-side PDF generator composes the authoritative <strong>Gazette Form-I Requisition Document</strong> with Government of India Ashok Chakra emblem, statutory preamble under Section 4(1), ULPIN Khasra schedule table, solatium estimate, and verifiable QR code pointing to CALA Docket Repository.
                </p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowApiPdfModal(false)}
                className="px-4 py-1.5 rounded bg-blue-700 text-white font-semibold text-xs"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
