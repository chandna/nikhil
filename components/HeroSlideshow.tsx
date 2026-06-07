"use client";

import { FeatureCarousel } from "@/components/ui/feature-carousel";

const mocks = [
  { src: "/mocks/27.png",                     alt: "Warm Introductions",        width: 393,  height: 900 },
  { src: "/mocks/Find the right people.png",  alt: "Find the right people",     width: 1440, height: 900 },
  { src: "/mocks/29.png",                     alt: "Message compose",           width: 393,  height: 900 },
  { src: "/mocks/Frame 2025790875.png",       alt: "Sales Navigator",           width: 1440, height: 900 },
  { src: "/mocks/128.png",                    alt: "Group creation",            width: 393,  height: 900 },
  { src: "/mocks/Frame 2147234937.png",       alt: "Groups organizer",          width: 1440, height: 900 },
  { src: "/mocks/129.png",                    alt: "Group onboarding",          width: 393,  height: 900 },
  { src: "/mocks/130.png",                    alt: "Group settings",            width: 393,  height: 900 },
  { src: "/mocks/131.png",                    alt: "Member management",         width: 393,  height: 900 },
];

export default function HeroSlideshow() {
  return (
    <div style={{ width: "100%", height: "100%", paddingTop: "4rem", paddingBottom: "4rem" }}>
      <FeatureCarousel images={mocks} />
    </div>
  );
}
