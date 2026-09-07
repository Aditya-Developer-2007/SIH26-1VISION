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
  const { login } = useAuth();
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
    try {
      const res = await login({ mobile: phone, password: 'password123' });
      if (res?.role) {
        addToast('Authenticated successfully', 'success');
        if (res.role === 'OFFICER') navigate('/officer');
        else if (res.role === 'ADMIN') navigate('/admin');
        else navigate('/farmer');
      }
    } catch (error) {
       const msg = error.response?.data?.message || error.message || 'Authentication failed';
       addToast(msg, 'error');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center p-4 overflow-hidden bg-paper-50">
      {/* Light Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-brand-300/30 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-emerald-300/20 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-brand-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      {/* Language Switcher at Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 px-4 py-2 rounded-full border border-slate-200 font-bold transition-all duration-300 shadow-sm hover-lift"
        >
          <Languages className="w-5 h-5 text-brand-600" />
          <span className="text-xs uppercase tracking-widest">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>
      </div>

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10 mt-12 md:mt-0">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-600 to-brand-800 rounded-[28px] text-white flex items-center justify-center mx-auto mb-6 shadow-[0_10px_30px_rgba(22,163,74,0.3)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="w-full h-full rounded-[24px] bg-white/10 flex items-center justify-center border border-white/20">
            <Sprout className="w-10 h-10 text-white drop-shadow-md" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
          Agro<span className="text-brand-600">Cure</span>
        </h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em]">
          Smart Agricultural Network
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-md w-full relative z-10 border border-slate-100 shadow-xl">
        
        {/* Role Toggle Selector */}
        <div className="mb-8 bg-slate-50 p-1.5 rounded-2xl flex items-center justify-between text-xs font-bold border border-slate-100">
          {['FARMER', 'OFFICER', 'ADMIN'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setSelectedRole(role);
                setStep(1);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all duration-300 text-center ${
                selectedRole === role 
                  ? 'bg-brand-600 text-white shadow-[0_4px_12px_rgba(22,163,74,0.3)] scale-100' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white scale-95'
              }`}
            >
              {role === 'FARMER' ? 'Farmer' : role === 'OFFICER' ? 'Officer' : 'Admin'}
            </button>
          ))}
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            {selectedRole === 'FARMER' ? (
              // Enhanced Farmer View
              <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-center text-3xl font-black py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-500 focus:bg-white focus:outline-none bg-slate-50 text-slate-900 transition-all placeholder:text-slate-300"
                    placeholder="9876543210"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-black text-xl py-4 rounded-2xl shadow-[0_10px_30px_-10px_rgba(22,163,74,0.4)] transition-all duration-300 hover-lift active-press"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              // Officer/Admin View
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 pr-3 border-r border-slate-200">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-16 pr-4 py-3.5 text-lg font-bold text-slate-900 rounded-xl border border-slate-200 focus:border-brand-500 focus:bg-white focus:outline-none bg-slate-50 transition-all placeholder:text-slate-300"
                      placeholder="Enter 10-digit number"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-bold text-emerald-700 text-xs">Demo Number: 9876543210</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover-lift"
                >
                  Get Verification OTP
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Enter 6-Digit OTP
              </label>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[10px] font-bold uppercase tracking-wider text-brand-600 hover:text-brand-800 transition-colors"
              >
                Change Number
              </button>
            </div>

            {selectedRole === 'FARMER' ? (
              <div className="space-y-8 text-center">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-[0.3em] text-4xl font-black py-4 rounded-2xl border-2 border-brand-500 bg-brand-50 text-brand-700 focus:bg-white focus:outline-none transition-all shadow-sm"
                  placeholder="123456"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-black text-xl py-4 rounded-2xl shadow-[0_10px_30px_-10px_rgba(22,163,74,0.4)] transition-all duration-300 hover-lift active-press"
                >
                  Verify & Enter
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-[0.5em] text-2xl font-black py-3.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:bg-white focus:outline-none bg-slate-50 text-slate-900 transition-all placeholder:text-slate-300"
                  placeholder="123456"
                />

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-bold text-amber-700 text-xs">Use Demo OTP: 123456</span>
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl text-sm transition-all shadow-sm hover-lift active-press"
                >
                  Verify Authenticity
                </button>
              </div>
            )}
          </form>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span>AgroCure © 2026</span>
        </div>
      </div>
    </div>
  );
};
