"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsGrid() {
  const [first, ...rest] = projects;

  return (
    <section
      id="projects"
      className="relative w-full px-6 md:px-12 lg:px-20 py-24"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <div
          className="h-px w-12"
          style={{ background: "var(--accent)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Projects
        </span>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="flex flex-col gap-4">
        {/* Row 1: Featured card full-width on mobile, 2/3 + 1/3 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ProjectCard project={first} index={0} featured />
          </div>
          <div className="lg:col-span-1">
            <ProjectCard project={rest[0]} index={1} />
          </div>
        </div>

        {/* Row 2: 1/3 + 2/3 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <ProjectCard project={rest[1]} index={2} />
          </div>
          <div className="lg:col-span-2">
            <ProjectCard project={rest[2]} index={3} />
          </div>
        </div>

        {/* Row 3: Last card, centred at half width on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard project={rest[3]} index={4} />
          {/* Decorative empty cell with border accent */}
          <div
            className="hidden md:flex items-center justify-center relative overflow-hidden"
            style={{
              border: "1px solid var(--border-subtle)",
              minHeight: "200px",
            }}
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              More coming
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
