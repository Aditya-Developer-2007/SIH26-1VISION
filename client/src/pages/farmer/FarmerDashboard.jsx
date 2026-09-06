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

import { PlusCircle, QrCode, ArrowRight, Bell, Calendar, MapPin, Scale, TrendingUp, CreditCard, Building2 } from 'lucide-react';

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
    <div className="space-y-6 pb-24">
      {/* Welcome Greeting Header */}
      <div className="text-center space-y-1 mt-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {t('welcomeGreeting')}, {farmerName}
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          AgroCure mein aapka swagat hai
        </p>
      </div>

      {/* Primary Action Button */}
      <Link
        to="/farmer/register-crop"
        className="flex items-center justify-center gap-3 bg-brand-800 hover:bg-brand-900 text-white font-black text-xl py-5 rounded-2xl shadow-lg transition mx-auto w-full max-w-md"
      >
        <PlusCircle className="w-6 h-6 text-brand-200" />
        Naya Fasal Jodo
      </Link>

      {/* 1. Today's Action Hero Banner */}
      <div className="max-w-md mx-auto">
        <TodayActionCard todayAction={todayAction} />
      </div>

      {/* Simplified Quick Links */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mt-6">
        <Link to="/farmer/token" className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 text-center hover:border-brand-500 transition">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-900 text-lg">Mera Token</span>
        </Link>
        <Link to="/farmer/payments" className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 text-center hover:border-brand-500 transition">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-900 text-lg">Paisa</span>
        </Link>
        <Link to="/farmer/centres" className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 text-center hover:border-brand-500 transition col-span-2">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-900 text-lg">Paas Ki Mandi Dekhein</span>
        </Link>
      </div>
    </div>
  );
};
