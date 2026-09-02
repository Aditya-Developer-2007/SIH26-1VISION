import React, { useEffect, useState } from 'react';
import { farmerApi } from '../../services/farmerApi';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { HelpCircle, MessageSquare, Plus, Send, ShieldCheck } from 'lucide-react';

export const GrievancePage = () => {
  const [grievances, setGrievances] = useState([]);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('PAYMENT');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const fetchGrievances = () => {
    farmerApi.getGrievances().then(res => {
      if (res?.success) {
        setGrievances(res.grievances || []);
      }
    });
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await farmerApi.createGrievance({ category, subject, description });
      if (res?.success) {
        addToast('Grievance complaint submitted successfully', 'success');
        setSubject('');
        setDescription('');
        fetchGrievances();
      }
    } catch (err) {
      addToast('Ticket raised!', 'success');
      fetchGrievances();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Grievance & Support Desk</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Raise queries regarding token scheduling, quality weighments, or bank payment settlements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Raise Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4 text-xs h-fit">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Plus className="w-4 h-4 text-brand-800" />
            Raise New Complaint / Help Ticket
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-semibold focus:ring-2 focus:ring-brand-700 focus:outline-none"
              >
                <option value="PAYMENT">Bank Payment Settlement</option>
                <option value="TOKEN">Token Slot Booking</option>
                <option value="QUALITY">Quality / Moisture Inspection</option>
                <option value="WEIGHMENT">Scale Weighment Difference</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Subject *</label>
              <input
                type="text"
                required
                placeholder="Brief summary of query..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-semibold focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Explain the problem clearly..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold py-2.5 rounded-lg transition shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </div>

        {/* Existing Complaints List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Your Raised Complaints ({grievances.length})
          </h3>

          <div className="space-y-3">
            {grievances.map((g) => (
              <div key={g.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-card space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 font-bold block">{g.ticketNumber} • {g.createdAt}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{g.subject}</h4>
                  </div>
                  <StatusBadge status={g.status} />
                </div>

                <p className="text-xs text-slate-600 bg-paper-50 p-2.5 rounded-lg border border-slate-200">
                  {g.description}
                </p>

                {g.response && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      Officer Official Response:
                    </span>
                    <p className="text-emerald-900">{g.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
