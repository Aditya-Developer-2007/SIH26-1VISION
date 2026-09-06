import React, { useEffect, useState } from 'react';
import { CentreCard } from '../../components/farmer/CentreCard';
import { farmerApi } from '../../services/farmerApi';
import { Search, MapPin, Building2, Sparkles, ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

export const CentresPage = () => {
  const [centres, setCentres] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    farmerApi.getCentres(search).then(res => {
      if (res?.success) {
        setCentres(res.data || []);
      }
      setLoading(false);
    });
  }, [search]);

  const handleSelectCentre = (c) => {
    addToast(`Selected ${c.name} for procurement`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-safe-nav">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <Link to="/farmer" className="inline-flex items-center gap-2 font-bold text-slate-800 hover:text-brand-700">
          <ArrowLeft className="w-5 h-5" />
          Peeche Jayein
        </Link>
        <span className="text-sm text-brand-700 font-black">Mandi</span>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-3xl font-black text-slate-900">Mandi Khojein</h1>
        <p className="text-sm text-slate-500 font-bold">
          Aas paas ki sarkari mandi dekhein
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-6 h-6 text-slate-400 absolute left-4 top-4" />
        <input
          type="text"
          placeholder="Mandi ka naam likhein..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg font-bold rounded-2xl border-2 border-slate-300 focus:ring-4 focus:ring-brand-700/20 focus:border-brand-700 outline-none bg-white shadow-sm"
        />
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
