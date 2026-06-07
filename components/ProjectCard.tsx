"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid var(--ink-faint)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        background: "var(--paper-deep)",
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          background: "var(--paper-deep)",
          padding: "0.6rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          borderBottom: "1px solid var(--ink-faint)",
        }}
      >
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "var(--paper-warm)",
            borderRadius: "2rem",
            padding: "0.22rem 0.75rem",
            fontSize: "0.68rem",
            color: "var(--ink-muted)",
            border: "1px solid var(--ink-faint)",
            textAlign: "center",
            letterSpacing: "0.01em",
          }}
        >
          {url}
        </div>
      </div>
      {/* Content */}
      {children}
    </div>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{ borderTop: "1px solid var(--ink-faint)", padding: "4rem 0" }}
    >
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "0.85rem", color: "var(--ink-faint)", letterSpacing: "0.02em" }}>
          {project.number}
        </span>
        <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
          {project.type}
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--ink-faint)", letterSpacing: "0.05em" }}>
          {project.year}
        </span>
      </div>

      {/* Title + summary left, video right — two col */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "3.5rem",
          alignItems: "start",
        }}
        className="project-main-grid"
      >
        {/* Left: text */}
        <div>
          <h3
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1rem",
              color: "var(--ink-muted)",
              marginBottom: "1.5rem",
            }}
          >
            {project.subtitle}
          </p>

          <p style={{ fontSize: "0.93rem", color: "var(--ink-muted)", lineHeight: 1.82, marginBottom: "1.75rem" }}>
            {project.summary}
          </p>

          {/* Impact stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
            {project.impact.map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.6rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                    flexShrink: 0,
                  }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.45 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  border: "1px solid var(--ink-faint)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "2rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: 0,
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              fontFamily: "var(--sans)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-muted)")}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Collapse" : "Read full case study"}</span>
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              ↓
            </motion.span>
          </button>
        </div>

        {/* Right: video in browser chrome */}
        <div>
          <BrowserChrome url={project.url}>
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", display: "block", height: "auto" }}
            />
          </BrowserChrome>
        </div>
      </div>

      {/* Expanded case study detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: "3rem",
                paddingTop: "3rem",
                borderTop: "1px solid var(--ink-faint)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "3rem",
              }}
            >
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem" }}>
                  The Problem
                </p>
                <p style={{ fontSize: "0.93rem", color: "var(--ink-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  {project.summary}
                </p>
                <p style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem" }}>
                  What I Did
                </p>
                <p style={{ fontSize: "0.93rem", color: "var(--ink-muted)", lineHeight: 1.8 }}>
                  {project.detail}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
                  Impact
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {project.impact.map((stat) => (
                    <div
                      key={stat.label}
                      style={{ background: "var(--paper-warm)", border: "1px solid var(--ink-faint)", borderRadius: "6px", padding: "1.25rem" }}
                    >
                      <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "var(--ink-muted)", lineHeight: 1.45 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
