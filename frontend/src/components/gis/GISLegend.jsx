import React from 'react';
import { STATUTORY_COLORS } from '../../services/gisService.js';

export default function GISLegend() {
  return (
    <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg shadow-md px-3.5 py-2.5 text-xs select-none">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
        PLOT STATUS
      </div>
      <div className="space-y-1.5 font-medium text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUTORY_COLORS.acquired }} />
          <span>Sec 23 Acquired</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUTORY_COLORS.hearing }} />
          <span>SIA / Hearing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUTORY_COLORS.frozen }} />
          <span>Sec 11 Frozen</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUTORY_COLORS.govtLand }} />
          <span>Govt / Waste Land</span>
        </div>
      </div>
    </div>
  );
}
