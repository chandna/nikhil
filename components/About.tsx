"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    years: "2015–2026",
    role: "Staff Product Designer",
    company: "LinkedIn · Bengaluru",
    note: "Community experiences, sales intelligence, AI systems",
  },
  {
    years: "2012–2015",
    role: "UX Designer",
    company: "SlideShare · Delhi",
    note: "World's largest professional content platform",
  },
  {
    years: "Earlier",
    role: "Designer",
    company: "IndiaMart · Noida",
    note: "India's largest B2B platform",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "7rem 3rem",
        borderBottom: "1px solid var(--ink-faint)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "5rem",
          alignItems: "start",
          maxWidth: "1200px",
        }}
        className="about-grid"
      >
        {/* Label column */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              position: "sticky",
              top: "6rem",
            }}
          >
            About
          </motion.div>
        </div>

        {/* Body column */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            The best design is the kind nobody notices.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p
              style={{
                color: "var(--ink-muted)",
                fontSize: "1.05rem",
                lineHeight: 1.82,
                marginBottom: "1.25rem",
              }}
            >
              I believe the best design is invisible. No friction, no confusion — just the feeling that something works exactly the way it should. Getting there takes obsession with the details most people skip.
            </p>
            <p
              style={{
                color: "var(--ink-muted)",
                fontSize: "1.05rem",
                lineHeight: 1.82,
                marginBottom: "2rem",
              }}
            >
              I&apos;ve spent 15 years designing at both ends of the spectrum — consumer products and enterprise tools. I started at IndiaMart, India&apos;s largest B2B platform, helping small businesses find their footing on the internet. Then SlideShare, where I helped grow the world&apos;s largest professional content platform. Eleven years ago I joined LinkedIn Bangalore, and since then I&apos;ve designed products used by hundreds of millions of professionals — from community experiences to sales intelligence tools.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Career timeline
            </p>
            {timeline.map((t) => (
              <div
                key={t.role + t.years}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: "1.5rem",
                  padding: "1rem 0",
                  borderTop: "1px solid var(--ink-faint)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "var(--ink-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {t.years}
                </span>
                <div>
                  <p style={{ fontWeight: 500, fontSize: "0.92rem", marginBottom: "0.15rem" }}>
                    {t.role}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--ink-muted)" }}>
                    {t.company}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--ink-faint)", marginTop: "0.2rem" }}>
                    {t.note}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
