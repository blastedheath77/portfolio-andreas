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
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "0.8rem",
            color: "var(--text-muted)",
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
              borderBottom: "1px solid rgba(196,93,42,0.3)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(196,93,42,0.3)")}
          >
            Claude Code
          </a>{" "}
          · 2025
        </p>
      </motion.div>
    </footer>
  );
}
