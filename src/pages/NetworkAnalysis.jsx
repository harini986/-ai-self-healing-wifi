import React, { useState, useMemo } from 'react';
import {
  Search,
  Network,
  Activity,
  AlertTriangle,
  Brain,
  Filter,
  ArrowRight,
  Router as RouterIcon,
  Laptop,
  Smartphone,
  Tv,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../services/api';

export default function NetworkAnalysis() {
  const [searchIP, setSearchIP] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNode, setActiveNode] = useState(null);

  const analysisEvents = [
    { id: 1, type: 'latency', ip: '192.168.1.1', device: 'Router Gateway', metric: '184 ms spike', anomalyScore: 0.82, cause: 'Channel 6 cross-talk & bufferbloat', action: 'Dynamic DFS migration applied', status: 'Mitigated' },
    { id: 2, type: 'loss', ip: '192.168.1.11', device: 'iPhone 15 Pro', metric: '4.2% drop', anomalyScore: 0.44, cause: 'Multipath signal fading behind masonry partition', action: 'Beamforming antenna re-steer', status: 'Mitigated' },
    { id: 3, type: 'traffic', ip: '192.168.1.15', device: 'Samsung QLED TV', metric: 'High 4K stream burst', anomalyScore: 0.18, cause: 'Normal high-throughput media session', action: 'Prioritized high bandwidth QoS queue', status: 'Nominal' },
    { id: 4, type: 'iot', ip: '192.168.1.22', device: 'Nest Sensor', metric: 'Periodic keepalive jitter', anomalyScore: 0.12, cause: '2.4GHz power-save polling interval', action: 'DTIM interval kept at 3', status: 'Nominal' },
  ];

  const filteredEvents = useMemo(() => {
    return analysisEvents.filter(ev => {
      const matchIP = !searchIP || ev.ip.includes(searchIP) || ev.device.toLowerCase().includes(searchIP.toLowerCase());
      const matchCat = selectedCategory === 'all' || ev.type === selectedCategory;
      return matchIP && matchCat;
    });
  }, [searchIP, selectedCategory]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-blue-100/80 border border-pastel-blue-200/60 text-pastel-blue-700 text-xs font-semibold mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>Deep Packet & Heuristic Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Network Analysis
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Investigate network behaviour and identify abnormal patterns with AI anomaly diagnostics.
            </p>
          </div>

          {/* Quick Search Inputs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search IP or Device..."
                value={searchIP}
                onChange={(e) => setSearchIP(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-lavender-200 text-slate-800 placeholder:text-slate-400 shadow-soft"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              {['all', 'latency', 'loss', 'traffic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                    selectedCategory === cat ? 'bg-white text-pastel-lavender-700 shadow-soft font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Network Relationship Graph */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
              <Brain className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Network Relationship & Anomaly Topology Graph
              </h3>
              <p className="text-xs text-slate-500">Interactive correlation map: Core Router ⟷ Devices ⟷ IP Clusters ⟷ Anomalies</p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-pastel-lavender-700 bg-pastel-lavender-50 px-3 py-1 rounded-full border border-pastel-lavender-200/60">
            Interactive Node Map
          </span>
        </div>

        {/* Visual Graph Canvas / Nodes */}
        <div className="mt-6 relative h-[320px] bg-gradient-to-b from-pastel-lavender-50/30 via-white to-pastel-blue-50/20 rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#7E5CEF_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* SVG connecting paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Center Router to Left Devices */}
            <path d="M 50% 50% Q 30% 30% 18% 25%" fill="none" stroke="#C0B0FB" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-line" />
            <path d="M 50% 50% Q 30% 70% 18% 75%" fill="none" stroke="#8FBDF2" strokeWidth="2" strokeDasharray="4 4" />
            {/* Center Router to Right Events */}
            <path d="M 50% 50% Q 70% 30% 82% 25%" fill="none" stroke="#64CDA4" strokeWidth="2" />
            <path d="M 50% 50% Q 70% 70% 82% 75%" fill="none" stroke="#FFAA66" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Center Hub: Router 192.168.1.1 */}
          <div
            onClick={() => setActiveNode({ title: 'Core Router & Gateway', ip: '192.168.1.1', desc: 'Central routing cluster. AI inference agent running locally on firmware.' })}
            className="relative z-10 p-4 rounded-2xl bg-white border-2 border-pastel-lavender-300 shadow-pastel-lg cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pastel-lavender-500 to-pastel-blue-500 text-white flex items-center justify-center shadow-pastel">
              <RouterIcon className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2">Core Gateway</span>
            <span className="text-[10px] font-mono text-pastel-lavender-600 font-semibold">192.168.1.1</span>
            <span className="mt-1 text-[9px] px-1.5 py-0.5 rounded-full bg-pastel-mint-100 text-pastel-mint-700 font-bold">
              AI Monitored
            </span>
          </div>

          {/* Node 1: Left Top - MacBook Pro */}
          <div
            onClick={() => setActiveNode({ title: 'MacBook Pro 16"', ip: '192.168.1.10', desc: 'Stable Wi-Fi 6 association on 5GHz. Zero packet drops in past 24h.' })}
            className="absolute top-8 left-8 sm:left-16 p-3 rounded-2xl bg-white/95 border border-pastel-lavender-200 shadow-soft cursor-pointer hover:scale-105 transition-transform flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">MacBook Pro</p>
              <p className="text-[10px] font-mono text-slate-400">192.168.1.10</p>
            </div>
          </div>

          {/* Node 2: Left Bottom - iPhone 15 */}
          <div
            onClick={() => setActiveNode({ title: 'iPhone 15 Pro', ip: '192.168.1.11', desc: 'Recently experienced minor RSSI dip. Re-aligned with beamforming.' })}
            className="absolute bottom-8 left-8 sm:left-16 p-3 rounded-2xl bg-white/95 border border-pastel-blue-200 shadow-soft cursor-pointer hover:scale-105 transition-transform flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-pastel-blue-100 text-pastel-blue-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">iPhone 15 Pro</p>
              <p className="text-[10px] font-mono text-slate-400">192.168.1.11</p>
            </div>
          </div>

          {/* Node 3: Right Top - Self-Healing Event */}
          <div
            onClick={() => setActiveNode({ title: 'Channel Hop Event', ip: 'AP-East (5GHz)', desc: 'Autonomous frequency hop executed from Ch 6 to Ch 36 to alleviate interference.' })}
            className="absolute top-8 right-8 sm:right-16 p-3 rounded-2xl bg-white/95 border border-pastel-mint-200 shadow-soft cursor-pointer hover:scale-105 transition-transform flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">DFS Channel 36</p>
              <p className="text-[10px] font-medium text-pastel-mint-600">Self-Healed Event</p>
            </div>
          </div>

          {/* Node 4: Right Bottom - QoS Event */}
          <div
            onClick={() => setActiveNode({ title: 'Bufferbloat Mitigation', ip: 'Queue-01', desc: 'FQ-CoDel active queue management re-weighted to prioritize real-time traffic.' })}
            className="absolute bottom-8 right-8 sm:right-16 p-3 rounded-2xl bg-white/95 border border-pastel-peach-200 shadow-soft cursor-pointer hover:scale-105 transition-transform flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-pastel-peach-100 text-pastel-peach-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Adaptive QoS</p>
              <p className="text-[10px] font-medium text-amber-600">Queue Re-balanced</p>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        {activeNode && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pastel-lavender-50/80 via-white to-pastel-blue-50/50 border border-pastel-lavender-200 flex items-center justify-between animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{activeNode.title} • <span className="font-mono text-pastel-lavender-700">{activeNode.ip}</span></p>
                <p className="text-xs text-slate-500 mt-0.5">{activeNode.desc}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-1"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Network Anomaly & AI Diagnosis Table */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">
              Correlated Network Events & AI Diagnoses
            </h3>
            <span className="text-xs text-slate-400">({filteredEvents.length} items)</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Real-time inference mapping symptoms to root causes and autonomous recovery.</p>
        </div>

        <div className="mt-4 space-y-3">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-pastel-lavender-200 hover:shadow-pastel transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    ev.anomalyScore > 0.5 ? 'bg-pastel-peach-100 text-amber-600' : 'bg-pastel-mint-100 text-pastel-mint-600'
                  }`}>
                    {ev.anomalyScore > 0.5 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{ev.device}</span>
                      <span className="text-[11px] font-mono text-slate-400">({ev.ip})</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ev.anomalyScore > 0.5 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-pastel-mint-50 text-pastel-mint-700 border border-pastel-mint-200'
                      }`}>
                        Anomaly Risk: {(ev.anomalyScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Symptom: <span className="font-normal text-slate-600">{ev.metric}</span>
                    </p>
                    <p className="text-xs font-semibold text-pastel-lavender-700 mt-0.5">
                      AI Diagnosis: <span className="font-normal text-slate-600">{ev.cause}</span>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                  <span className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 mb-1">
                    {ev.action}
                  </span>
                  <span className="text-[11px] font-bold text-pastel-mint-600 flex sm:justify-end items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ev.status}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
