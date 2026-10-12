import React from 'react';
import { ShieldCheck, Activity, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function HealthScore({ score = 98, status = 'Healthy', lastChecked = 'Just now' }) {
  // SVG calculations for a semi-circular / circular gauge
  // Circumference for r=70 is 2 * PI * 70 = ~439.8
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Let's use a 240-degree arc or full circular gauge with gap
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isHealthy = score >= 90;
  const isDegraded = score < 90 && score >= 70;

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
      {/* Decorative gentle pastel backdrop glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-pastel-lavender-200/40 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-44 h-44 bg-pastel-mint-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column: Heading and info */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender-100/80 border border-pastel-lavender-200/60 text-pastel-lavender-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pastel-lavender-600" />
            <span>AI Real-time Evaluation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Network Health Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md font-medium">
            AI-powered monitoring and self-healing for your Wi-Fi network.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-soft">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-pastel-mint-500' : isDegraded ? 'bg-amber-400' : 'bg-rose-400'} animate-pulse`}></span>
              <span>Status: <strong className="text-slate-800">{status}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-soft">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Last checked: <strong className="text-slate-700">{lastChecked}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-pastel-mint-50 px-3 py-1.5 rounded-xl border border-pastel-mint-200/60 text-pastel-mint-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-pastel-mint-600" />
              <span>Self-Healing Engine Arm</span>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Health Score Visualization */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG circular progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7E5CEF" />
                  <stop offset="50%" stopColor="#5F9EE8" />
                  <stop offset="100%" stopColor="#38B585" />
                </linearGradient>
                <linearGradient id="healthTrackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E9E4FE" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#E2F6EE" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-pastel-lavender-100"
                strokeWidth="12"
                fill="none"
              />

              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#healthGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                {score}%
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pastel-lavender-600 mt-0.5">
                Health Score
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {score >= 90 ? 'Optimal Network' : 'Degraded State'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
