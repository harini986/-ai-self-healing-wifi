import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Wifi,
  Router as RouterIcon,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function NetworkMonitor() {
  const [livePings, setLivePings] = useState([
    { id: 1, target: 'Gateway 192.168.1.1', latency: 3.1, jitter: 0.4, status: 'Optimal' },
    { id: 2, target: 'Primary DNS 1.1.1.1', latency: 14.8, jitter: 1.1, status: 'Optimal' },
    { id: 3, target: 'Backup DNS 8.8.8.8', latency: 16.2, jitter: 1.3, status: 'Optimal' },
    { id: 4, target: 'Cloudflare Edge POP', latency: 17.5, jitter: 0.9, status: 'Optimal' },
    { id: 5, target: 'AP-East Corridor', latency: 4.2, jitter: 0.5, status: 'Optimal' },
  ]);

  const [downloadSpeed, setDownloadSpeed] = useState(384.6);
  const [uploadSpeed, setUploadSpeed] = useState(88.2);

  // Gentle live telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePings((prev) =>
        prev.map((item) => ({
          ...item,
          latency: Number((item.latency + (Math.random() * 0.8 - 0.4)).toFixed(1)),
          jitter: Number(Math.max(0.2, item.jitter + (Math.random() * 0.2 - 0.1)).toFixed(1))
        }))
      );
      setDownloadSpeed(Number((380 + Math.random() * 12).toFixed(1)));
      setUploadSpeed(Number((86 + Math.random() * 5).toFixed(1)));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const channels24 = [
    { ch: 'Ch 1', load: 45, current: false },
    { ch: 'Ch 2', load: 30, current: false },
    { ch: 'Ch 6', load: 78, current: false, congested: true },
    { ch: 'Ch 9', load: 20, current: false },
    { ch: 'Ch 11', load: 35, current: true },
  ];

  const channels50 = [
    { ch: 'Ch 36', load: 15, current: true, clean: true },
    { ch: 'Ch 40', load: 22, current: false },
    { ch: 'Ch 44', load: 28, current: false },
    { ch: 'Ch 48', load: 31, current: false },
    { ch: 'Ch 52 (DFS)', load: 8, current: false, clean: true },
    { ch: 'Ch 149', load: 62, current: false },
    { ch: 'Ch 157', load: 40, current: false },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-blue-100/80 border border-pastel-blue-200/60 text-pastel-blue-700 text-xs font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Spectrum & RF Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Network Monitor
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Live RF spectrum load, continuous multi-hop latency probes, and bandwidth throughput telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pastel-mint-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pastel-mint-500"></span>
            </span>
            <span className="text-xs font-bold text-pastel-mint-700">Polling at 2 Hz</span>
          </div>
        </div>
      </div>

      {/* Real-time Bandwidth Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-pastel-blue-100 text-pastel-blue-600 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Download Speed</span>
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{downloadSpeed} <span className="text-xs font-semibold text-slate-400">Mbps</span></span>
            <span className="text-[10px] text-pastel-mint-600 font-bold block">WAN Bandwidth 94%</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
            <ArrowUp className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Upload Speed</span>
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{uploadSpeed} <span className="text-xs font-semibold text-slate-400">Mbps</span></span>
            <span className="text-[10px] text-pastel-mint-600 font-bold block">Bufferbloat Free (Grade A)</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center">
            <Radio className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Carrier Spectrum</span>
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">80 <span className="text-xs font-semibold text-slate-400">MHz</span></span>
            <span className="text-[10px] text-pastel-mint-600 font-bold block">Channel 36 Non-DFS</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-pastel-peach-100 text-amber-600 flex items-center justify-center">
            <Zap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Jitter Variance</span>
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">0.8 <span className="text-xs font-semibold text-slate-400">ms</span></span>
            <span className="text-[10px] text-pastel-mint-600 font-bold block">Minimal Jitter</span>
          </div>
        </div>
      </div>

      {/* RF Channel Interference Spectrum Visualizer */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-pastel-lavender-600" />
            <h3 className="text-base font-bold text-slate-800">Wi-Fi Channel Allocation & Interference Map</h3>
          </div>
          <span className="text-xs font-bold text-pastel-mint-700 bg-pastel-mint-50 px-2.5 py-1 rounded-full border border-pastel-mint-200">
            Self-Healed: Ch 36 Active
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 5 GHz Band (Primary) */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">5 GHz Band (High Throughput)</span>
              <span className="text-[10px] text-slate-400">Channel Width: 80MHz</span>
            </div>
            <div className="space-y-2.5">
              {channels50.map((item) => (
                <div key={item.ch} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      {item.current && <span className="w-2 h-2 rounded-full bg-pastel-lavender-600"></span>}
                      <span className={item.current ? 'text-pastel-lavender-700 font-bold' : ''}>{item.ch}</span>
                    </span>
                    <span className="text-slate-400">{item.load}% load</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.current ? 'bg-gradient-to-r from-pastel-lavender-500 to-pastel-blue-500' : item.load > 60 ? 'bg-amber-400' : 'bg-slate-300'
                      }`}
                      style={{ width: `${item.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2.4 GHz Band (IoT & Legacy) */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">2.4 GHz Band (IoT & Extended Range)</span>
              <span className="text-[10px] text-slate-400">Channel Width: 20MHz</span>
            </div>
            <div className="space-y-2.5">
              {channels24.map((item) => (
                <div key={item.ch} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      {item.current && <span className="w-2 h-2 rounded-full bg-pastel-mint-600"></span>}
                      <span className={item.current ? 'text-pastel-mint-700 font-bold' : ''}>{item.ch}</span>
                      {item.congested && <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded font-bold">Congested</span>}
                    </span>
                    <span className="text-slate-400">{item.load}% load</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.current ? 'bg-gradient-to-r from-pastel-mint-400 to-pastel-mint-500' : item.congested ? 'bg-amber-400' : 'bg-slate-300'
                      }`}
                      style={{ width: `${item.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Probe Ticker */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Continuous Latency & Ping Ticker</h3>
            <p className="text-xs text-slate-500">Real-time ICMP and TCP SYN probe benchmarks</p>
          </div>
          <span className="text-xs font-semibold text-pastel-lavender-700 bg-pastel-lavender-50 px-2.5 py-1 rounded-full border border-pastel-lavender-200">
            5 Probes Active
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {livePings.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-pastel-lavender-50 text-pastel-lavender-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{p.target}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Jitter: ±{p.jitter} ms</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-extrabold text-pastel-lavender-700 font-mono">
                  {p.latency} ms
                </span>
                <span className="text-[11px] font-bold text-pastel-mint-700 bg-pastel-mint-50 px-2 py-0.5 rounded-full border border-pastel-mint-200">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
