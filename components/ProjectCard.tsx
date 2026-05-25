"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";

const AISystemIllustration = dynamic(() => import("./AISystemIllustration"), { ssr: false });

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      style={{
        borderTop: "1px solid var(--ink-faint)",
        padding: "4rem 0",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "baseline",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.02em",
          }}
        >
          {project.number}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {project.type}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.05em",
          }}
        >
          {project.year}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
          fontWeight: 300,
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
          fontSize: "1.1rem",
          color: "var(--ink-muted)",
          marginBottom: "2rem",
        }}
      >
        {project.subtitle}
      </p>

      {/* Meta bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 2rem",
          marginBottom: "2rem",
          padding: "1.5rem 0",
          borderTop: "1px solid var(--ink-faint)",
          borderBottom: "1px solid var(--ink-faint)",
        }}
      >
        {[
          { label: "Role", value: project.role },
          { label: "Company", value: project.company },
          { label: "Year", value: project.year },
        ].map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "0.25rem",
              }}
            >
              {m.label}
            </div>
            <div style={{ fontSize: "0.88rem", color: "var(--ink-muted)" }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <p
        style={{
          fontSize: "0.97rem",
          color: "var(--ink-muted)",
          lineHeight: 1.82,
          maxWidth: "600px",
          marginBottom: "1.5rem",
        }}
      >
        {project.summary}
      </p>

      {/* Expand / collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: 0,
          marginBottom: "1.5rem",
          fontSize: "0.72rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          fontFamily: "var(--sans)",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--ink)")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--ink-muted)")}
        aria-expanded={expanded}
      >
        <span>{expanded ? "Collapse" : "Read full case study"}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-flex", transformOrigin: "center" }}
        >
          ↓
        </motion.span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="case-study-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "3rem",
                marginBottom: "2rem",
              }}
            >
              {/* Narrative */}
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    The Problem
                  </p>
                  <p style={{ fontSize: "0.93rem", color: "var(--ink-muted)", lineHeight: 1.8 }}>
                    {project.summary}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    What I Did
                  </p>
                  <p style={{ fontSize: "0.93rem", color: "var(--ink-muted)", lineHeight: 1.8 }}>
                    {project.detail}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                        border: "1px solid var(--ink-faint)",
                        padding: "0.28rem 0.75rem",
                        borderRadius: "2rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Impact
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                  }}
                >
                  {project.impact.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: "var(--paper-warm)",
                        border: "1px solid var(--ink-faint)",
                        borderRadius: "6px",
                        padding: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "2rem",
                          fontWeight: 300,
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--ink-muted)",
                          lineHeight: 1.45,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual — illustration for product-x-code, placeholder for others */}
                {project.id === "product-x-code" ? (
                  <div style={{ marginTop: "2rem" }}>
                    <AISystemIllustration />
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "2rem",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--ink-faint)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--paper-deep)",
                        padding: "0.55rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        borderBottom: "1px solid var(--ink-faint)",
                      }}
                    >
                      <div style={{ display: "flex", gap: "5px" }}>
                        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                          <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "block" }} />
                        ))}
                      </div>
                      <div style={{ flex: 1, background: "white", borderRadius: "2rem", padding: "0.2rem 0.75rem",
                        fontSize: "0.7rem", color: "var(--ink-muted)", border: "1px solid var(--ink-faint)", textAlign: "center" }}>
                        {project.url}
                      </div>
                    </div>
                    <div style={{ height: "180px", background: "linear-gradient(135deg, var(--paper-warm) 0%, var(--paper-deep) 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
                        fontSize: "1.1rem", color: "var(--ink-faint)", textAlign: "center", padding: "0 2rem" }}>
                        Design artifacts & prototypes available on request
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
