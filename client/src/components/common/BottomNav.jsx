import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, Compass, QrCode, CreditCard, Building2 } from 'lucide-react';

export const BottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/farmer', label: t('navHome'), icon: Home },
    { to: '/farmer/token', label: t('navToken'), icon: QrCode, highlight: true },
    { to: '/farmer/payments', label: t('navPayments'), icon: CreditCard },
    { to: '/farmer/centres', label: t('navCentres'), icon: Building2 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-2 py-1 shadow-elevated">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/farmer'}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition ${
                  isActive
                    ? 'text-brand-800 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-full transition ${
                      item.highlight
                        ? isActive
                          ? 'bg-brand-800 text-white shadow-sm'
                          : 'bg-brand-100 text-brand-800'
                        : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive && !item.highlight ? 'text-brand-800' : ''}`} />
                  </div>
                  <span className="mt-0.5">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
