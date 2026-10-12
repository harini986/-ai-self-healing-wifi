import React from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck, Activity, Zap } from 'lucide-react';

export default function AiIntelligenceSection({
  status = 'Monitoring',
  currentAnalysis = 'No abnormal network behavior detected.',
  confidence = 96,
  anomalyScore = 0.04
}) {
  const isOptimal = status === 'Monitoring' || status === 'Nominal';

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
      {/* Gentle pastel gradient ambient backdrop */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pastel-lavender-200/50 via-pastel-blue-100/30 to-transparent rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100/90">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pastel-lavender-500 to-pastel-blue-400 p-[1.5px] shadow-pastel flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-pastel-lavender-600 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                  AI Network Intelligence
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pastel-lavender-100 text-pastel-lavender-700">
                  Real-time
                </span>
              </div>
              <p className="text-xs text-slate-500">Autonomous pattern inference & root-cause diagnostic</p>
            </div>
          </div>

          {/* AI Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-soft">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOptimal ? 'bg-pastel-mint-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOptimal ? 'bg-pastel-mint-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="text-xs">
              <span className="text-slate-500">AI Status: </span>
              <strong className={isOptimal ? 'text-pastel-mint-700 font-bold' : 'text-amber-700 font-bold'}>
                {status}
              </strong>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Analysis & Insights (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pastel-lavender-50/60 via-white to-pastel-blue-50/50 border border-pastel-lavender-100 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-semibold text-pastel-lavender-700 mb-1.5">
                <Sparkles className="w-4 h-4 text-pastel-lavender-600" />
                <span>Current Inference Analysis</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                "{currentAnalysis}"
              </p>
              <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-500">
                <span>Model: <strong className="text-slate-700 font-semibold">AutoEncoder-LSTM v2.4</strong></span>
                <span>•</span>
                <span>Latency overhead: <strong className="text-slate-700 font-semibold">0.4ms</strong></span>
              </div>
            </div>

            {/* Confidence & Anomaly Score Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-soft">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Confidence Level</span>
                  <span className="font-bold text-pastel-lavender-700">{confidence}%</span>
                </div>
                {/* Confidence Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">High predictive certainty</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-soft">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Anomaly Risk Index</span>
                  <span className="font-bold text-pastel-mint-700">Low ({(anomalyScore * 100).toFixed(0)}%)</span>
                </div>
                {/* Risk Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pastel-mint-400 to-pastel-mint-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(anomalyScore * 100, 4)}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Within nominal safety threshold</span>
              </div>
            </div>
          </div>

          {/* Right: Abstract AI Network Visual (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[280px] h-[160px] bg-gradient-to-b from-pastel-lavender-50/50 to-pastel-blue-50/30 rounded-2xl border border-pastel-lavender-100/70 p-3 flex items-center justify-center overflow-hidden">
              {/* Subtle animated background grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7E5CEF_1px,transparent_1px)] [background-size:12px_12px]"></div>

              {/* Central AI Core Node */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Outer breathing pulse rings */}
                  <div className="absolute -inset-2 rounded-full bg-pastel-lavender-300/40 animate-pulse-gentle"></div>
                  <div className="absolute -inset-4 rounded-full bg-pastel-blue-200/30 animate-ping opacity-40"></div>
                  
                  {/* Center Node */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pastel-lavender-600 to-pastel-blue-500 text-white flex items-center justify-center shadow-pastel-glow relative z-10">
                    <Cpu className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-700 mt-2">Neural Net Core</span>
                <span className="text-[9px] text-pastel-lavender-600 font-semibold uppercase tracking-wider">
                  Continuous Telemetry
                </span>
              </div>

              {/* Orbiting Satellite Nodes */}
              <div className="absolute top-4 left-6 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-lg border border-slate-100 shadow-soft text-[10px] font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-pastel-lavender-500 animate-pulse"></span>
                <span>Latency Node</span>
              </div>

              <div className="absolute bottom-4 right-6 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-lg border border-slate-100 shadow-soft text-[10px] font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-pastel-mint-500 animate-pulse"></span>
                <span>QoS Buffer</span>
              </div>

              <div className="absolute top-5 right-6 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-lg border border-slate-100 shadow-soft text-[10px] font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-pastel-blue-500 animate-pulse"></span>
                <span>RF Signal</span>
              </div>

              {/* Connecting SVG lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 160">
                <line x1="70" y1="25" x2="140" y2="70" stroke="#C0B0FB" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="210" y1="28" x2="140" y2="70" stroke="#8FBDF2" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="210" y1="135" x2="140" y2="85" stroke="#64CDA4" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
