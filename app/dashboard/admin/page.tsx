import Sidebar from "../../../components/sidebar/Sidebar";
import MobileNavbar from "../../../components/sidebar/MobileNavbar";
import StatCard from "../../../components/dashboard/StatCard";
import {
  Users,
  BedDouble,
  Banknote,
  MessageSquareWarning,
  Bell,
  Search,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const kamarData = [
  { id: "A-01", penghuni: "Ngurah Fajar", harga: "Rp 1.200.000", status: "Terisi", statusColor: "#10b981", statusBg: "#d1fae5" },
  { id: "A-02", penghuni: "Dewi Sartika", harga: "Rp 1.200.000", status: "Terisi", statusColor: "#10b981", statusBg: "#d1fae5" },
  { id: "A-03", penghuni: "-", harga: "Rp 1.000.000", status: "Kosong", statusColor: "#f97316", statusBg: "#ffedd5" },
  { id: "B-01", penghuni: "Budi Santoso", harga: "Rp 1.500.000", status: "Terisi", statusColor: "#10b981", statusBg: "#d1fae5" },
  { id: "B-02", penghuni: "-", harga: "Rp 1.500.000", status: "Kosong", statusColor: "#f97316", statusBg: "#ffedd5" },
  { id: "B-03", penghuni: "Siti Aisyah", harga: "Rp 1.500.000", status: "Terisi", statusColor: "#10b981", statusBg: "#d1fae5" },
];

const aktivitasData = [
  { icon: CheckCircle2, color: "#10b981", bg: "#d1fae5", teks: "Ngurah Fajar melakukan pembayaran kamar A-01", waktu: "2 jam lalu" },
  { icon: Users, color: "#3b82f6", bg: "#dbeafe", teks: "Penghuni baru Dewi Sartika terdaftar di kamar A-02", waktu: "5 jam lalu" },
  { icon: AlertCircle, color: "#f97316", bg: "#ffedd5", teks: "Laporan pengaduan baru dari kamar B-01 — keran bocor", waktu: "Kemarin" },
  { icon: Clock, color: "#f59e0b", bg: "#fef3c7", teks: "Pembayaran Siti Aisyah (B-03) jatuh tempo besok", waktu: "Kemarin" },
  { icon: CheckCircle2, color: "#10b981", bg: "#d1fae5", teks: "Pengaduan kamar A-01 diselesaikan", waktu: "2 hari lalu" },
];

const today = new Date();
const calendarDays = Array.from({ length: 10 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - 2 + i);
  return {
    day: d.toLocaleDateString("id-ID", { weekday: "short" }),
    date: d.getDate(),
    isToday: i === 2,
    hasEvent: [0, 3, 6].includes(i),
  };
});

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(240,253,244,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h2 className="text-xl font-black" style={{ color: "var(--text-main)" }}>
              Halo, Admin! 👋
            </h2>
            <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
              Selamat datang kembali di dashboard Indekos
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Search style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
              <input
                placeholder="Cari sesuatu..."
                className="outline-none text-sm font-semibold bg-transparent"
                style={{ color: "var(--text-main)", width: "160px" }}
              />
            </div>

            {/* Notif Bell */}
            <button
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Bell style={{ width: 18, height: 18, color: "var(--text-muted)" }} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-white text-xs font-black rounded-full"
                style={{ background: "var(--accent)", fontSize: "9px" }}
              >
                3
              </span>
            </button>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
            <StatCard
              title="Total Kamar"
              value="24"
              subtitle="3 kamar kosong"
              icon={BedDouble}
              iconBg="#dbeafe"
              iconColor="#3b82f6"
              trend={0}
              delay={0}
            />
            <StatCard
              title="Penghuni Aktif"
              value="21"
              subtitle="dari 24 kamar"
              icon={Users}
              iconBg="#d1fae5"
              iconColor="#10b981"
              trend={5}
              delay={60}
            />
            <StatCard
              title="Pendapatan Bulan Ini"
              value="Rp 48jt"
              subtitle="vs bulan lalu"
              icon={Banknote}
              iconBg="#fef3c7"
              iconColor="#f59e0b"
              trend={12}
              delay={120}
            />
            <StatCard
              title="Pengaduan Baru"
              value="3"
              subtitle="belum ditangani"
              icon={MessageSquareWarning}
              iconBg="#fee2e2"
              iconColor="#ef4444"
              trend={-25}
              delay={180}
            />
          </div>

          {/* Main Grid: Kamar + Aktivitas */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* Kamar Overview — 2 col */}
            <div
              className="lg:col-span-2 rounded-3xl p-6 animate-fade-in-up"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--shadow-card)",
                animationDelay: "200ms",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>
                    Overview Kamar
                  </h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>
                    Status semua kamar saat ini
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: "var(--text-xmuted)" }}
                  >
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#10b981" }} />
                    Terisi
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: "var(--text-xmuted)" }}
                  >
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#f97316" }} />
                    Kosong
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {kamarData.map((k) => (
                  <div
                    key={k.id}
                    className="rounded-2xl p-4"
                    style={{
                      background: k.status === "Terisi" ? "var(--primary-xlight)" : "#fff7ed",
                      border: `1px solid ${k.status === "Terisi" ? "var(--primary-light)" : "#fed7aa"}`,
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm" style={{ color: "var(--text-main)" }}>
                        {k.id}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: k.statusBg, color: k.statusColor }}
                      >
                        {k.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold truncate" style={{ color: "var(--text-muted)" }}>
                      {k.penghuni}
                    </p>
                    <p className="text-sm font-black mt-1" style={{ color: "var(--primary-dark)" }}>
                      {k.harga}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktivitas — 1 col */}
            <div
              className="rounded-3xl p-6 animate-fade-in-up"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--shadow-card)",
                animationDelay: "280ms",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>
                  Aktivitas Terbaru
                </h3>
                <button
                  className="flex items-center gap-1 text-xs font-bold"
                  style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
                >
                  Lihat semua <ArrowRight style={{ width: 12, height: 12 }} />
                </button>
              </div>

              <div className="space-y-4">
                {aktivitasData.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: a.bg }}
                      >
                        <Icon style={{ width: 14, height: 14, color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-relaxed" style={{ color: "var(--text-main)" }}>
                          {a.teks}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-xmuted)" }}>
                          {a.waktu}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Grid: Revenue Trend + Calendar */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Revenue Trend — simple bar chart */}
            <div
              className="rounded-3xl p-6 animate-fade-in-up"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--shadow-card)",
                animationDelay: "360ms",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>
                    Tren Pendapatan
                  </h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>
                    6 bulan terakhir
                  </p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}
                >
                  <TrendingUp style={{ width: 12, height: 12 }} />
                  +12% MTD
                </div>
              </div>

              {/* Bar chart */}
              {(() => {
                const bars = [
                  { month: "Des", val: 38 },
                  { month: "Jan", val: 42 },
                  { month: "Feb", val: 36 },
                  { month: "Mar", val: 45 },
                  { month: "Apr", val: 43 },
                  { month: "Mei", val: 48 },
                ];
                const max = Math.max(...bars.map(b => b.val));
                return (
                  <div className="flex items-end gap-2 h-36">
                    {bars.map((b, i) => (
                      <div key={b.month} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                          {b.val}jt
                        </span>
                        <div className="w-full rounded-t-xl" style={{
                          height: `${(b.val / max) * 100}px`,
                          background: i === bars.length - 1
                            ? "linear-gradient(180deg, #10b981, #059669)"
                            : "var(--primary-light)",
                          transition: "all 0.3s ease",
                        }} />
                        <span className="text-xs font-semibold" style={{ color: "var(--text-xmuted)" }}>
                          {b.month}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Calendar */}
            <div
              className="rounded-3xl p-6 animate-fade-in-up"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--shadow-card)",
                animationDelay: "440ms",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>
                    Kalender Pembayaran
                  </h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>
                    Jatuh tempo bulan ini
                  </p>
                </div>
                <button
                  className="flex items-center gap-1 text-xs font-bold"
                  style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
                >
                  <Calendar style={{ width: 12, height: 12 }} />
                  Lihat semua
                </button>
              </div>

              {/* Horizontal calendar day strip */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {calendarDays.map((d, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl cursor-pointer"
                    style={{
                      background: d.isToday ? "var(--primary)" : "transparent",
                      border: d.isToday ? "none" : "1px solid var(--border)",
                      minWidth: "52px",
                      transition: "all 0.2s ease",
                      position: "relative",
                    }}
                  >
                    <span
                      className="text-xs font-bold uppercase"
                      style={{ color: d.isToday ? "rgba(255,255,255,0.8)" : "var(--text-xmuted)", fontSize: "10px" }}
                    >
                      {d.day}
                    </span>
                    <span
                      className="text-sm font-black"
                      style={{ color: d.isToday ? "white" : "var(--text-main)" }}
                    >
                      {d.date}
                    </span>
                    {d.hasEvent && (
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: d.isToday ? "white" : "var(--accent)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Due payment list */}
              <div className="space-y-3">
                {[
                  { name: "Ngurah Fajar", kamar: "A-01", tanggal: "1 Jun", status: "Belum Bayar", stColor: "#f97316", stBg: "#ffedd5" },
                  { name: "Dewi Sartika", kamar: "A-02", tanggal: "1 Jun", status: "Sudah Bayar", stColor: "#10b981", stBg: "#d1fae5" },
                  { name: "Budi Santoso", kamar: "B-01", tanggal: "3 Jun", status: "Belum Bayar", stColor: "#f97316", stBg: "#ffedd5" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background: "var(--bg)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: "var(--text-main)" }}>
                        {p.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-xmuted)" }}>
                        Kamar {p.kamar} · {p.tanggal}
                      </p>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: p.stBg, color: p.stColor }}
                    >
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNavbar />
    </div>
  );
}