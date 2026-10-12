# WiHeal – AI-Based Self-Healing Wi-Fi Network Management System

WiHeal is a modern, creative, and highly professional network intelligence dashboard frontend built with **React**, **Vite**, and **Tailwind CSS**. It continuously monitors Wi-Fi and router health, detects abnormal conditions (such as high latency spikes, packet loss, weak connectivity, and router bufferbloat), diagnoses root causes via an AI heuristic model, and triggers autonomous self-healing recovery actions.

---

## 🎨 Design System & Aesthetics
- **Theme**: Light, clean, creative pastel theme (soft lavender `#F3F0FF`, soft blue `#E8F1FC`, mint `#E2F6EE`, and white sections with gentle gradients).
- **Surface**: Subtle glassmorphism, soft shadows, rounded 2xl/3xl corners, and thin borders.
- **Typography**: Modern Plus Jakarta Sans with crisp monospace accents for network telemetry.
- **Aesthetic**: Strictly avoids black cyberpunk/neon styles, adhering to a calm, intelligent enterprise SaaS aesthetic suitable for hackathon demonstrations, academic reviews, and commercial platforms.

---

## 🚀 Key Modules & Pages

1. **Dashboard (`/`)**:
   - **Network Health Overview**: SVG semi-circular gauge displaying a 98% Health Score, Healthy status, and Last Checked timestamp.
   - **Network Status Cards**:
     - *Router Status*: Online, 3 ms latency
     - *Internet Status*: Connected, 18 ms latency
     - *Packet Loss*: 0.2% drop rate
     - *Network Stability*: Excellent (99.4%)
   - **Network Performance Line Chart**: Interactive SVG curve plotting Latency (ms), Packet Loss (%), and Stability (%) with 1H, 6H, 24H, 7D time filters and hover tooltips.
   - **AI Network Intelligence**: Status (Monitoring), Confidence (96%), Current Analysis, and animated neural telemetry core.
   - **Self-Healing Activity**: Interactive timeline illustrating detection, root-cause diagnosis, route optimization, and validated recovery.
   - **Network Topology**: Visual tree diagram connecting *Internet WAN ──► Gateway Router ──► Access Point ──► Devices (Laptop, Mobile, Smart TV, IoT)* with interactive click drawers.
   - **Recent Incidents**: Clean audit table with pastel severity badges (Low/Medium/High).

2. **Network Monitor (`/monitor`)**:
   - Live spectrum channel allocation visualizer (2.4 GHz vs 5 GHz).
   - Real-time ICMP/TCP ping ticker updated dynamically.
   - Downstream and upstream throughput meters.

3. **Network Analysis (`/analysis`)**:
   - Deep packet inspection and anomaly risk index.
   - Interactive Network Relationship Graph mapping Core Gateway to devices, IP subnets, and self-healing events.
   - Symptom-to-root-cause correlation table.

4. **Connected Devices (`/devices`)**:
   - Inventory view of all connected clients with MAC, IP, Wi-Fi standard, signal strength (dBm), and telemetry latency.
   - Quick QoS Bandwidth Boost actions for VIP clients.

5. **Self-Healing Center (`/self-healing`)**:
   - Visual 5-Stage Closed-Loop Pipeline:
     `DETECT` ──► `ANALYZE` ──► `DECIDE` ──► `RECOVER` ──► `VERIFY`
   - Diagnostic state report cards (Current Network State, Detected Problem, Root Cause, Recommended Action, Recovery Status).
   - **Interactive Simulation Engine**: Test live latency spikes or packet loss and watch the system detect and self-heal in real time.
   - Active self-healing policies list (DFS channel hop, queue flush, beamforming tune, DNS failover).

6. **Analytics (`/analytics`)**:
   - 6 KPI SLA Cards: Reliability (99.96%), Average Latency (14.2 ms), Packet Loss (0.18%), Downtime (0.00%), MTTR Recovery Time (1.4s), and Total Incidents (5 resolved).
   - Daily reliability distribution charts and policy effectiveness breakdown.

7. **Settings (`/settings`)**:
   - Modern toggle switches for AI monitoring, automatic recovery, and notifications.
   - Interactive threshold sliders for latency and packet loss.
   - Configurable FastAPI endpoint connection.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+ installed.

### 2. Run the Frontend
```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🐍 Future Python FastAPI Integration
The frontend service in `src/services/api.js` is pre-structured to consume standard REST endpoints. A reference FastAPI backend is included in `backend_example/main.py`:

```bash
cd backend_example
pip install -r requirements.txt
python main.py
```
Pre-configured API endpoints:
- `GET /api/network/health`
- `GET /api/network/status`
- `GET /api/network/history`
- `GET /api/devices`
- `GET /api/incidents`
- `GET /api/self-healing/status`
- `POST /api/self-healing/trigger`
