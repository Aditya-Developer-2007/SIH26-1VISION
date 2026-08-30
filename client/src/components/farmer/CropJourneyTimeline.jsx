import React from 'react';
import { CheckCircle2, Clock, CircleDot, ChevronRight, Info } from 'lucide-react';

export const CropJourneyTimeline = ({ steps, isCompact = false }) => {
  if (!steps || !steps.length) return null;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Your Crop Journey</h3>
          <p className="text-xs text-slate-500">Real-time status from registration to bank account credit</p>
        </div>
        <span className="text-xs font-semibold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
          Live Tracking
        </span>
      </div>

      <div className="relative before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isPending = step.status === 'pending';

          return (
            <div key={idx} className="relative flex items-start gap-4 pb-6 last:pb-0">
              {/* Dot Icon */}
              <div
                className={`relative z-10 w-7 h-7 shrink-0 mt-0.5 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isCompleted
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                    : isActive
                    ? 'bg-brand-800 text-white ring-4 ring-brand-100 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isActive ? (
                  <CircleDot className="w-4 h-4 text-emerald-300" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className={`text-sm font-bold ${isActive ? 'text-brand-900 font-extrabold' : isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {step.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-0.5">
                  {step.note}
                </p>

                {isActive && (
                  <div className="mt-2 bg-brand-50 border border-brand-200 rounded-lg p-2.5 text-xs text-brand-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">Current Action Required:</span>
                      Visit Mandi Bhawan with your printed Digital Token AGRO-2048 & Aadhaar card.
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
