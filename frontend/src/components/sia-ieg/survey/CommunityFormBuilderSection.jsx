import React, { useState } from 'react';
import { COMMUNITY_FORM_DEFINITION } from '../../../services/siaSurveyService.js';
import { 
  FileText, 
  Plus, 
  Trash2, 
  QrCode, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Smartphone, 
  Users, 
  X,
  Eye,
  GripVertical
} from 'lucide-react';

export default function CommunityFormBuilderSection() {
  const [questions, setQuestions] = useState(COMMUNITY_FORM_DEFINITION.questions);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'Short Text',
    required: true,
    optionsStr: ''
  });

  const publicLink = `https://nlams.gov.in/sia/survey/FORM-SIA-2026-01?proj=NLAMS-DEMO-2026-001`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(publicLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.text) return;

    const id = `q${questions.length + 1}`;
    const options = newQuestion.optionsStr ? newQuestion.optionsStr.split(',').map(s => s.trim()) : undefined;

    setQuestions([
      ...questions,
      {
        id,
        text: newQuestion.text,
        type: newQuestion.type,
        required: newQuestion.required,
        options
      }
    ]);

    setNewQuestion({ text: '', type: 'Short Text', required: true, optionsStr: '' });
    setIsAddingQuestion(false);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">Mass Community Survey &amp; Citizen Form Builder</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
              Published &amp; Active
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Form ID: <strong className="font-mono text-slate-800">{COMMUNITY_FORM_DEFINITION.formId}</strong> • Linked to {COMMUNITY_FORM_DEFINITION.projectContext}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Form</span>
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <QrCode className="w-4 h-4 text-[#C5A059]" />
            <span>QR &amp; Public Link</span>
          </button>
        </div>
      </div>

      {/* Response Collection Modes Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Smartphone className="w-4 h-4 text-[#1B365D]" />
            <span>MODE A: Citizen Self-Response</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Affected landholders and villagers scan the published QR code or open the official Citizen Portal web link to 
            fill in household census responses directly from their mobile phones.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Users className="w-4 h-4 text-[#1B365D]" />
            <span>MODE B: Enumerator-Assisted Response</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Authorized SIA field enumerators visit remote homesteads, conduct face-to-face interviews, and record responses 
            on tablet devices on behalf of non-literate or elderly respondents.
          </p>
        </div>
      </div>

      {/* Form Questions Builder Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-slate-800">
            QUESTIONNAIRE STRUCTURE ({questions.length} Fields)
          </div>
          <button
            onClick={() => setIsAddingQuestion(true)}
            className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Add Question Inline Form */}
        {isAddingQuestion && (
          <form onSubmit={handleAddQuestion} className="p-4 bg-blue-50/60 border-b border-blue-200 space-y-3 text-xs">
            <div className="font-bold text-blue-950">Add Questionnaire Field</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Question Prompt *</label>
                <input
                  type="text"
                  required
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  placeholder="e.g. Total cattle head owned by household"
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Field Type</label>
                <select
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded p-1.5"
                >
                  <option value="Short Text">Short Text</option>
                  <option value="Long Text">Long Text</option>
                  <option value="Number">Number</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Radio">Radio (Single Choice)</option>
                  <option value="Checkbox">Checkbox (Multiple)</option>
                  <option value="GPS">GPS Geolocation</option>
                  <option value="Photo">Photo Upload</option>
                  <option value="Consent / Acknowledgement">Consent / Acknowledgement</option>
                </select>
              </div>
              {(newQuestion.type === 'Dropdown' || newQuestion.type === 'Radio' || newQuestion.type === 'Checkbox') && (
                <div className="sm:col-span-3">
                  <label className="block text-slate-700 font-bold mb-1">Options (comma separated)</label>
                  <input
                    type="text"
                    value={newQuestion.optionsStr}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionsStr: e.target.value })}
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={newQuestion.required}
                  onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                />
                <span>Mandatory Field (Required)</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingQuestion(false)}
                  className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#1B365D] text-white rounded font-semibold"
                >
                  Save Question
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Questions list */}
        <div className="divide-y divide-slate-200">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-3.5 hover:bg-slate-50 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-slate-400 font-bold text-xs mt-0.5">
                  Q{idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <span>{q.text}</span>
                    {q.required && (
                      <span className="text-rose-600 font-bold text-[11px]">*</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                      {q.type}
                    </span>
                    {q.options && (
                      <span className="text-[11px] text-slate-500 truncate max-w-md">
                        Options: {q.options.join(' • ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Remove Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code & Publication Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold">Official Field Questionnaire</span>
                <h3 className="font-bold text-base">QR &amp; Citizen Link</h3>
              </div>
              <button onClick={() => setShowPublishModal(false)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 text-xs text-center space-y-4">
              {/* QR Code Graphic Box */}
              <div className="inline-block p-4 bg-white border-2 border-slate-800 rounded-xl shadow-md">
                <div className="w-44 h-44 bg-slate-900 p-2 rounded flex flex-col items-center justify-center text-white">
                  {/* Stylized QR representation */}
                  <div className="grid grid-cols-5 gap-1.5 w-36 h-36 p-2 bg-white rounded">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-xs ${
                          (i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24) 
                            ? 'bg-[#1B365D]' 
                            : 'bg-slate-200'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-600 mt-2 font-bold">
                  SCAN FOR PETLAD CORRIDOR SURVEY
                </div>
              </div>

              <div className="text-slate-600 text-xs">
                Share this QR code on village Gram Panchayat bulletin boards and gazette notices.
              </div>

              {/* Public Link Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-slate-800 truncate">{publicLink}</span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 font-semibold hover:bg-slate-100 flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-1.5 bg-[#1B365D] text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg max-h-[85vh] flex flex-col justify-between overflow-hidden">
            <div className="bg-[#1B365D] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold">Citizen Interface Preview</span>
                <h3 className="font-bold text-sm">{COMMUNITY_FORM_DEFINITION.formTitle}</h3>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                {COMMUNITY_FORM_DEFINITION.description}
              </p>

              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-1">
                  <label className="block font-bold text-slate-800">
                    {idx + 1}. {q.text} {q.required && <span className="text-rose-600">*</span>}
                  </label>
                  {q.type === 'Short Text' && (
                    <input type="text" placeholder="Your response" disabled className="w-full bg-slate-50 border border-slate-200 rounded p-1.5" />
                  )}
                  {q.type === 'Dropdown' && (
                    <select disabled className="w-full bg-slate-50 border border-slate-200 rounded p-1.5">
                      <option>Select from options...</option>
                    </select>
                  )}
                  {q.type === 'Radio' && (
                    <div className="space-y-1 pl-1">
                      {q.options?.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700">
                          <input type="radio" disabled />
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === 'Consent / Acknowledgement' && (
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-blue-900 flex items-start gap-2">
                      <input type="checkbox" checked readOnly className="mt-0.5" />
                      <span className="font-medium text-[11px]">Acknowledgement Recorded — The respondent confirms participation in the social impact study.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-1.5 bg-[#1B365D] text-white rounded-lg text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
