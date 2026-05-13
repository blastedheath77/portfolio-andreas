"use client";

interface CategoryTagProps {
  label: string;
  variant?: "category" | "tech";
}

export default function CategoryTag({ label, variant = "tech" }: CategoryTagProps) {
  if (variant === "category") {
    return (
      <span
        className="inline-flex items-center px-2.5 py-1 text-xs tracking-widest uppercase rounded-sm"
        style={{
          color: "var(--accent)",
          background: "var(--accent-light)",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs rounded-sm"
      style={{
        color: "var(--text-secondary)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}
