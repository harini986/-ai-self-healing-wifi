import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';

export default function Navbar({ onMenuToggle, onOpenSimulator }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Self-Healing Event Succeeded',
      desc: 'Channel DFS hopped to 36, latency normalized to 3ms',
      time: '2m ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'New Device Registered',
      desc: 'MacBook Pro connected via Wi-Fi 6 (5GHz)',
      time: '14m ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Routine Latency Probe Complete',
      desc: 'All 8 mesh AP nodes responsive with <15ms latency',
      time: '42m ago',
      type: 'info'
    }
  ];

  const handleQuickSimulate = async () => {
    setIsSimulating(true);
    await api.triggerSelfHealingSimulation('latency');
    setIsSimulating(false);
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/75 backdrop-blur-xl border-b border-white/70 px-4 sm:px-8 flex items-center justify-between shadow-[0_2px_15px_-3px_rgba(150,170,220,0.06)] transition-all">
      {/* Left: Mobile hamburger + Page Context */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              WiHeal Platform
            </h1>
            <span className="text-[11px] font-semibold text-pastel-lavender-700 bg-pastel-lavender-50 border border-pastel-lavender-200/70 px-2 py-0.5 rounded-full">
              Autonomous NetOps
            </span>
          </div>
          <p className="text-xs text-slate-600">Enterprise Wi-Fi Autonomous Diagnosis</p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-pastel-lavender-600">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search device, IP, incident..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-pastel-blue-50/50 hover:bg-pastel-blue-50/80 focus:bg-white border border-slate-200/70 focus:border-pastel-lavender-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-lavender-100 transition-all placeholder:text-slate-500 text-slate-800"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="text-[10px] uppercase font-mono px-1.5 py-0.5 text-slate-500 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Simulator Trigger Button */}
        <button
          onClick={handleQuickSimulate}
          disabled={isSimulating}
          title="Simulate network incident to view autonomous self-healing in action"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pastel-lavender-50 to-pastel-blue-50 hover:from-pastel-lavender-100 hover:to-pastel-blue-100 text-pastel-lavender-700 text-xs font-semibold border border-pastel-lavender-200/80 shadow-soft transition-all duration-200 disabled:opacity-50"
        >
          <Zap className={`w-3.5 h-3.5 text-pastel-lavender-600 ${isSimulating ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">
            {isSimulating ? 'Simulating Anomaly...' : 'Simulate Self-Heal'}
          </span>
          <span className="sm:hidden">Simulate</span>
        </button>

        {/* Live Status Indicator Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pastel-mint-50/80 border border-pastel-mint-200/70 text-xs text-pastel-mint-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-pastel-mint-500 animate-pulse"></span>
          <span>AI Engine Active</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pastel-lavender-500 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white/95 backdrop-blur-xl rounded-2xl shadow-pastel-lg border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pastel-lavender-100 text-pastel-lavender-700">
                    3 New
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-slate-50 py-1">
                {notifications.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-50/70 p-2 rounded-xl transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-pastel-mint-100 text-pastel-mint-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</p>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pastel-lavender-400 via-pastel-blue-300 to-pastel-mint-300 p-[1.5px] shadow-soft cursor-pointer hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Gopika Nair</p>
            <p className="text-[11px] text-slate-400 font-medium">Network Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
}
