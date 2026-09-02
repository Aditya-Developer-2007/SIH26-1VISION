import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import { ChevronRight, ArrowLeft, Building2, Users, FileText, IndianRupee } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const AdminDrilldownView = ({ centres }) => {
  const [level, setLevel] = useState(1); // 1: Centres, 2: Officers, 3: Details
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerDetails, setOfficerDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectCentre = async (centre) => {
    setSelectedCentre(centre);
    setLevel(2);
    setLoading(true);
    try {
      const res = await adminApi.getDrilldownOfficers(centre.id);
      if (res?.success) {
        setOfficers(res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectOfficer = async (officer) => {
    setSelectedOfficer(officer);
    setLevel(3);
    setLoading(true);
    try {
      const res = await adminApi.getDrilldownOfficerDetails(officer.id);
      if (res?.success) {
        setOfficerDetails(res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const goBack = () => {
    if (level === 3) {
      setLevel(2);
      setOfficerDetails(null);
    } else if (level === 2) {
      setLevel(1);
      setSelectedCentre(null);
      setOfficers([]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card min-h-[500px]">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-slate-600">
        <button 
          onClick={() => { setLevel(1); setSelectedCentre(null); setSelectedOfficer(null); }}
          className={`hover:text-brand-800 ${level === 1 ? 'text-brand-800' : ''}`}
        >
          Centres
        </button>
        {level > 1 && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button 
              onClick={() => { setLevel(2); setSelectedOfficer(null); }}
              className={`hover:text-brand-800 ${level === 2 ? 'text-brand-800' : ''}`}
            >
              {selectedCentre?.name} Officers
            </button>
          </>
        )}
        {level > 2 && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-brand-800">{selectedOfficer?.name}</span>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500">Loading data...</div>
      ) : (
        <>
          {/* LEVEL 1: CENTRES LIST */}
          {level === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
                Select Mandi to View Operations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {centres.map(centre => (
                  <div 
                    key={centre.id} 
                    onClick={() => handleSelectCentre(centre)}
                    className="p-4 bg-paper-50 rounded-lg border border-slate-200 cursor-pointer hover:border-brand-300 hover:shadow-sm transition group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-brand-100 transition">
                        <Building2 className="w-5 h-5 text-slate-500 group-hover:text-brand-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{centre.name}</h4>
                        <span className="text-xs text-slate-500">{centre.address}</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Queue</span>
                        <span className="font-bold text-slate-900 text-sm">{centre.queueCount}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 2: OFFICERS LIST */}
          {level === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={goBack} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                    Assigned Officers
                  </h3>
                  <p className="text-xs text-slate-500">{selectedCentre?.name}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {officers.length === 0 ? (
                  <div className="text-center p-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    No officers assigned to this centre.
                  </div>
                ) : (
                  officers.map(officer => (
                    <div 
                      key={officer.id} 
                      onClick={() => handleSelectOfficer(officer)}
                      className="p-4 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-brand-300 hover:shadow-sm transition group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-brand-100 transition">
                          <Users className="w-5 h-5 text-indigo-500 group-hover:text-brand-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{officer.name}</h4>
                          <span className="text-xs text-slate-500">{officer.mobile}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-8 text-right">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Farmers Processed</span>
                          <span className="font-bold text-slate-900">{officer.farmersProcessed}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Procured Qty</span>
                          <span className="font-bold text-slate-900">{officer.totalQuantityProcured} Q</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Total Payout</span>
                          <span className="font-bold text-emerald-700">₹{officer.totalPayoutAmount?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600 ml-4" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* LEVEL 3: OFFICER DETAILS & PROCUREMENTS */}
          {level === 3 && officerDetails && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <button onClick={goBack} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {officerDetails.officer.name}
                    </h3>
                    <p className="text-xs text-slate-500">{officerDetails.officer.mobile} | {officerDetails.officer.centres}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Transactions</span>
                  <span className="font-black text-xl text-brand-800">{officerDetails.procurements.length}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Procurement Log
                </h4>
                
                <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Token</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Farmer</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Crop</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Quantity</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Amount</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Date</th>
                        <th className="px-4 py-3 font-semibold text-xs uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {officerDetails.procurements.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-slate-500 italic bg-slate-50">
                            No procurements processed yet.
                          </td>
                        </tr>
                      ) : (
                        officerDetails.procurements.map((proc) => (
                          <tr key={proc.id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-slate-700 text-xs">{proc.token}</td>
                            <td className="px-4 py-3 font-semibold text-slate-900">{proc.farmerName}</td>
                            <td className="px-4 py-3 text-slate-600">{proc.cropName}</td>
                            <td className="px-4 py-3 font-bold text-slate-800">{proc.quantity} Q</td>
                            <td className="px-4 py-3 font-bold text-emerald-700">₹{proc.amount?.toLocaleString('en-IN')}</td>
                            <td className="px-4 py-3 text-slate-500 text-xs">{new Date(proc.date).toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <StatusBadge status={proc.status} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
