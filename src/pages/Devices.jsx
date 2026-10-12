import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import {
  Laptop,
  Smartphone,
  Tv,
  Cpu,
  Monitor,
  Search,
  Wifi,
  Signal,
  CheckCircle2,
  ArrowUpDown,
  SlidersHorizontal,
  Zap,
  RotateCw,
  Sparkles
} from 'lucide-react';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [connectionFilter, setConnectionFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    api.getDevices().then(setDevices);
  }, []);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop':
        return Laptop;
      case 'mobile':
        return Smartphone;
      case 'smart-tv':
        return Tv;
      case 'workstation':
        return Monitor;
      case 'iot':
      default:
        return Cpu;
    }
  };

  const getSignalBadge = (signal) => {
    if (signal.includes('Optimal') || signal.includes('Strong')) {
      return {
        badge: 'bg-pastel-mint-50 text-pastel-mint-700 border-pastel-mint-200/80',
        dot: 'bg-pastel-mint-500',
        text: 'Strong'
      };
    }
    if (signal.includes('Good')) {
      return {
        badge: 'bg-pastel-blue-50 text-pastel-blue-700 border-pastel-blue-200/80',
        dot: 'bg-pastel-blue-500',
        text: 'Good'
      };
    }
    return {
      badge: 'bg-pastel-peach-50 text-amber-700 border-pastel-peach-200/80',
      dot: 'bg-amber-400',
      text: 'Moderate'
    };
  };

  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.ip.includes(searchTerm) ||
        d.mac.toLowerCase().includes(searchTerm.toLowerCase());
      const matchConn = connectionFilter === 'all' || d.connection.toLowerCase().includes(connectionFilter.toLowerCase());
      return matchSearch && matchConn;
    });
  }, [devices, searchTerm, connectionFilter]);

  const handlePrioritize = (devName) => {
    setActionMessage(`High-priority QoS band allocated for ${devName}`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with Stats */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender-100/80 border border-pastel-lavender-200/60 text-pastel-lavender-700 text-xs font-semibold mb-2">
              <Wifi className="w-3.5 h-3.5" />
              <span>Network Topology Endpoints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Connected Devices
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Real-time wireless inventory, signal quality, latency telemetry, and QoS bandwidth control.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search device name, IP, MAC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-lavender-200 text-slate-800 placeholder:text-slate-400 shadow-soft"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              {['all', 'wi-fi 6', 'wi-fi 5', 'wi-fi 4', 'ethernet'].map((conn) => (
                <button
                  key={conn}
                  onClick={() => setConnectionFilter(conn)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                    connectionFilter === conn ? 'bg-white text-pastel-lavender-700 shadow-soft font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {conn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action toast */}
        {actionMessage && (
          <div className="mt-4 p-3 rounded-xl bg-pastel-mint-50 border border-pastel-mint-200 text-pastel-mint-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-pastel-mint-600" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Quick Device Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Connected</span>
            <span className="text-xl font-extrabold text-slate-800 block mt-0.5">{devices.length} Devices</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Latency</span>
            <span className="text-xl font-extrabold text-pastel-lavender-700 block mt-0.5">14.2 ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Channel Utilization</span>
            <span className="text-xl font-extrabold text-pastel-mint-700 block mt-0.5">24% (Optimal)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Mesh Nodes</span>
            <span className="text-xl font-extrabold text-pastel-blue-700 block mt-0.5">2 APs Synced</span>
          </div>
        </div>
      </div>

      {/* Main Devices Table */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3.5 pl-2">Device Name</th>
                <th className="pb-3.5">IP Address</th>
                <th className="pb-3.5">Connection</th>
                <th className="pb-3.5">Signal Quality</th>
                <th className="pb-3.5">Latency</th>
                <th className="pb-3.5">Throughput</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredDevices.map((dev) => {
                const IconComponent = getDeviceIcon(dev.type);
                const sig = getSignalBadge(dev.signal);

                return (
                  <tr key={dev.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Device Name */}
                    <td className="py-4 pl-2 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-pastel-lavender-50 border border-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-xs group-hover:text-pastel-lavender-700 transition-colors">
                            {dev.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{dev.mac}</p>
                        </div>
                      </div>
                    </td>

                    {/* IP */}
                    <td className="py-4 font-mono text-slate-600 text-xs whitespace-nowrap">
                      {dev.ip}
                    </td>

                    {/* Connection */}
                    <td className="py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {dev.connection}
                      </span>
                    </td>

                    {/* Signal */}
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${sig.dot}`}></span>
                        <span className="font-medium text-slate-700 text-xs">{dev.signal}</span>
                      </div>
                    </td>

                    {/* Latency */}
                    <td className="py-4 font-bold text-slate-800 text-xs whitespace-nowrap">
                      <span className={dev.latency > 25 ? 'text-amber-600' : 'text-pastel-mint-700'}>
                        {dev.latency} ms
                      </span>
                    </td>

                    {/* Throughput */}
                    <td className="py-4 text-slate-500 text-xs whitespace-nowrap">
                      {dev.bandwidth}
                    </td>

                    {/* Status */}
                    <td className="py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pastel-mint-700 bg-pastel-mint-50 px-2.5 py-0.5 rounded-full border border-pastel-mint-200/60">
                        <CheckCircle2 className="w-3 h-3 text-pastel-mint-600" />
                        <span>{dev.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-2 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePrioritize(dev.name)}
                          title="Prioritize QoS Bandwidth"
                          className="px-2.5 py-1 rounded-lg bg-pastel-lavender-50 hover:bg-pastel-lavender-100 text-pastel-lavender-700 font-semibold text-[11px] border border-pastel-lavender-200/60 transition-colors flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Boost</span>
                        </button>

                        <button
                          onClick={() => setSelectedDevice(dev)}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold text-[11px] border border-slate-200 transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Details Modal Drawer */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-pastel-lg border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{selectedDevice.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedDevice.ip}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">MAC Address:</span>
                <span className="font-mono font-bold text-slate-700">{selectedDevice.mac}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Wireless Standard:</span>
                <span className="font-bold text-slate-700">{selectedDevice.connection}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Signal Level:</span>
                <span className="font-bold text-pastel-mint-700">{selectedDevice.signal}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Telemetry Latency:</span>
                <span className="font-bold text-pastel-lavender-700">{selectedDevice.latency} ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Rx Data Received:</span>
                <span className="font-bold text-slate-700">{selectedDevice.rx}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Tx Data Transmitted:</span>
                <span className="font-bold text-slate-700">{selectedDevice.tx}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => { handlePrioritize(selectedDevice.name); setSelectedDevice(null); }}
                className="flex-1 py-2 rounded-xl bg-pastel-lavender-600 text-white font-bold text-xs shadow-pastel hover:bg-pastel-lavender-700 transition-colors"
              >
                Allocate High Priority QoS
              </button>
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
