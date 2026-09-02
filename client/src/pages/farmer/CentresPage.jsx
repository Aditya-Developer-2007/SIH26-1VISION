import React, { useEffect, useState } from 'react';
import { CentreCard } from '../../components/farmer/CentreCard';
import { farmerApi } from '../../services/farmerApi';
import { Search, MapPin, Building2, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CentresPage = () => {
  const [centres, setCentres] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    farmerApi.getCentres(search).then(res => {
      if (res?.success) {
        setCentres(res.centres || []);
      }
      setLoading(false);
    });
  }, [search]);

  const handleSelectCentre = (c) => {
    addToast(`Selected ${c.name} for procurement`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Procurement Centres</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Find nearby Government grain mandis, check yard capacity %, queue size, and next available slots.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by mandi name, sector, or district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white shadow-subtle"
        />
      </div>

      {/* AgroCure Smart AI Recommendation Banner */}
      <div className="bg-brand-900 text-white rounded-xl p-4 border border-brand-800 shadow-card flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px] bg-brand-800 px-2 py-0.5 rounded">
            AGROCURE SMART RECOMMENDATION
          </span>
          <p className="text-brand-100">
            <strong>Krishi Procurement Centre</strong> (5.8 km) currently has 45% capacity and only 12 farmers in queue. Recommended for shorter weighment waiting times today.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500">Searching procurement centres...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {centres.map(centre => (
            <CentreCard key={centre.id} centre={centre} onSelect={handleSelectCentre} />
          ))}
        </div>
      )}
    </div>
  );
};
