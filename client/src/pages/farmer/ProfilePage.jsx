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
    <div className="max-w-md mx-auto space-y-6 pb-24 px-2">
      
      {/* Profile Header (Premium Floating Card) */}
      <div className="relative bg-gradient-to-b from-brand-600 to-brand-900 rounded-[32px] p-6 pt-10 text-center shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)] overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-white p-1 shadow-xl mb-4 transform -rotate-3 hover:rotate-0 transition-all duration-300">
            <div className="w-full h-full rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 font-black text-4xl border border-brand-100">
              {formData.name ? formData.name[0].toUpperCase() : 'F'}
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white mb-1 tracking-tight">{formData.name || 'Farmer Name'}</h2>
          <div className="flex items-center justify-center gap-2 text-brand-200 text-sm font-semibold mb-4">
            <Phone className="w-4 h-4" />
            +91 {user?.mobile || user?.phone || '9876543210'}
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Aadhaar Verified
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-2 pt-2">
        <h3 className="font-black text-slate-900 text-lg">My Details</h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition"
        >
          {isEditing ? 'Cancel Edit' : <><Edit3 className="w-3.5 h-3.5"/> Edit Info</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Editable Block */}
        <div className="premium-card p-5 space-y-4">
          <div>
            <label className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className={`w-full bg-transparent border-b-2 py-1 text-base font-black text-slate-900 outline-none transition-colors ${
                isEditing ? 'border-brand-500' : 'border-slate-100'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Village / Address</label>
            <input 
              type="text" 
              name="village"
              value={formData.village}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className={`w-full bg-transparent border-b-2 py-1 text-base font-black text-slate-900 outline-none transition-colors ${
                isEditing ? 'border-brand-500' : 'border-slate-100'
              }`}
            />
          </div>

          {isEditing && (
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-2xl font-black text-sm transition-all hover-lift shadow-lg shadow-brand-500/30"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Read-Only Verified Blocks */}
        <div className="premium-card p-5 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-brand-500" /> District & State
          </span>
          <span className="font-black text-slate-900 text-base block">Faridabad, Haryana</span>
          <span className="text-emerald-600 text-xs font-bold block">System Linked</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="premium-card p-5">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-2">
              <FileCheck className="w-3.5 h-3.5 text-brand-500" /> Verified Land
            </span>
            <span className="font-black text-slate-900 text-sm block mb-1">2.5 Acres</span>
            <span className="text-slate-500 text-[10px] font-bold">Fard: HR-FBD-8841</span>
          </div>

          <div className="premium-card p-5">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-2">
              <Landmark className="w-3.5 h-3.5 text-brand-500" /> DBT Bank
            </span>
            <span className="font-black text-slate-900 text-sm block mb-1">SBI A/C</span>
            <span className="text-slate-500 text-[10px] font-bold block">XXXX 4812</span>
          </div>
        </div>
      </form>

    </div>
  );
};
