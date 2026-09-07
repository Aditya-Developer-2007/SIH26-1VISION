import React, { useState } from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { CheckCircle2, Volume2, Landmark, ChevronDown, ChevronUp, FileText } from 'lucide-react';

export const PaymentOverview = ({ payment }) => {
  const [showMore, setShowMore] = useState(false);

  if (!payment) return null;

  const playTTS = (amount) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`An amount of ${amount} rupees is expected to be credited to your bank account.`);
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden text-center max-w-sm mx-auto p-6 space-y-6">
      
      {/* Massive Status Header */}
      <div>
        <h3 className="text-4xl font-black text-emerald-700 tracking-tight">
          ₹{payment.totalAmount?.toLocaleString('en-IN')}
        </h3>
        <span className="text-xl font-bold text-slate-800 mt-2 block">Aapke Khate Mein Aa Raha Hai</span>
      </div>

      <button
        onClick={() => playTTS(payment.totalAmount)}
        className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-bold px-4 py-3 rounded-xl border-2 border-indigo-200"
      >
        <Volume2 className="w-6 h-6" />
        Listen to details
      </button>

      {/* 3-Step Simple Progress */}
      <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center relative">
        <div className="absolute left-6 right-6 top-1/2 h-1 bg-slate-200 -z-0"></div>
        {payment.timeline?.map((item, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center bg-slate-50 px-2 gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.done
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : item.active
                  ? 'bg-amber-400 text-amber-900 shadow-lg animate-pulse'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black uppercase ${item.done || item.active ? 'text-slate-900' : 'text-slate-400'}`}>
              {idx === 0 ? 'Form Bhara' : idx === 1 ? 'Bheja Gaya' : 'Mil Gaya'}
            </span>
          </div>
        ))}
      </div>

      {/* Basic Fasal Info */}
      <div className="bg-brand-50 p-4 rounded-2xl border-2 border-brand-100 flex items-center justify-between">
        <span className="text-brand-900 font-bold">{payment.cropName}</span>
        <span className="text-brand-900 font-black">{payment.quantityQuintals} Quintal</span>
      </div>

      {/* Secondary Details (Collapsible) */}
      <div>
        <button 
          onClick={() => setShowMore(!showMore)}
          className="flex items-center justify-center gap-1 w-full text-slate-500 font-bold py-2"
        >
          {showMore ? 'Jankari Chupayein' : 'Puri Jankari Dekhein'}
          {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showMore && (
          <div className="mt-4 space-y-3 text-sm text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Sarkari Rate:</span>
              <span className="font-black">₹{payment.mspPerQuintal} / Q</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Khata No:</span>
              <span className="font-black">{payment.maskedAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Reference:</span>
              <span className="font-black text-xs mt-0.5">{payment.utrReference}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
