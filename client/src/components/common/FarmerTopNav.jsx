import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Sprout, LogOut } from 'lucide-react';

export const FarmerTopNav = ({ mobile }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (mobile) {
    return (
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 px-4 h-14 flex items-center justify-between">
        <Link to="/farmer" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm">
            <Sprout className="w-5 h-5 text-brand-200" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
              Agro<span className="text-brand-700">Cure</span>
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/farmer/notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </Link>
          <Link to="/farmer/profile" className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold text-sm flex items-center justify-center border border-brand-200 hover-lift">
            {user?.name ? user.name[0] : 'F'}
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/farmer" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-900 transition hover-lift">
            <Sprout className="w-6 h-6 text-brand-200" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
              Agro<span className="text-brand-700">Cure</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block">
              Farmer Portal
            </span>
          </div>
        </Link>

        {/* Navigation Quick Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/farmer" className="hover:text-brand-700 transition hover-lift">{t('navHome')}</Link>
          <Link to="/farmer/token" className="hover:text-brand-700 transition hover-lift">{t('navToken')}</Link>
          <Link to="/farmer/payments" className="hover:text-brand-700 transition hover-lift">{t('navPayments')}</Link>
          <Link to="/farmer/centres" className="hover:text-brand-700 transition hover-lift">{t('navCentres')}</Link>
          {/* <Link to="/farmer/documents" className="hover:text-brand-700 transition hover-lift">{t('navDocs')}</Link> */}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/farmer/notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition hover-lift"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </Link>

          {/* User Account / Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <Link to="/farmer/profile" className="flex items-center gap-3 text-left group hover:bg-slate-50/50 p-1.5 rounded-xl transition cursor-pointer hover-lift">
              <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center border-2 border-white shadow-sm">
                {user?.name ? user.name[0] : 'F'}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-bold text-slate-900 block group-hover:text-brand-700 transition">
                  {user?.name}
                </span>
                <span className="text-slate-500 block text-[10px] font-medium">
                  View Profile
                </span>
              </div>
            </Link>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition hover-lift"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
