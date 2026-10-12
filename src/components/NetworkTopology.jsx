import React, { useState } from 'react';
import {
  Globe,
  Router as RouterIcon,
  Wifi,
  Laptop,
  Smartphone,
  Tv,
  Cpu,
  CheckCircle2,
  Activity,
  Layers
} from 'lucide-react';

export default function NetworkTopology() {
  const [selectedNode, setSelectedNode] = useState(null);

  const devices = [
    { id: 'dev-laptop', name: 'Laptop', model: 'MacBook Pro', ip: '192.168.1.10', ping: '12 ms', type: 'laptop', icon: Laptop, color: 'lavender' },
    { id: 'dev-mobile', name: 'Mobile', model: 'iPhone 15', ip: '192.168.1.11', ping: '18 ms', type: 'mobile', icon: Smartphone, color: 'blue' },
    { id: 'dev-tv', name: 'Smart TV', model: 'Samsung QLED', ip: '192.168.1.15', ping: '15 ms', type: 'tv', icon: Tv, color: 'mint' },
    { id: 'dev-iot', name: 'IoT Device', model: 'Nest Sensor', ip: '192.168.1.22', ping: '26 ms', type: 'iot', icon: Cpu, color: 'peach' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'lavender':
        return 'bg-pastel-lavender-50 border-pastel-lavender-200 text-pastel-lavender-700';
      case 'blue':
        return 'bg-pastel-blue-50 border-pastel-blue-200 text-pastel-blue-700';
      case 'mint':
        return 'bg-pastel-mint-50 border-pastel-mint-200 text-pastel-mint-700';
      case 'peach':
        return 'bg-pastel-peach-50 border-pastel-peach-200 text-pastel-peach-700';
      default:
        return 'bg-white border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-pastel-blue-100/90 text-pastel-blue-600 flex items-center justify-center border border-pastel-blue-200/60 shadow-soft">
            <Layers className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Network Topology
            </h3>
            <p className="text-xs text-slate-500">Live physical & wireless routing mesh diagram</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint-50 text-pastel-mint-700 border border-pastel-mint-200/60 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-pastel-mint-500 animate-pulse"></span>
          <span>Mesh Synchronized</span>
        </span>
      </div>

      {/* Visual Diagram Area */}
      <div className="mt-6 flex flex-col items-center select-none">
        {/* Tier 1: Internet Gateway */}
        <div
          onClick={() => setSelectedNode({ name: 'Fiber WAN Gateway', ip: 'Public IP', status: 'Optimal', throughput: '940 Mbps / 880 Mbps' })}
          className="cursor-pointer group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/80 shadow-soft hover:shadow-pastel-md hover:border-pastel-blue-300 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-xl bg-pastel-blue-100 text-pastel-blue-600 flex items-center justify-center">
            <Globe className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Internet WAN</span>
            <span className="text-[10px] text-slate-400 font-medium">Fiber Gigabit • 18ms</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-pastel-mint-500"></span>
        </div>

        {/* Connector 1 */}
        <div className="h-6 w-[2px] bg-gradient-to-b from-pastel-blue-200 to-pastel-lavender-300 relative my-0.5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pastel-lavender-500 animate-ping"></div>
        </div>

        {/* Tier 2: Router */}
        <div
          onClick={() => setSelectedNode({ name: 'Core Router Gateway', ip: '192.168.1.1', status: 'Online', latency: '3 ms', cpu: '14% CPU' })}
          className="cursor-pointer group flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-pastel-lavender-50/80 via-white to-pastel-lavender-50/60 border border-pastel-lavender-200 shadow-soft hover:shadow-pastel-md hover:border-pastel-lavender-400 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center">
            <RouterIcon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">WiHeal Gateway Router</span>
            <span className="text-[10px] text-pastel-lavender-700 font-medium">192.168.1.1 • Latency: 3ms</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-lavender-100 text-pastel-lavender-700">
            Primary
          </span>
        </div>

        {/* Connector 2 */}
        <div className="h-6 w-[2px] bg-gradient-to-b from-pastel-lavender-300 to-pastel-mint-300 relative my-0.5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pastel-mint-500 animate-ping"></div>
        </div>

        {/* Tier 3: Access Point */}
        <div
          onClick={() => setSelectedNode({ name: 'Access Point (Mesh Hub)', ip: '192.168.1.2', status: 'Optimal', channel: 'Ch 36 (5GHz)', clients: '7 Connected' })}
          className="cursor-pointer group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/80 shadow-soft hover:shadow-pastel-md hover:border-pastel-mint-300 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-xl bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center">
            <Wifi className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Access Point (AP-01)</span>
            <span className="text-[10px] text-pastel-mint-700 font-medium">Wi-Fi 6 Mesh • Ch 36</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-pastel-mint-500"></span>
        </div>

        {/* Connector 3: Branching Tree Line */}
        <div className="w-full max-w-lg mt-2 relative">
          {/* Horizontal branch line */}
          <div className="h-[2px] w-[82%] mx-auto bg-slate-200"></div>

          {/* Vertical drops to devices */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2">
            {devices.map((device) => {
              const DeviceIcon = device.icon;
              return (
                <div
                  key={device.id}
                  onClick={() => setSelectedNode(device)}
                  className="cursor-pointer group flex flex-col items-center p-2.5 rounded-2xl bg-white border border-slate-100 shadow-soft hover:shadow-pastel hover:border-slate-300 transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${getColorClasses(device.color)}`}>
                    <DeviceIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-pastel-lavender-700">
                    {device.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {device.ping}
                  </span>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pastel-mint-500"></span>
                    <span className="text-[9px] text-slate-500 font-medium">Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail drawer when a node is clicked */}
      {selectedNode && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/70 p-3 rounded-xl animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-pastel-lavender-600" />
            <span className="font-bold text-slate-800">{selectedNode.name || selectedNode.model}</span>
            <span className="text-slate-400">({selectedNode.ip})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-pastel-mint-700 font-semibold">{selectedNode.ping || selectedNode.status || 'Active'}</span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
