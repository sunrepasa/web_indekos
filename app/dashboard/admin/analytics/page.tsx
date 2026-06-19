"use client";
import { BarChart3, TrendingUp, Users, BedDouble, Banknote, AlertCircle } from "lucide-react";

const months = ["Jul", "Agt", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
const incomeData = [32, 36, 34, 40, 38, 42, 39, 44, 41, 43, 46, 48];
const occupancyData = [80, 83, 79, 87, 85, 88, 84, 90, 88, 91, 91, 95];
const lateData = [5, 4, 6, 3, 5, 4, 3, 2, 4, 3, 2, 1];

const maxIncome = Math.max(...incomeData);
const maxOcc = Math.max(...occupancyData);
const maxLate = Math.max(...lateData);

export default function AnalyticsPage() {
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
              <BarChart3 style={{ width: 20, height: 20, color: "var(--primary-dark)" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Analytics</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Laporan & statistik kos</p>
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            2024 — 2025
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger">
            {[
              { title: "Total Pendapatan", value: "Rp 489jt", sub: "Tahun berjalan", icon: Banknote, bg: "#fef3c7", col: "#f59e0b", trend: "+18%" },
              { title: "Rata-rata Occupancy", value: "87%", sub: "12 bulan terakhir", icon: BedDouble, bg: "#dbeafe", col: "#3b82f6", trend: "+5%" },
              { title: "Total Penghuni", value: "21", sub: "dari kapasitas 24", icon: Users, bg: "#d1fae5", col: "#10b981", trend: "+2" },
              { title: "Telat Bayar", value: "3", sub: "bulan ini", icon: AlertCircle, bg: "#fee2e2", col: "#ef4444", trend: "-2" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="animate-fade-in-up rounded-3xl p-5"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-card)",
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: s.bg }}>
                      <Icon style={{ width: 18, height: 18, color: s.col }} />
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: s.trend.startsWith("+") ? "#d1fae5" : "#fee2e2",
                        color: s.trend.startsWith("+") ? "#059669" : "#dc2626",
                      }}
                    >
                      {s.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-black" style={{ color: "var(--text-main)" }}>{s.value}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-muted)" }}>{s.title}</p>
                  <p className="text-xs" style={{ color: "var(--text-xmuted)" }}>{s.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Income Chart */}
            <div
              className="rounded-3xl p-6 animate-fade-in-up"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", animationDelay: "240ms" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-black" style={{ color: "var(--text-main)" }}>Pendapatan Bulanan</h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>dalam juta rupiah</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}>
                  <TrendingUp style={{ width: 12, height: 12 }} /> +50%
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-40">
                {incomeData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${(v / maxIncome) * 140}px`,
                        background: i === incomeData.length - 1
                          ? "linear-gradient(180deg, #10b981, #059669)"
                          : "var(--primary-light)",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <span className="text-xs" style={{ color: "var(--text-xmuted)", fontSize: "9px" }}>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupancy Chart */}
            <div
              className="rounded-3xl p-6 animate-fade-in-up"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", animationDelay: "300ms" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-black" style={{ color: "var(--text-main)" }}>Tingkat Hunian (%)</h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>occupancy rate per bulan</p>
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-40">
                {occupancyData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${(v / maxOcc) * 140}px`,
                        background: i === occupancyData.length - 1
                          ? "linear-gradient(180deg, #3b82f6, #2563eb)"
                          : "#dbeafe",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <span className="text-xs" style={{ color: "var(--text-xmuted)", fontSize: "9px" }}>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Late Payment Chart */}
          <div
            className="rounded-3xl p-6 animate-fade-in-up"
            style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", animationDelay: "360ms" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-black" style={{ color: "var(--text-main)" }}>Riwayat Pembayaran Telat</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>jumlah penghuni per bulan</p>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#fee2e2", color: "#dc2626" }}>
                Tren: Menurun ✓
              </span>
            </div>
            <div className="flex items-end gap-2 h-28">
              {lateData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>{v}</span>
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${(v / maxLate) * 90}px`,
                      background: v <= 2 ? "#d1fae5" : v <= 4 ? "#fef3c7" : "#fee2e2",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <span className="text-xs" style={{ color: "var(--text-xmuted)", fontSize: "9px" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
    </div>
  );
}

