import React, { useEffect, useState } from 'react';
import { PaymentOverview } from '../../components/farmer/PaymentOverview';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentStatusPage = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setPayments(res.data?.payments || []);
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
      ) : payments.length > 0 ? (
        <>
          {payments.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {payments.map((p, idx) => (
                <button
                  key={p.id || idx}
                  onClick={() => setSelectedPaymentIndex(idx)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                    idx === selectedPaymentIndex
                      ? 'bg-brand-800 text-white border-brand-800 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.cropName} - {p.quantityQuintals} Q
                </button>
              ))}
            </div>
          )}
          <PaymentOverview payment={payments[selectedPaymentIndex]} />
        </>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No payments found.
        </div>
      )}
    </div>
  );
};
