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
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-subtle)",
          boxShadow: "0 1px 0 var(--border-subtle)",
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
                className="relative flex items-center gap-2.5 px-4 py-4 flex-shrink-0"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isActive
                    ? "var(--text-primary)"
                    : isHovered
                    ? "var(--text-secondary)"
                    : "var(--text-muted)",
                  transition: "color 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.65rem",
                    color: isActive
                      ? "var(--accent)"
                      : isHovered
                      ? "rgba(196,93,42,0.6)"
                      : "var(--text-muted)",
                    letterSpacing: "0.06em",
                    transition: "color 0.2s",
                  }}
                >
                  {String(p.id).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
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
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start"
          >
            {/* Screenshot — 3/5 width on desktop */}
            <div className="lg:col-span-3">
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-card)",
                  boxShadow: "0 4px 24px rgba(90,60,30,0.08), 0 1px 4px rgba(90,60,30,0.06)",
                }}
              >
                {currentScreenshot ? (
                  <>
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
                          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"
                          style={{ background: "rgba(28,20,16,0.28)" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontFamily: "var(--font-body)",
                              fontWeight: 500,
                              fontSize: "0.72rem",
                              color: "#fff",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              background: "rgba(196,93,42,0.9)",
                              padding: "8px 18px",
                              borderRadius: "4px",
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
                        className="flex items-center justify-between px-4 py-2.5"
                        style={{ borderTop: "1px solid var(--border-subtle)" }}
                      >
                        <div className="flex items-center gap-1.5">
                          {screenshots.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setScreenshotIndex(i)}
                              style={{
                                width: i === screenshotIndex ? "16px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                background: i === screenshotIndex ? "var(--accent)" : "var(--bg-card)",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.25s ease, background 0.2s",
                              }}
                              aria-label={`Screenshot ${i + 1}`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={prevScreenshot}
                            style={{
                              background: "var(--bg-base)",
                              border: "1px solid var(--border-card)",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.8rem",
                              borderRadius: "4px",
                              transition: "color 0.2s, border-color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--accent)";
                              e.currentTarget.style.borderColor = "var(--accent)";
                              e.currentTarget.style.background = "var(--accent-light)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-muted)";
                              e.currentTarget.style.borderColor = "var(--border-card)";
                              e.currentTarget.style.background = "var(--bg-base)";
                            }}
                            aria-label="Previous screenshot"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextScreenshot}
                            style={{
                              background: "var(--bg-base)",
                              border: "1px solid var(--border-card)",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.8rem",
                              borderRadius: "4px",
                              transition: "color 0.2s, border-color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--accent)";
                              e.currentTarget.style.borderColor = "var(--accent)";
                              e.currentTarget.style.background = "var(--accent-light)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-muted)";
                              e.currentTarget.style.borderColor = "var(--border-card)";
                              e.currentTarget.style.background = "var(--bg-base)";
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
                    className="flex items-center justify-center"
                    style={{ minHeight: "300px" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
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
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    letterSpacing: "-0.01em",
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
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  {project.description}
                </p>
                {project.inspiration && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
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
                        borderBottom: "1px solid rgba(196,93,42,0.3)",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(196,93,42,0.3)")}
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
                className="inline-flex items-center gap-3 self-start rounded"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  background: "var(--accent)",
                  padding: "10px 22px",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-hover)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,93,42,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
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
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          <span style={{ color: "var(--accent)" }}>{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(projects.length).padStart(2, "0")}</span>
          <div style={{ flex: 1, height: "2px", background: "var(--bg-card)", maxWidth: "120px", borderRadius: "2px" }}>
            <div
              style={{
                height: "100%",
                background: "var(--accent)",
                width: `${((active + 1) / projects.length) * 100}%`,
                transition: "width 0.4s ease",
                borderRadius: "2px",
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
            style={{ background: "rgba(28,20,16,0.88)", backdropFilter: "blur(8px)", cursor: "zoom-out" }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(253,250,246,0.95)",
                border: "none",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                padding: "6px 14px",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.background = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "rgba(253,250,246,0.95)";
              }}
            >
              ESC
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(95vw, 1800px)",
                maxHeight: "90vh",
                overflow: "auto",
                borderRadius: "8px",
                boxShadow: "0 24px 80px rgba(28,20,16,0.5)",
              }}
            >
              <Image
                src={currentScreenshot}
                alt={`${project.title} screenshot`}
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
