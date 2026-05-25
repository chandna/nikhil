"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AGENTS = [
  { id: "welcome",     label: "Welcome\nAgent",     icon: "👋", color: "#a78bfa", glow: "#7c3aed", desc: "Onboards designer intent",        angle: 270 },
  { id: "investigator",label: "Investigator\nAgent",icon: "🔍", color: "#60a5fa", glow: "#2563eb", desc: "Audits design system fit",         angle: 342 },
  { id: "builder",     label: "Builder\nAgent",     icon: "⚡", color: "#34d399", glow: "#059669", desc: "Generates production code",        angle: 54  },
  { id: "reviewer",    label: "Code Review\nAgent", icon: "🛡️", color: "#fb923c", glow: "#ea580c", desc: "Validates standards & quality",    angle: 126 },
  { id: "pr",          label: "PR\nAgent",          icon: "🚀", color: "#f472b6", glow: "#db2777", desc: "Ships to production",              angle: 198 },
];

const ORBIT_R = 220;
const CX = 400;
const CY = 380;
const NODE_R = 52;

function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function AgentNode({ agent, active, onClick }: { agent: typeof AGENTS[0]; active: boolean; onClick: () => void }) {
  const pos = polarToXY(agent.angle, ORBIT_R, CX, CY);
  return (
    <motion.g style={{ cursor: "pointer" }} onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: AGENTS.indexOf(agent) * 0.12 }}>
      <motion.circle cx={pos.x} cy={pos.y} r={NODE_R + 10} fill="none"
        stroke={agent.color} strokeWidth={active ? 2.5 : 1}
        animate={{ opacity: active ? [0.4, 0.7, 0.4] : 0.2 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      <circle cx={pos.x} cy={pos.y} r={NODE_R}
        fill={active ? `${agent.glow}33` : "#0f172a"}
        stroke={agent.color} strokeWidth={active ? 2 : 1.5} opacity={0.95}
        style={{ filter: active ? `drop-shadow(0 0 12px ${agent.glow}99)` : undefined }} />
      <text x={pos.x} y={pos.y - 8} textAnchor="middle" dominantBaseline="middle" fontSize="22">{agent.icon}</text>
      {agent.label.split("\n").map((line, i) => (
        <text key={i} x={pos.x} y={pos.y + 12 + i * 14} textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontWeight="600" fill={agent.color} fontFamily="Inter, system-ui, sans-serif">{line}</text>
      ))}
    </motion.g>
  );
}

