import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { getFarmerDashboard } from '../../services/api';

import { TodayActionCard } from '../../components/farmer/TodayActionCard';
import { CropJourneyTimeline } from '../../components/farmer/CropJourneyTimeline';
import { TokenCard } from '../../components/farmer/TokenCard';
import { PaymentOverview } from '../../components/farmer/PaymentOverview';
import { CentreCard } from '../../components/farmer/CentreCard';
import { SmartInsightCard } from '../../components/farmer/SmartInsightCard';
import { StatusBadge } from '../../components/common/StatusBadge';

import { PlusCircle, QrCode, ArrowRight, Bell, Calendar, MapPin, Scale } from 'lucide-react';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getFarmerDashboard().then(res => {
      if (isMounted && res?.success) {
        setData(res);
      }
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-4 animate-pulse">
        <div className="h-12 bg-slate-200 rounded-xl w-1/3"></div>
        <div className="h-48 bg-slate-200 rounded-xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-slate-200 rounded-xl"></div>
          <div className="h-64 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const farmerName = user?.name || data?.farmer?.name || 'Ramesh Kumar';
  const activeProcurement = data?.activeProcurement;
  const todayAction = data?.todayAction;
  const token = data?.token;
  const payment = data?.payment;
  const journeySteps = data?.journeySteps || [];
  const nearbyCentres = data?.nearbyCentres || [];
  const smartInsight = data?.smartInsight;

  return (
    <div className="space-y-6 pb-safe-nav">
      {/* Welcome Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('welcomeGreeting')}, {farmerName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {t('goodMorning')}. Here is your procurement status & active schedules for today.
          </p>
        </div>

        <Link
          to="/farmer/register-crop"
          className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-brand-200" />
          Register New Crop / Slot
        </Link>
      </div>

      {/* 1. Today's Action Hero Banner */}
      <TodayActionCard todayAction={todayAction} />

      {/* AgroCure Smart AI Queue Insight */}
      <SmartInsightCard insight={smartInsight} />

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols wide on Desktop): Active Procurement & Crop Journey */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Procurement Snapshot Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {t('activeProcurement')}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeProcurement?.cropName} ({activeProcurement?.estimatedQuantityQuintals} Quintal)
                </h3>
              </div>
              <StatusBadge status={activeProcurement?.status} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Digital Token</span>
                <span className="font-bold text-brand-800 text-sm font-mono">{activeProcurement?.tokenId}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Centre</span>
                <span className="font-bold text-slate-900">{activeProcurement?.centreName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Govt MSP Rate</span>
                <span className="font-bold text-slate-900">₹{activeProcurement?.mspPerQuintal} / Q</span>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Payout</span>
                <span className="font-bold text-emerald-700 text-sm">₹{activeProcurement?.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/farmer/token" className="font-semibold text-brand-800 hover:underline flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" />
                View Token Details
              </Link>
              <Link to="/farmer/journey" className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium">
                View Full Timeline
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 8-Step Crop Journey */}
          <CropJourneyTimeline steps={journeySteps} />

          {/* Payment Status Component */}
          <PaymentOverview payment={payment} />
        </div>

        {/* Right Column (1 Col wide): Token Pass, Nearby Mandis, Notifications */}
        <div className="space-y-6">
          
          {/* Digital Token Widget */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Digital Pass
              </h3>
              <Link to="/farmer/token" className="text-xs font-semibold text-brand-800 hover:underline">
                Expand Pass
              </Link>
            </div>
            <TokenCard token={token} />
          </div>

          {/* Nearby Procurement Centres */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Nearby Mandis
              </h3>
              <Link to="/farmer/centres" className="text-xs font-semibold text-brand-800 hover:underline">
                View All Centres
              </Link>
            </div>
            {nearbyCentres.map((centre) => (
              <CentreCard key={centre.id} centre={centre} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
