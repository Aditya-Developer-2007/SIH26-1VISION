import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SmartInsightCard = ({ insight }) => {
  if (!insight) return null;

  return (
    <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 shadow-subtle flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider text-amber-900 text-[10px] bg-amber-200/60 px-2 py-0.5 rounded">
            AGROCURE INSIGHT
          </span>
          <span className="text-amber-700 text-[10px]">Estimated Wait: ~{insight.estimatedWaitMin} mins</span>
        </div>
        
        <p className="text-amber-950 font-medium text-xs leading-relaxed">
          {insight.text}
        </p>
      </div>
    </div>
  );
};
