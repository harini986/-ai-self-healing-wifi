import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatusCard({
  title,
  mainValue,
  status,
  subtext,
  icon: Icon,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  accent = 'lavender' // 'lavender' | 'blue' | 'mint' | 'peach'
}) {
  // Pastel accent styles
  const accentStyles = {
    lavender: {
      bg: 'bg-pastel-lavender-50/70',
      border: 'border-pastel-lavender-200/60',
      iconBg: 'bg-pastel-lavender-100 text-pastel-lavender-600',
      badge: 'bg-pastel-lavender-100/80 text-pastel-lavender-700',
      strip: 'bg-pastel-lavender-400'
    },
    blue: {
      bg: 'bg-pastel-blue-50/70',
      border: 'border-pastel-blue-200/60',
      iconBg: 'bg-pastel-blue-100 text-pastel-blue-600',
      badge: 'bg-pastel-blue-100/80 text-pastel-blue-700',
      strip: 'bg-pastel-blue-400'
    },
    mint: {
      bg: 'bg-pastel-mint-50/70',
      border: 'border-pastel-mint-200/60',
      iconBg: 'bg-pastel-mint-100 text-pastel-mint-600',
      badge: 'bg-pastel-mint-100/80 text-pastel-mint-700',
      strip: 'bg-pastel-mint-400'
    },
    peach: {
      bg: 'bg-pastel-peach-50/70',
      border: 'border-pastel-peach-200/60',
      iconBg: 'bg-pastel-peach-100 text-pastel-peach-600',
      badge: 'bg-pastel-peach-100/80 text-pastel-peach-700',
      strip: 'bg-pastel-peach-400'
    }
  };

  const currentTheme = accentStyles[accent] || accentStyles.lavender;

  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Subtle pastel accent strip on left edge */}
      <div className={`absolute top-0 left-0 w-1 h-full ${currentTheme.strip} opacity-70`}></div>

      {/* Top Header: Icon + Title + Status Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl ${currentTheme.iconBg} flex items-center justify-center shrink-0`}>
            {Icon && <Icon className="w-4 h-4 stroke-[2.2]" />}
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
        </div>

        {status && (
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${currentTheme.badge} border border-white/50`}>
            {status}
          </span>
        )}
      </div>

      {/* Middle: Main Value */}
      <div className="mt-4 mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            {mainValue}
          </span>
          {subtext && (
            <span className="text-xs text-slate-400 font-medium">{subtext}</span>
          )}
        </div>
      </div>

      {/* Bottom: Trend Indicator */}
      {trend && (
        <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-medium">
            {trendType === 'positive' && (
              <span className="text-pastel-mint-600 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" />
              </span>
            )}
            {trendType === 'negative' && (
              <span className="text-pastel-rose-500 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            )}
            {trendType === 'neutral' && (
              <span className="text-slate-400 flex items-center">
                <Minus className="w-3.5 h-3.5" />
              </span>
            )}
            <span className={trendType === 'positive' ? 'text-pastel-mint-700' : trendType === 'negative' ? 'text-rose-600' : 'text-slate-500'}>
              {trend}
            </span>
          </div>

          <span className="text-[10px] text-slate-400">vs 1h avg</span>
        </div>
      )}
    </div>
  );
}
