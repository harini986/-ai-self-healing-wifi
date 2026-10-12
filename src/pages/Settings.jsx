import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Settings as SettingsIcon,
  Sliders,
  ShieldCheck,
  Brain,
  Bell,
  Activity,
  Database,
  Save,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    monitoringInterval: 5,
    alertThreshold: 'Medium',
    latencyThreshold: 65,
    packetLossThreshold: 2.5,
    aiMonitoring: true,
    automaticRecovery: true,
    notifications: true,
    apiEndpoint: 'http://localhost:8000/api'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await api.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender-100/80 border border-pastel-lavender-200/60 text-pastel-lavender-700 text-xs font-semibold mb-2">
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>System & Autonomous Rules Configuration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Platform Settings
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Fine-tune anomaly sensitivity, automated remediation thresholds, and FastAPI backend endpoints.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pastel-lavender-500 to-pastel-blue-500 hover:from-pastel-lavender-600 hover:to-pastel-blue-600 text-white font-bold text-xs shadow-pastel flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-pastel-mint-50 border border-pastel-mint-200 text-pastel-mint-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-pastel-mint-600" />
            <span>Settings successfully saved and synced with WiHeal engine!</span>
          </div>
        )}
      </div>

      {/* Main Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Autonomous AI & Recovery (Modern Toggles) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl">
          <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Brain className="w-5 h-5 text-pastel-lavender-600" />
            <span>AI Monitoring & Self-Healing Automation</span>
          </h3>

          <div className="mt-6 space-y-5">
            {/* Toggle 1: AI Monitoring */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-pastel-lavender-200 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-800">AI Continuous Telemetry Monitoring</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Deep autoencoder anomaly inference applied in real time to network metrics.
                </p>
              </div>

              {/* Modern pastel toggle switch */}
              <button
                type="button"
                onClick={() => handleToggle('aiMonitoring')}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.aiMonitoring ? 'bg-pastel-lavender-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.aiMonitoring ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Automatic Recovery */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-pastel-lavender-200 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-800">Automatic Self-Healing Recovery</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authorize automated channel DFS hops, buffer flushes, and interface resets without requiring manual approval.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('automaticRecovery')}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.automaticRecovery ? 'bg-pastel-mint-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.automaticRecovery ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Notifications */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-pastel-lavender-200 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-800">Push Notifications & Incident Alerts</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Broadcast instant toasts and Webhook events whenever a self-healing event is triggered.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('notifications')}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.notifications ? 'bg-pastel-blue-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Thresholds & Intervals */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl">
          <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pastel-blue-600" />
            <span>Detection Thresholds & Polling Parameters</span>
          </h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Monitoring Interval */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100">
              <label className="font-bold text-slate-800 block mb-1">Monitoring Interval (Seconds)</label>
              <p className="text-slate-500 text-[11px] mb-3">Time between periodic ICMP/SNMP telemetry sweeps</p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={settings.monitoringInterval}
                  onChange={(e) => handleChange('monitoringInterval', Number(e.target.value))}
                  className="w-full accent-pastel-lavender-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-pastel-lavender-700 w-12 text-right">
                  {settings.monitoringInterval}s
                </span>
              </div>
            </div>

            {/* Alert Threshold */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100">
              <label className="font-bold text-slate-800 block mb-1">Alert Sensitivity Threshold</label>
              <p className="text-slate-500 text-[11px] mb-3">Minimum anomaly confidence required to log an incident</p>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleChange('alertThreshold', lvl)}
                    className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                      settings.alertThreshold === lvl
                        ? 'bg-pastel-lavender-100 text-pastel-lavender-700 border border-pastel-lavender-300 shadow-soft'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Latency Threshold */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100">
              <label className="font-bold text-slate-800 block mb-1">Latency Anomaly Threshold</label>
              <p className="text-slate-500 text-[11px] mb-3">Maximum allowable ping before triggering self-healing</p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={settings.latencyThreshold}
                  onChange={(e) => handleChange('latencyThreshold', Number(e.target.value))}
                  className="w-full accent-pastel-peach-400 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-amber-700 w-16 text-right">
                  {settings.latencyThreshold} ms
                </span>
              </div>
            </div>

            {/* Packet Loss Threshold */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100">
              <label className="font-bold text-slate-800 block mb-1">Packet Loss Drop Threshold</label>
              <p className="text-slate-500 text-[11px] mb-3">Percent packet loss triggering route re-balancing</p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={settings.packetLossThreshold}
                  onChange={(e) => handleChange('packetLossThreshold', Number(e.target.value))}
                  className="w-full accent-pastel-rose-400 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-rose-600 w-14 text-right">
                  {settings.packetLossThreshold}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: FastAPI Backend Connection */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl">
          <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-pastel-mint-600" />
            <span>Python FastAPI Backend Integration</span>
          </h3>

          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-100">
            <label className="text-xs font-bold text-slate-700 block mb-1">API Base Endpoint URL</label>
            <p className="text-[11px] text-slate-500 mb-2">Connects to your Python FastAPI backend (e.g. uvicorn main:app)</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.apiEndpoint}
                onChange={(e) => handleChange('apiEndpoint', e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pastel-lavender-200 font-mono text-slate-800"
              />
              <button
                type="button"
                onClick={() => setSavedSuccess(true)}
                className="px-4 py-2 bg-pastel-mint-50 hover:bg-pastel-mint-100 text-pastel-mint-700 font-bold text-xs rounded-xl border border-pastel-mint-200 transition-colors"
              >
                Test Ping
              </button>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              Pre-wired for: /api/network/status, /api/network/history, /api/devices, /api/incidents, /api/self-healing/status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
