"use client";
import { Bell, CheckCircle2, CreditCard, Users, MessageSquareWarning, AlertCircle, Check } from "lucide-react";

const notifData = [
  {
    id: 1,
    icon: CreditCard,
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
    judul: "Pembayaran Jatuh Tempo",
    isi: "Pembayaran kamar B-01 (Budi Santoso) jatuh tempo hari ini.",
    waktu: "Hari ini, 08:00",
    baru: true,
  },
  {
    id: 2,
    icon: MessageSquareWarning,
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
    judul: "Pengaduan Baru",
    isi: "Ngurah Fajar (A-01) melaporkan keran bocor di kamar mandi.",
    waktu: "Hari ini, 09:15",
    baru: true,
  },
  {
    id: 3,
    icon: Users,
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
    judul: "Penghuni Baru Terdaftar",
    isi: "Dewi Sartika berhasil terdaftar sebagai penghuni kamar A-02.",
    waktu: "Kemarin, 14:30",
    baru: true,
  },
  {
    id: 4,
    icon: CheckCircle2,
    iconBg: "#d1fae5",
    iconColor: "#059669",
    judul: "Pengaduan Diselesaikan",
    isi: "Pengaduan Siti Aisyah (B-03) tentang AC telah berhasil diselesaikan.",
    waktu: "2 hari lalu",
    baru: false,
  },
  {
    id: 5,
    icon: AlertCircle,
    iconBg: "#ffedd5",
    iconColor: "#f97316",
    judul: "Kamar Kosong",
    isi: "Kamar A-03 dan B-02 belum memiliki penghuni selama lebih dari 30 hari.",
    waktu: "3 hari lalu",
    baru: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(240,253,244,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center relative" style={{ background: "#ffedd5" }}>
              <Bell style={{ width: 20, height: 20, color: "#f97316" }} />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white text-xs font-black rounded-full"
                style={{ background: "var(--accent)", fontSize: "9px" }}
              >
                3
              </span>
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Notifikasi</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>3 notifikasi belum dibaca</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: "var(--primary-xlight)", color: "var(--primary-dark)", border: "none", cursor: "pointer" }}
          >
            <Check style={{ width: 14, height: 14 }} /> Tandai semua dibaca
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="space-y-3 max-w-3xl">
            {/* New label */}
            <p className="text-xs font-black uppercase tracking-widest px-1 mb-2" style={{ color: "var(--text-xmuted)" }}>
              Baru
            </p>

            {notifData.filter(n => n.baru).map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-4 rounded-3xl p-5 animate-fade-in-up"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-card)",
                    animationDelay: `${i * 60}ms`,
                    border: "1px solid var(--primary-light)",
                    position: "relative",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: n.iconBg }}
                  >
                    <Icon style={{ width: 18, height: 18, color: n.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm" style={{ color: "var(--text-main)" }}>{n.judul}</p>
                    <p className="text-sm font-semibold mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{n.isi}</p>
                    <p className="text-xs mt-1.5" style={{ color: "var(--text-xmuted)" }}>{n.waktu}</p>
                  </div>
                  {/* Unread dot */}
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--primary)" }} />
                </div>
              );
            })}

            {/* Older */}
            <p className="text-xs font-black uppercase tracking-widest px-1 mt-5 mb-2" style={{ color: "var(--text-xmuted)" }}>
              Sebelumnya
            </p>

            {notifData.filter(n => !n.baru).map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-4 rounded-3xl p-5 animate-fade-in-up"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-card)",
                    animationDelay: `${(i + 3) * 60}ms`,
                    opacity: 0.8,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: n.iconBg }}
                  >
                    <Icon style={{ width: 18, height: 18, color: n.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: "var(--text-main)" }}>{n.judul}</p>
                    <p className="text-sm font-semibold mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{n.isi}</p>
                    <p className="text-xs mt-1.5" style={{ color: "var(--text-xmuted)" }}>{n.waktu}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
    </div>
  );
}

