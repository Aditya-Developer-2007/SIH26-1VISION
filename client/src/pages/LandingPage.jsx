import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, QrCode, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Building2, ChevronRight } from 'lucide-react';

export const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center text-white font-bold">
              <Sprout className="w-6 h-6 text-brand-200" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 block leading-tight">
                Agro<span className="text-brand-700">Cure</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">
                SIH 2026 | Team 1Vison
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-brand-800 px-3 py-2"
            >
              Farmer Login
            </Link>
            <Link
              to="/farmer"
              className="bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 max-w-5xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 border border-brand-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          FARMER-CENTRIC PROCUREMENT EXPERIENCE LAYER
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          From Procurement Uncertainty <br className="hidden sm:inline" />
          to <span className="text-brand-800 underline decoration-brand-400 decoration-wavy">Complete Visibility.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium">
          Plan your procurement visit, track your crop, manage your digital token, and follow your bank payment — all from one clear, transparent platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/farmer"
            className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-base px-6 py-3 rounded-lg shadow-elevated transition"
          >
            {t('checkProcurement')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-6 py-3 rounded-lg border border-slate-300 transition"
          >
            {t('howItWorks')}
          </a>
        </div>
      </section>

      {/* Live Interactive Token Preview Card */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl border-2 border-brand-800 p-6 md:p-8 shadow-elevated">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs text-brand-800 font-bold uppercase tracking-wider block">
                TOKEN-TO-PAYMENT VISIBILITY
              </span>
              <h3 className="text-xl font-bold text-slate-900">Ramesh Kumar’s Active Procurement</h3>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
              Token AGRO-2048 Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-medium">Scheduled Slot</span>
                <span className="text-base font-bold text-slate-900 block mt-1">Tomorrow, 10:00 AM</span>
                <span className="text-xs text-slate-600 block mt-0.5">Mandi Bhawan, Sector 12</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-4">✓ Aadhaar & Land Record Verified</span>
            </div>

            <div className="bg-paper-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-medium">Wheat Yield</span>
                <span className="text-base font-bold text-brand-900 block mt-1">18.5 Quintal</span>
                <span className="text-xs text-slate-600 block mt-0.5">MSP: ₹2,425 / Quintal</span>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-4 block">Est. Payout: ₹44,862.50</span>
            </div>

            <div className="bg-brand-900 text-white p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs text-brand-300 block uppercase font-medium">Current Status</span>
                <span className="text-base font-bold block mt-1">Payment Initiated</span>
                <span className="text-xs text-brand-200 block mt-0.5">Ref: UTR992810482026</span>
              </div>
              <span className="text-[11px] text-emerald-300 font-semibold block mt-4">DBT Pipeline → SBI XXXX 4812</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="how-it-works" className="py-16 bg-white border-t border-slate-200 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The 8-Stage Transparent Crop Journey
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Know your crop. Know your procurement. Know your payment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Registration', desc: 'Verify Aadhaar & revenue land records' },
              { num: '02', title: 'Token Generated', desc: 'Receive unique AGRO digital token pass' },
              { num: '03', title: 'Slot Scheduled', desc: 'Book exact time slot at nearby Mandi' },
              { num: '04', title: 'Gate Verification', desc: 'Scan QR pass at mandi entry' },
              { num: '05', title: 'Quality Inspection', desc: 'Moisture check & grade classification' },
              { num: '06', title: 'Weighment & Slip', desc: 'Digital scale weight & J-Form issue' },
              { num: '07', title: 'Payment Initiated', desc: 'DBT direct benefit pipeline' },
              { num: '08', title: 'Bank Credit', desc: 'Confirmed bank credit via SMS/app' }
            ].map((step, idx) => (
              <div key={idx} className="p-4 bg-paper-50 rounded-xl border border-slate-200">
                <span className="text-xs font-black text-brand-700 bg-brand-100 px-2 py-0.5 rounded">
                  {step.num}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 px-4 text-xs text-center border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white text-sm">AgroCure</strong> — Smart India Hackathon 2026 | Team 1Vison
          </div>
          <div>
            Curing the gaps in agricultural procurement.
          </div>
        </div>
      </footer>
    </div>
  );
};
