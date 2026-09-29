import React from 'react';
import { Clock, ShieldAlert, AlertTriangle, CheckCircle, Scale, Calendar } from 'lucide-react';

export default function StatutoryTimerBadge({
  daysRemaining,
  daysElapsed = 0,
  totalWindowDays = 365,
  status = 'NORMAL',
  label = '',
  stayExclusionDays = 0,
  extensionDays = 0,
  compact = false
}) {
  let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let Icon = Clock;
  let statusText = 'Normal';

  if (status === 'EXPIRED') {
    badgeBg = 'bg-rose-100 text-rose-900 border-rose-400 font-bold';
    Icon = ShieldAlert;
    statusText = 'Lapsed';
  } else if (status === 'STAY_EXCLUDED') {
    badgeBg = 'bg-purple-100 text-purple-900 border-purple-400 font-semibold';
    Icon = Scale;
    statusText = `Court Stay Excluded (+${stayExclusionDays}d)`;
  } else if (status === 'EXTENDED') {
    badgeBg = 'bg-blue-100 text-blue-900 border-blue-400 font-semibold';
    Icon = Calendar;
    statusText = `Extended (+${extensionDays}d)`;
  } else if (status === 'CRITICAL' || daysRemaining <= 30) {
    badgeBg = 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse font-bold';
    Icon = AlertTriangle;
    statusText = 'Critical Deadline';
  } else if (status === 'WARNING' || daysRemaining <= 90) {
    badgeBg = 'bg-amber-50 text-amber-800 border-amber-300';
    Icon = AlertTriangle;
    statusText = 'Approaching Deadline';
  }

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border ${badgeBg}`}>
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="font-mono font-medium">{daysRemaining}d left</span>
      </span>
    );
  }

  return (
    <div className={`p-2.5 rounded border ${badgeBg} flex flex-col gap-1 text-xs`}>
      <div className="flex items-center justify-between font-semibold">
        <span className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 shrink-0" />
          {statusText}
        </span>
        <span className="font-mono text-sm font-bold">
          {daysRemaining > 0 ? `${daysRemaining} Days Left` : `${Math.abs(daysRemaining)} Days Overdue`}
        </span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
        <div
          className={`h-full ${status === 'EXPIRED' ? 'bg-rose-600' : status === 'CRITICAL' ? 'bg-amber-600' : 'bg-emerald-600'}`}
          style={{ width: `${Math.min(100, Math.max(5, (daysElapsed / Math.max(1, totalWindowDays)) * 100))}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] opacity-80 pt-0.5">
        <span>Elapsed: {daysElapsed}d</span>
        <span>Total: {totalWindowDays}d</span>
      </div>
      {label && <div className="text-[10px] italic border-t border-current/20 pt-1 mt-0.5">{label}</div>}
    </div>
  );
}
