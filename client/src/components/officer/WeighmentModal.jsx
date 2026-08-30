import React, { useState } from 'react';
import { X, Scale, ShieldCheck, CheckCircle, FileText } from 'lucide-react';

export const WeighmentModal = ({ procurement, isOpen, onClose, onSubmit }) => {
  if (!isOpen || !procurement) return null;

  const [actualWeight, setActualWeight] = useState(procurement.estimatedQuantityQuintals || 18.5);
  const [moisture, setMoisture] = useState(10.8);
  const [grade, setGrade] = useState('Grade A');
  const [remarks, setRemarks] = useState('Crop quality exceeds standard MSP requirements. Zero foreign matter.');
  const [loading, setLoading] = useState(false);

  const calculatedTotal = (Number(actualWeight) || 0) * (procurement.mspPerQuintal || 2425);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({
      procurementId: procurement.id,
      actualWeightQuintals: Number(actualWeight),
      moisturePct: Number(moisture),
      qualityGrade: grade,
      remarks
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-elevated border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-brand-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-300" />
            <div>
              <h3 className="font-bold text-base">Quality Inspection & Weighment</h3>
              <p className="text-xs text-brand-200">Token Pass: {procurement.tokenId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Farmer & Crop Header */}
          <div className="bg-paper-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-500 block">Farmer Name</span>
              <span className="font-bold text-slate-900 text-sm">{procurement.farmerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Crop & MSP</span>
              <span className="font-bold text-brand-800 text-sm">{procurement.cropName} (₹{procurement.mspPerQuintal}/Q)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Estimated Weight (Q)
              </label>
              <input
                type="text"
                disabled
                value={procurement.estimatedQuantityQuintals}
                className="w-full p-2 bg-slate-100 border border-slate-300 rounded font-bold text-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Actual Scale Weight (Quintals) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Moisture Content (%) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Max limit: 12.0%</span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Crop Grade *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
              >
                <option value="Grade A">Grade A (Premium)</option>
                <option value="Standard">Standard FAQ</option>
                <option value="Conditional">Conditional Pass</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Quality Inspector Remarks
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-700 focus:outline-none"
            />
          </div>

          {/* Amount Preview */}
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-emerald-800 text-[11px] font-semibold block">Calculated Total Payout</span>
              <span className="text-lg font-black text-emerald-950">
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2 py-1 rounded">
              J-Form Auto-Gen
            </span>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold px-5 py-2 rounded text-xs transition shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              {loading ? 'Processing...' : 'Complete Procurement & Issue J-Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
