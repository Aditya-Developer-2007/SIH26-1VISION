import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { farmerApi } from '../../services/farmerApi';
import { io } from 'socket.io-client';

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
  const [currentToken, setCurrentToken] = useState(null);

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

  useEffect(() => {
    if (data?.todayAction?.centreId && data?.todayAction?.scheduledDate) {
      const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
      socket.emit('joinQueueRoom', { 
        centreId: data.todayAction.centreId, 
        date: data.todayAction.scheduledDate 
      });
      
      socket.on('queueUpdate', ({ currentToken: ct }) => {
        setCurrentToken(ct);
      });
      
      return () => socket.disconnect();
    }
  }, [data]);

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200/50 rounded-2xl w-2/3"></div>
        <div className="h-32 bg-brand-100/50 rounded-3xl w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-slate-100 rounded-3xl"></div>
          <div className="h-40 bg-slate-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const farmerName = user?.name || data?.farmer?.name || 'Ramesh Kumar';
  
  // Filter active actions (hide received payments/completed tokens)
  // In a real app, backend should ideally filter this. We'll simulate by ensuring todayAction isn't completed.
  const todayAction = data?.todayAction?.status !== 'COMPLETED' ? data?.todayAction : null;

  return (
    <div className="space-y-8 max-w-md mx-auto relative z-10">
      
      {/* Welcome Greeting Header */}
      <div className="space-y-1 mt-2 px-2">
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">
          AgroCure
        </p>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Hello, <span className="text-gradient">{farmerName}</span>
        </h1>
      </div>

      {/* Primary Action Hero Card (Zepto Style) */}
      <Link
        to="/farmer/register-crop"
        className="block relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 to-brand-800 p-8 shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)] hover-lift"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
            <PlusCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 leading-tight">Naya Fasal <br/> Register Karein</h2>
          <p className="text-brand-100 font-medium text-sm flex items-center gap-2">
            Click to start process <ArrowRight className="w-4 h-4" />
          </p>
        </div>
      </Link>

      {/* Active Alerts/Actions */}
      {todayAction && (
        <div className="px-2">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Today's Action
          </h3>
          <TodayActionCard todayAction={todayAction} currentToken={currentToken} />
        </div>
      )}

      {/* Premium Quick Links Grid */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <Link to="/farmer/token" className="premium-card p-6 flex flex-col items-start gap-4 hover-lift group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-slate-900 block text-lg mb-1">Tokens</span>
            <span className="text-xs font-semibold text-slate-500">View Active</span>
          </div>
        </Link>

        <Link to="/farmer/payments" className="premium-card p-6 flex flex-col items-start gap-4 hover-lift group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-slate-900 block text-lg mb-1">Earnings</span>
            <span className="text-xs font-semibold text-slate-500">Track Money</span>
          </div>
        </Link>

        <Link to="/farmer/centres" className="premium-card col-span-2 p-6 flex items-center justify-between hover-lift group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-slate-900 block text-xl mb-1">Mandi Centres</span>
              <span className="text-sm font-semibold text-slate-500">Find nearest locations</span>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-amber-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
};
