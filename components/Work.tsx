"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
      ref={ref}
      style={{
        padding: "7rem 3rem",
        borderBottom: "1px solid var(--ink-faint)",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Selected work
        </h2>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          {projects.length} case studies
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontSize: "0.85rem",
          color: "var(--ink-faint)",
          fontStyle: "italic",
          fontFamily: "var(--serif)",
          marginBottom: "0",
        }}
      >
        Click &ldquo;Read full case study&rdquo; to expand each project.
      </motion.p>

      {/* Projects */}
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
