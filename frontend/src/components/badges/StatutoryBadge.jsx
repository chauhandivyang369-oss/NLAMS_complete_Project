import React from 'react';

export default function StatutoryBadge({ children, type = 'neutral' }) {
  const badgeStyles = {
    success: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    warning: 'bg-amber-950 text-amber-300 border-amber-800',
    danger: 'bg-rose-950 text-rose-300 border-rose-800',
    info: 'bg-sky-950 text-sky-300 border-sky-800',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${badgeStyles[type] || badgeStyles.neutral}`}>
      {children}
    </span>
  );
}
