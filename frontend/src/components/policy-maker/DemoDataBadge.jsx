import React from 'react';
import { AlertCircle } from 'lucide-react';
import { DEMO_DATA_DISCLAIMER } from '../../mock/policyMakerData.js';

export default function DemoDataBadge({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs select-none ${className}`}>
      <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
      <span>{DEMO_DATA_DISCLAIMER}</span>
    </div>
  );
}
