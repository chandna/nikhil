"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/3d-marquee";

const mobileMocks = [
  "/mocks/warm-intro-message.png",
  "/mocks/warm-intro-3way-message.png",
  "/mocks/group-creation.png",
  "/mocks/group-welcome-new-member.png",
  "/mocks/group-analytics.png",
  "/mocks/group-detail-mobile.png",
];

const desktopMocks = [
  "/mocks/sn-value-reporting.png",
  "/mocks/sn-scheduled-message.png",
  "/mocks/group-detail-web.png",
];

function MobileCard({ src }: { src: string }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "160px",
      borderRadius: "10px",
      overflow: "hidden",
      border: "1px solid var(--ink-faint)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      background: "var(--paper-deep)",
    }}>
      <Image src={src} alt="Mobile mock" width={393} height={900}
        style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}

function DesktopCard({ src }: { src: string }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "320px",
      borderRadius: "10px",
      overflow: "hidden",
      border: "1px solid var(--ink-faint)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      background: "var(--paper-deep)",
    }}>
      <Image src={src} alt="Desktop mock" width={1440} height={900}
        style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}

export default function HeroMockMarquee() {
  return (
    <div
      className="relative flex w-full flex-row items-center justify-center overflow-hidden"
      style={{ perspective: "300px", height: "100%", background: "var(--paper)" }}
    >
      <div
        className="flex flex-row items-center gap-3"
        style={{
          transform: "translateX(-20px) translateZ(-80px) rotateX(15deg) rotateY(-8deg) rotateZ(15deg)",
          height: "100%",
        }}
      >
        {/* Narrow — mobile */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:28s]">
          {mobileMocks.slice(0, 3).map((src) => <MobileCard key={src} src={src} />)}
        </Marquee>

        {/* Wide — desktop */}
        <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:36s]">
          {desktopMocks.map((src) => <DesktopCard key={src} src={src} />)}
        </Marquee>

        {/* Narrow — mobile */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:32s]">
          {mobileMocks.slice(3, 6).map((src) => <MobileCard key={src} src={src} />)}
        </Marquee>

        {/* Narrow — mobile */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:30s]">
          {mobileMocks.slice(0, 3).map((src) => <MobileCard key={src} src={src} />)}
        </Marquee>
      </div>

      {/* Gradient overlays — outside transform, using CSS var to exactly match page bg */}
      <div style={{ position: "absolute", inset: 0, top: 0, left: 0, right: 0, height: "40%", pointerEvents: "none", background: "linear-gradient(to bottom, var(--paper) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", pointerEvents: "none", background: "linear-gradient(to top, var(--paper) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", pointerEvents: "none", background: "linear-gradient(to right, var(--paper) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "25%", pointerEvents: "none", background: "linear-gradient(to left, var(--paper) 0%, transparent 100%)" }} />
    </div>
  );
}
