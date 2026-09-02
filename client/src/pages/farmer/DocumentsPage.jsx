import React, { useEffect, useState } from 'react';
import { farmerApi } from '../../services/farmerApi';
import { FileText, Download, ShieldCheck, Printer } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    farmerApi.getDocuments().then(res => {
      if (res?.success) {
        setDocuments(res.documents || []);
      }
      setLoading(false);
    });
  }, []);

  const handleDownload = (doc) => {
    window.open(`/api/documents/download/${doc.id}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-safe-nav">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Digital Document Center</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Access and print official J-Forms, Token Passes, Receipts, and verified land records.
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-slate-500">Loading document center...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center font-bold border border-brand-200">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                      <span className="text-xs font-mono text-slate-500 block">{doc.docNumber}</span>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>

                <div className="bg-paper-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 my-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issued For:</span>
                    <span className="font-bold text-slate-800">{doc.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Details:</span>
                    <span className="font-bold text-brand-900">{doc.crop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount / Status:</span>
                    <span className="font-bold text-slate-900">{doc.amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  View & Print Official PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
