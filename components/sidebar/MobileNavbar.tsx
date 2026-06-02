"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquareWarning,
  BarChart3,
  Bell,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Penghuni", href: "/dashboard/admin/penghuni", icon: Users },
  { label: "Bayar", href: "/dashboard/admin/pembayaran", icon: CreditCard },
  { label: "Aduan", href: "/dashboard/admin/pengaduan", icon: MessageSquareWarning },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Notif", href: "/dashboard/admin/notifications", icon: Bell, badge: 3 },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") return pathname === "/dashboard/admin";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -4px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 relative"
            style={{ textDecoration: "none" }}
          >
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-2xl"
              style={{
                background: active ? "var(--primary)" : "transparent",
              }}
            >
              <Icon
                style={{
                  width: 18,
                  height: 18,
                  color: active ? "white" : "var(--text-xmuted)",
                }}
              />
              {item.badge && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white rounded-full"
                  style={{
                    background: "var(--accent)",
                    fontSize: "9px",
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className="text-xs"
              style={{
                color: active ? "var(--primary)" : "var(--text-xmuted)",
                fontWeight: active ? 700 : 500,
                fontSize: "10px",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
