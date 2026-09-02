import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, MapPin, QrCode, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const TodayActionCard = ({ todayAction }) => {
  const { t } = useLanguage();

  if (!todayAction) return null;

  return (
    <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white rounded-xl p-5 md:p-6 shadow-card relative overflow-hidden">
      {/* Subtle background graphic */}
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
        <QrCode className="w-64 h-64 text-white" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-brand-500/20 text-brand-200 border border-brand-400/30 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('todayAction')}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
          {todayAction.title || t('scheduledTomorrow')}
        </h2>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-brand-100 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{todayAction.timeSlot}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{todayAction.centreName} ({todayAction.distanceKm} km away)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <QrCode className="w-4 h-4" />
            <span>Token: {todayAction.tokenNumber}</span>
          </div>
        </div>

        {/* Required documents checklist */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 mb-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-200 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>What to carry for your slot:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white">
            {(todayAction.checklist || []).map((item, idx) => (
              <span key={idx} className="bg-white/10 px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/farmer/token"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-900 hover:bg-brand-50 font-bold px-5 py-2.5 rounded-lg text-sm transition shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            {t('viewToken')}
          </Link>
          <Link
            to="/farmer/journey"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-lg text-sm border border-white/20 transition"
          >
            {t('viewDetails')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
