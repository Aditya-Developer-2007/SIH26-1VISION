import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, LogOut, ShieldAlert } from 'lucide-react';

export const AdminTopNav = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-subtle pt-safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Context */}
        <Link to="/admin" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm transition">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
              Agro<span className="text-emerald-500">Cure</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block">
              Central Administration
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-rose-500/20 mr-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Superuser
          </div>

          {/* User Account / Profile */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-left cursor-default">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-sm flex items-center justify-center border border-slate-600">
                {user?.name ? user.name[0] : 'A'}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-semibold text-white block">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-slate-400 block text-[10px] capitalize">
                  {user?.role?.toLowerCase() || 'Admin'}
                </span>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition flex items-center gap-1.5"
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
