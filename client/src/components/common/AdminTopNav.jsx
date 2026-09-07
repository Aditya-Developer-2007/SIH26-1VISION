import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, LogOut, ShieldAlert } from 'lucide-react';

export const AdminTopNav = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#0f172a] border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Context */}
        <Link to="/admin" className="flex items-center gap-3 group hover-lift">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block leading-none">
              Agro<span className="text-emerald-400">Cure</span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase block mt-1">
              Central Admin
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-rose-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            Superuser
          </div>

          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

          {/* User Account / Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="hidden sm:block text-right">
                <span className="font-bold text-white block text-sm">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-emerald-400 block text-[10px] font-semibold uppercase tracking-wider">
                  {user?.role || 'Admin'}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold text-sm flex items-center justify-center border-2 border-slate-700 shadow-inner">
                {user?.name ? user.name[0] : 'A'}
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-300 hover-lift"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
