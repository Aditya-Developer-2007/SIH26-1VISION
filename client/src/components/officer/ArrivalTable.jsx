import React, { useState } from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { Search, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ArrivalTable = ({ arrivals, onInspectToken }) => {
  const [search, setSearch] = useState('');

  const filtered = (arrivals || []).filter(item =>
    item.tokenId.toLowerCase().includes(search.toLowerCase()) ||
    item.farmerName.toLowerCase().includes(search.toLowerCase()) ||
    item.cropName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Today's Mandi Arrivals</h3>
          <p className="text-xs text-slate-500">Farmers scheduled for procurement & weighment verification</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Token (e.g. AGRO-2048)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <th className="py-3 px-4">Token ID</th>
              <th className="py-3 px-4">Farmer Name</th>
              <th className="py-3 px-4">Crop</th>
              <th className="py-3 px-4">Est. Weight</th>
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-4 font-mono font-bold text-brand-900">
                  {item.tokenId}
                </td>
                <td className="py-3 px-4 text-slate-900 font-semibold">
                  {item.farmerName}
                  <span className="block text-[10px] text-slate-500 font-normal">{item.farmerPhone}</span>
                </td>
                <td className="py-3 px-4 text-slate-700">
                  {item.cropName}
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">
                  {item.estimatedQuantityQuintals} Q
                </td>
                <td className="py-3 px-4 text-slate-600">
                  {item.slotTime}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onInspectToken(item.tokenId)}
                    className="inline-flex items-center gap-1 bg-brand-800 hover:bg-brand-900 text-white font-bold px-3 py-1.5 rounded text-xs transition"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    Weighment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
