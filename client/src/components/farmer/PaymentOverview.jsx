import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { CheckCircle2, Clock, Landmark, ArrowUpRight, Shield, FileText } from 'lucide-react';

export const PaymentOverview = ({ payment }) => {
  if (!payment) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">
            YOUR PAYMENT STATUS
          </span>
          <h3 className="text-xl font-black text-slate-900">
            ₹{payment.totalAmount?.toLocaleString('en-IN')}
          </h3>
        </div>
        <StatusBadge status={payment.status} />
      </div>

      {/* Quintals x MSP breakdown */}
      <div className="bg-paper-50 rounded-lg p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <span className="text-xs text-slate-500 block">Crop & Quantity</span>
          <span className="font-bold text-slate-900">{payment.cropName} ({payment.quantityQuintals} Quintal)</span>
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Govt. MSP Rate</span>
          <span className="font-bold text-brand-800">₹{payment.mspPerQuintal?.toLocaleString('en-IN')} / Quintal</span>
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Bank Account</span>
          <span className="font-bold text-slate-900 flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-slate-500" />
            {payment.maskedAccount}
          </span>
        </div>
      </div>

      {/* Reference info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div>
          <span className="text-slate-500">Reference / UTR ID: </span>
          <span className="font-mono font-bold text-slate-800">{payment.utrReference}</span>
        </div>
        <div>
          <span className="text-slate-500">Initiated: </span>
          <span className="font-semibold text-slate-800">{payment.initiatedAt}</span>
        </div>
      </div>

      {/* Bank Settlement Timeline */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Direct Benefit Transfer (DBT) Lifecycle
        </h4>
        <div className="space-y-3">
          {payment.timeline?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  item.done
                    ? 'bg-emerald-600 text-white'
                    : item.active
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {item.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 flex items-center justify-between text-xs">
                <span className={`font-semibold ${item.done || item.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {item.label}
                </span>
                <span className="text-slate-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-emerald-800 font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          PFMS Direct Transfer Verified
        </span>
        <button
          onClick={() => window.open('/api/documents/download/doc_1', '_blank')}
          className="text-brand-800 font-bold hover:underline flex items-center gap-1"
        >
          View J-Form Receipt
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
