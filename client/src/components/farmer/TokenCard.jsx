import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { Download, Share2, MapPin, Calendar, Clock, Scale, ShieldCheck, QrCode as QrIcon } from 'lucide-react';

export const TokenCard = ({ token }) => {
  if (!token) return null;

  const handleDownload = () => {
    window.open(`/api/documents/download/doc_2`, '_blank');
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
    <div className="bg-white rounded-xl border-2 border-brand-800 shadow-elevated overflow-hidden max-w-lg mx-auto">
      {/* Token Header Banner */}
      <div className="bg-brand-900 text-white p-4 text-center relative border-b border-brand-800">
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-300">
          OFFICIAL DIGITAL PROCUREMENT PASS
        </div>
        <h2 className="text-2xl font-black text-white tracking-wider my-1">
          {token.tokenNumber}
        </h2>
        <div className="inline-block">
          <StatusBadge status={token.status} />
        </div>
      </div>

      {/* Main Token Body */}
      <div className="p-5 space-y-4">
        {/* QR Code & Essential Details */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-paper-50 rounded-lg border border-slate-200">
          <div className="bg-white p-2.5 rounded-lg border border-slate-300 shadow-sm shrink-0">
            <img
              src={qrUrl}
              alt={`QR Code for ${token.tokenNumber}`}
              className="w-36 h-36 object-contain"
            />
            <span className="text-[10px] font-mono text-center block text-slate-500 mt-1">
              SCAN AT MANDI GATE
            </span>
          </div>

          <div className="space-y-2 text-sm w-full">
            <div>
              <span className="text-xs text-slate-500 block uppercase font-medium">Farmer Name</span>
              <span className="font-bold text-slate-900 text-base">{token.farmerName}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 block">Crop</span>
                <span className="font-bold text-brand-900">{token.cropName}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Quantity</span>
                <span className="font-bold text-slate-900">{token.quantityQuintals} Quintal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Mandi Location */}
        <div className="space-y-2.5 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-700 shrink-0 mt-1" />
            <div>
              <span className="text-xs text-slate-500 block">Procurement Centre</span>
              <span className="font-bold text-slate-900 block">{token.centreName}</span>
              <span className="text-xs text-slate-600 block">{token.centreAddress}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-700" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Scheduled Date</span>
                <span className="font-bold text-slate-900">{token.slotDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-700" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Time Slot</span>
                <span className="font-bold text-slate-900">{token.slotTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Verification Checklist for Mandi Gate:
          </span>
          <ul className="list-disc list-inside space-y-0.5 pl-1 text-emerald-800">
            {token.requiredDocs.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download Token Pass
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition border border-slate-300"
            title="Share Token"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
