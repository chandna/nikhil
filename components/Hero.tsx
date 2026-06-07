"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const HeroMockMarquee = dynamic(() => import("./HeroMockMarquee"), { ssr: false });
const HeroSlideshow = dynamic(() => import("./HeroSlideshow"), { ssr: false });

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: -999, y: -999 });
  const [view, setView] = useState<"marquee" | "slideshow">("slideshow");

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Watermark drifts subtly opposite to the mouse
  const watermarkX = useTransform(springX, [0, 1], [20, -20]);
  const watermarkY = useTransform(springY, [0, 1], [10, -10]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
      setSpotlight({ x: -999, y: -999 });
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 3rem 5rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--ink-faint)",
      }}
    >
      {/* Spotlight glow that follows cursor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(200,75,47,0.05), transparent 70%)`,
        }}
      />

      {/* Background watermark with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          x: watermarkX,
          y: watermarkY,
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

      {/* Right panel — desktop only, absolute full hero height */}
      <motion.div
        className="hero-right-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "52%",
          height: "100%",
          zIndex: 1,
          pointerEvents: view === "slideshow" ? "auto" : "none",
        }}
      >
        {view === "marquee" ? <HeroMockMarquee /> : <HeroSlideshow />}
      </motion.div>

      {/* Content — left side */}
      <div className="hero-left-content" style={{ position: "relative", zIndex: 2, maxWidth: "48%", marginTop: "auto", paddingTop: "8rem" }}>
        <div>
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
          Hi, I&apos;m Nikhil.
        </motion.p>

        <motion.h1
          {...fadeUp(0.5)}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            marginBottom: "1.75rem",
          }}
        >
          I craft experiences
          <br />
          <em style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>
            that connect millions.
          </em>
        </motion.h1>

        {/* Role tag */}
        <motion.div {...fadeUp(0.65)} style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Staff Product Designer · LinkedIn
          </p>
        </motion.div>

        <motion.p
          {...fadeUp(0.8)}
          style={{
            maxWidth: "440px",
            fontSize: "1rem",
            color: "var(--ink-muted)",
            lineHeight: 1.75,
            marginBottom: "3rem",
          }}
        >
          Fifteen years shaping how hundreds of millions of people experience
          the web, from professional communities to enterprise sales
          intelligence.
        </motion.p>

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
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--ink)")}
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
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--ink-muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ink-faint)";
            }}
          >
            About me
          </a>
        </motion.div>
        </div>
      </div>

      {/* Mobile slideshow — shown below text on small screens */}
      <motion.div
        className="hero-mobile-slideshow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ position: "relative", zIndex: 2, width: "100%", height: "70vh", marginTop: "2rem" }}
      >
        <HeroSlideshow />
      </motion.div>

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
