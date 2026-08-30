import React from 'react';
import { MapPin, Users, Clock, Phone, ChevronRight } from 'lucide-react';

export const CentreCard = ({ centre, onSelect }) => {
  if (!centre) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card hover:border-brand-600 transition flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="font-bold text-slate-900 text-base">{centre.name}</h4>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
              <span>{centre.distanceKm} km away • {centre.address}</span>
            </div>
          </div>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
            centre.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {centre.status}
          </span>
        </div>

        {/* Capacity & Queue metrics */}
        <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-paper-50 rounded-lg text-xs">
          <div>
            <span className="text-slate-500 block">Yard Capacity</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${
                    centre.capacityPct > 85 ? 'bg-rose-500' : centre.capacityPct > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${centre.capacityPct}%` }}
                ></div>
              </div>
              <span className="font-bold text-slate-800">{centre.capacityPct}%</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block">Current Queue</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 mt-0.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{centre.queueCount} Farmers</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Next slot: <strong className="text-slate-900">{centre.nextSlot}</strong>
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <a
          href={`tel:${centre.contactPhone}`}
          className="text-xs font-semibold text-slate-600 hover:text-brand-800 flex items-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" />
          Call Centre
        </a>
        <button
          onClick={() => onSelect && onSelect(centre)}
          className="inline-flex items-center gap-1 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
        >
          Select Centre
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
