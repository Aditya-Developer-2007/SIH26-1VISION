import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmerApi } from '../../services/farmerApi';
import { useToast } from '../../context/ToastContext';
import { Sprout, Calendar, Clock, MapPin, Scale, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CropRegistrationPage = () => {
  const [crops, setCrops] = useState([]);
  const [centres, setCentres] = useState([]);
  
  const [cropId, setCropId] = useState('');
  const [areaAcres, setAreaAcres] = useState('2.5');
  const [estimatedQuintals, setEstimatedQuintals] = useState('18.5');
  const [centreId, setCentreId] = useState('');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cropsRes, centresRes] = await Promise.all([
          farmerApi.getCrops(),
          farmerApi.getCentres()
        ]);
        if (cropsRes.success && cropsRes.data.length > 0) {
          setCrops(cropsRes.data);
          setCropId(cropsRes.data[0]._id);
        }
        if (centresRes.success && centresRes.data.length > 0) {
          setCentres(centresRes.data);
          setCentreId(centresRes.data[0]._id);
        }
      } catch (error) {
        addToast('Failed to load form data', 'error');
      }
    };
    fetchData();
  }, []);

  const selectedCrop = crops.find(c => c._id === cropId) || { mspRate: 0 };
  const calculatedTotal = (Number(estimatedQuintals) || 0) * selectedCrop.mspRate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await farmerApi.registerCropAndBookSlot({
        cropId,
        areaAcres,
        quantity: estimatedQuintals,
        centreId,
        scheduledDate: preferredDate,
        slotStart: preferredTime.split(' - ')[0],
        slotEnd: preferredTime.split(' - ')[1]
      });

      if (res?.success) {
        addToast('Crop registered! Token issued successfully', 'success');
        navigate('/farmer/token');
      } else {
        addToast(res.message || 'Registration failed', 'error');
      }
    } catch (err) {
      addToast('Error registering crop', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Register Crop & Book Slot</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Provide your yield estimate and choose a convenient Mandi slot for token generation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-5 text-xs">
        
        {/* Verified revenue link alert */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center justify-between text-emerald-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold">Linked Revenue Record: HR-FBD-2024-8841 (Verified)</span>
          </div>
          <span className="text-[10px] bg-emerald-200/60 font-bold px-2 py-0.5 rounded">2.5 Acres</span>
        </div>

        {/* Crop Selection */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">Select Crop *</label>
          <div className="grid grid-cols-3 gap-3">
            {crops.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => setCropId(c._id)}
                className={`p-3 rounded-lg border text-left transition ${
                  cropId === c._id
                    ? 'border-brand-800 bg-brand-50 text-brand-900 font-bold ring-2 ring-brand-700/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-[10px] text-slate-500 mt-1">MSP: ₹{c.mspRate} / Quintal</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Cultivated Area (Acres) *</label>
            <input
              type="number"
              step="0.1"
              required
              value={areaAcres}
              onChange={(e) => setAreaAcres(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Estimated Yield (Quintals) *</label>
            <input
              type="number"
              step="0.1"
              required
              value={estimatedQuintals}
              onChange={(e) => setEstimatedQuintals(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Mandi Selection */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">Preferred Procurement Centre *</label>
          <select
            value={centreId}
            onChange={(e) => setCentreId(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
          >
            {centres.map(cnt => (
              <option key={cnt._id} value={cnt._id}>
                {cnt.name} - {cnt.district}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Preferred Date *</label>
            <input
              type="date"
              required
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Preferred Time Slot *</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-brand-700 focus:outline-none"
            >
              <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Recommended)</option>
              <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
            </select>
          </div>
        </div>

        {/* Calculated Total Payout Box */}
        <div className="bg-paper-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs block font-medium">Estimated Govt. Payout</span>
            <span className="text-xl font-black text-brand-900">
              ₹{calculatedTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Calculated: {estimatedQuintals} Q × ₹{selectedCrop.mspRate}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-800 hover:bg-brand-900 text-white font-bold py-3 rounded-lg text-sm transition shadow-sm flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          {loading ? 'Generating Token...' : 'Confirm Slot & Issue Digital Token'}
        </button>
      </form>
    </div>
  );
};
