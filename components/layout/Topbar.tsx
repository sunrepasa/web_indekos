import { Search, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  return (
    <header
      className="sticky top-0 z-30 glass"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-6 lg:px-8 py-4">
        <div>
          <h2 className="text-xl font-black" style={{ color: "var(--text-main)" }}>
            Superadmin 👋
          </h2>
          <p className="text-sm font-semibold hidden sm:block" style={{ color: "var(--text-muted)" }}>
            Sistem Manajemen Indekos
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
            style={{
              background: "var(--bg-muted)",
              border: "1px solid var(--border)",
            }}
          >
            <Search className="w-4 h-4" style={{ color: "var(--text-xmuted)" }} />
            <input
              placeholder="Ketik untuk mencari..."
              className="outline-none text-sm font-semibold bg-transparent w-[140px] lg:w-[200px]"
              style={{ color: "var(--text-main)" }}
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notif Bell */}
          <button
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Bell className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
            <span
              className="absolute top-0 right-0 w-3.5 h-3.5 flex items-center justify-center text-white text-[9px] font-black rounded-full border-2 border-white"
              style={{ background: "var(--accent)" }}
            >
              3
            </span>
          </button>

          {/* Avatar Profil */}
          <button
            className="w-10 h-10 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer transition-all"
            style={{
              background: "var(--primary-light)",
              borderColor: "var(--primary-border)",
            }}
          >
            <span className="font-bold text-sm" style={{ color: "var(--primary-dark)" }}>AD</span>
          </button>
        </div>
      </div>
    </header>
  );
}
