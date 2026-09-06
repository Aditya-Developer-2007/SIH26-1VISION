import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Phone, MapPin, Landmark, ShieldCheck, FileCheck, Save, Edit3 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    village: 'Village Khedi Kalan'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Profile updated successfully!', 'success');
      setIsEditing(false);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Farmer Profile & Land Records</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Verified agricultural identity and DBT bank account configuration.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-6">
        
        {/* User Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-900 font-black text-xl flex items-center justify-center border-2 border-brand-300 shadow-sm">
              {formData.name ? formData.name[0].toUpperCase() : 'F'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{formData.name || 'Farmer Name'}</h2>
              <span className="text-xs text-slate-500 block font-medium">+91 {user?.mobile || user?.phone || '9876543210'}</span>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-emerald-200">
                Aadhaar & Revenue Department Verified
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition border border-brand-200"
          >
            {isEditing ? 'Cancel Edit' : <><Edit3 className="w-3.5 h-3.5"/> Edit Profile</>}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Editable Fields */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 col-span-1 sm:col-span-2 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center justify-between">
                Basic Information
                <button 
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="sm:hidden text-brand-700 underline text-xs"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={`w-full p-2.5 rounded-lg border text-sm font-semibold text-slate-900 transition-colors ${
                      isEditing ? 'border-brand-300 focus:ring-2 focus:ring-brand-500 bg-white outline-none' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Mobile Number (Verified)</label>
                  <input 
                    type="text" 
                    value={user?.mobile || user?.phone || '9876543210'}
                    disabled
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 font-medium mb-1">Village / Address</label>
                  <input 
                    type="text" 
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={`w-full p-2.5 rounded-lg border text-sm font-semibold text-slate-900 transition-colors ${
                      isEditing ? 'border-brand-300 focus:ring-2 focus:ring-brand-500 bg-white outline-none' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Read-Only Verified Fields */}
            <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium block flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-700" />
                District & State
              </span>
              <span className="font-bold text-slate-900 text-sm block">Faridabad, Haryana</span>
              <span className="text-slate-600 block">System Linked</span>
            </div>

            <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium block flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-brand-700" />
                Verified Land Record (Fard)
              </span>
              <span className="font-bold text-slate-900 font-mono text-sm block">HR-FBD-2024-8841</span>
              <span className="text-slate-600 block">Total Cultivated Area: 2.5 Acres</span>
            </div>

            <div className="bg-paper-50 p-4 rounded-lg border border-slate-200 space-y-1 sm:col-span-2">
              <span className="text-slate-500 font-medium block flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-brand-700" />
                Direct Benefit Transfer (DBT) Bank Account
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">State Bank of India</span>
                  <span className="font-mono font-bold text-brand-900 block">Account Ending: XXXX XXXX 4812</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded border border-emerald-200 shadow-sm">
                  PFMS Active
                </span>
              </div>
            </div>

          </div>

          {isEditing && (
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-sm"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
