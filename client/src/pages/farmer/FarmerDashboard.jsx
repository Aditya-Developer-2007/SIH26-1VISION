import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { farmerApi } from '../../services/farmerApi';

import { TodayActionCard } from '../../components/farmer/TodayActionCard';
import { TokenCard } from '../../components/farmer/TokenCard';
import { PaymentOverview } from '../../components/farmer/PaymentOverview';
import { CentreCard } from '../../components/farmer/CentreCard';
import { SmartInsightCard } from '../../components/farmer/SmartInsightCard';
import { StatusBadge } from '../../components/common/StatusBadge';

import { PlusCircle, QrCode, ArrowRight, Bell, Calendar, MapPin, Scale, TrendingUp } from 'lucide-react';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    farmerApi.getDashboard().then(res => {
      if (isMounted && res?.success) {
        setData(res.data);
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
  const activeProcurements = data?.activeProcurements || [];
  const todayAction = data?.todayAction;
  const tokens = data?.tokens || [];
  const payments = data?.payments || [];
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
        
        {/* Left Column (2 Cols wide on Desktop): Active Procurement */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Procurement Snapshot Card */}
          {/* Active Procurement Snapshot Cards */}
          {activeProcurements.length > 0 ? (
            activeProcurements.map((activeProcurement) => (
              <div key={activeProcurement._id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-card mb-6">
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
                  <Link to={`/farmer/token?id=${activeProcurement?.tokenId}`} className="font-semibold text-brand-800 hover:underline flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    View Token Details
                  </Link>
                </div>
                
                {/* Payment Status Component for this specific procurement */}
                {payments.find(p => p.procurementId === activeProcurement._id) && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <PaymentOverview payment={payments.find(p => p.procurementId === activeProcurement._id)} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Procurements</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">You don't have any upcoming scheduled procurement slots. Register your crop yield to generate a digital token and book a time slot at your nearest Mandi.</p>
              <Link
                to="/farmer/register-crop"
                className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                Register New Crop / Slot
              </Link>
            </div>
          )}
        </div>

        {/* Right Column (1 Col wide): Token Pass, Nearby Mandis, Notifications */}
        <div className="space-y-6">
          
          {/* Mandi Rates Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Mandi Rates Today
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Wheat (Grade A)</div>
                  <div className="text-[10px] text-slate-500">Mandi Bhawan, Karnal</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 text-sm">₹2,275</div>
                  <div className="text-[10px] text-emerald-600">+₹15 today</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Paddy (Common)</div>
                  <div className="text-[10px] text-slate-500">District Grain Market</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 text-sm">₹2,183</div>
                  <div className="text-[10px] text-emerald-600">+₹5 today</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Mustard</div>
                  <div className="text-[10px] text-slate-500">New Grain Market</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-rose-700 text-sm">₹5,400</div>
                  <div className="text-[10px] text-rose-600">-₹20 today</div>
                </div>
              </div>
            </div>
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
            {nearbyCentres.map((centre, idx) => (
              <CentreCard key={centre._id || centre.id || idx} centre={centre} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
