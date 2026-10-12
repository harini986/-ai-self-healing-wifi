import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { Activity, Radio, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function NetworkChart() {
  const [timeRange, setTimeRange] = useState('1H');
  const [data, setData] = useState([]);
  const [activeSeries, setActiveSeries] = useState({
    latency: true,
    packetLoss: true,
    stability: true,
  });
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api.getNetworkHistory(timeRange).then((history) => {
      if (isMounted) setData(history);
    });
    return () => { isMounted = false; };
  }, [timeRange]);

  // Dimensions for SVG plotting
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Compute Scales
  const { maxLatency, minLatency, points } = useMemo(() => {
    if (!data.length) return { maxLatency: 50, minLatency: 0, points: [] };
    const maxLat = Math.max(...data.map(d => d.latency), 30);
    const minLat = Math.min(...data.map(d => d.latency), 2);

    const stepX = graphWidth / Math.max(data.length - 1, 1);

    const mapped = data.map((d, i) => {
      const x = padding.left + i * stepX;
      // Latency scale: 0 to maxLat * 1.15
      const yLat = padding.top + graphHeight - ((d.latency / (maxLat * 1.2)) * graphHeight);
      // Stability scale: 90% to 100% mapped to height
      const yStab = padding.top + graphHeight - (((d.stability - 90) / 10) * graphHeight);
      // Packet loss scale: 0% to 5%
      const yLoss = padding.top + graphHeight - ((d.packetLoss / 5) * graphHeight);

      return { ...d, x, yLat, yStab, yLoss };
    });

    return { maxLatency: maxLat, minLatency: minLat, points: mapped };
  }, [data, graphWidth, graphHeight]);

  // Generate smooth cubic bezier SVG path
  const createSmoothPath = (pts, keyY) => {
    if (pts.length === 0) return '';
    return pts.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point.x},${point[keyY]}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (point.x - prev.x) / 2;
      const cy1 = prev[keyY];
      const cx2 = prev.x + (point.x - prev.x) / 2;
      const cy2 = point[keyY];
      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${point.x},${point[keyY]}`;
    }, '');
  };

  const latencyPath = useMemo(() => createSmoothPath(points, 'yLat'), [points]);
  const stabilityPath = useMemo(() => createSmoothPath(points, 'yStab'), [points]);
  const packetLossPath = useMemo(() => createSmoothPath(points, 'yLoss'), [points]);

  // Area under curve for latency
  const latencyAreaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const bottom = padding.top + graphHeight;
    return `${latencyPath} L ${last.x},${bottom} L ${first.x},${bottom} Z`;
  }, [latencyPath, points, graphHeight]);

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
      {/* Header with Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Network Performance
            </h3>
            <span className="text-[11px] font-semibold text-pastel-lavender-700 bg-pastel-lavender-50 px-2 py-0.5 rounded-full border border-pastel-lavender-200/60">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous latency telemetry, packet loss tracking and stability index.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          {['1H', '6H', '24H', '7D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range
                  ? 'bg-white text-pastel-lavender-700 shadow-soft border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Series Toggle Badges */}
      <div className="flex flex-wrap items-center gap-4 py-3 text-xs">
        <button
          onClick={() => setActiveSeries(prev => ({ ...prev, latency: !prev.latency }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            activeSeries.latency
              ? 'bg-pastel-lavender-50/90 text-pastel-lavender-700 border-pastel-lavender-200 font-semibold'
              : 'bg-white text-slate-400 border-slate-200 opacity-60'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-pastel-lavender-500"></span>
          <span>Latency (ms)</span>
        </button>

        <button
          onClick={() => setActiveSeries(prev => ({ ...prev, packetLoss: !prev.packetLoss }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            activeSeries.packetLoss
              ? 'bg-pastel-peach-50/90 text-pastel-peach-600 border-pastel-peach-200 font-semibold'
              : 'bg-white text-slate-400 border-slate-200 opacity-60'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-pastel-rose-400"></span>
          <span>Packet Loss (%)</span>
        </button>

        <button
          onClick={() => setActiveSeries(prev => ({ ...prev, stability: !prev.stability }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            activeSeries.stability
              ? 'bg-pastel-mint-50/90 text-pastel-mint-700 border-pastel-mint-200 font-semibold'
              : 'bg-white text-slate-400 border-slate-200 opacity-60'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-pastel-mint-500"></span>
          <span>Network Stability (%)</span>
        </button>
      </div>

      {/* Main SVG Chart Canvas */}
      <div className="relative w-full overflow-x-auto pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[300px] overflow-visible select-none"
        >
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7E5CEF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7E5CEF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Dotted Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + pct * graphHeight;
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-medium"
                >
                  {Math.round((1 - pct) * 40)}ms
                </text>
              </g>
            );
          })}

          {/* Latency Area Gradient Fill */}
          {activeSeries.latency && (
            <path d={latencyAreaPath} fill="url(#latencyGradient)" />
          )}

          {/* Stability Curve (Mint) */}
          {activeSeries.stability && (
            <path
              d={stabilityPath}
              fill="none"
              stroke="#38B585"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* Packet Loss Curve (Peach / Rose) */}
          {activeSeries.packetLoss && (
            <path
              d={packetLossPath}
              fill="none"
              stroke="#F77C8A"
              strokeWidth="2.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* Latency Curve (Lavender / Purple) */}
          {activeSeries.latency && (
            <path
              d={latencyPath}
              fill="none"
              stroke="#7E5CEF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* Data Points & Interactive hover targets */}
          {points.map((pt, i) => (
            <g key={i}>
              {/* Invisible wide hover column */}
              <rect
                x={pt.x - graphWidth / (points.length * 2)}
                y={padding.top}
                width={graphWidth / points.length}
                height={graphHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              />

              {/* Lavender data dots */}
              {activeSeries.latency && (
                <circle
                  cx={pt.x}
                  cy={pt.yLat}
                  r={hoverIndex === i ? 5 : 3}
                  fill="#FFFFFF"
                  stroke="#7E5CEF"
                  strokeWidth={hoverIndex === i ? 3 : 2}
                  className="transition-all"
                />
              )}

              {/* Time axis label */}
              {i % Math.ceil(points.length / 6) === 0 && (
                <text
                  x={pt.x}
                  y={height - 12}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-medium"
                >
                  {pt.time}
                </text>
              )}
            </g>
          ))}

          {/* Hover guideline and tooltip */}
          {hoverIndex !== null && points[hoverIndex] && (
            <g pointerEvents="none">
              <line
                x1={points[hoverIndex].x}
                y1={padding.top}
                x2={points[hoverIndex].x}
                y2={padding.top + graphHeight}
                stroke="#9E86F8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip HTML Overlay */}
        {hoverIndex !== null && points[hoverIndex] && (
          <div
            className="absolute z-20 pointer-events-none bg-white/95 backdrop-blur-md rounded-xl shadow-pastel-md border border-pastel-lavender-200/80 p-2.5 text-xs text-slate-800 transition-all duration-150"
            style={{
              left: `${Math.min(Math.max(points[hoverIndex].x - 60, 10), width - 140)}px`,
              top: '25px',
            }}
          >
            <div className="font-bold text-slate-700 pb-1 border-b border-slate-100 flex items-center justify-between gap-3">
              <span>{points[hoverIndex].time}</span>
              <span className="text-[10px] font-semibold text-pastel-lavender-600 bg-pastel-lavender-50 px-1.5 py-0.2 rounded">
                Sample
              </span>
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Latency:</span>
                <span className="font-bold text-pastel-lavender-700">{points[hoverIndex].latency} ms</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Packet Loss:</span>
                <span className="font-bold text-rose-500">{points[hoverIndex].packetLoss}%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Stability:</span>
                <span className="font-bold text-pastel-mint-700">{points[hoverIndex].stability}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
        <div className="bg-pastel-blue-50/50 p-2.5 rounded-xl border border-pastel-blue-100/60">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Avg Latency</span>
          <span className="text-base font-bold text-slate-800">14.2 ms</span>
        </div>
        <div className="bg-pastel-lavender-50/50 p-2.5 rounded-xl border border-pastel-lavender-100/60">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Min Ping</span>
          <span className="text-base font-bold text-pastel-lavender-700">3.0 ms</span>
        </div>
        <div className="bg-pastel-mint-50/50 p-2.5 rounded-xl border border-pastel-mint-100/60">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Avg Stability</span>
          <span className="text-base font-bold text-pastel-mint-700">99.1%</span>
        </div>
        <div className="bg-pastel-peach-50/50 p-2.5 rounded-xl border border-pastel-peach-100/60">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Jitter Threshold</span>
          <span className="text-base font-bold text-slate-700">&lt; 1.8 ms</span>
        </div>
      </div>
    </div>
  );
}
