import { Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/server";

export async function Topbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let fullName = "Admin";
  let email = "admin@indekos.com";
  let initials = "AD";

  if (user) {
    email = user.email || email;
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (profile?.full_name) {
      fullName = profile.full_name;
      initials = fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    } else {
      fullName = "Admin";
    }
  }
  return (
    <header
      className="sticky top-0 z-30 transition-all bg-[var(--surface)]"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
        {/* Start (Kosong untuk memberi ruang) */}
        <div></div>

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
              <span className="font-bold text-sm" style={{ color: "var(--primary-dark)" }}>{initials}</span>
            </div>
            <div className="hidden sm:flex flex-col items-start -space-y-0.5 max-w-[120px]">
              <span className="text-sm font-bold truncate w-full text-left" style={{ color: "var(--text-main)" }}>{fullName}</span>
              <span className="text-[10px] font-semibold truncate w-full text-left" style={{ color: "var(--text-xmuted)" }}>{email}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
