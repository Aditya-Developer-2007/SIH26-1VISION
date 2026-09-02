import React, { useEffect, useState } from 'react';
import { CropJourneyTimeline } from '../../components/farmer/CropJourneyTimeline';
import { farmerApi } from '../../services/farmerApi';
import { ArrowLeft, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CropJourneyPage = () => {
  const [journeySteps, setJourneySteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setJourneySteps(res.journeySteps || []);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-safe-nav">
      <div className="flex items-center justify-between">
        <Link to="/farmer" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Full Procurement Transparency</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-900">Your Crop Journey</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Step-by-step transparency from registration and Mandi weighment to final DBT bank credit.
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500">Loading timeline...</div>
      ) : (
        <CropJourneyTimeline steps={journeySteps} />
      )}
    </div>
  );
};
