"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
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

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
          }}
        >
          Andreas Jonsson
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--border-subtle)" }}
      />
    </section>
  );
}
