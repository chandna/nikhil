"use client";

import { FeatureCarousel } from "@/components/ui/feature-carousel";

const mocks = [
  { src: "/mocks/warm-intro-message.png",        alt: "Warm intro message",          width: 393,  height: 900 },
  { src: "/mocks/warm-intro-3way-message.png",    alt: "Warm intro 3-way message",    width: 393,  height: 900 },
  { src: "/mocks/sn-value-reporting.png",         alt: "SN value reporting",          width: 1440, height: 900 },
  { src: "/mocks/sn-scheduled-message.png",       alt: "SN scheduled message",        width: 1440, height: 900 },
  { src: "/mocks/group-creation.png",             alt: "Group creation",              width: 393,  height: 900 },
  { src: "/mocks/group-welcome-new-member.png",   alt: "Group welcome new member",    width: 393,  height: 900 },
  { src: "/mocks/group-analytics.png",            alt: "Group analytics",             width: 393,  height: 900 },
  { src: "/mocks/group-detail-mobile.png",        alt: "Group detail mobile",         width: 393,  height: 900 },
  { src: "/mocks/group-detail-web.png",           alt: "Group detail web",            width: 1440, height: 900 },
];

export default function HeroSlideshow() {
  return (
    <div style={{ width: "100%", height: "100%", paddingTop: "4rem", paddingBottom: "4rem" }}>
      <FeatureCarousel images={mocks} />
    </div>
  );
}
