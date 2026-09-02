import React from 'react';
import { CheckCircle2, Download, X, IndianRupee, Printer } from 'lucide-react';

export const OfficerBillModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { procurement, payment } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden print:shadow-none print:w-full print:max-w-none">
        
        {/* Header */}
        <div className="bg-emerald-600 p-6 text-center relative print:bg-white print:text-black print:border-b">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-100 hover:text-white print:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm print:hidden">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          
          <h2 className="text-xl font-black text-white print:text-slate-900">Procurement Successful</h2>
          <p className="text-emerald-100 text-sm mt-1 print:text-slate-500">J-Form Issued & Payment Initiated</p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6 bg-slate-50 print:bg-white">
          
          {/* Main Info */}
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Payable Amount</span>
            <div className="text-4xl font-black text-slate-900 flex items-center justify-center gap-1">
              <IndianRupee className="w-8 h-8" />
              {payment?.estimatedAmount?.toLocaleString('en-IN') || procurement?.estimatedAmount?.toLocaleString('en-IN')}
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mt-2 border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Payment Initiated via DBT
            </span>
          </div>

          <hr className="border-dashed border-slate-300" />

          {/* Details */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Token No.</span>
              <span className="font-bold font-mono text-slate-900">{procurement?.tokenId?.tokenNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Farmer Name</span>
              <span className="font-bold text-slate-900">{procurement?.farmerId?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Crop</span>
              <span className="font-bold text-slate-900">{procurement?.cropId?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Accepted Quantity</span>
              <span className="font-bold text-slate-900">{procurement?.quantity} Quintals</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">MSP Rate</span>
              <span className="font-bold text-slate-900">₹{procurement?.cropId?.mspRate} / Q</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Procurement Centre</span>
              <span className="font-bold text-slate-900">{procurement?.centreId?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-bold text-slate-900">{new Date(payment?.initiatedAt || procurement?.updatedAt).toLocaleString()}</span>
            </div>
          </div>

          <hr className="border-dashed border-slate-300" />
          
          <p className="text-[10px] text-center text-slate-400">
            This is an auto-generated digital receipt. The payment has been initiated and will reflect in the farmer's linked bank account within 24-48 hours.
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex gap-3 print:hidden">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition text-sm text-center"
          >
            Done
          </button>
          <button 
            onClick={handlePrint}
            className="flex-1 px-4 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-lg transition text-sm flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
