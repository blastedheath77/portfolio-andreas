"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTag from "./CategoryTag";
import { projects } from "@/data/projects";

export default function ProjectsShowcase() {
  const [active, setActive] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects[active];
  const screenshots = project.screenshots ?? [];
  const currentScreenshot = screenshots[screenshotIndex];
  const hasMultiple = screenshots.length > 1;

  function handleTabChange(i: number) {
    setActive(i);
    setScreenshotIndex(0);
  }

  function prevScreenshot(e: React.MouseEvent) {
    e.stopPropagation();
    setScreenshotIndex((idx) => (idx - 1 + screenshots.length) % screenshots.length);
  }

  function nextScreenshot(e: React.MouseEvent) {
    e.stopPropagation();
    setScreenshotIndex((idx) => (idx + 1) % screenshots.length);
  }

  return (
    <section id="projects" className="relative w-full">
      {/* Tab bar */}
      <div
        className="sticky top-0 z-20 w-full overflow-x-auto"
        style={{
          background: "rgba(8,10,14,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex min-w-max px-6 md:px-12 lg:px-20">
          {projects.map((p, i) => {
            const isActive = i === active;
            const isHovered = hoveredTab === i;
            return (
              <button
                key={p.id}
                onClick={() => handleTabChange(i)}
                onMouseEnter={() => setHoveredTab(i)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative flex items-center gap-2.5 px-5 py-4 flex-shrink-0"
                style={{
                  background: isHovered && !isActive ? "rgba(0,245,255,0.04)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isActive || isHovered ? "var(--text-primary)" : "var(--text-muted)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: isActive ? "var(--accent)" : isHovered ? "rgba(0,245,255,0.6)" : "var(--text-muted)",
                    letterSpacing: "0.08em",
                    transition: "color 0.2s",
                  }}
                >
                  {String(p.id).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                >
                  {p.title}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {isHovered && !isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: "rgba(0,245,255,0.3)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="px-6 md:px-12 lg:px-20 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start"
          >
            {/* Screenshot — 3/5 width on desktop */}
            <div className="lg:col-span-3">
              <div
                className="relative w-full overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-card)",
                }}
              >
                {currentScreenshot ? (
                  <>
                    {/* Image + expand overlay */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={screenshotIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setLightboxOpen(true)}
                        style={{
                          display: "flex",
                          justifyContent: project.screenshotMaxWidth ? "center" : undefined,
                          padding: project.screenshotMaxWidth ? "2rem" : undefined,
                          cursor: "zoom-in",
                          position: "relative",
                        }}
                        title="Click to enlarge"
                      >
                        <Image
                          src={currentScreenshot}
                          alt={`${project.title} screenshot ${screenshotIndex + 1}`}
                          width={0}
                          height={0}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          style={{
                            width: project.screenshotMaxWidth ?? "100%",
                            height: "auto",
                            display: "block",
                          }}
                          priority
                        />
                        {/* Expand hint */}
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                          style={{ background: "rgba(8,10,14,0.45)" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.7rem",
                              color: "var(--accent)",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              border: "1px solid rgba(0,245,255,0.4)",
                              padding: "8px 16px",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Expand
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Arrow navigation */}
                    {hasMultiple && (
                      <div
                        className="flex items-center justify-between px-3 py-2"
                        style={{ borderTop: "1px solid var(--border-subtle)" }}
                      >
                        {/* Dot indicators */}
                        <div className="flex items-center gap-1.5">
                          {screenshots.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setScreenshotIndex(i)}
                              style={{
                                width: i === screenshotIndex ? "16px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                background: i === screenshotIndex ? "var(--accent)" : "var(--text-muted)",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.25s ease, background 0.2s",
                              }}
                              aria-label={`Screenshot ${i + 1}`}
                            />
                          ))}
                        </div>

                        {/* Prev / Next */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={prevScreenshot}
                            style={{
                              background: "none",
                              border: "1px solid var(--border-card)",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              transition: "color 0.2s, border-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--accent)";
                              e.currentTarget.style.borderColor = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-muted)";
                              e.currentTarget.style.borderColor = "var(--border-card)";
                            }}
                            aria-label="Previous screenshot"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextScreenshot}
                            style={{
                              background: "none",
                              border: "1px solid var(--border-card)",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem",
                              transition: "color 0.2s, border-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--accent)";
                              e.currentTarget.style.borderColor = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-muted)";
                              e.currentTarget.style.borderColor = "var(--border-card)";
                            }}
                            aria-label="Next screenshot"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="grid-bg flex items-center justify-center"
                    style={{ minHeight: "300px" }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                      Screenshot coming soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info — 2/5 width on desktop */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <CategoryTag label={project.category} variant="category" />
                <h2
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h2>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                  }}
                >
                  {project.description}
                </p>
                {project.inspiration && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                      marginTop: "0.75rem",
                    }}
                  >
                    Inspired by{" "}
                    <a
                      href={project.inspiration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent)",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(0,245,255,0.3)",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,245,255,0.3)")}
                    >
                      {project.inspiration.label}
                    </a>
                    .
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techTags.map((tag) => (
                  <CategoryTag key={tag} label={tag} variant="tech" />
                ))}
              </div>

              <div style={{ height: "1px", background: "var(--border-subtle)" }} />

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 self-start"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  border: "1px solid rgba(0,245,255,0.3)",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,245,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>View Project</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project counter */}
        <div
          className="mt-12 flex items-center gap-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
          }}
        >
          <span style={{ color: "var(--accent)" }}>{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(projects.length).padStart(2, "0")}</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)", maxWidth: "120px" }}>
            <div
              style={{
                height: "100%",
                background: "var(--accent)",
                width: `${((active + 1) / projects.length) * 100}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(4,6,9,0.92)", backdropFilter: "blur(8px)", cursor: "zoom-out" }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "1px solid var(--border-card)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "6px 12px",
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border-card)";
              }}
            >
              ESC
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(95vw, 1800px)",
                maxHeight: "90vh",
                overflow: "auto",
                border: "1px solid var(--border-card)",
                boxShadow: "0 0 80px rgba(0,245,255,0.06)",
              }}
            >
              <Image
                src={currentScreenshot}
                alt={`${project.title} screenshot`}
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
