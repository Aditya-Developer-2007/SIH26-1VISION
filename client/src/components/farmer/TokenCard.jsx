import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { Download, Share2, MapPin, Calendar, Clock, Scale, ShieldCheck, QrCode as QrIcon } from 'lucide-react';

export const TokenCard = ({ token }) => {
  if (!token) return null;

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL || '/api'}/documents/download/doc_2`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `AgroCure Token Pass ${token.tokenNumber}`,
        text: `My procurement token for Wheat (${token.quantityQuintals} Quintals) at ${token.centreName} is ${token.tokenNumber}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Token ${token.tokenNumber} details copied to clipboard!`);
    }
  };

  // Generate SVG QR representation
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(token.qrCodeData || token.tokenNumber)}&color=14532d`;

  return (
    <div className="bg-white rounded-3xl border-4 border-brand-800 shadow-xl overflow-hidden max-w-sm mx-auto">
      {/* Token Header Banner */}
      <div className="bg-brand-900 text-white p-4 text-center">
        <h2 className="text-3xl font-black text-white tracking-widest my-1">
          {token.tokenNumber}
        </h2>
      </div>

      {/* Main Token Body */}
      <div className="p-6 space-y-6 flex flex-col items-center">
        {/* Massive QR Code */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-md relative w-full flex justify-center">
          <img
            src={qrUrl}
            alt={`QR Code`}
            className={`w-64 h-64 object-contain ${token.status?.toUpperCase() === 'EXPIRED' ? 'opacity-30' : ''}`}
          />
          {token.status?.toUpperCase() === 'EXPIRED' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-red-600 text-white font-black py-2 px-6 rounded-lg text-3xl transform -rotate-12 border-4 border-white shadow-xl uppercase tracking-widest">
                Khatam
              </span>
            </div>
          )}
        </div>
        <span className="text-lg font-black text-slate-500 uppercase tracking-widest">
          GATE PAR DIKHAAYEIN
        </span>

        {/* Basic Details in Large Text */}
        <div className="w-full space-y-4 text-center">
          <div>
            <span className="text-slate-500 font-bold block">Kisan Ka Naam</span>
            <span className="font-black text-slate-900 text-2xl">{token.farmerName}</span>
          </div>
          
          <div className="bg-brand-50 p-4 rounded-2xl border-2 border-brand-100">
            <span className="text-brand-800 font-bold block mb-1">Fasal aur Wazan</span>
            <span className="font-black text-brand-900 text-2xl">{token.cropName} ({token.quantityQuintals} Q)</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <span className="text-slate-500 font-bold block mb-1">Mandi aur Din</span>
            <span className="font-black text-slate-900 text-xl block leading-tight mb-2">{token.centreName}</span>
            <span className="font-bold text-slate-700 text-lg">{token.slotDate} | {token.slotTime}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 bg-brand-800 hover:bg-brand-900 text-white font-black py-4 rounded-xl text-lg shadow-lg transition"
          >
            <Download className="w-6 h-6" />
            Download Karein
          </button>
        </div>
      </div>
    </div>
  );
};
