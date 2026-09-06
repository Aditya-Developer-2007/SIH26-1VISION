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
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <Link to="/farmer" className="inline-flex items-center gap-2 font-bold text-slate-800 hover:text-brand-700">
          <ArrowLeft className="w-5 h-5" />
          Peeche Jayein
        </Link>
        <span className="text-sm text-brand-700 font-black">Aapka Paisa</span>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-3xl font-black text-slate-900">Paisa ka status</h1>
        <p className="text-sm text-slate-500 font-bold">
          Janiye aapka paisa kahan hai
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500 font-bold">Paisa check ho raha hai...</div>
      ) : payments.length > 0 ? (
        <div className="space-y-6">
          {payments.map((p, idx) => (
            <PaymentOverview key={p.id || idx} payment={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500 font-bold">
          Koi payment nahi mila.
        </div>
      )}
    </div>
  );
};
