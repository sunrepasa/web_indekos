"use client";
import { CreditCard, CheckCircle2, Clock, XCircle, Upload, Calendar } from "lucide-react";

const today = new Date();
const calDays = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1;
  return {
    date: d,
    isToday: d === today.getDate(),
    status: [1, 2, 4, 8, 10, 15].includes(d) ? "paid" : [5, 12, 20].includes(d) ? "late" : null,
  };
});

const pembayaranList = [
  { nama: "Ngurah Fajar", kamar: "A-01", jumlah: "Rp 1.200.000", tgl: "01 Jun 2025", status: "Lunas" },
  { nama: "Dewi Sartika", kamar: "A-02", jumlah: "Rp 1.200.000", tgl: "01 Jun 2025", status: "Lunas" },
  { nama: "Budi Santoso", kamar: "B-01", jumlah: "Rp 1.500.000", tgl: "03 Jun 2025", status: "Belum Bayar" },
  { nama: "Siti Aisyah", kamar: "B-03", jumlah: "Rp 1.500.000", tgl: "01 Jun 2025", status: "Lunas" },
  { nama: "Rina Wati", kamar: "C-01", jumlah: "Rp 1.000.000", tgl: "05 Jun 2025", status: "Telat" },
];

export default function PembayaranPage() {
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#fef3c7" }}>
              <CreditCard style={{ width: 20, height: 20, color: "#f59e0b" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Pembayaran</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Rekap dan upload bukti bayar</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
            }}
          >
            <Upload style={{ width: 15, height: 15 }} />
            Upload Bukti Bayar
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {/* Summary chips */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Lunas", count: 3, icon: CheckCircle2, bg: "#d1fae5", col: "#059669" },
              { label: "Belum Bayar", count: 1, icon: Clock, bg: "#fef3c7", col: "#f59e0b" },
              { label: "Telat", count: 1, icon: XCircle, bg: "#fee2e2", col: "#dc2626" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-3xl p-4 flex items-center gap-3 animate-fade-in-up"
                  style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                    <Icon style={{ width: 18, height: 18, color: s.col }} />
                  </div>
                  <div>
                    <p className="text-xl font-black" style={{ color: "var(--text-main)" }}>{s.count}</p>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div
              className="lg:col-span-1 rounded-3xl p-6 animate-fade-in-up"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", animationDelay: "100ms" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar style={{ width: 16, height: 16, color: "var(--primary)" }} />
                <h3 className="font-black" style={{ color: "var(--text-main)" }}>
                  Juni 2025
                </h3>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)", display: "inline-block" }} />
                  Lunas
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#ef4444", display: "inline-block" }} />
                  Telat
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["M", "S", "S", "R", "K", "J", "S"].map((d, i) => (
                  <div key={i} className="text-center text-xs font-bold py-1" style={{ color: "var(--text-xmuted)" }}>{d}</div>
                ))}
                {/* offset for June 2025 starting on Sunday */}
                {Array.from({ length: 0 }).map((_, i) => <div key={`e${i}`} />)}
                {calDays.map((d) => (
                  <div
                    key={d.date}
                    className="aspect-square flex items-center justify-center rounded-xl text-xs font-bold cursor-pointer"
                    style={{
                      background: d.isToday ? "var(--primary)" : d.status === "paid" ? "#d1fae5" : d.status === "late" ? "#fee2e2" : "transparent",
                      color: d.isToday ? "white" : d.status === "paid" ? "#059669" : d.status === "late" ? "#dc2626" : "var(--text-muted)",
                    }}
                  >
                    {d.date}
                  </div>
                ))}
              </div>
            </div>

            {/* List */}
            <div
              className="lg:col-span-2 rounded-3xl overflow-hidden animate-fade-in-up"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", animationDelay: "160ms" }}
            >
              <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <h3 className="font-black" style={{ color: "var(--text-main)" }}>Daftar Pembayaran</h3>
              </div>
              <div>
                {pembayaranList.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{
                      borderBottom: i < pembayaranList.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary-xlight)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                    >
                      {p.nama.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: "var(--text-main)" }}>{p.nama}</p>
                      <p className="text-xs" style={{ color: "var(--text-xmuted)" }}>Kamar {p.kamar} · {p.tgl}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black" style={{ color: "var(--primary-dark)" }}>{p.jumlah}</p>
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          background: p.status === "Lunas" ? "#d1fae5" : p.status === "Telat" ? "#fee2e2" : "#fef3c7",
                          color: p.status === "Lunas" ? "#059669" : p.status === "Telat" ? "#dc2626" : "#b45309",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}

