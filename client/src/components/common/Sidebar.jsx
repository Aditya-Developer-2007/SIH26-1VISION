import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, QrCode, CreditCard, Building2, Bell, MessageSquare, 
  User, LayoutDashboard, Users, LogOut, CheckSquare, Settings
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (user?.role) {
      case 'FARMER':
        return [
          { to: "/farmer", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
          { to: "/farmer/register-crop", icon: <CheckSquare className="w-5 h-5" />, label: "Register Crop" },
          { to: "/farmer/token", icon: <QrCode className="w-5 h-5" />, label: "Tokens" },
          { to: "/farmer/payments", icon: <CreditCard className="w-5 h-5" />, label: "Earnings" },
          { to: "/farmer/centres", icon: <Building2 className="w-5 h-5" />, label: "Centres" },
          { to: "/farmer/notifications", icon: <Bell className="w-5 h-5" />, label: "Alerts" },
          { to: "/farmer/grievances", icon: <MessageSquare className="w-5 h-5" />, label: "Help" },
          { to: "/farmer/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
        ];
      case 'OFFICER':
        return [
          { to: "/officer", icon: <LayoutDashboard className="w-5 h-5" />, label: "Procurement Desk" }
        ];
      case 'ADMIN':
        return [
          { to: "/admin", icon: <LayoutDashboard className="w-5 h-5" />, label: "System Overview" }
        ];
      default:
        return [];
    }
  };

  const links = getNavLinks();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-black text-xl">A</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">AgroCure</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{user?.role} PORTAL</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/farmer' || link.to === '/officer' || link.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-slate-50">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
            <p className="text-xs font-semibold text-slate-500 truncate">{user?.mobile || user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
