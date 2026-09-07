import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { farmerApi } from '../../services/farmerApi';
import { io } from 'socket.io-client';
import { ArrowLeft, Users, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const QueueScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const navigate = useNavigate();
  const { addToast } = useToast();

  const fetchDashboard = () => {
    farmerApi.getDashboard().then(res => {
      if (res?.success) {
        setData(res.data);
      }
      setLoading(false);
      setLastUpdated(new Date());
    }).catch(() => {
      setLoading(false);
      setIsConnected(false);
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (data?.todayAction?.centreId && data?.todayAction?.scheduledDate) {
      const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 2000
      });
      
      socket.on('connect', () => {
        setIsConnected(true);
        socket.emit('joinQueueRoom', { 
          centreId: data.todayAction.centreId, 
          date: data.todayAction.scheduledDate 
        });
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('queueUpdate', ({ currentToken: ct }) => {
        setCurrentToken(ct);
        setLastUpdated(new Date());
      });
      
      return () => socket.disconnect();
    }
  }, [data]);

  // Smart notification logic
  useEffect(() => {
    if (currentToken !== null && data?.todayAction) {
      const myTokenNumMatch = data.todayAction.tokenNumber?.match(/\d+/);
      const myTokenNumber = myTokenNumMatch ? parseInt(myTokenNumMatch[0]) : 0;
      
      const ahead = myTokenNumber - currentToken;
      
      if (ahead === 2) {
        addToast('Your turn is approaching! Please be ready near the gate.', 'warning');
      } else if (ahead === 0) {
        addToast('It is your turn! Please proceed to the procurement area.', 'success');
      }
    }
  }, [currentToken, data]);

  if (loading) {
    return <div className="p-6 text-center text-slate-500 font-bold animate-pulse">Loading live queue...</div>;
  }

  const todayAction = data?.todayAction?.status !== 'COMPLETED' ? data?.todayAction : null;

  if (!todayAction) {
    return (
      <div className="max-w-md mx-auto space-y-6 pb-24 px-4 pt-6 text-center">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-black text-slate-900">No Active Queue</h2>
        <p className="text-slate-500 font-bold">You don't have any appointments today.</p>
        <button onClick={() => navigate('/farmer')} className="w-full bg-brand-600 text-white font-black py-4 rounded-xl mt-6">
          Back to Home
        </button>
      </div>
    );
  }

  const myTokenNumMatch = todayAction.tokenNumber?.match(/\d+/);
  const myTokenNumber = myTokenNumMatch ? parseInt(myTokenNumMatch[0]) : 0;
  
  const displayCurrentToken = currentToken !== null ? currentToken : myTokenNumber > 0 ? myTokenNumber - 1 : 0; // fallback
  const peopleAhead = Math.max(0, myTokenNumber - displayCurrentToken);
  const estimatedWaitMins = peopleAhead * 6; // assume 6 mins per farmer
  
  let statusText = "WAITING";
  let statusColor = "bg-amber-100 text-amber-700 border-amber-200";
  let instructionText = "Please remain available. We'll notify you when your turn approaches.";

  if (peopleAhead === 0) {
    statusText = "YOUR TURN";
    statusColor = "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse";
    instructionText = "Please proceed to the procurement counter immediately.";
  } else if (peopleAhead <= 2) {
    statusText = "APPROACHING";
    statusColor = "bg-brand-100 text-brand-700 border-brand-200";
    instructionText = "Please be ready near the gate.";
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <Link to="/farmer" className="inline-flex items-center gap-2 font-black text-slate-900 hover:text-brand-700">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <span className="text-sm text-brand-700 font-black tracking-wider uppercase">Live Queue</span>
        </div>
      </div>

      {!isConnected && (
        <div className="bg-rose-500 text-white p-2 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-inner">
          <AlertCircle className="w-4 h-4" />
          You're offline. Showing last updated information.
        </div>
      )}

      <div className="p-4 flex-1 space-y-4">
        
        {/* Main Token Display */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-100 rounded-full blur-3xl"></div>
          
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest relative z-10">Your Token</span>
          <h1 className="text-6xl font-black text-brand-600 font-mono tracking-wider my-2 relative z-10">
            {todayAction.tokenNumber}
          </h1>
          
          <div className={`mt-6 inline-block px-4 py-1.5 rounded-full border-2 text-sm font-black tracking-widest relative z-10 ${statusColor}`}>
            {statusText}
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
            <Users className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <span className="text-3xl font-black text-slate-900 block leading-none mb-1">{peopleAhead}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">People Ahead</span>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
            <Clock className="w-6 h-6 text-brand-500 mx-auto mb-2" />
            <span className="text-3xl font-black text-slate-900 block leading-none mb-1">{estimatedWaitMins}m</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estimated Wait</span>
          </div>
        </div>

        {/* Now Serving */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-sm flex items-center justify-between text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-500/20 rounded-full blur-xl"></div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Now Serving</span>
            <span className="text-3xl font-black font-mono">#{displayCurrentToken}</span>
          </div>
          {isConnected && (
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">Live</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-brand-50 rounded-2xl p-5 border-2 border-brand-100 mt-6">
          <h3 className="font-black text-brand-900 mb-1">Instructions</h3>
          <p className="text-brand-700 font-medium text-sm leading-relaxed">
            {instructionText}
          </p>
        </div>

        {/* Last Updated Timestamp */}
        <div className="text-center pt-4">
          <span className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

      </div>
    </div>
  );
};
