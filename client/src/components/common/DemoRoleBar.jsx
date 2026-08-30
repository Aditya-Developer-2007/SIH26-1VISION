import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, User, Landmark, Languages } from 'lucide-react';

export const DemoRoleBar = () => {
  const { user, switchRole } = useAuth();
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-slate-800 shadow-sm z-50 sticky top-0">
      <div className="flex items-center gap-2 font-medium">
        <span className="bg-brand-800 text-brand-100 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
          SIH 2026 PROTOTYPE
        </span>
        <span className="hidden sm:inline text-slate-400">Team 1Vison</span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="hidden md:inline text-slate-300">Role: <strong className="text-white">{user?.name} ({user?.role})</strong></span>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition border border-slate-700"
          title="Toggle Language"
        >
          <Languages className="w-3.5 h-3.5 text-brand-400" />
          <span className="font-semibold">{lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
        </button>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded border border-slate-700">
          <button
            onClick={() => switchRole('FARMER')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              user?.role === 'FARMER' ? 'bg-brand-700 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3 h-3" />
            Farmer
          </button>
          <button
            onClick={() => switchRole('OFFICER')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              user?.role === 'OFFICER' ? 'bg-brand-700 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            Officer
          </button>
          <button
            onClick={() => switchRole('ADMIN')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition ${
              user?.role === 'ADMIN' ? 'bg-brand-700 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Landmark className="w-3 h-3" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
