// src/services/api.js
// WiHeal Network Intelligence API Client
// Designed to seamlessly connect with future Python FastAPI backend:
// Base URL points to /api (or VITE_API_URL environment variable)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Initial realistic mock data state
let mockNetworkState = {
  healthScore: 98,
  healthStatus: 'Healthy',
  lastChecked: 'Just now',
  metrics: {
    router: { status: 'Online', latency: 3, unit: 'ms', change: '-0.2 ms', state: 'optimal' },
    internet: { status: 'Connected', latency: 18, unit: 'ms', change: 'Stable Fiber', state: 'optimal' },
    packetLoss: { value: 0.2, unit: '%', change: '-0.1%', state: 'optimal' },
    stability: { status: 'Excellent', score: 99.4, unit: '%', change: '+0.3%', state: 'optimal' }
  },
  aiStatus: {
    status: 'Monitoring',
    currentAnalysis: 'No abnormal network behavior detected.',
    confidence: 96,
    anomalyScore: 0.04,
    lastInference: '1.2s ago',
    activeModel: 'AutoEncoder-LSTM v2.4'
  },
  selfHealing: {
    currentStatus: 'Ready / Idle',
    detectedProblem: 'None (System Nominal)',
    rootCause: 'All Wi-Fi channels & router subroutines operating within threshold',
    recommendedAction: 'Standby continuous deep telemetry polling',
    recoveryStatus: 'Nominal',
    timeline: [
      { id: 1, time: '10:42 AM', step: 'High latency detected (184ms) on AP-East', type: 'detect' },
      { id: 2, time: '10:42 AM', step: 'Root cause analysis started: Channel 6 co-interference identified', type: 'analyze' },
      { id: 3, time: '10:43 AM', step: 'Network route & DFS channel dynamically optimized to Ch 36', type: 'recover' },
      { id: 4, time: '10:43 AM', step: 'Connection restored, jitter lowered to 2.1ms', type: 'restore' },
      { id: 5, time: '10:44 AM', step: 'Recovery Successful: Health score re-verified at 98%', type: 'verify', success: true }
    ]
  },
  devices: [
    { id: 'dev-1', name: 'MacBook Pro 16"', ip: '192.168.1.10', mac: 'F4:D4:88:51:2A:9C', connection: 'Wi-Fi 6 (5GHz)', signal: 'Strong (-48 dBm)', latency: 12, status: 'Online', type: 'laptop', bandwidth: '45.2 Mbps', rx: '320 MB', tx: '84 MB' },
    { id: 'dev-2', name: 'iPhone 15 Pro', ip: '192.168.1.11', mac: '8C:85:90:3A:42:E1', connection: 'Wi-Fi 6 (5GHz)', signal: 'Good (-56 dBm)', latency: 18, status: 'Online', type: 'mobile', bandwidth: '12.8 Mbps', rx: '142 MB', tx: '29 MB' },
    { id: 'dev-3', name: 'Samsung Neo QLED TV', ip: '192.168.1.15', mac: '50:C7:BF:99:A1:04', connection: 'Wi-Fi 5 (5GHz)', signal: 'Strong (-51 dBm)', latency: 15, status: 'Online', type: 'smart-tv', bandwidth: '24.1 Mbps', rx: '1.4 GB', tx: '12 MB' },
    { id: 'dev-4', name: 'Nest Thermostat Sensor', ip: '192.168.1.22', mac: '64:16:66:81:8F:09', connection: 'Wi-Fi 4 (2.4GHz)', signal: 'Moderate (-64 dBm)', latency: 26, status: 'Online', type: 'iot', bandwidth: '0.4 Mbps', rx: '18 MB', tx: '14 MB' },
    { id: 'dev-5', name: 'Workstation Desktop', ip: '192.168.1.08', mac: '00:1A:7D:DA:71:11', connection: 'Ethernet Cat6', signal: 'Optimal (1 Gbps)', latency: 4, status: 'Online', type: 'workstation', bandwidth: '82.6 Mbps', rx: '3.8 GB', tx: '1.2 GB' },
    { id: 'dev-6', name: 'Smart Security Cam Hub', ip: '192.168.1.30', mac: 'A4:C3:F0:8D:67:23', connection: 'Wi-Fi 4 (2.4GHz)', signal: 'Good (-59 dBm)', latency: 21, status: 'Online', type: 'iot', bandwidth: '4.8 Mbps', rx: '45 MB', tx: '890 MB' },
    { id: 'dev-7', name: 'iPad Air 5th Gen', ip: '192.168.1.19', mac: '2C:F0:A2:18:99:4E', connection: 'Wi-Fi 6 (5GHz)', signal: 'Strong (-50 dBm)', latency: 14, status: 'Online', type: 'mobile', bandwidth: '8.4 Mbps', rx: '210 MB', tx: '31 MB' }
  ],
  incidents: [
    { id: 'INC-889', time: '10:42 AM', timestamp: 'Today', device: 'Router Gateway', problem: 'High Latency Spike (184ms)', severity: 'Medium', action: 'Auto Channel Hop & Buffer Flush', status: 'Resolved' },
    { id: 'INC-888', time: '10:15 AM', timestamp: 'Today', device: 'iPhone 15 Pro', problem: 'Minor Packet Loss (4.2%)', severity: 'Low', action: 'Dynamic Beamforming Re-align', status: 'Resolved' },
    { id: 'INC-887', time: '08:30 AM', timestamp: 'Today', device: 'AP-East Corridor', problem: 'Bandwidth Congestion (89% util)', severity: 'Medium', action: 'QoS Queue Bandwidth Throttling', status: 'Resolved' },
    { id: 'INC-886', time: 'Yesterday', timestamp: 'Oct 07', device: 'Security Cam Hub', problem: 'Frequent Frame Drop / RSSI Dip', severity: 'Low', action: 'Power Output Boost (+3 dBm)', status: 'Resolved' },
    { id: 'INC-885', time: 'Oct 06', timestamp: 'Oct 06', device: 'Primary Gateway', problem: 'DNS Resolution Stalling (Timeout)', severity: 'High', action: 'Self-Healing Fallback to 1.1.1.1', status: 'Resolved' }
  ],
  settings: {
    monitoringInterval: 5,
    alertThreshold: 'Medium',
    latencyThreshold: 65,
    packetLossThreshold: 2.5,
    aiMonitoring: true,
    automaticRecovery: true,
    notifications: true,
    apiEndpoint: 'http://localhost:8000/api'
  }
};

