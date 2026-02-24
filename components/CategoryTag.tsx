"use client";

interface CategoryTagProps {
  label: string;
  variant?: "category" | "tech";
}

export default function CategoryTag({ label, variant = "tech" }: CategoryTagProps) {
  if (variant === "category") {
    return (
      <span
        className="inline-flex items-center px-2.5 py-0.5 text-xs tracking-widest uppercase"
        style={{
          color: "var(--accent)",
          border: "1px solid rgba(0, 245, 255, 0.3)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs"
      style={{
        color: "var(--text-secondary)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-card)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
}
