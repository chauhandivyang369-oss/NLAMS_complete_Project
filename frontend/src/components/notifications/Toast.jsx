import React from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext.jsx';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useWorkspace();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-md">
      <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="text-xs font-medium text-slate-100 flex-1">
        {toastMessage.text}
      </div>
    </div>
  );
}
