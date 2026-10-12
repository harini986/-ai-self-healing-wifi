import React from 'react';
import {
  ShieldCheck,
  AlertCircle,
  Search,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SelfHealingActivity({ timeline = [], recoveryStatus = 'Recovery Successful' }) {
  // Default steps if none passed
  const displayTimeline = timeline.length > 0 ? timeline : [
    { id: 1, time: '10:42 AM', step: 'High latency detected', type: 'detect' },
    { id: 2, time: '10:42 AM', step: 'Root cause analysis started', type: 'analyze' },
    { id: 3, time: '10:43 AM', step: 'Network route optimized', type: 'recover' },
    { id: 4, time: '10:43 AM', step: 'Connection restored', type: 'restore' },
  ];

  const getStepIcon = (type, isSuccess) => {
    switch (type) {
      case 'detect':
        return {
          icon: AlertCircle,
          color: 'text-amber-600 bg-amber-50 border-amber-200/80',
          dotColor: 'bg-amber-400'
        };
      case 'analyze':
        return {
          icon: Search,
          color: 'text-pastel-lavender-600 bg-pastel-lavender-50 border-pastel-lavender-200/80',
          dotColor: 'bg-pastel-lavender-400'
        };
      case 'recover':
      case 'restore':
        return {
          icon: Zap,
          color: 'text-pastel-blue-600 bg-pastel-blue-50 border-pastel-blue-200/80',
          dotColor: 'bg-pastel-blue-400'
        };
      case 'verify':
      default:
        return {
          icon: CheckCircle2,
          color: 'text-pastel-mint-600 bg-pastel-mint-50 border-pastel-mint-200/80',
          dotColor: 'bg-pastel-mint-400'
        };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pastel-mint-100/90 text-pastel-mint-600 flex items-center justify-center border border-pastel-mint-200/60 shadow-soft">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                Self-Healing Activity
              </h3>
              <p className="text-xs text-slate-500">Autonomous issue detection & automated remediation</p>
            </div>
          </div>

          <Link
            to="/self-healing"
            className="flex items-center gap-1 text-xs font-semibold text-pastel-lavender-700 hover:text-pastel-lavender-900 group"
          >
            <span>Healing Center</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Timeline List */}
        <div className="mt-5 space-y-4 relative pl-3">
          {/* Vertical subtle connector line */}
          <div className="absolute top-2 bottom-2 left-6 w-[2px] bg-gradient-to-b from-amber-200 via-pastel-lavender-200 to-pastel-mint-300"></div>

          {displayTimeline.map((item, index) => {
            const style = getStepIcon(item.type, item.success);
            const IconComponent = style.icon;

            return (
              <div key={item.id || index} className="relative flex items-start gap-4 group">
                {/* Node icon pill */}
                <div className={`relative z-10 w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 shadow-soft transition-transform group-hover:scale-110 ${style.color}`}>
                  <IconComponent className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900">
                      {item.step}
                    </p>
                    <span className="text-[11px] font-mono font-medium text-slate-400 shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {item.type === 'detect' && 'Telemetry threshold variance triggered anomaly alert.'}
                    {item.type === 'analyze' && 'Automated isolation identified congested RF carrier.'}
                    {item.type === 'recover' && 'Seamless DFS channel switch without client disruption.'}
                    {item.type === 'restore' && 'Jitter drop verified, latency restored to baseline.'}
                    {item.type === 'verify' && 'Closed-loop verification confirmed network healthy.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Status Celebration Banner */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pastel-mint-50/90 via-white to-pastel-mint-50/60 border border-pastel-mint-200/70 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pastel-mint-500 text-white flex items-center justify-center shadow-pastel-mint">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold text-pastel-mint-800 block">
                ✓ {recoveryStatus}
              </span>
              <span className="text-[10px] text-pastel-mint-600 font-medium">
                Autonomous self-repair cycle completed in 1.4s
              </span>
            </div>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-lg bg-pastel-mint-100 text-pastel-mint-700">
            Validated
          </span>
        </div>
      </div>
    </div>
  );
}
