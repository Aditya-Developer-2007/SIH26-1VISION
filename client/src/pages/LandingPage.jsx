import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, QrCode, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Building2, ChevronRight } from 'lucide-react';

export const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col font-sans overflow-x-hidden">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/30">
              <Sprout className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 block leading-none tracking-tight">
                Agro<span className="text-brand-600">Cure</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-1 block">
                SIH 2026 • 1Vision
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:block text-sm font-bold text-slate-600 hover:text-brand-700 transition hover-lift"
            >
              Farmer Login
            </Link>
            <Link
              to="/farmer"
              className="bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover-lift"
            >
              Open App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Premium Light) */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 px-4 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-brand-200/50 rounded-full blur-[100px]"></div>
          <div className="absolute top-20 left-0 w-72 h-72 bg-emerald-200/50 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-300/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-xs font-black text-brand-800 px-4 py-1.5 rounded-full mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            THE PROCUREMENT EXPERIENCE LAYER
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            From Uncertainty to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500 pb-2">
              Complete Visibility.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Plan your procurement visit, track your crop, manage your digital token, and follow your bank payment — from one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Link
              to="/farmer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-[0_10px_30px_-10px_rgba(22,163,74,0.4)] transition-all duration-300 hover-lift active-press"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg px-8 py-4 rounded-2xl border border-slate-200 transition-all shadow-sm hover-lift"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* Live Interactive Token Preview Card */}
      <section className="max-w-5xl mx-auto px-4 pb-24 relative z-20 -mt-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] border border-white p-6 md:p-10 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div>
              <span className="text-[10px] text-brand-600 font-black uppercase tracking-[0.2em] block mb-1">
                Live Tracking Demo
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ramesh's Procurement</h3>
            </div>
            <div className="bg-emerald-50 text-emerald-700 font-black text-xs px-4 py-2 rounded-full border border-emerald-200 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Token AGRO-2048 Confirmed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper-50 p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md hover:border-brand-200 group">
              <div className="mb-4 text-brand-400 group-hover:text-brand-600 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-black tracking-wider mb-1">Scheduled Slot</span>
                <span className="text-lg font-black text-slate-900 block leading-tight">Tomorrow, 10:00 AM</span>
                <span className="text-sm text-slate-500 font-medium mt-1 block">Mandi Bhawan, Sector 12</span>
              </div>
            </div>

            <div className="bg-paper-50 p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md hover:border-brand-200 group">
              <div className="mb-4 text-brand-400 group-hover:text-brand-600 transition-colors">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-black tracking-wider mb-1">Crop Yield</span>
                <span className="text-lg font-black text-slate-900 block leading-tight">18.5 Quintal (Wheat)</span>
                <span className="text-sm font-bold text-emerald-600 mt-1 block">Est: ₹44,862.50</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="mb-4 text-brand-200">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-brand-200 block uppercase font-black tracking-wider mb-1">Payment Status</span>
                <span className="text-lg font-black block leading-tight text-white">Payment Initiated</span>
                <span className="text-xs font-semibold text-brand-100 mt-2 block bg-white/20 px-2 py-1 rounded inline-block">DBT → SBI XXXX 4812</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="how-it-works" className="py-24 bg-white px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Transparent Process.
            </h2>
            <p className="text-slate-600 text-lg mt-4 max-w-xl mx-auto font-medium">
              We eliminated the guesswork. Follow your crop from registration to final bank credit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Registration', desc: 'Verify Aadhaar & revenue land records securely' },
              { num: '02', title: 'Token Generated', desc: 'Receive a digital QR pass (AGRO Token)' },
              { num: '03', title: 'Slot Scheduled', desc: 'Book exact time slot at nearby Mandi' },
              { num: '04', title: 'Gate Verification', desc: 'Scan QR pass at mandi entry seamlessly' },
              { num: '05', title: 'Quality Check', desc: 'Moisture check & grade classification' },
              { num: '06', title: 'Weighment', desc: 'Digital scale weight & J-Form issue' },
              { num: '07', title: 'Payment Initiated', desc: 'DBT direct benefit pipeline starts' },
              { num: '08', title: 'Bank Credit', desc: 'Confirmed bank credit via SMS/app' }
            ].map((step, idx) => (
              <div key={idx} className="bg-paper-50 p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-black text-lg mb-4">
                  {step.num}
                </span>
                <h4 className="font-black text-slate-900 text-base mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-4 text-center border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="w-12 h-12 bg-white/5 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <Sprout className="w-6 h-6 text-brand-400" />
          </div>
          <div className="font-bold text-white text-base mb-2">AgroCure</div>
          <div className="text-xs font-semibold tracking-widest uppercase opacity-50 mb-8">
            Smart India Hackathon 2026 • Team 1Vision
          </div>
          <p className="text-sm max-w-md mx-auto text-slate-500">
            Building the next generation of transparent agricultural procurement systems.
          </p>
        </div>
      </footer>
    </div>
  );
};
