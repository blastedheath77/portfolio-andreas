"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CategoryTag from "./CategoryTag";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow =
          "0 0 0 1px var(--accent), 0 0 24px rgba(0,245,255,0.12), 0 0 60px rgba(0,245,255,0.04)";
        el.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--border-card)";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, var(--accent), transparent 60%)",
        }}
      />

      {/* Screenshot / Visual area */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          height: featured ? "280px" : "200px",
          background: "var(--bg-surface)",
        }}
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg" style={{ opacity: 0.6 }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl select-none" style={{ opacity: 0.12 }}>
                {getProjectIcon(project.id)}
              </span>
            </div>
          </>
        )}
        {/* Corner index */}
        <div
          className="absolute top-3 right-3 text-xs tabular-nums z-10"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {String(project.id).padStart(2, "0")}
        </div>
        {/* Subtle gradient fade at the bottom of the image */}
        {project.screenshot && (
          <div
            className="absolute bottom-0 left-0 right-0 h-12 z-10"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--bg-card))",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex flex-col gap-2">
          <CategoryTag label={project.category} variant="category" />
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: featured ? "1.6rem" : "1.25rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h2>
        </div>

        <p
          className="leading-relaxed flex-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            lineHeight: "1.75",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techTags.map((tag) => (
            <CategoryTag key={tag} label={tag} variant="tech" />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-2 pt-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group/link"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span>View Project</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function getProjectIcon(id: number): string {
  const icons: Record<number, string> = {
    1: "◈",
    2: "◉",
    3: "◎",
    4: "◇",
    5: "◆",
  };
  return icons[id] ?? "○";
}
