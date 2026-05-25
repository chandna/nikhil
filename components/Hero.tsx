"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const stats = [
  { num: "15+", label: "Years in craft" },
  { num: "400M", label: "People reached" },
  { num: "3", label: "Deep case studies" },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 5rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--ink-faint)",
      }}
    >
      {/* Background watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--serif)",
          fontSize: "clamp(7rem, 17vw, 16rem)",
          fontWeight: 200,
          fontStyle: "italic",
          color: "var(--paper-warm)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        Design
      </motion.div>

      {/* Decorative top-right element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: "absolute",
          top: "6rem",
          right: "3rem",
          textAlign: "right",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "80px",
            background: "var(--ink-faint)",
            marginLeft: "auto",
            marginBottom: "1rem",
          }}
        />
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            display: "inline-block",
          }}
        >
          Available for new opportunities
        </p>
      </motion.div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.25rem",
          }}
        >
          Staff Product Designer · LinkedIn
        </motion.p>

        <motion.p
          {...fadeUp(0.4)}
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "var(--ink-muted)",
            marginBottom: "0.75rem",
          }}
        >
          Hi, I&apos;m Nikhil —
        </motion.p>

        <motion.h1
          {...fadeUp(0.5)}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            marginBottom: "1.75rem",
          }}
        >
          I design simple things
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--ink-muted)",
            }}
          >
            that connect millions.
          </em>
        </motion.h1>

        <motion.p
          {...fadeUp(0.65)}
          style={{
            maxWidth: "440px",
            fontSize: "1rem",
            color: "var(--ink-muted)",
            lineHeight: 1.75,
            marginBottom: "3rem",
          }}
        >
          Fifteen years shaping how hundreds of millions of people experience
          the web — from professional communities to enterprise sales
          intelligence.
        </motion.p>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.8)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginTop: "0.3rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "var(--ink-faint)",
                    margin: "0 2.5rem",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.95)}
          style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <a
            href="#work"
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--paper)",
              background: "var(--ink)",
              padding: "0.7rem 1.75rem",
              borderRadius: "2rem",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--ink)")}
          >
            See the work
          </a>
          <a
            href="#about"
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ink-faint)",
              paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--ink)";
              (e.target as HTMLElement).style.borderColor = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--ink-muted)";
              (e.target as HTMLElement).style.borderColor = "var(--ink-faint)";
            }}
          >
            About me
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--ink-faint), transparent)",
            transformOrigin: "top",
          }}
        />
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
