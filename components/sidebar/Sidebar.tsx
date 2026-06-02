"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Users, UserCheck, CreditCard,
  MessageSquareWarning, BarChart3, Bell, Activity,
  LogOut, Building2, ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Data Kamar", href: "/dashboard/admin/kamar", icon: Building2 },
  { label: "Data Penghuni", href: "/dashboard/admin/penghuni", icon: Users },
  { label: "Data Penyewa", href: "/dashboard/admin/penyewa", icon: UserCheck },
  { label: "Pembayaran", href: "/dashboard/admin/pembayaran", icon: CreditCard },
  { label: "Pengaduan", href: "/dashboard/admin/pengaduan", icon: MessageSquareWarning },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Notifikasi", href: "/dashboard/admin/notifications", icon: Bell, badge: 3 },
  { label: "Aktivitas", href: "/dashboard/admin/activity", icon: Activity },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    document.cookie = "token=; max-age=0; path=/";
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") return pathname === "/dashboard/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full z-40 lg:flex flex-col hidden w-[280px]"
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        boxShadow: "4px 0 24px rgba(15,23,42,0.04)",
      }}
    >
      {/* ── Logo ── */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-dark))` }}
          >
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight" style={{ color: "var(--text-main)" }}>
              INDEKOS
            </h1>
            <p className="text-xs font-medium" style={{ color: "var(--text-xmuted)" }}>
              Manajemen Kos
            </p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 mb-4" style={{ height: "1px", background: "var(--border)" }} />

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p
          className="px-3 pb-2 text-xs uppercase tracking-widest"
          style={{ color: "var(--text-xmuted)", fontWeight: 700 }}
        >
          Menu Utama
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl relative"
              style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "#ffffff" : "var(--text-muted)",
                fontWeight: active ? 700 : 600,
                textDecoration: "none",
                boxShadow: active ? "var(--shadow-primary)" : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "var(--primary-xlight)";
                  e.currentTarget.style.color = "var(--primary-dark)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              <Icon className="flex-shrink-0" style={{ width: 18, height: 18 }} />
              <span className="text-sm flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center"
                  style={{
                    background: active ? "rgba(255,255,255,0.25)" : "var(--accent)",
                    color: "white",
                  }}
                >
                  {item.badge}
                </span>
              )}
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom — User & Logout ── */}
      <div className="p-4 pt-3">
        <div className="rounded-2xl p-3 mb-3" style={{ background: "var(--primary-xlight)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black text-white"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-dark))` }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: "var(--text-main)" }}>Admin</p>
              <p className="text-xs truncate" style={{ color: "var(--text-xmuted)" }}>Administrator</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all"
          style={{ color: "var(--danger)", fontWeight: 600 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--error-bg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut style={{ width: 16, height: 16 }} />
          Logout
        </button>
      </div>
    </aside>
  );
}
