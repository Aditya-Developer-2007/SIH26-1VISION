import React from 'react';
import { MapPin, Users, Clock, Phone, ChevronRight } from 'lucide-react';

export const CentreCard = ({ centre, onSelect }) => {
  if (!centre) return null;

  return (
    <div className="bg-white rounded-2xl border-4 border-slate-200 p-5 shadow-lg flex flex-col gap-4">
      <div>
        <h4 className="font-black text-slate-900 text-2xl leading-tight mb-2">{centre.name}</h4>
        <div className="flex items-center gap-2 text-base font-bold text-slate-600">
          <MapPin className="w-5 h-5 text-brand-700 shrink-0" />
          <span>{centre.distanceKm} km door</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm font-bold bg-slate-50 p-3 rounded-xl border-2 border-slate-100">
        <span className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-500" />
          Line mein: {centre.queueCount} kisan
        </span>
        <span className={`px-3 py-1 rounded-lg ${centre.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
          {centre.status === 'OPEN' ? 'Khula Hai' : 'Band Hai'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <a
          href={`tel:${centre.contactPhone}`}
          className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-xl text-sm transition border-2 border-slate-200"
        >
          <Phone className="w-5 h-5" />
          Call Karein
        </a>
        <button
          onClick={() => onSelect && onSelect(centre)}
          className="flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-black py-4 rounded-xl text-sm shadow-lg transition"
        >
          Mandi Chunein
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
