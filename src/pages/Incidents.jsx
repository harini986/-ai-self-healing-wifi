import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    api.getIncidents().then(setIncidents);
  }, []);

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-pastel-rose-50 text-rose-600 border-pastel-rose-200';
      case 'medium':
        return 'bg-pastel-peach-50 text-amber-700 border-pastel-peach-200';
      case 'low':
      default:
        return 'bg-pastel-blue-50 text-pastel-blue-700 border-pastel-blue-200';
    }
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        inc.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSev = severityFilter === 'all' || inc.severity.toLowerCase() === severityFilter.toLowerCase();
      return matchSearch && matchSev;
    });
  }, [incidents, searchTerm, severityFilter]);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(incidents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'wiheal-incidents-report.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-peach-100/80 border border-pastel-peach-200/60 text-amber-700 text-xs font-semibold mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Anomaly Detection Audit Trail</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Network Incidents & Recoveries
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Historical timeline of abnormal condition alerts, AI diagnosis logs, and autonomous self-healing results.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200/80 shadow-soft flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Log</span>
            </button>
          </div>
        </div>

        {/* Incident Summary Counters */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Recorded</span>
            <span className="text-xl font-extrabold text-slate-800 block mt-0.5">{incidents.length} Events</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Autonomous Resolves</span>
            <span className="text-xl font-extrabold text-pastel-mint-700 block mt-0.5">100% Healed</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Time to Resolve</span>
            <span className="text-xl font-extrabold text-pastel-lavender-700 block mt-0.5">1.4 seconds</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Human Interventions</span>
            <span className="text-xl font-extrabold text-pastel-blue-700 block mt-0.5">0 Needed</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incident ID, device, or problem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-lavender-200 text-slate-800 placeholder:text-slate-400 shadow-soft"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs self-start sm:self-auto">
          {['all', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                severityFilter === sev ? 'bg-white text-pastel-lavender-700 shadow-soft font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents List Cards */}
      <div className="space-y-3">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-pastel-lavender-300 hover:shadow-pastel transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-pastel-lavender-50 border border-pastel-lavender-100 text-pastel-lavender-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 stroke-[2]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{inc.id}</span>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-pastel-lavender-700 transition-colors">
                    {inc.problem}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSeverityBadge(inc.severity)}`}>
                    {inc.severity}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Device: <strong className="text-slate-700">{inc.device}</strong></span>
                  <span>•</span>
                  <span>Remediation: <strong className="text-slate-700">{inc.action}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <div className="text-left sm:text-right">
                <span className="text-[11px] font-bold text-pastel-mint-700 bg-pastel-mint-50 px-2.5 py-0.5 rounded-full border border-pastel-mint-200">
                  {inc.status}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">{inc.time} • {inc.timestamp}</span>
              </div>

              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-pastel-lavender-100 group-hover:text-pastel-lavender-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Deep Dive Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-pastel-lg border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Incident Telemetry Record</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedIncident.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 font-medium block">Problem Description:</span>
                <span className="text-sm font-bold text-slate-800 block mt-0.5">{selectedIncident.problem}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-slate-400 font-medium block">Affected Target:</span>
                  <span className="font-bold text-slate-700">{selectedIncident.device}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-slate-400 font-medium block">Severity Index:</span>
                  <span className="font-bold text-amber-700">{selectedIncident.severity}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-pastel-mint-50/70 border border-pastel-mint-200">
                <span className="text-pastel-mint-800 font-bold block">Autonomous Healing Action Executed:</span>
                <span className="text-slate-700 mt-0.5 block">{selectedIncident.action}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
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
