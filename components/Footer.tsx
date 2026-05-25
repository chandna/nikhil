"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2rem 3rem",
        borderTop: "1px solid var(--ink-faint)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--ink-faint)",
          letterSpacing: "0.05em",
        }}
      >
        © {year} Nikhil Chandna
      </p>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "0.85rem",
          color: "var(--ink-faint)",
        }}
      >
        Designed in code.
      </p>
    </footer>
  );
}
