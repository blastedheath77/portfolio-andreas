"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Warm accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "var(--accent)" }}
        />

        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="h-px w-6"
              style={{ background: "var(--accent)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
            }}
            className="text-5xl sm:text-6xl md:text-7xl mb-5"
          >
            Built with{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Claude Code
            </em>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
            className="mb-6"
          >
            A collection of web applications for education and community
          </motion.p>

          {/* Author + What is this? */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              Andreas Jonsson
            </span>
            <span style={{ color: "var(--border-card)" }}>·</span>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.8rem",
                color: "var(--accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textDecorationColor: "rgba(196,93,42,0.35)",
                textUnderlineOffset: "3px",
                transition: "text-decoration-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "rgba(196,93,42,0.35)")}
            >
              What is this?
            </button>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12"
            style={{ background: "rgba(28,20,16,0.7)", backdropFilter: "blur(6px)", cursor: "pointer" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl"
              style={{
                background: "var(--bg-base)",
                borderRadius: "10px",
                padding: "2.5rem",
                boxShadow: "0 24px 64px rgba(28,20,16,0.35)",
                cursor: "auto",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  background: "var(--bg-card)",
                  border: "none",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
              >
                Close
              </button>

              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-[10px]"
                style={{ background: "var(--accent)" }}
              />

              {/* Content */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "1.6rem",
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                Why these tools exist
              </h2>

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p>
                  Creative subjects — sound production, music, photography, lighting — are hard to teach through slides and PDFs. These are skills you learn by doing: adjusting a parameter, hearing the result, trying again. The knowledge is in the doing.
                </p>
                <p>
                  Interactive web tools have long offered a better approach. Sites like Ableton&apos;s{" "}
                  <em>Learning Synths</em> show what&apos;s possible when learners can manipulate the thing being taught rather than just read about it. But building tools like that has traditionally required specialist development teams — far beyond the reach of an individual educator.
                </p>
                <p>
                  AI coding tools have changed that. Using natural language alone, an educator can now translate their subject knowledge and teaching instincts directly into bespoke, browser-based interactive resources.
                </p>
                <p>
                  The projects here are the result of that shift — a portfolio of interactive learning tools built for Higher Education across sound production, music, photography, and visual arts, each designed around a simple idea: the best way to learn a creative skill is to play with it.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
