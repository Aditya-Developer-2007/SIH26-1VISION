import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, MapPin, QrCode, FileText, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const TodayActionCard = ({ todayAction, currentToken }) => {
  const { t } = useLanguage();

  if (!todayAction) return null;

  // Extract numeric part of token if it exists (e.g. TKN-12 -> 12, AGRO-4500 -> 4500)
  const myTokenNumMatch = todayAction.tokenNumber?.match(/\d+/);
  const myTokenNumber = myTokenNumMatch ? parseInt(myTokenNumMatch[0]) : 0;
  
  const waitCount = currentToken !== null && myTokenNumber > 0 
    ? Math.max(0, myTokenNumber - currentToken)
    : null;

  return (
    <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white rounded-xl p-5 md:p-6 shadow-card relative overflow-hidden">
      {/* Subtle background graphic */}
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
        <QrCode className="w-64 h-64 text-white" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-brand-500/20 text-brand-200 border border-brand-400/30 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('todayAction')}
          </span>
          {currentToken !== null && (
            <span className="bg-rose-500/20 text-rose-200 border border-rose-400/30 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              Live Queue
            </span>
          )}
        </div>

        <h2 className="text-3xl font-black tracking-tight text-white mb-4">
          Kal Subah 10 Baje Mandi Aana Hai
        </h2>

        {/* Live Queue Box */}
        {waitCount !== null && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-rose-400/30 mb-6 flex items-center justify-between">
            <div>
              <span className="text-rose-200 font-bold text-sm block mb-1">Queue Position</span>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <span className="text-2xl font-black text-white">{waitCount}</span>
                <span className="text-sm font-medium text-rose-100 mt-1.5">farmers ahead of you</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-brand-300 block">Now Serving</span>
              <span className="text-xl font-black text-white">#{currentToken}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 text-lg font-bold text-brand-100 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>{todayAction.centreName} ({todayAction.distanceKm} km door)</span>
          </div>
          <div className="flex items-center gap-3 text-amber-300">
            <QrCode className="w-6 h-6" />
            <span>Token No: {todayAction.tokenNumber}</span>
          </div>
        </div>

        {/* Required documents checklist */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex items-center gap-2 text-sm font-bold text-brand-200 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Kagaz jo laane hain:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-white font-semibold">
            <span className="bg-white/20 px-3 py-1.5 rounded-lg">✓ Aadhaar Card</span>
            <span className="bg-white/20 px-3 py-1.5 rounded-lg">✓ Fard (Zameen record)</span>
            <span className="bg-white/20 px-3 py-1.5 rounded-lg">✓ Mera Token (Mobile)</span>
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
        </div>
      </div>
    </div>
  );
};
