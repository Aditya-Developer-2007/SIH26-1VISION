import React, { useEffect, useState } from 'react';
import { TokenCard } from '../../components/farmer/TokenCard';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TokenDetailsPage = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setToken(res.token);
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

      <TokenCard token={token} />
    </div>
  );
};
