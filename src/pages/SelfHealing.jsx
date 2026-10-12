import React, { useState, useEffect } from 'react';
import { api, subscribeToNetworkUpdates } from '../services/api';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Brain,
  Sliders,
  Check,
  Search,
  Settings,
  Layers,
  Terminal,
  Clock
} from 'lucide-react';

export default function SelfHealing() {
  const [networkState, setNetworkState] = useState(null);
  const [activeStep, setActiveStep] = useState(5); // 1: Detect, 2: Analyze, 3: Decide, 4: Recover, 5: Verify
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationMessage, setSimulationMessage] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToNetworkUpdates((state) => {
      setNetworkState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleRunSimulation = async (scenario = 'latency') => {
    setIsSimulating(true);
    setSimulationMessage('Injecting latency anomaly across AP-01...');
    setActiveStep(1);

    // Step 1: Detect
    setTimeout(() => {
      setActiveStep(2);
      setSimulationMessage('AI Autoencoder evaluating telemetry tensors & SNR...');
    }, 1200);

    // Step 2: Analyze
    setTimeout(() => {
      setActiveStep(3);
      setSimulationMessage('Decision engine determining optimal remediation policy...');
    }, 2400);

    // Step 3: Decide & Recover
    setTimeout(() => {
      setActiveStep(4);
      setSimulationMessage('Executing dynamic DFS channel hop & buffer flush...');
    }, 3600);

    // Step 4: Verify
    setTimeout(async () => {
      setActiveStep(5);
      setSimulationMessage('Closed-loop verification complete. Network restored!');
      await api.triggerSelfHealingSimulation(scenario);
      setIsSimulating(false);
    }, 4800);
  };

  if (!networkState) return null;

  const { selfHealing, healthScore, metrics } = networkState;

  const steps = [
    { num: 1, name: 'DETECT', desc: 'Continuous telemetry probe detects latency & packet variance', icon: AlertTriangle, color: 'text-amber-500' },
    { num: 2, name: 'ANALYZE', desc: 'AI diagnoses root cause (channel congestion, bufferbloat)', icon: Search, color: 'text-pastel-lavender-600' },
    { num: 3, name: 'DECIDE', desc: 'Selects optimal recovery strategy without client drop', icon: Brain, color: 'text-pastel-blue-600' },
    { num: 4, name: 'RECOVER', desc: 'Executes automated channel migration & QoS flush', icon: Zap, color: 'text-pastel-lavender-600' },
    { num: 5, name: 'VERIFY', desc: 'Re-measures latency to ensure 98%+ health score restored', icon: CheckCircle2, color: 'text-pastel-mint-600' },
  ];

  const selfHealingPolicies = [
    { title: 'Dynamic Channel DFS Migration', desc: 'Automatically hops AP to clean spectrum upon co-channel interference detection.', active: true, triggered: '14 times this month' },
    { title: 'Bufferbloat Active Queue Flush (FQ-CoDel)', desc: 'Prioritizes latency-sensitive interactive packets during high upload/download peaks.', active: true, triggered: '9 times this month' },
    { title: 'Adaptive Beamforming RSSI Boost', desc: 'Calibrates directional phased-array antenna gain for fringe mobile devices.', active: true, triggered: '3 times this month' },
    { title: 'Autonomous DNS Failover', desc: 'Switches resolver to secondary upstream provider upon packet loss > 3%.', active: true, triggered: 'Once this month' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        {/* Soft pastel ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pastel-mint-200/40 via-pastel-lavender-100/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint-100/80 border border-pastel-mint-200/60 text-pastel-mint-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-pastel-mint-600" />
              <span>Closed-Loop Autonomous Healing</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Self-Healing Center
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
              Zero-touch automated diagnostic, root cause deduction and dynamic remediation for enterprise Wi-Fi networks.
            </p>
          </div>

          {/* Live Simulator Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleRunSimulation('latency')}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pastel-lavender-500 to-pastel-blue-500 hover:from-pastel-lavender-600 hover:to-pastel-blue-600 text-white text-xs font-bold shadow-pastel flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-white ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Running Self-Heal...' : 'Simulate Latency Spike'}</span>
            </button>

            <button
              onClick={() => handleRunSimulation('loss')}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200/80 shadow-soft flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Simulate Packet Loss</span>
            </button>
          </div>
        </div>

        {isSimulating && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>{simulationMessage}</span>
          </div>
        )}
      </div>

      {/* VISUAL PROCESS WORKFLOW: DETECT -> ANALYZE -> DECIDE -> RECOVER -> VERIFY */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Autonomous Self-Healing Pipeline
            </h3>
            <p className="text-xs text-slate-500">Five-stage closed loop cycle executed without network downtime</p>
          </div>

          <span className="text-xs font-bold text-pastel-mint-700 bg-pastel-mint-50 px-3 py-1 rounded-full border border-pastel-mint-200">
            Stage {activeStep} / 5 Active
          </span>
        </div>

        {/* 5-Step Process Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isPassed = activeStep > step.num;
            const isCurrent = activeStep === step.num;

            return (
              <div
                key={step.num}
                className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-white via-pastel-lavender-50/50 to-white border-pastel-lavender-400 shadow-pastel-md scale-102 ring-2 ring-pastel-lavender-200'
                    : isPassed
                    ? 'bg-white border-pastel-mint-200 shadow-soft'
                    : 'bg-white/60 border-slate-100 opacity-60'
                }`}
              >
                {/* Arrow connector between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-pastel-lavender-500 text-white shadow-pastel'
                        : isPassed
                        ? 'bg-pastel-mint-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                    </span>

                    <Icon className={`w-4 h-4 ${step.color} ${isCurrent ? 'animate-bounce' : ''}`} />
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-800 tracking-tight">
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>Latency</span>
                  <span>{step.num === 1 ? '184ms' : step.num === 5 ? '3ms' : 'Optimizing'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CORE SPECIFIED SECTION: CURRENT NETWORK STATE & RECENT DIAGNOSIS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: State & AI Diagnosis Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
              Live Self-Healing Diagnostic Report
            </h3>

            <div className="mt-4 space-y-4 text-xs">
              {/* Row 1: Current Network State */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Network State
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {healthScore >= 90 ? 'Nominal / Healthy' : 'Anomaly Detected / Healing'}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-pastel-mint-100 text-pastel-mint-700 font-bold text-xs">
                  Score: {healthScore}%
                </span>
              </div>

              {/* Row 2: Detected Problem */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                    Detected Problem
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {selfHealing.detectedProblem || 'High Network Latency'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Threshold: &gt; 50ms latency observed across 3 consecutive keepalive beacons.
                  </p>
                </div>
              </div>

              {/* Row 3: Root Cause */}
              <div className="p-3.5 rounded-2xl bg-pastel-lavender-50/50 border border-pastel-lavender-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pastel-lavender-100 text-pastel-lavender-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pastel-lavender-700 block">
                    Root Cause (AI Diagnosis)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {selfHealing.rootCause || 'Possible router overload & Channel 6 co-interference'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    AutoEncoder model diagnosed cross-talk with neighboring SSID on channel 6.
                  </p>
                </div>
              </div>

              {/* Row 4: Recommended Action */}
              <div className="p-3.5 rounded-2xl bg-pastel-blue-50/50 border border-pastel-blue-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pastel-blue-100 text-pastel-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pastel-blue-700 block">
                    Recommended Action
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {selfHealing.recommendedAction || 'Optimize route / restart network interface / dynamic DFS hop'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Execution Mode: <strong className="text-slate-700">Automatic Autonomous Execution</strong>
                  </p>
                </div>
              </div>

              {/* Row 5: Recovery Status */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pastel-mint-50/80 via-white to-pastel-mint-50/50 border border-pastel-mint-200 shadow-soft flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pastel-mint-500 text-white flex items-center justify-center shadow-pastel-mint">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pastel-mint-700 block">
                      Recovery Status
                    </span>
                    <span className="text-sm font-extrabold text-slate-800">
                      ✓ {selfHealing.recoveryStatus || 'Recovery Successful'}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-pastel-mint-100 text-pastel-mint-700 text-xs font-bold">
                  Zero Downtime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Automated Policies & Remediation Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Active Self-Healing Policies
              </h3>
              <span className="text-xs text-pastel-mint-700 font-bold bg-pastel-mint-50 px-2.5 py-0.5 rounded-full border border-pastel-mint-200">
                4 Enforced
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {selfHealingPolicies.map((pol, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-pastel-lavender-200 shadow-soft transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{pol.title}</span>
                    <span className="w-2 h-2 rounded-full bg-pastel-mint-500"></span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{pol.desc}</p>
                  <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Remediation count:</span>
                    <span className="font-semibold text-pastel-lavender-700">{pol.triggered}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Next automated sanity check:</span>
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pastel-lavender-600" />
                <span>In 45 seconds</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
