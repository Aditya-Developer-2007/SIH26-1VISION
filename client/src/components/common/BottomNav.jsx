import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Home, QrCode, CreditCard, Building2, LogOut } from 'lucide-react';

export const BottomNav = () => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/farmer', label: t('navHome'), icon: Home },
    { to: '/farmer/token', label: t('navToken'), icon: QrCode, highlight: true },
    { to: '/farmer/payments', label: t('navPayments'), icon: CreditCard },
    { to: '/farmer/centres', label: t('navCentres'), icon: Building2 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed bottom-4 left-4 right-4 md:hidden z-50">
      <div className="flex items-center justify-around max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl rounded-full px-2 py-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/farmer'}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-110'
                        : 'text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-1 transition-all ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
        
        {/* Profile/Logout Mobile */}
        <NavLink
          to="/farmer/profile"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-all duration-300 ${
              isActive
                ? 'text-white'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-110'
                    : 'text-slate-400'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-500">
                  {user?.name ? user.name[0] : 'F'}
                </div>
              </div>
              <span className={`mt-1 transition-all ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>Profile</span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};
