import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Network,
  Laptop,
  AlertTriangle,
  ShieldCheck,
  BarChart3,
  Settings,
  Wifi,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Network Monitor', path: '/monitor', icon: Activity },
  { name: 'Network Analysis', path: '/analysis', icon: Network },
  { name: 'Devices', path: '/devices', icon: Laptop },
  { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
  { name: 'Self Healing', path: '/self-healing', icon: ShieldCheck, highlightBadge: 'AI Active' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/88 backdrop-blur-2xl border-r border-white/80 shadow-[4px_0_24px_-4px_rgba(130,145,190,0.14)] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100/80">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-lavender-500 via-pastel-lavender-400 to-pastel-blue-400 p-[1px] shadow-pastel flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                <Wifi className="w-5 h-5 text-pastel-lavender-600 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Wi<span className="text-pastel-lavender-600">Heal</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-pastel-lavender-100 text-pastel-lavender-700">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium tracking-tight">Self-Healing Network</p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Network Intelligence
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-pastel-lavender-100/90 via-pastel-blue-50/70 to-white text-pastel-lavender-700 font-semibold shadow-sm border border-pastel-lavender-200/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50/90'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-[18px] h-[18px] transition-colors duration-200 ${
                          isActive
                            ? 'text-pastel-lavender-600 stroke-[2.2]'
                            : 'text-slate-600 group-hover:text-slate-800 stroke-[1.8]'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.highlightBadge && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pastel-mint-100 text-pastel-mint-600 border border-pastel-mint-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-pastel-mint-500 animate-pulse"></span>
                        {item.highlightBadge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* System Status Footer */}
        <div className="p-4 border-t border-slate-100/80">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-pastel-mint-50/90 via-white to-pastel-blue-50/50 border border-pastel-mint-200/50 shadow-soft">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700">System Status</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pastel-mint-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pastel-mint-500"></span>
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-pastel-mint-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-pastel-mint-500 stroke-[2.2]" />
              <span>System Operational</span>
            </div>

            <div className="mt-2 pt-2 border-t border-pastel-mint-100/70 flex items-center justify-between text-[11px] text-slate-600">
              <span>AI Agent v2.4</span>
              <span>Uptime: 99.98%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
