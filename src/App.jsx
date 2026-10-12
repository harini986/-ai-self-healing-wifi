import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import NetworkMonitor from './pages/NetworkMonitor';
import NetworkAnalysis from './pages/NetworkAnalysis';
import Devices from './pages/Devices';
import Incidents from './pages/Incidents';
import SelfHealing from './pages/SelfHealing';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden flex selection:bg-pastel-lavender-300 selection:text-pastel-lavender-900">
      {/* Richer, Deeper Pastel Background Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left: Rich Pastel Lavender Orb */}
        <div className="absolute -top-28 -left-28 w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-gradient-to-br from-[#CBB6F8] via-[#BFABF6] to-[#D8C6FA] opacity-75 blur-3xl animate-float-slow"></div>

        {/* Top-Right: Rich Pastel Sky Blue Orb */}
        <div className="absolute -top-24 -right-24 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-bl from-[#A9D1FA] via-[#96C4F7] to-[#BFE0FD] opacity-75 blur-3xl animate-float-reverse"></div>

        {/* Center-Left: Rich Pastel Mint Orb */}
        <div className="absolute top-[35%] -left-36 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full bg-gradient-to-tr from-[#9EE0C2] via-[#8CD7B4] to-[#B2E6CF] opacity-70 blur-3xl animate-float-reverse"></div>

        {/* Center-Right: Rich Pastel Peach & Lilac Orb */}
        <div className="absolute top-[40%] -right-32 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-bl from-[#FAC5A5] via-[#F6B38E] to-[#E3B8F6] opacity-65 blur-3xl animate-float-slow"></div>

        {/* Bottom-Center: Deeper Pastel Blue-Mint Horizon */}
        <div className="absolute -bottom-36 left-[20%] w-[640px] h-[500px] rounded-full bg-gradient-to-t from-[#B0D5FA] via-[#A0DEC5] to-transparent opacity-75 blur-3xl"></div>
      </div>

      {/* 1. Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all relative z-10">
        {/* Top Navbar */}
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitor" element={<NetworkMonitor />} />
            <Route path="/analysis" element={<NetworkAnalysis />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/self-healing" element={<SelfHealing />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
