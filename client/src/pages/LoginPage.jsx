import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Sprout, Phone, Lock, ArrowRight, ShieldCheck, Languages } from 'lucide-react';

export const LoginPage = () => {
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [selectedRole, setSelectedRole] = useState('FARMER');
  const { loginWithPhone } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      addToast('Enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep(2);
    addToast('OTP sent! Use demo OTP: 123456', 'info');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const res = await loginWithPhone(phone, otp, selectedRole);
    if (res?.success) {
      addToast('Authenticated successfully', 'success');
      if (selectedRole === 'OFFICER') navigate('/officer');
      else if (selectedRole === 'ADMIN') navigate('/admin');
      else navigate('/farmer');
    }
  };

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-brand-800 rounded-2xl text-white flex items-center justify-center mx-auto mb-3 shadow-card">
          <Sprout className="w-8 h-8 text-brand-200" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">AgroCure</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          From Procurement Uncertainty to Complete Visibility
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated p-6 sm:p-8 max-w-md w-full">
        {/* Role Toggle Selector */}
        <div className="mb-6 bg-slate-100 p-1 rounded-lg flex items-center justify-between text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedRole('FARMER')}
            className={`flex-1 py-1.5 rounded transition text-center ${
              selectedRole === 'FARMER' ? 'bg-brand-800 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Farmer Login
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('OFFICER')}
            className={`flex-1 py-1.5 rounded transition text-center ${
              selectedRole === 'OFFICER' ? 'bg-brand-800 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Officer
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('ADMIN')}
            className={`flex-1 py-1.5 rounded transition text-center ${
              selectedRole === 'ADMIN' ? 'bg-brand-800 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-xs font-bold text-slate-400 border-r pr-2 border-slate-300">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-4 py-2.5 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white"
                  placeholder="Enter 10-digit number"
                />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center justify-between">
              <span className="font-semibold">Demo Mobile: 9876543210</span>
              <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded font-bold">SIH DEMO</span>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-800 hover:bg-brand-900 text-white font-bold py-3 rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              Get Verification OTP
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Enter 6-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-brand-800 hover:underline font-semibold"
                >
                  Change Number
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-black py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white"
                placeholder="123456"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-center justify-between">
              <span className="font-semibold">Use Demo OTP Code: 123456</span>
              <ShieldCheck className="w-4 h-4 text-amber-700" />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-800 hover:bg-brand-900 text-white font-bold py-3 rounded-lg text-sm transition shadow-sm"
            >
              Verify & Enter Dashboard
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-slate-900 font-semibold">
            <Languages className="w-3.5 h-3.5" />
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <span>AgroCure SIH 2026</span>
        </div>
      </div>
    </div>
  );
};
