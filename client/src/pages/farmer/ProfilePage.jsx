import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, MapPin, Landmark, ShieldCheck, FileCheck } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Farmer Profile & Land Records</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Verified agricultural identity and DBT bank account configuration.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-6">
        
        {/* User Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
          <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-900 font-black text-xl flex items-center justify-center border-2 border-brand-300 shadow-sm">
            {user?.name ? user.name[0] : 'R'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name || 'Ramesh Kumar'}</h2>
            <span className="text-xs text-slate-500 block font-medium">+91 {user?.phone || '9876543210'}</span>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-emerald-200">
              Aadhaar & Revenue Department Verified
            </span>
          </div>
        </div>

        {/* Verified Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium block flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-700" />
              Address & Location
            </span>
            <span className="font-bold text-slate-900 text-sm block">Village Khedi Kalan</span>
            <span className="text-slate-600 block">District Faridabad, Haryana</span>
          </div>

          <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium block flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-brand-700" />
              Verified Land Record (Fard)
            </span>
            <span className="font-bold text-slate-900 font-mono text-sm block">HR-FBD-2024-8841</span>
            <span className="text-slate-600 block">Total Cultivated Area: 2.5 Acres</span>
          </div>

          <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1 sm:col-span-2">
            <span className="text-slate-500 font-medium block flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-brand-700" />
              Direct Benefit Transfer (DBT) Bank Account
            </span>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div>
                <span className="font-bold text-slate-900 text-sm block">State Bank of India</span>
                <span className="font-mono font-bold text-brand-900 block">Account Ending: XXXX XXXX 4812</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded">
                PFMS Active
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
