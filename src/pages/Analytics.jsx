import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Clock,
  Radio,
  Zap,
  Activity,
  Calendar,
  Layers,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');

  const recoveryBreakdown = [
    { type: 'Channel Hop (DFS)', count: 28, avgTime: '1.2s', success: '100%' },
    { type: 'QoS Queue Flush', count: 18, avgTime: '0.8s', success: '100%' },
    { type: 'Beamforming Re-tune', count: 11, avgTime: '1.6s', success: '100%' },
    { type: 'DNS Resolver Switch', count: 3, avgTime: '2.1s', success: '100%' },
  ];

  const weeklyReliability = [
    { day: 'Mon', reliability: 99.98, latency: 13.8 },
    { day: 'Tue', reliability: 99.94, latency: 14.5 },
    { day: 'Wed', reliability: 99.99, latency: 13.2 },
    { day: 'Thu', reliability: 99.92, latency: 15.1 },
    { day: 'Fri', reliability: 99.96, latency: 14.0 },
    { day: 'Sat', reliability: 99.97, latency: 13.6 },
    { day: 'Sun', reliability: 99.99, latency: 13.1 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender-100/80 border border-pastel-lavender-200/60 text-pastel-lavender-700 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Historical Network Performance Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Network Analytics & SLA
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Reliability metrics, mean time to recovery (MTTR), latency distribution, and anomaly counts.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs self-start sm:self-auto">
            {['24h', '7d', '30d', '90d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg uppercase font-semibold transition-all ${
                  timeframe === tf ? 'bg-white text-pastel-lavender-700 shadow-soft' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CORE 6 KPI CARDS SPECIFIED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Network Reliability */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Network Reliability</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-800">99.96%</span>
            <span className="text-xs text-pastel-mint-700 font-bold ml-2">Five 9s Target</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5 text-pastel-mint-600" />
            <span className="text-pastel-mint-700 font-medium">+0.04%</span> vs prior week
          </div>
        </div>

        {/* 2. Average Latency */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Latency</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-pastel-lavender-700">14.2 ms</span>
            <span className="text-xs text-slate-400 font-medium ml-2">95th %ile: 19ms</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5 text-pastel-mint-600" />
            <span className="text-pastel-mint-700 font-medium">-1.8 ms</span> lower than SLA
          </div>
        </div>

        {/* 3. Packet Loss */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Packet Loss</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-peach-100 text-amber-600 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-800">0.18%</span>
            <span className="text-xs text-pastel-mint-700 font-bold ml-2">Nominal</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <span className="text-pastel-mint-700 font-medium">Zero persistent dropouts</span>
          </div>
        </div>

        {/* 4. Downtime */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Network Downtime</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-blue-100 text-pastel-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-800">0.00%</span>
            <span className="text-xs text-slate-400 font-medium ml-2">Zero unplanned</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <span className="text-pastel-mint-700 font-medium">100% Mesh redundancy</span>
          </div>
        </div>

        {/* 5. Recovery Time (MTTR) */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recovery Time (MTTR)</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-pastel-lavender-700">1.4 sec</span>
            <span className="text-xs text-pastel-mint-700 font-bold ml-2">Automated</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <span className="text-slate-500">Autonomous vs 12m manual avg</span>
          </div>
        </div>

        {/* 6. Incidents Recorded */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Incidents</span>
            <div className="w-8 h-8 rounded-xl bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-800">5 Resolved</span>
            <span className="text-xs text-pastel-mint-700 font-bold ml-2">100% Auto</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1">
            <span className="text-pastel-mint-700 font-medium">All verified healed</span>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart: Daily Network Reliability */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Daily Reliability & Latency Distribution</h3>
            <p className="text-xs text-slate-500">Past 7 days uninterrupted operational performance</p>
          </div>
          <span className="text-xs font-bold text-pastel-lavender-700 bg-pastel-lavender-50 px-2.5 py-1 rounded-full border border-pastel-lavender-200">
            SLA Standard: &gt; 99.9%
          </span>
        </div>

        {/* Bar chart representation */}
        <div className="mt-6 grid grid-cols-7 gap-3 text-center">
          {weeklyReliability.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2 group">
              <span className="text-[11px] font-bold text-slate-700">{item.latency}ms</span>
              <div className="w-full max-w-[48px] h-36 bg-slate-100 rounded-2xl p-1 flex flex-col justify-end">
                <div
                  className="w-full bg-gradient-to-t from-pastel-lavender-500 to-pastel-blue-400 rounded-xl transition-all duration-500 group-hover:from-pastel-lavender-600 group-hover:to-pastel-blue-500"
                  style={{ height: `${((item.reliability - 99.8) / 0.2) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-600">{item.day}</span>
              <span className="text-[10px] text-pastel-mint-700 font-bold">{item.reliability}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Healing Actions Breakdown Table */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
          Autonomous Self-Healing Actions Distribution
        </h3>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3 pl-2">Remediation Policy</th>
                <th className="pb-3">Triggers This Period</th>
                <th className="pb-3">Average Execution Time</th>
                <th className="pb-3 pr-2 text-right">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recoveryBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-2 font-bold text-slate-800">{row.type}</td>
                  <td className="py-3 text-slate-600 font-medium">{row.count} times</td>
                  <td className="py-3 font-mono text-pastel-lavender-700 font-bold">{row.avgTime}</td>
                  <td className="py-3 pr-2 text-right font-bold text-pastel-mint-700">{row.success}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
