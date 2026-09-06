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
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <Link to="/farmer" className="inline-flex items-center gap-2 font-bold text-slate-800 hover:text-brand-700">
          <ArrowLeft className="w-5 h-5" />
          Peeche Jayein
        </Link>
        <span className="text-sm text-brand-700 font-black">Asli Token</span>
      </div>

      <div className="space-y-6">
        {tokens.length > 0 ? (
          tokens.map((token, idx) => (
            <TokenCard key={token.id || idx} token={token} />
          ))
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500 font-bold">
            Koi token nahi mila. Fasal jodein.
          </div>
        )}
      </div>
    </div>
  );
};
