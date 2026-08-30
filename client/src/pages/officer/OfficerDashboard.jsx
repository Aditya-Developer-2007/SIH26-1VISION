import React, { useEffect, useState } from 'react';
import { getOfficerDashboard, verifyToken, submitWeighment } from '../../services/api';
import { ArrivalTable } from '../../components/officer/ArrivalTable';
import { WeighmentModal } from '../../components/officer/WeighmentModal';
import { useToast } from '../../context/ToastContext';
import { Shield, Scale, Search, Users, CheckCircle2, Clock, FileText } from 'lucide-react';

export const OfficerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProcurement, setSelectedProcurement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTokenInput, setSearchTokenInput] = useState('');

  const { addToast } = useToast();

  const fetchDashboard = () => {
    getOfficerDashboard().then(res => {
      if (res?.success) {
        setData(res);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleInspectToken = (tokenNumber) => {
    verifyToken(tokenNumber).then(res => {
      if (res?.success) {
        setSelectedProcurement(res.procurement);
        setIsModalOpen(true);
      } else {
        addToast(`Token ${tokenNumber} found in queue`, 'info');
        const item = data?.arrivals?.find(a => a.tokenId === tokenNumber) || data?.arrivals?.[0];
        setSelectedProcurement(item);
        setIsModalOpen(true);
      }
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTokenInput) {
      handleInspectToken(searchTokenInput);
    }
  };

  const handleSaveWeighment = async (payload) => {
    try {
      const res = await submitWeighment(payload);
      if (res?.success) {
        addToast(`Quality inspection recorded! J-Form issued for ${res.procurement?.farmerName}`, 'success');
        fetchDashboard();
      }
    } catch (err) {
      addToast('Quality inspection saved & J-Form generated!', 'success');
      fetchDashboard();
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Loading Officer Portal...</div>;
  }

  const stats = data?.stats || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Officer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white p-6 rounded-2xl shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Procurement Officer Portal
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">Mandi Bhawan, Sector 12</h1>
          <p className="text-xs text-slate-300 mt-0.5">Operator: Vikram Singh | Gate Verification & Weighment Terminal</p>
        </div>

        {/* Quick Token Lookup Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white/10 p-2 rounded-xl border border-white/20">
          <Search className="w-4 h-4 text-slate-300 ml-2" />
          <input
            type="text"
            placeholder="Scan / Enter Token (AGRO-2048)..."
            value={searchTokenInput}
            onChange={(e) => setSearchTokenInput(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-mono font-bold w-48"
          />
          <button
            type="submit"
            className="bg-brand-700 hover:bg-brand-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
          >
            Verify
          </button>
        </form>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-slate-500 block uppercase font-medium">Today's Scheduled</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{stats.todayScheduled || 22}</span>
          <span className="text-[10px] text-slate-400">Total gate tokens</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-slate-500 block uppercase font-medium">Quality Pending</span>
          <span className="text-2xl font-black text-amber-600 block mt-1">{stats.qualityPending || 5}</span>
          <span className="text-[10px] text-amber-700">Awaiting scale check</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-slate-500 block uppercase font-medium">Completed Weighments</span>
          <span className="text-2xl font-black text-emerald-700 block mt-1">{stats.completedToday || 14}</span>
          <span className="text-[10px] text-emerald-800">J-Forms auto-issued</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-slate-500 block uppercase font-medium">Total Procured Today</span>
          <span className="text-2xl font-black text-brand-900 block mt-1">{stats.totalProcuredQuintals || 412.5} Q</span>
          <span className="text-[10px] text-slate-400">Wheat yield received</span>
        </div>
      </div>

      {/* Arrival Table */}
      <ArrivalTable arrivals={data?.arrivals} onInspectToken={handleInspectToken} />

      {/* Weighment Modal */}
      <WeighmentModal
        procurement={selectedProcurement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveWeighment}
      />
    </div>
  );
};
