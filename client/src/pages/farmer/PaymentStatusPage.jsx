import React, { useEffect, useState } from 'react';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, Wallet, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';

export const PaymentStatusPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setPayments(res.data?.payments || []);
      }
      setLoading(false);
    });
  }, []);

  const filterPayments = () => {
    const now = new Date();
    return payments.filter(p => {
      if (dateFilter === 'all') return true;
      const pDate = new Date(p.date || p.createdAt);
      if (dateFilter === 'today') {
        return pDate.toDateString() === now.toDateString();
      }
      if (dateFilter === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return pDate >= weekAgo;
      }
      if (dateFilter === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return pDate >= monthAgo;
      }
      if (dateFilter === '6months') {
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
        return pDate >= sixMonthsAgo;
      }
      if (dateFilter === 'year') {
        const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        return pDate >= yearAgo;
      }
      return true;
    });
  };

  const filteredPayments = filterPayments();
  const totalEarnings = filteredPayments
    .filter(p => p.status === 'CREDITED')
    .reduce((sum, p) => sum + (p.amount || p.estimatedAmount || 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-safe-nav">
      
      {/* Page Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-slate-900">{t('navPayments')}</h1>
        <p className="text-sm text-slate-500 font-bold">
          {t('paymentSubtitle') || 'Track your total earnings'}
        </p>
      </div>

      {/* Earnings Summary Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-brand-800 rounded-2xl p-6 shadow-card text-white">
        <div className="flex items-center gap-2 mb-4 opacity-90">
          <Wallet className="w-5 h-5" />
          <span className="font-semibold text-sm uppercase tracking-wider">Total Earnings (Credited)</span>
        </div>
        <div className="mb-6">
          <span className="text-4xl font-black">₹{totalEarnings.toLocaleString('en-IN')}</span>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white/20 border border-white/30 text-white font-bold text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          >
            <option value="today" className="text-slate-900">Today</option>
            <option value="week" className="text-slate-900">This Week</option>
            <option value="month" className="text-slate-900">Last Month</option>
            <option value="6months" className="text-slate-900">Last 6 Months</option>
            <option value="year" className="text-slate-900">Last Year</option>
            <option value="all" className="text-slate-900">All Time</option>
          </select>
        </div>
      </div>

      {/* Compact List of Payments */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900">Payment Transactions</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bold">Loading...</div>
        ) : filteredPayments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredPayments.map((p, idx) => (
              <div key={p.id || idx} className="p-4 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.cropName || 'Crop'}</h4>
                  <div className="text-xs text-slate-500 mt-0.5 space-x-2 flex items-center">
                    <span>{Number(p.quantity || 0).toFixed(3)} Q</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{new Date(p.date || p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block mb-1">
                    ₹{(p.amount || p.estimatedAmount || 0).toLocaleString('en-IN')}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 font-bold">
            No payments found for this period.
          </div>
        )}
      </div>

    </div>
  );
};