function DesignSystemCore() {
  const components = [
    { label: "Button", color: "#a78bfa", x: -55, y: -30 },
    { label: "Input",  color: "#60a5fa", x:  20, y: -30 },
    { label: "Card",   color: "#34d399", x: -60, y:   8 },
    { label: "Badge",  color: "#fb923c", x:  20, y:   8 },
    { label: "Modal",  color: "#f472b6", x: -20, y:  40 },
  ];
  return (
    <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
      <motion.circle cx={CX} cy={CY} r={112} fill="none" stroke="#7c3aed" strokeWidth={1.5}
        strokeDasharray="6 4" opacity={0.3}
        animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${CX}px ${CY}px` }} />
      <circle cx={CX} cy={CY} r={96} fill="url(#coreGradient)" stroke="#6d28d9" strokeWidth={2}
        style={{ filter: "drop-shadow(0 0 24px #7c3aed55)" }} />
      <circle cx={CX} cy={CY} r={96} fill="none" stroke="#a78bfa" strokeWidth={1} opacity={0.4} />
      <text x={CX} y={CY - 55} textAnchor="middle" fontSize="10" fill="#c4b5fd"
        fontFamily="Inter, system-ui, sans-serif" fontWeight="500" letterSpacing="1.5" opacity={0.8}>DESIGN SYSTEM</text>
      <text x={CX} y={CY - 41} textAnchor="middle" fontSize="13" fill="#e9d5ff"
        fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.5">Playground</text>
      {components.map((c, i) => (
        <motion.g key={c.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }}>
          <rect x={CX + c.x - 20} y={CY + c.y - 7} width={c.label.length * 5.5 + 14} height={14} rx={3}
            fill={`${c.color}22`} stroke={c.color} strokeWidth={0.8} opacity={0.85} />
          <text x={CX + c.x + (c.label.length * 5.5 + 14) / 2 - 20} y={CY + c.y + 0.5}
            textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill={c.color}
            fontFamily="Inter, system-ui, sans-serif" fontWeight="600">{c.label}</text>
        </motion.g>
      ))}
      <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }}>
        <rect x={CX - 30} y={CY + 58} width={60} height={16} rx={8} fill="#3730a3" stroke="#818cf8" strokeWidth={1} />
        <text x={CX} y={CY + 66} textAnchor="middle" dominantBaseline="middle" fontSize="7.5"
          fill="#a5b4fc" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="1">LLM CONTEXT</text>
      </motion.g>
    </motion.g>
  );
}

export default function AISystemIllustration() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % AGENTS.length), 1800);
    return () => clearInterval(interval);
  }, []);

  const currentAgent = AGENTS[step];

  return (
    <div style={{
      background: "linear-gradient(135deg, #020617 0%, #0f0a1e 50%, #020617 100%)",
      borderRadius: "12px",
      padding: "1.25rem 0.5rem 0.75rem",
      border: "1px solid #1e293b",
      overflow: "hidden",
    }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
          background: "#1e1b4b", border: "1px solid #3730a3", borderRadius: 20,
          padding: "3px 12px", marginBottom: 8 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: 9, color: "#a5b4fc", letterSpacing: 2, fontWeight: 600 }}>AI-POWERED DESIGN-TO-PRODUCTION</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#f8fafc", lineHeight: 1.2, letterSpacing: -0.5, fontFamily: "Inter, system-ui, sans-serif" }}>
          Ship Production Code.{" "}
          <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            No Engineering Required.
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, fontFamily: "Inter, system-ui, sans-serif" }}>
          A 5-agent pipeline grounded in your Design System Playground
        </div>
      </motion.div>

      {/* SVG */}
      <svg width="100%" viewBox="0 0 800 760" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e1065" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f0a1e" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f0a1e" stopOpacity="0" />
          </radialGradient>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="#a78bfa" opacity={0.6} />
          </marker>
        </defs>

        <circle cx={CX} cy={CY} r={320} fill="url(#bgGlow)" />
        <motion.circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="#312e81"
          strokeWidth={1} strokeDasharray="3 6" opacity={0.4} />

        {/* Pipeline arrows */}
        {AGENTS.map((agent, i) => {
          const next = AGENTS[(i + 1) % AGENTS.length];
          const p1 = polarToXY(agent.angle, ORBIT_R, CX, CY);
          const p2 = polarToXY(next.angle, ORBIT_R, CX, CY);
          let toAngle = next.angle;
          if (toAngle <= agent.angle) toAngle += 360;
          const midAngle = (agent.angle + toAngle) / 2;
          const mid = polarToXY(midAngle, ORBIT_R + 28, CX, CY);
          const d = `M ${p1.x} ${p1.y} Q ${mid.x} ${mid.y} ${p2.x} ${p2.y}`;
          return (
            <motion.path key={`${agent.id}-${next.id}`} d={d} fill="none" stroke={agent.color}
              strokeWidth={1.5} strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: "easeOut" }}
              markerEnd="url(#arrowhead)" />
          );
        })}

        {/* Spokes */}
        {AGENTS.map((agent) => {
          const pos = polarToXY(agent.angle, ORBIT_R, CX, CY);
          const coreEdge = polarToXY(agent.angle, 98, CX, CY);
          const isActive = currentAgent.id === agent.id;
          return (
            <motion.line key={agent.id + "-spoke"} x1={coreEdge.x} y1={coreEdge.y} x2={pos.x} y2={pos.y}
              stroke={agent.color} strokeWidth={isActive ? 1.5 : 0.8} strokeDasharray="3 4"
              animate={{ opacity: isActive ? [0.35, 0.6, 0.35] : 0.2 }}
              transition={{ duration: 1.5, repeat: Infinity }} />
          );
        })}

        <DesignSystemCore />

        {AGENTS.map((agent) => (
          <AgentNode key={agent.id} agent={agent}
            active={currentAgent.id === agent.id || activeAgent === agent.id}
            onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)} />
        ))}

        {/* Pulse rings */}
        {AGENTS.map((agent) => {
          const pos = polarToXY(agent.angle, ORBIT_R, CX, CY);
          return currentAgent.id === agent.id ? (
            <motion.circle key={agent.id + "-pulse"} cx={pos.x} cy={pos.y} r={NODE_R + 4}
              fill="none" stroke={agent.color} strokeWidth={2}
              initial={{ r: NODE_R + 4, opacity: 0.8 }} animate={{ r: NODE_R + 22, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} />
          ) : null;
        })}

        {/* Step badges */}
        {AGENTS.map((agent, i) => {
          const pos = polarToXY(agent.angle, ORBIT_R + 72, CX, CY);
          return (
            <motion.g key={agent.id + "-badge"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.1 }}>
              <circle cx={pos.x} cy={pos.y} r={10} fill="#0f172a" stroke={agent.color} strokeWidth={1.2} opacity={0.9} />
              <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontWeight="700" fill={agent.color} fontFamily="Inter, system-ui, sans-serif">{i + 1}</text>
            </motion.g>
          );
        })}
      </svg>

      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginTop: -32, paddingBottom: 4 }}>
        {AGENTS.map((agent) => (
          <motion.div key={agent.id}
            animate={{ opacity: currentAgent.id === agent.id ? 1 : 0.45, scale: currentAgent.id === agent.id ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 4,
              background: currentAgent.id === agent.id ? `${agent.glow}22` : "#0f172a",
              border: `1px solid ${currentAgent.id === agent.id ? agent.color : "#1e293b"}`,
              borderRadius: 20, padding: "4px 8px" }}>
            <span style={{ fontSize: 11 }}>{agent.icon}</span>
            <span style={{ fontSize: 9, color: agent.color, fontWeight: 600, fontFamily: "Inter, system-ui, sans-serif" }}>
              {agent.label.replace("\n", " ")}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Active description */}
      <AnimatePresence mode="wait">
        <motion.div key={currentAgent.id}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: currentAgent.color,
            fontWeight: 500, fontFamily: "Inter, system-ui, sans-serif", paddingBottom: 4 }}>
          <span style={{ opacity: 0.5, color: "#64748b" }}>Active → </span>
          {currentAgent.icon} {currentAgent.label.replace("\n", " ")}:{" "}
          <span style={{ color: "#94a3b8" }}>{currentAgent.desc}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
