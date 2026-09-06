import React, { useState, useEffect } from 'react';
import { officerApi } from '../../services/officerApi';
import { IndianRupee, Search, Filter } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../../context/ToastContext';

export const OfficerPaymentsView = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
      const res = await officerApi.getPayments(activeFilters);
      if (res?.success) {
        setPayments(res.data);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load payments', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card min-h-[500px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Centre Payment Status
          </h3>
          <p className="text-xs text-slate-500">Track payouts for farmers processed at your centres.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 outline-none focus:border-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="INITIATED">Initiated</option>
            <option value="CREDITED">Credited</option>
            <option value="FAILED">Failed</option>
          </select>

          <input 
            type="date" 
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 outline-none focus:border-brand-500" 
          />
          <span className="text-slate-400 text-sm">-</span>
          <input 
            type="date" 
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 outline-none focus:border-brand-500" 
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500">Loading payments...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold text-xs uppercase">Farmer</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase">Crop (Q)</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase">Amount</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase">Date</th>
                <th className="px-4 py-3 font-semibold text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-500 italic bg-slate-50">
                    No payments found for the selected filters.
                  </td>
                </tr>
              ) : (
                payments.map(payment => (
                  <tr key={payment._id || payment.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{payment.farmerId?.name}</div>
                      <div className="text-xs text-slate-500">{payment.farmerId?.mobile}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-900 font-semibold">{payment.procurementId?.cropId?.name}</div>
                      <div className="text-xs text-slate-500">{payment.quantity} Q</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700">₹{payment.estimatedAmount?.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={payment.status === 'INITIATED' ? 'PAYMENT_INITIATED' : payment.status === 'CREDITED' ? 'PAYMENT_RECEIVED' : payment.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
