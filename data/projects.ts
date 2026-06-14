export interface Project {
  id: string;
  number: string;
  type: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  company: string;
  summary: string;
  detail: string;
  impact: { value: string; label: string }[];
  tags: string[];
  url: string;
  video: string;
}

export const projects: Project[] = [
  {
    id: "warm-introductions",
    number: "01",
    type: "Enterprise · LinkedIn Sales Navigator",
    title: "Warm Introductions",
    subtitle: "From opportunistic to strategic",
    year: "2026",
    role: "Staff Product Designer",
    company: "LinkedIn",
    summary:
      "Sellers knew warm intros converted far better than cold outreach. Some reported 80% meeting conversion when the introducer had real shared history with the lead. Yet most still defaulted to cold. The problem wasn't intent. It was confidence and effort.",
    detail:
      "I redesigned the entire warm intro experience on Sales Navigator: consolidating four fragmented connection surfaces into a single trusted entry point, designing a weighted ranking system that surfaces the highest-quality paths first, and defining the explainability layer that gave sellers the language to act. The strategic reframe driving every decision: move sellers from \"do I happen to have a connection here?\" to \"where should I focus given my network advantage?\"",
    impact: [
      { value: "77%", label: "of enterprise sellers reported 2x or more conversion over cold outreach" },
      { value: "90%", label: "of Sales Navigator users not yet engaging with connection surfaces, the redesign's target audience" },
    ],
    tags: ["Enterprise Sales Navigator", "IA & Systems", "AI Ranking", "Explainability", "UX Strategy"],
    url: "linkedin.com/sales/search/people",
    video: "/videos/warm-introductions.mp4",
  },
  {
    id: "product-x-code",
    number: "02",
    type: "Design Engineering · AI Systems · LinkedIn Sales Navigator",
    title: "Product × Code",
    subtitle: "Designers who ship to production",
    year: "2026",
    role: "Staff Product Designer",
    company: "LinkedIn",
    summary:
      "The gap between a design decision and a shipped pixel has always been measured in weeks and meetings. I built a system to close it to hours, no engineer required.",
    detail:
      "Using Cursor and a custom multi-agent pipeline, I created a Design Systems Playground: a living reference of every Sales Navigator UI component, pattern, icon, and coding standard. Five AI agents (Investigator, Builder, Code Review, PR, Setup) use this playground as their source of truth to resolve Jira tickets, write production-grade Ember.js code, and open pull requests on LinkedIn's codebase. The result: 8 designers on the Sales Navigator team can now ship frontend changes independently, from bug fixes to new UI patterns, without a single engineering handoff.",
    impact: [
      { value: "8", label: "non-coder designers empowered to merge production PRs on LinkedIn's codebase" },
      { value: "Hours", label: "design-to-deployment compressed from weeks to hours" },
    ],
    tags: ["AI Agents", "Design Systems", "Design Leadership", "Design Engineering"],
    url: "linkedin.com/sales/playground",
    video: "/videos/product-x-code.mp4",
  },
  {
    id: "groups-organizer",
    number: "03",
    type: "Consumer · LinkedIn Groups",
    title: "Groups Organizer",
    subtitle: "Rebuilding community from the ground up",
    year: "2022",
    role: "Staff Product Designer",
    company: "LinkedIn",
    summary:
      "LinkedIn Groups had a participation crisis. The experience hadn't kept pace with how professional communities actually work. Organizers were drowning in manual overhead: reviewing every membership request one by one, manually welcoming each new member, moderating posts without tools to help.",
    detail:
      "I led the end-to-end redesign of the Groups Organizer experience, from the moment a group is created, through member onboarding, to ongoing management. The work spanned automated membership review with configurable criteria, automated post moderation, an analytics dashboard giving organizers clarity on what's working, and a rethought onboarding flow that helped admins build communities worth joining from day one. 50% of membership requests went unactioned in the first week. 80% of admins approved every request indiscriminately. The automation didn't just save time. It improved community quality.",
    impact: [
      { value: "50%", label: "of membership requests went unactioned in the first week, addressed by automation" },
      { value: "80%", label: "of admins previously approved every request indiscriminately, quality now configurable" },
    ],
    tags: ["Consumer", "LinkedIn Groups", "Community", "End-to-end Design", "Automation", "Mobile"],
    url: "linkedin.com/groups",
    video: "/videos/groups-organizer.mp4",
  },
];
