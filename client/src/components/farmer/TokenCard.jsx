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
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(token.qrCodeData || token.tokenNumber)}&color=14532d`;
  const isExpired = token.status?.toUpperCase() === 'EXPIRED';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden relative premium-card">
      {/* Side Color Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isExpired ? 'bg-slate-300' : 'bg-brand-500'}`}></div>

      <div className="p-4 pl-5 flex items-start gap-4">
        {/* Left Side: Compact QR */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 relative mb-2">
            <img
              src={qrUrl}
              alt="QR Code"
              className={`w-20 h-20 object-contain ${isExpired ? 'opacity-30' : ''}`}
            />
            {isExpired && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-slate-800 text-white font-black text-[10px] py-1 px-2 rounded transform -rotate-12 uppercase tracking-widest border border-slate-700 shadow-sm">
                  Khatam
                </span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
            SCAN GATE
          </span>
        </div>

        {/* Right Side: Details */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold text-brand-600 block mb-0.5">{token.tokenNumber}</span>
              <h3 className="font-black text-slate-900 text-lg truncate leading-tight">
                {token.cropName} <span className="text-sm font-bold text-slate-500">({token.quantityQuintals}Q)</span>
              </h3>
            </div>
            {!isExpired && (
              <button onClick={handleDownload} className="text-slate-400 hover:text-brand-600 transition-colors p-1" title="Download Token">
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate font-medium">{token.centreName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold">{token.slotDate} | {token.slotTime}</span>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
              isExpired ? 'bg-slate-100 text-slate-500' : 'bg-brand-50 text-brand-700 border border-brand-100'
            }`}>
              {token.farmerName}
            </span>
            <StatusBadge status={token.status} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
