"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 md:px-12 lg:px-20 py-10"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Built by Andreas Jonsson using{" "}
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              opacity: 0.8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            Claude Code
          </a>{" "}
          · 2025
        </p>

        <div
          className="h-px w-16"
          style={{
            background: "linear-gradient(90deg, var(--border-subtle), transparent)",
          }}
        />
      </motion.div>
    </footer>
  );
}
