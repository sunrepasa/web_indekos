import { Search, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  return (
    <header
      className="sticky top-0 z-30 transition-all bg-[var(--surface)]"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
        {/* Search - Left aligned like Donezo */}
        <div
          className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all"
          style={{
            background: "var(--bg-muted)",
            border: "1px solid var(--border)",
            minWidth: "280px"
          }}
        >
          <Search className="w-4 h-4" style={{ color: "var(--text-xmuted)" }} />
          <input
            placeholder="Search something..."
            className="outline-none text-sm font-semibold bg-transparent w-full"
            style={{ color: "var(--text-main)" }}
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />

          {/* Notif Bell */}
          <button
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
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
            className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer transition-all border border-transparent hover:bg-[var(--bg-muted)]"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--primary-light)",
                border: "1px solid var(--primary-border)"
              }}
            >
              <span className="font-bold text-sm" style={{ color: "var(--primary-dark)" }}>AD</span>
            </div>
            <div className="hidden sm:flex flex-col items-start -space-y-0.5">
              <span className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Admin</span>
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-xmuted)" }}>administrator@kos.st</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
