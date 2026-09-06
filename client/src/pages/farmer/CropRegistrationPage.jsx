import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmerApi } from '../../services/farmerApi';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, ShieldCheck, Volume2, ArrowRight, ArrowLeft } from 'lucide-react';

export const CropRegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [crops, setCrops] = useState([]);
  const [centres, setCentres] = useState([]);
  
  const [cropId, setCropId] = useState('');
  const [areaAcres, setAreaAcres] = useState('2.5');
  const [estimatedQuintals, setEstimatedQuintals] = useState('18.5');
  const [centreId, setCentreId] = useState('');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

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
        addToast('Form data load nahi ho paya', 'error');
      }
    };
    fetchData();
  }, []);

  const selectedCrop = crops.find(c => c._id === cropId) || { mspRate: 0, name: '' };
  const selectedCentre = centres.find(c => c._id === centreId) || { name: '' };
  const calculatedTotal = (Number(estimatedQuintals) || 0) * selectedCrop.mspRate;

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    } else {
      addToast('Awaaz ki suvidha aapke phone mein nahi hai', 'error');
    }
  };

  const ttsText = {
    1: 'Kaunsi fasal jama karni hai?',
    2: 'Kitni zameen mein fasal hui thi aur kitni paidaawar hai?',
    3: 'Kaunsi Mandi mein jaana chahte hain?',
    4: 'Kis din aur kis samay mandi aana hai?',
    5: 'Sab jankari check kar lein aur apna naya token banayein.'
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
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
        setSuccessData(res.data);
        playTTS('Aapka token ban gaya hai');
      } else {
        addToast(res.message || 'Error aaya hai', 'error');
      }
    } catch (err) {
      addToast('Kuch galat ho gaya', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-6 text-center">
        <div className="bg-emerald-100 rounded-3xl p-8 shadow-lg">
          <CheckCircle2 className="w-24 h-24 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-emerald-900 mb-2">Kam Pura Hua!</h2>
          <p className="text-lg text-emerald-800 font-bold mb-6">Aapka naya token ban gaya hai.</p>
          <button
            onClick={() => navigate('/farmer/token')}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-xl text-xl shadow-lg transition"
          >
            Apna Token Dekho
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 pb-24">
      <div className="bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-slate-500 font-bold text-sm">Step {step} of 5</span>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full ${s <= step ? 'bg-brand-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
        <button
          onClick={() => playTTS(ttsText[step])}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-700 font-bold px-4 py-2 rounded-lg border-2 border-indigo-200"
        >
          <Volume2 className="w-5 h-5" />
          Sun kar samjho
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Kaunsi fasal?</h2>
            <div className="grid grid-cols-2 gap-4">
              {crops.map((c) => (
                <button
                  key={c._id}
                  onClick={() => setCropId(c._id)}
                  className={`p-4 rounded-xl border-4 transition ${
                    cropId === c._id
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-slate-100 hover:border-brand-200'
                  }`}
                >
                  <div className={`text-2xl font-black ${cropId === c._id ? 'text-brand-900' : 'text-slate-700'}`}>
                    {c.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Kitni Zameen aur Fasal?</h2>
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-lg">Zameen (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={areaAcres}
                onChange={(e) => setAreaAcres(e.target.value)}
                className="w-full text-center text-3xl font-black py-4 rounded-xl border-2 border-slate-300 focus:border-brand-600 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-lg">Fasal (Quintal)</label>
              <input
                type="number"
                step="0.1"
                value={estimatedQuintals}
                onChange={(e) => setEstimatedQuintals(e.target.value)}
                className="w-full text-center text-3xl font-black py-4 rounded-xl border-2 border-slate-300 focus:border-brand-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Kaunsi Mandi?</h2>
            <div className="space-y-4">
              {centres.map(cnt => (
                <button
                  key={cnt._id}
                  onClick={() => setCentreId(cnt._id)}
                  className={`w-full p-4 rounded-xl border-4 text-left transition ${
                    centreId === cnt._id
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-slate-100'
                  }`}
                >
                  <div className="font-black text-xl text-slate-900">{cnt.name}</div>
                  <div className="text-slate-600 font-bold">{cnt.district}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Kab Aana Hai?</h2>
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-lg">Din Chunein</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full text-center text-2xl font-black py-4 rounded-xl border-2 border-slate-300"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-lg">Samay Chunein</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full text-center text-xl font-black py-4 rounded-xl border-2 border-slate-300 bg-white"
              >
                <option value="10:00 AM - 12:00 PM">Subah 10 baje - 12 baje</option>
                <option value="12:00 PM - 02:00 PM">Dopahar 12 baje - 2 baje</option>
                <option value="02:00 PM - 04:00 PM">Dopahar 2 baje - 4 baje</option>
              </select>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Ek Baar Check Kar Lein</h2>
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 space-y-4">
              <div>
                <span className="text-slate-500 font-bold">Fasal:</span>
                <div className="text-xl font-black text-slate-900">{selectedCrop?.name} ({estimatedQuintals} Quintal)</div>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Mandi:</span>
                <div className="text-xl font-black text-slate-900">{selectedCentre?.name}</div>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Samay:</span>
                <div className="text-xl font-black text-slate-900">{preferredDate} | {preferredTime}</div>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-200 text-center">
              <span className="text-emerald-800 font-bold block mb-1">Milen waale paise lagbhag:</span>
              <span className="text-3xl font-black text-emerald-900">₹{calculatedTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8 pt-4 border-t-2 border-slate-100">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-slate-100 text-slate-700 font-black py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Peeche Jayein
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-brand-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              Aage Badhein
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] bg-brand-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              Haan, Token Banao
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
