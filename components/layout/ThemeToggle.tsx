"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Prevent hydration mismatch — render nothing until mounted
  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-full"
        style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {dark ? (
        <Sun className="w-[18px] h-[18px]" style={{ color: "var(--warning)" }} />
      ) : (
        <Moon className="w-[18px] h-[18px]" style={{ color: "var(--text-muted)" }} />
      )}
    </button>
  );
}
