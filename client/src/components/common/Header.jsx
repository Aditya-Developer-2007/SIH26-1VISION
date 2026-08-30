import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Sprout, User, LogOut, ChevronRight } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[33px] z-40 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-900 transition">
            <Sprout className="w-6 h-6 text-brand-200" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
              Agro<span className="text-brand-700">Cure</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block">
              Procurement Visibility
            </span>
          </div>
        </Link>

        {/* Navigation Quick Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/farmer" className="hover:text-brand-700 transition">{t('navHome')}</Link>
          <Link to="/farmer/journey" className="hover:text-brand-700 transition">{t('navJourney')}</Link>
          <Link to="/farmer/token" className="hover:text-brand-700 transition">{t('navToken')}</Link>
          <Link to="/farmer/payments" className="hover:text-brand-700 transition">{t('navPayments')}</Link>
          <Link to="/farmer/centres" className="hover:text-brand-700 transition">{t('navCentres')}</Link>
          <Link to="/farmer/documents" className="hover:text-brand-700 transition">{t('navDocs')}</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/farmer/notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white"></span>
          </Link>

          {/* User Account / Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <Link to="/farmer/profile" className="flex items-center gap-2 text-left group">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold text-sm flex items-center justify-center border border-brand-200">
                {user?.name ? user.name[0] : 'F'}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-semibold text-slate-900 block group-hover:text-brand-700 transition">
                  {user?.name}
                </span>
                <span className="text-slate-500 capitalize block text-[10px]">
                  {user?.role}
                </span>
              </div>
            </Link>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
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
