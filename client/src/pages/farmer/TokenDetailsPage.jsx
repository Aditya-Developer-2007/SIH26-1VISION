import React, { useEffect, useState } from 'react';
import { TokenCard } from '../../components/farmer/TokenCard';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TokenDetailsPage = () => {
  const [activeTokens, setActiveTokens] = useState([]);
  const [historyTokens, setHistoryTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyFilter, setHistoryFilter] = useState('none'); // none, today, week, month, 6months, all

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        const tokensArray = res.data?.tokens || [];
        const paymentsArray = res.data?.payments || [];
        
        // Find which procurements are fully credited
        const creditedProcurementIds = new Set(
          paymentsArray.filter(p => p.status === 'CREDITED').map(p => p.procurementId)
        );

        const active = [];
        const history = [];

        tokensArray.forEach(t => {
          if (t.status === 'EXPIRED' || creditedProcurementIds.has(t.procurementId)) {
            // Ensure token displays as expired if payment is credited
            history.push({ ...t, status: 'EXPIRED' });
          } else {
            active.push(t);
          }
        });

        setActiveTokens(active);
        setHistoryTokens(history);
      }
      setLoading(false);
    });
  }, []);

  const getFilteredHistory = () => {
    if (historyFilter === 'none') return [];
    if (historyFilter === 'all') return historyTokens;
    
    const now = new Date();
    const thresholdDate = new Date();
    
    if (historyFilter === 'today') {
      thresholdDate.setHours(0, 0, 0, 0);
    } else if (historyFilter === 'week') {
      thresholdDate.setDate(thresholdDate.getDate() - 7);
    } else if (historyFilter === 'month') {
      thresholdDate.setMonth(thresholdDate.getMonth() - 1);
    } else if (historyFilter === '6months') {
      thresholdDate.setMonth(thresholdDate.getMonth() - 6);
    }

    return historyTokens.filter(t => {
      const tDateStr = t.date || t.createdAt;
      if (!tDateStr) return false;
      
      const tDate = new Date(tDateStr);
      if (historyFilter === 'today') {
        return tDate.toDateString() === now.toDateString();
      }
      return tDate >= thresholdDate;
    });
  };

  const filteredHistory = getFilteredHistory();

  if (loading) {
    return <div className="p-6 text-center text-slate-500 font-bold animate-pulse">Loading digital tokens...</div>;
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24 px-2">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <Link to="/farmer" className="inline-flex items-center gap-2 font-black text-slate-900 hover:text-brand-700 hover-lift">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        <span className="text-sm text-brand-700 font-black tracking-wider uppercase">My Tokens</span>
      </div>

      <div className="space-y-8">
        
        {/* Active Tokens (Recent) */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Tokens
          </h2>
          {activeTokens.length > 0 ? (
            activeTokens.map((token, idx) => (
              <TokenCard key={token.id || idx} token={token} />
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center premium-card">
              <QrCode className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <div className="text-slate-500 font-bold">No active tokens found</div>
              <div className="text-xs text-slate-400 mt-1">Register a new crop to get a token</div>
            </div>
          )}
        </div>

        {/* History Section with Filter */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900">Token History</h3>
            
            <select 
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer shadow-sm"
            >
              <option value="none">Hidden</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">Last Month</option>
              <option value="6months">Last 6 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {historyFilter !== 'none' && (
            <div className="space-y-4 opacity-80">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((token, idx) => (
                  <TokenCard key={token.id || idx} token={token} />
                ))
              ) : (
                <div className="text-center text-slate-500 text-sm font-bold py-4">
                  No history found for this period.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