// Listeners for reactive mock updates
const stateListeners = new Set();
const notifyListeners = () => {
  stateListeners.forEach(listener => listener({ ...mockNetworkState }));
};

export const subscribeToNetworkUpdates = (callback) => {
  stateListeners.add(callback);
  callback({ ...mockNetworkState });
  return () => stateListeners.delete(callback);
};

// API Services configured to easily switch between Mock and FastAPI
export const api = {
  // GET /api/network/health
  async getNetworkHealth() {
    return {
      score: mockNetworkState.healthScore,
      status: mockNetworkState.healthStatus,
      lastChecked: mockNetworkState.lastChecked
    };
  },

  // GET /api/network/status
  async getNetworkStatus() {
    return {
      metrics: mockNetworkState.metrics,
      aiStatus: mockNetworkState.aiStatus,
      healthScore: mockNetworkState.healthScore
    };
  },

  // GET /api/network/history?range=1H|6H|24H|7D
  async getNetworkHistory(range = '1H') {
    // Generate smooth realistic data points based on selected range
    const points = range === '1H' ? 12 : range === '6H' ? 18 : range === '24H' ? 24 : 14;
    const history = [];
    const baseTime = new Date();

    for (let i = points; i >= 0; i--) {
      const pointTime = new Date(baseTime.getTime() - i * (range === '1H' ? 5 : range === '6H' ? 20 : range === '24H' ? 60 : 720) * 60000);
      const timeStr = range === '7D'
        ? pointTime.toLocaleDateString('en-US', { weekday: 'short' })
        : pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Clean natural variance
      const variance = Math.sin(i * 0.8) * 4;
      history.push({
        time: timeStr,
        latency: Math.max(2, Math.round(14 + variance + (Math.random() * 3))),
        packetLoss: Number((0.15 + Math.random() * 0.18).toFixed(2)),
        stability: Math.round(98.5 + (Math.sin(i) * 1.2)),
        throughput: Math.round(48 + variance * 2 + Math.random() * 8)
      });
    }

    return history;
  },

  // GET /api/devices
  async getDevices() {
    return [...mockNetworkState.devices];
  },

  // GET /api/incidents
  async getIncidents() {
    return [...mockNetworkState.incidents];
  },

  // GET /api/self-healing/status
  async getSelfHealingStatus() {
    return { ...mockNetworkState.selfHealing };
  },

  // GET /api/settings
  async getSettings() {
    return { ...mockNetworkState.settings };
  },

  // POST /api/settings
  async updateSettings(newSettings) {
    mockNetworkState.settings = { ...mockNetworkState.settings, ...newSettings };
    notifyListeners();
    return { success: true, settings: mockNetworkState.settings };
  },

  // POST /api/self-healing/trigger (Simulation Engine)
  async triggerSelfHealingSimulation(scenario = 'latency') {
    // Stage 1: Problem injection
    mockNetworkState.healthScore = 72;
    mockNetworkState.healthStatus = 'Degraded';
    mockNetworkState.metrics.router.latency = 142;
    mockNetworkState.metrics.router.state = 'warning';
    mockNetworkState.metrics.packetLoss.value = 4.8;
    mockNetworkState.metrics.stability.status = 'Degraded';
    mockNetworkState.metrics.stability.score = 78.2;
    mockNetworkState.aiStatus.status = 'Analyzing Anomaly';
    mockNetworkState.aiStatus.currentAnalysis = 'High co-channel interference & TCP retransmission surge detected on 5GHz band.';
    mockNetworkState.aiStatus.confidence = 94;
    mockNetworkState.aiStatus.anomalyScore = 0.88;

    mockNetworkState.selfHealing = {
      currentStatus: 'Self-Healing Executing',
      detectedProblem: scenario === 'latency' ? 'High Latency Spike & Bufferbloat' : 'Excessive Packet Loss on Access Point',
      rootCause: 'Dynamic AP Channel 6 Congestion + ARP Storm from 192.168.1.22',
      recommendedAction: 'Execute Seamless Channel DFS Hop + QoS Buffer Flush',
      recoveryStatus: 'In Progress (Stage 2/4)',
      timeline: [
        { id: Date.now(), time: 'Just Now', step: 'Critical latency spike detected (>140ms)', type: 'detect' },
        ...mockNetworkState.selfHealing.timeline
      ]
    };
    notifyListeners();

    // Stage 2: AI Root Cause Analysis (after 1.8s)
    await new Promise(resolve => setTimeout(resolve, 1800));
    mockNetworkState.selfHealing.recoveryStatus = 'Executing Recovery Action';
    mockNetworkState.selfHealing.timeline = [
      { id: Date.now() + 1, time: 'Just Now', step: 'Root cause confirmed: Channel congestion. Migrating route to 5.2GHz Ch 44.', type: 'analyze' },
      ...mockNetworkState.selfHealing.timeline
    ];
    notifyListeners();

    // Stage 3: Self-Healing Recovery & Verification (after 2.5s)
    await new Promise(resolve => setTimeout(resolve, 2500));
    mockNetworkState.healthScore = 98;
    mockNetworkState.healthStatus = 'Healthy';
    mockNetworkState.metrics.router.latency = 3;
    mockNetworkState.metrics.router.state = 'optimal';
    mockNetworkState.metrics.packetLoss.value = 0.2;
    mockNetworkState.metrics.stability.status = 'Excellent';
    mockNetworkState.metrics.stability.score = 99.4;
    mockNetworkState.aiStatus.status = 'Monitoring';
    mockNetworkState.aiStatus.currentAnalysis = 'Network successfully restored. Frequency optimization applied.';
    mockNetworkState.aiStatus.confidence = 98;
    mockNetworkState.aiStatus.anomalyScore = 0.03;

    mockNetworkState.selfHealing = {
      currentStatus: 'Recovery Complete',
      detectedProblem: 'Resolved: High Latency & Bufferbloat',
      rootCause: 'Mitigated via Dynamic DFS Channel Migration',
      recommendedAction: 'Self-healing routine concluded. Network parameters validated.',
      recoveryStatus: 'Recovery Successful',
      timeline: [
        { id: Date.now() + 2, time: 'Just Now', step: 'Recovery Successful: Latency dropped to 3ms. WiHeal AI verified state.', type: 'verify', success: true },
        ...mockNetworkState.selfHealing.timeline
      ]
    };

    // Add to incidents
    mockNetworkState.incidents.unshift({
      id: `INC-${Math.floor(Math.random() * 900) + 100}`,
      time: 'Just Now',
      timestamp: 'Today',
      device: 'AP-East Corridor',
      problem: 'High Latency Anomaly (142ms)',
      severity: 'High',
      action: 'AI Channel DFS Hop & QoS Rebalance',
      status: 'Resolved'
    });

    notifyListeners();
    return { success: true, message: 'Self-healing recovery sequence executed successfully.' };
  }
};
