import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, LogOut, MapPin } from 'lucide-react';

export const OfficerTopNav = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-subtle pt-safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-6">
          <Link to="/officer" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-900 transition">
              <Sprout className="w-6 h-6 text-brand-200" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                Agro<span className="text-brand-700">Cure</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block">
                Field Operations
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            Active Mandi Context
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* User Account / Profile */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-left cursor-default">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm flex items-center justify-center border border-indigo-200">
                {user?.name ? user.name[0] : 'O'}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-semibold text-slate-900 block">
                  {user?.name || 'Officer'}
                </span>
                <span className="text-slate-500 block text-[10px] capitalize">
                  {user?.role?.toLowerCase() || 'Officer'}
                </span>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-200 mx-1"></div>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition flex items-center gap-1.5"
              title="Sign Out"
            >
              <span className="hidden sm:inline text-xs font-semibold">Sign Out</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
