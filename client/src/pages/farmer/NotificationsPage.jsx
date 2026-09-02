import React, { useEffect, useState } from 'react';
import { farmerApi } from '../../services/farmerApi';
import { Bell, CheckCircle2, Clock, Info, ShieldAlert } from 'lucide-react';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setNotifications(res.notifications || []);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Notifications & Alerts</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Proactive updates regarding your Mandi schedule, quality checks, and bank payouts.
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500">Loading notifications...</div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-card flex items-start gap-3.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                n.category === 'IMPORTANT' ? 'bg-amber-100 text-amber-800' :
                n.category === 'PAYMENTS' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {n.category === 'IMPORTANT' ? <ShieldAlert className="w-5 h-5" /> :
                 n.category === 'PAYMENTS' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
