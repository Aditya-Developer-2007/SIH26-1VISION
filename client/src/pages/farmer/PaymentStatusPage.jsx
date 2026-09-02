import React, { useEffect, useState } from 'react';
import { PaymentOverview } from '../../components/farmer/PaymentOverview';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentStatusPage = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setPayment(res.data?.payment);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-safe-nav">
      <div className="flex items-center justify-between">
        <Link to="/farmer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-1 text-xs text-brand-800 font-bold bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
          <Landmark className="w-4 h-4 text-brand-700" />
          <span>DBT Direct Transfer</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-900">Payment Status</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Track MSP payout calculation, DBT reference UTR, and bank credit lifecycle.
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500">Loading payment details...</div>
      ) : (
        <PaymentOverview payment={payment} />
      )}
    </div>
  );
};
