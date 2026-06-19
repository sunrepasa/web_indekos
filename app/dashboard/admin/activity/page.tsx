"use client";
import {
  Activity,
  CheckCircle2,
  Users,
  CreditCard,
  MessageSquareWarning,
  AlertCircle,
  Clock,
  LogIn,
} from "lucide-react";

const activities = [
  {
    icon: CreditCard,
    color: "#f59e0b",
    bg: "#fef3c7",
    desc: "Ngurah Fajar melakukan pembayaran Rp 1.200.000 untuk kamar A-01",
    waktu: "30 Mei 2025, 10:30",
    tag: "Pembayaran",
    tagBg: "#fef3c7",
    tagCol: "#b45309",
  },
  {
    icon: Users,
    color: "#3b82f6",
    bg: "#dbeafe",
    desc: "Penghuni baru Dewi Sartika terdaftar di kamar A-02 dengan kontrak 12 bulan",
    waktu: "29 Mei 2025, 14:00",
    tag: "Penghuni",
    tagBg: "#dbeafe",
    tagCol: "#1d4ed8",
  },
  {
    icon: MessageSquareWarning,
    color: "#ef4444",
    bg: "#fee2e2",
    desc: "Laporan pengaduan baru dari Budi Santoso (B-01) — lampu lorong mati",
    waktu: "29 Mei 2025, 20:15",
    tag: "Pengaduan",
    tagBg: "#fee2e2",
    tagCol: "#b91c1c",
  },
  {
    icon: CheckCircle2,
    color: "#10b981",
    bg: "#d1fae5",
    desc: "Pengaduan Siti Aisyah (B-03) tentang AC berhasil diselesaikan oleh tim teknis",
    waktu: "28 Mei 2025, 16:45",
    tag: "Selesai",
    tagBg: "#d1fae5",
    tagCol: "#059669",
  },
  {
    icon: LogIn,
    color: "#8b5cf6",
    bg: "#ede9fe",
    desc: "Admin melakukan login ke dashboard pada pukul 08:00",
    waktu: "28 Mei 2025, 08:00",
    tag: "Sistem",
    tagBg: "#ede9fe",
    tagCol: "#6d28d9",
  },
  {
    icon: AlertCircle,
    color: "#f97316",
    bg: "#ffedd5",
    desc: "Sistem mendeteksi kamar A-03 telah kosong selama lebih dari 30 hari",
    waktu: "27 Mei 2025, 00:01",
    tag: "Peringatan",
    tagBg: "#ffedd5",
    tagCol: "#c2410c",
  },
  {
    icon: CreditCard,
    color: "#f59e0b",
    bg: "#fef3c7",
    desc: "Budi Santoso (B-01) belum melakukan pembayaran, jatuh tempo 3 hari lagi",
    waktu: "25 Mei 2025, 09:00",
    tag: "Pembayaran",
    tagBg: "#fef3c7",
    tagCol: "#b45309",
  },
  {
    icon: Clock,
    color: "#64748b",
    bg: "#f1f5f9",
    desc: "Laporan bulanan April 2025 telah dibuat secara otomatis oleh sistem",
    waktu: "1 Mei 2025, 00:00",
    tag: "Sistem",
    tagBg: "#f1f5f9",
    tagCol: "#475569",
  },
];

export default function ActivityPage() {
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#d1fae5" }}>
              <Activity style={{ width: 20, height: 20, color: "var(--primary-dark)" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Log Aktivitas</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Riwayat aktivitas sistem & penghuni</p>
            </div>
          </div>
          <div
            className="hidden md:flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            <Clock style={{ width: 13, height: 13 }} />
            Mei 2025
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-3xl">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[22px] top-0 bottom-0 w-0.5"
                style={{ background: "var(--border)" }}
              />

              <div className="space-y-4">
                {activities.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 animate-fade-in-up"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Icon bubble (sits on the line) */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{
                          background: a.bg,
                          border: "3px solid var(--bg)",
                        }}
                      >
                        <Icon style={{ width: 18, height: 18, color: a.color }} />
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 rounded-3xl p-4 mb-2"
                        style={{
                          background: "var(--surface)",
                          boxShadow: "var(--shadow-card)",
                          border: "1px solid transparent",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.border = "1px solid var(--primary-light)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className="text-sm font-semibold flex-1" style={{ color: "var(--text-main)", lineHeight: 1.6 }}>
                            {a.desc}
                          </p>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                            style={{ background: a.tagBg, color: a.tagCol }}
                          >
                            {a.tag}
                          </span>
                        </div>
                        <p className="text-xs mt-2" style={{ color: "var(--text-xmuted)" }}>
                          {a.waktu}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}

