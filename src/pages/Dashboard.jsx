import React, { useState, useEffect } from 'react';
import { api, subscribeToNetworkUpdates } from '../services/api';
import HealthScore from '../components/HealthScore';
import StatusCard from '../components/StatusCard';
import NetworkChart from '../components/NetworkChart';
import AiIntelligenceSection from '../components/AiIntelligenceSection';
import SelfHealingActivity from '../components/SelfHealingActivity';
import NetworkTopology from '../components/NetworkTopology';
import IncidentTable from '../components/IncidentTable';
import {
  Router as RouterIcon,
  Globe,
  Radio,
  Activity,
  ArrowRight,
  Laptop,
  Smartphone,
  Tv,
  Cpu,
  Wifi
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [networkState, setNetworkState] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToNetworkUpdates((state) => {
      setNetworkState(state);
    });
    return () => unsubscribe();
  }, []);

  if (!networkState) return null;

  const { healthScore, healthStatus, lastChecked, metrics, aiStatus, selfHealing, incidents, devices } = networkState;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Main Heading & Circular Health Score */}
      <HealthScore
        score={healthScore}
        status={healthStatus}
        lastChecked={lastChecked}
      />

      {/* 2. Network Status Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Router Status */}
        <StatusCard
          title="Router Status"
          mainValue={`${metrics.router.latency} ms`}
          status={metrics.router.status}
          subtext="Internal Ping"
          icon={RouterIcon}
          trend={metrics.router.change}
          trendType={metrics.router.latency > 50 ? 'negative' : 'positive'}
          accent="lavender"
        />

        {/* Card 2: Internet Status */}
        <StatusCard
          title="Internet Status"
          mainValue={`${metrics.internet.latency} ms`}
          status={metrics.internet.status}
          subtext="WAN Gateway"
          icon={Globe}
          trend={metrics.internet.change}
          trendType="positive"
          accent="blue"
        />

        {/* Card 3: Packet Loss */}
        <StatusCard
          title="Packet Loss"
          mainValue={`${metrics.packetLoss.value}%`}
          status={metrics.packetLoss.value < 1 ? 'Minimal' : 'Elevated'}
          subtext="Drop Rate"
          icon={Radio}
          trend={metrics.packetLoss.change}
          trendType={metrics.packetLoss.value > 2 ? 'negative' : 'positive'}
          accent="peach"
        />

        {/* Card 4: Network Stability */}
        <StatusCard
          title="Network Stability"
          mainValue={metrics.stability.status}
          status={`${metrics.stability.score}%`}
          subtext="Quality Index"
          icon={Activity}
          trend={metrics.stability.change}
          trendType="positive"
          accent="mint"
        />
      </div>

      {/* 3. Large Network Performance Chart Section */}
      <NetworkChart />

      {/* 4. AI Network Intelligence + Self-Healing Activity (Two-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        <div className="lg:col-span-7">
          <AiIntelligenceSection
            status={aiStatus.status}
            currentAnalysis={aiStatus.currentAnalysis}
            confidence={aiStatus.confidence}
            anomalyScore={aiStatus.anomalyScore}
          />
        </div>

        <div className="lg:col-span-5">
          <SelfHealingActivity
            timeline={selfHealing.timeline}
            recoveryStatus={selfHealing.recoveryStatus}
          />
        </div>
      </div>

      {/* 5. Network Topology Diagram */}
      <NetworkTopology />

      {/* 6. Recent Incidents Table & Devices Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Incidents Table (8 cols) */}
        <div className="lg:col-span-8">
          <IncidentTable incidents={incidents} limit={4} />
        </div>

        {/* Quick Devices Widget (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-pastel-lavender-600" />
                <h3 className="text-base font-bold text-slate-800">Connected Devices</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {devices.length} Active
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {devices.slice(0, 4).map((dev) => (
                <div key={dev.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-pastel-lavender-50 text-pastel-lavender-600 flex items-center justify-center">
                      {dev.type === 'laptop' ? <Laptop className="w-4 h-4" /> : dev.type === 'smart-tv' ? <Tv className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{dev.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{dev.ip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-pastel-mint-700">{dev.latency} ms</span>
                    <span className="text-[10px] text-slate-400 block">{dev.connection.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <Link
              to="/devices"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-pastel-lavender-50 text-slate-700 hover:text-pastel-lavender-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/60"
            >
              <span>Manage All {devices.length} Devices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
