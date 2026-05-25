"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nikhilchandna", icon: "↗" },
  { label: "Email", href: "mailto:nikhil07@gmail.com", icon: "→" },
  { label: "Resume", href: "#", icon: "↓" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "7rem 3rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "-2rem",
          right: "-2rem",
          fontFamily: "var(--serif)",
          fontSize: "clamp(6rem, 14vw, 13rem)",
          fontWeight: 200,
          fontStyle: "italic",
          color: "var(--paper-warm)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        Hello.
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "1.75rem",
          }}
        >
          Let&apos;s build something
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--ink-muted)",
            }}
          >
            worth remembering.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: "1rem",
            color: "var(--ink-muted)",
            lineHeight: 1.75,
            marginBottom: "3rem",
            maxWidth: "420px",
          }}
        >
          I&apos;m currently open to senior design leadership roles and selective consulting
          engagements. If you&apos;re building something with real scale and real stakes, I&apos;d
          love to hear about it.
        </motion.p>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: "0" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem 0",
                borderTop: "1px solid var(--ink-faint)",
                textDecoration: "none",
                color: "var(--ink)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--ink)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 300,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {l.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  transition: "transform 0.2s",
                }}
              >
                {l.icon}
              </span>
            </a>
          ))}
          <div style={{ borderBottom: "1px solid var(--ink-faint)" }} />
        </motion.div>
      </div>
    </section>
  );
}
