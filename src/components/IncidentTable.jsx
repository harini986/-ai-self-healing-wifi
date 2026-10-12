import React from 'react';
import { AlertCircle, CheckCircle2, Clock, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IncidentTable({ incidents = [], showViewAll = true, limit = 5 }) {
  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-pastel-rose-50 text-rose-600 border-pastel-rose-200/80';
      case 'medium':
        return 'bg-pastel-peach-50 text-amber-700 border-pastel-peach-200/80';
      case 'low':
      default:
        return 'bg-pastel-blue-50 text-pastel-blue-700 border-pastel-blue-200/80';
    }
  };

  const displayed = limit ? incidents.slice(0, limit) : incidents;

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-pastel-peach-100/90 text-amber-600 flex items-center justify-center border border-pastel-peach-200/60 shadow-soft">
            <Activity className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Recent Network Incidents
            </h3>
            <p className="text-xs text-slate-500">Autonomous incident log & self-healing remediation</p>
          </div>
        </div>

        {showViewAll && (
          <Link
            to="/incidents"
            className="flex items-center gap-1 text-xs font-semibold text-pastel-lavender-700 hover:text-pastel-lavender-900 group"
          >
            <span>All Incidents</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Table responsive container */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">Time</th>
              <th className="pb-3">Device</th>
              <th className="pb-3">Problem</th>
              <th className="pb-3">Severity</th>
              <th className="pb-3">Action</th>
              <th className="pb-3 pr-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {displayed.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-50/70 transition-colors group">
                <td className="py-3.5 pl-2 font-mono text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inc.time}</span>
                  </div>
                </td>
                <td className="py-3.5 font-bold text-slate-800 whitespace-nowrap">
                  {inc.device}
                </td>
                <td className="py-3.5 text-slate-600 font-medium">
                  {inc.problem}
                </td>
                <td className="py-3.5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getSeverityBadge(inc.severity)}`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="py-3.5 text-slate-600 font-medium whitespace-nowrap">
                  <span className="bg-slate-100/80 px-2.5 py-1 rounded-lg text-slate-700">
                    {inc.action}
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pastel-mint-700 bg-pastel-mint-50 px-2.5 py-0.5 rounded-full border border-pastel-mint-200/60">
                    <CheckCircle2 className="w-3 h-3 text-pastel-mint-600" />
                    <span>{inc.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
