import React, { useEffect, useState } from 'react';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, Wallet, Calendar, CreditCard, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';

export const PaymentStatusPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setPayments(res.data?.payments || []);
      }
      setLoading(false);
    });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const filterPayments = () => {
    if (dateFilter === 'all') return payments;
    
    const now = new Date();
    const thresholdDate = new Date();
    
    if (dateFilter === 'today') {
      thresholdDate.setHours(0, 0, 0, 0);
    } else if (dateFilter === 'week') {
      thresholdDate.setDate(thresholdDate.getDate() - 7);
    } else if (dateFilter === 'month') {
      thresholdDate.setMonth(thresholdDate.getMonth() - 1);
    } else if (dateFilter === '6months') {
      thresholdDate.setMonth(thresholdDate.getMonth() - 6);
    } else if (dateFilter === 'year') {
      thresholdDate.setFullYear(thresholdDate.getFullYear() - 1);
    }

    return payments.filter(p => {
      if (!p.createdAt) return false;
      const pDate = new Date(p.createdAt);
      if (dateFilter === 'today') {
        return pDate.toDateString() === now.toDateString();
      }
      return pDate >= thresholdDate;
    });
  };

  const filteredPayments = filterPayments();
  const totalEarnings = filteredPayments
    .filter(p => p.status === 'CREDITED')
    .reduce((sum, p) => sum + (p.totalAmount || 0), 0);

  const filterOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Last 7 Days' },
    { id: 'month', label: 'Last Month' },
    { id: '6months', label: '6 Months' },
    { id: 'year', label: '1 Year' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24 px-2">
      
      {/* Earnings Summary Card */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-900 rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)] text-white relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <Wallet className="w-5 h-5" />
            <span className="font-bold text-xs uppercase tracking-[0.1em]">Total Earnings</span>
          </div>
          <div className="mb-2">
            <span className="text-[40px] font-black tracking-tight">₹{totalEarnings.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-brand-200 text-xs font-semibold">Only counting credited amounts</div>
        </div>
      </div>

      {/* Filter Chips (Horizontal Scroll) */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-2 px-2">
        {filterOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setDateFilter(opt.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
              dateFilter === opt.id 
                ? 'bg-slate-900 text-white shadow-md scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Compact List of Payments */}
      <div className="space-y-3">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 px-1">
          Transactions
          <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{filteredPayments.length}</span>
        </h3>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bold animate-pulse">Loading...</div>
        ) : filteredPayments.length > 0 ? (
          <div className="space-y-3">
            {filteredPayments.map((p, idx) => {
              const amount = p.totalAmount || 0;
              const quantity = p.quantityQuintals || p.estimatedQuantityQuintals || 0;
              const isExpanded = expandedId === p.id;
              
              return (
                <div key={p.id || idx} className="premium-card overflow-hidden transition-all duration-300">
                  {/* Transaction Header (Clickable) */}
                  <div 
                    onClick={() => toggleExpand(p.id)}
                    className="p-4 flex items-center justify-between cursor-pointer group hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm leading-tight">{p.cropName || 'Crop Sale'}</h4>
                        <div className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                          <span>{Number(quantity).toFixed(2)} Qtl</span>
                          <span>•</span>
                          <span>{p.createdAt ? new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) : 'Date N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <span className="font-black text-slate-900 block text-base mb-1">
                          +₹{amount.toLocaleString('en-IN')}
                        </span>
                        <div className="inline-block scale-90 origin-right">
                          <StatusBadge status={p.status} />
                        </div>
                      </div>
                      <div className="text-slate-400 group-hover:text-brand-600 transition-colors ml-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Bill Detail */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative">
                        {/* J-Form Background Icon */}
                        <FileText className="absolute top-4 right-4 w-16 h-16 text-slate-100 opacity-50" />
                        
                        <div className="relative z-10">
                          <h5 className="font-black text-xs text-brand-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5" /> J-Form / Bill Details
                          </h5>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                              <span className="text-slate-500 font-bold">Crop</span>
                              <span className="font-black text-slate-900">{p.cropName}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                              <span className="text-slate-500 font-bold">Quantity (Quintals)</span>
                              <span className="font-black text-slate-900">{Number(quantity).toFixed(2)} Q</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                              <span className="text-slate-500 font-bold">MSP Rate</span>
                              <span className="font-black text-slate-900">₹{p.mspPerQuintal?.toLocaleString('en-IN')} / Q</span>
                            </div>
                            
                            <div className="flex justify-between pt-1">
                              <span className="text-slate-500 font-black">Net Payable</span>
                              <span className="font-black text-brand-600 text-sm">₹{amount.toLocaleString('en-IN')}</span>
                            </div>

                            {/* Bank Details */}
                            <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <div className="flex justify-between mb-1">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bank A/C</span>
                                <span className="text-[10px] text-slate-700 font-black">{p.maskedAccount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">UTR / Ref No.</span>
                                <span className="text-[10px] text-slate-700 font-black">{p.utrReference}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <div className="text-slate-500 font-bold">No transactions found</div>
            <div className="text-xs text-slate-400 mt-1">Try selecting a different time period</div>
          </div>
        )}
      </div>

    </div>
  );
};
