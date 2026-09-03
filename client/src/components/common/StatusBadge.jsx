import React from 'react';
import { CheckCircle, Clock, AlertCircle, RefreshCw, Check } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const normalized = (status || '').toUpperCase();

  const configs = {
    CONFIRMED: { label: 'Confirmed', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    SCHEDULED: { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: Clock },
    COMPLETED: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    QUALITY_CHECK: { label: 'Quality Check', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', icon: RefreshCw },
    PROCURED: { label: 'Procured', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    PAYMENT_INITIATED: { label: 'Payment Initiated', bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', icon: RefreshCw },
    PAYMENT_RECEIVED: { label: 'Payment Received', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    CREDITED: { label: 'Credited', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    INITIATED: { label: 'Initiated', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: Clock },
    PENDING: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
    SUBMITTED: { label: 'Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
    RESOLVED: { label: 'Resolved', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', icon: CheckCircle },
    OPEN: { label: 'Open', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', icon: Check },
    EXPIRED: { label: 'Expired', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: AlertCircle }
  };

  const config = configs[normalized] || {
    label: status || 'Active',
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200',
    icon: Clock
  };

  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      <IconComponent className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};
