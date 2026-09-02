import React, { useEffect, useState } from 'react';
import { TokenCard } from '../../components/farmer/TokenCard';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TokenDetailsPage = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        const tokensArray = res.data?.tokens || [];
        setTokens(tokensArray);

        // Check if there's an id in the URL
        const params = new URLSearchParams(window.location.search);
        const urlId = params.get('id');
        if (urlId) {
          const idx = tokensArray.findIndex(t => t.tokenNumber === urlId);
          if (idx !== -1) {
            setSelectedTokenIndex(idx);
          }
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Loading digital token pass...</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-safe-nav">
      <div className="flex items-center justify-between">
        <Link to="/farmer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <span className="text-xs text-slate-500 font-medium">Verified Official Token</span>
      </div>

      {tokens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tokens.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedTokenIndex(idx)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                idx === selectedTokenIndex
                  ? 'bg-brand-800 text-white border-brand-800 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.cropName} - {t.tokenNumber}
            </button>
          ))}
        </div>
      )}

      {tokens.length > 0 ? (
        <TokenCard token={tokens[selectedTokenIndex]} />
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No tokens found. Register a crop to generate a token.
        </div>
      )}
    </div>
  );
};
