import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi';
import { Building2, Users, Search, Activity, ShieldAlert, BarChart3, Download, Layers } from 'lucide-react';
import { AdminDrilldownView } from '../../components/admin/AdminDrilldownView';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let isMounted = true;
    adminApi.getDashboard().then(res => {
      if (res?.success) {
        setData(res.data);
      }
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const handleExportCsv = () => {
    window.open('/api/admin/export-csv', '_blank');
  };

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Loading Admin Dashboard...</div>;
  }

  const kpis = data?.kpis || {};
  const cropBreakdown = data?.cropBreakdown || [];
  const centres = data?.centres || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div>
          <span className="text-xs font-bold text-brand-800 uppercase tracking-wider block mb-1">
            GOVERNMENT PROCUREMENT OVERVIEW & ANALYTICS
          </span>
          <h1 className="text-2xl font-black text-slate-900">AgroCure Admin Command Portal</h1>
          <p className="text-xs text-slate-500 font-medium">State Agricultural Marketing Board | Haryana Region</p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Procurement Data (CSV)
        </button>
      </div>

      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${
            activeTab === 'overview' 
              ? 'border-brand-800 text-brand-800' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          Overview KPI
        </button>
        <button
          onClick={() => setActiveTab('drilldown')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${
            activeTab === 'drilldown' 
              ? 'border-brand-800 text-brand-800' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          Operations Drill-Down
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <span className="text-slate-500 block uppercase font-medium">Registered Farmers</span>
              <span className="text-xl font-black text-slate-900 block mt-1">{(kpis.totalRegisteredFarmers || 0).toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">+12% this season</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <span className="text-slate-500 block uppercase font-medium">Today's Yield</span>
              <span className="text-xl font-black text-brand-900 block mt-1">{kpis.todayProcurementQuintals || 0} Q</span>
              <span className="text-[10px] text-slate-400">Across {kpis.activeCentresCount || 0} centres</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <span className="text-slate-500 block uppercase font-medium">Total DBT Payout</span>
              <span className="text-xl font-black text-emerald-700 block mt-1">₹{((kpis.totalPayoutAmount || 0) / 100000).toFixed(2)} Lakhs</span>
              <span className="text-[10px] text-emerald-800 font-semibold">100% MSP Rate</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <span className="text-slate-500 block uppercase font-medium">Active Mandis</span>
              <span className="text-xl font-black text-slate-900 block mt-1">{kpis.activeCentresCount || 0}</span>
              <span className="text-[10px] text-slate-400">Fully operational</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
              <span className="text-slate-500 block uppercase font-medium">Pending Grievances</span>
              <span className="text-xl font-black text-amber-600 block mt-1">{kpis.pendingGrievancesCount || 0}</span>
              <span className="text-[10px] text-amber-700 font-semibold">Resolution avg: 2h</span>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Crop Procurement Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Procurement Volume by Crop
              </h3>

              <div className="space-y-4 text-xs">
                {cropBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="font-bold text-slate-900">{item.totalQuintals} Quintal ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-800 h-2 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-400 block text-right">Payout: ₹{item.totalPayout?.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                {cropBreakdown.length === 0 && <div className="text-center text-slate-500 py-8 italic bg-slate-50 rounded-lg">No procurements recorded today.</div>}
              </div>
            </div>

            {/* Mandi Capacity Monitoring */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Mandis Yard Capacity & Queue Distribution
              </h3>

              <div className="space-y-3">
                {centres.map(centre => (
                  <div key={centre.id} className="p-3 bg-paper-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{centre.name}</h4>
                      <span className="text-slate-500 block">{centre.address}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px]">Queue Size</span>
                        <span className="font-bold text-slate-900">{centre.queueCount} Farmers</span>
                      </div>

                      <div className="w-28 text-right">
                        <span className="text-slate-500 block text-[10px]">Capacity</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${centre.capacityPct > 85 ? 'bg-rose-500' : 'bg-emerald-600'}`}
                              style={{ width: `${centre.capacityPct}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-slate-800">{centre.capacityPct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <AdminDrilldownView centres={centres} />
      )}
    </div>
  );
};
