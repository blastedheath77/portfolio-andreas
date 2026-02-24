"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col items-start justify-center overflow-hidden scanlines px-6 md:px-12 lg:px-20 py-16 md:py-20"
    >
      {/* Background: drifting gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div className="grid-bg absolute inset-0 opacity-100" />

        {/* Blob 1 — cyan */}
        <div
          className="animate-drift absolute rounded-full blur-3xl"
          style={{
            width: "60vw",
            height: "60vw",
            top: "-20%",
            left: "-15%",
            background:
              "radial-gradient(ellipse, rgba(0,245,255,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Blob 2 — indigo hint */}
        <div
          className="animate-drift2 absolute rounded-full blur-3xl"
          style={{
            width: "50vw",
            height: "50vw",
            bottom: "-15%",
            right: "-10%",
            background:
              "radial-gradient(ellipse, rgba(80,60,200,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top-right corner decoration */}
      <div
        className="absolute top-8 right-8 md:top-12 md:right-12 text-right hidden sm:block"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          letterSpacing: "0.12em",
        }}
      >
        <div>AJ / 2025</div>
        <div
          className="mt-1 h-px w-16 ml-auto"
          style={{ background: "var(--text-muted)" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="h-px w-8"
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
            Portfolio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
          }}
          className="text-4xl sm:text-5xl md:text-6xl mb-4"
        >
          Built with{" "}
          <span
            className="text-glow"
            style={{ color: "var(--accent)" }}
          >
            Claude Code
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "560px",
          }}
          className="mb-4"
        >
          A collection of web applications for education and community
        </motion.p>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          Andreas Jonsson
        </motion.div>
      </div>

      {/* Bottom divider line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-subtle) 20%, var(--border-subtle) 80%, transparent)",
        }}
      />
    </section>
  );
}
