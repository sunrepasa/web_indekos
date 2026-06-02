import StatCard from "../../../components/dashboard/StatCard";
import {
  Users, BedDouble, Banknote, MessageSquareWarning,
  TrendingUp, Calendar, ArrowRight, CheckCircle2, Clock, AlertCircle,
} from "lucide-react";
import { getAllKamar, getKamarStats } from "@/lib/dal/kamar";
import Link from "next/link";

const aktivitasData = [
  { icon: CheckCircle2, colorVar: "var(--status-terisi)", bgVar: "var(--status-terisi-bg)", teks: "Ngurah Fajar melakukan pembayaran kamar A-01", waktu: "2 jam lalu" },
  { icon: Users, colorVar: "var(--info)", bgVar: "#dbeafe", teks: "Penghuni baru Dewi Sartika terdaftar di kamar A-02", waktu: "5 jam lalu" },
  { icon: AlertCircle, colorVar: "var(--accent)", bgVar: "var(--status-tersedia-bg)", teks: "Laporan pengaduan baru dari kamar B-01 — keran bocor", waktu: "Kemarin" },
  { icon: Clock, colorVar: "var(--warning)", bgVar: "#fef3c7", teks: "Pembayaran Siti Aisyah (B-03) jatuh tempo besok", waktu: "Kemarin" },
  { icon: CheckCircle2, colorVar: "var(--status-terisi)", bgVar: "var(--status-terisi-bg)", teks: "Pengaduan kamar A-01 diselesaikan", waktu: "2 hari lalu" },
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

const bars = [
  { month: "Des", val: 38 }, { month: "Jan", val: 42 },
  { month: "Feb", val: 36 }, { month: "Mar", val: 45 },
  { month: "Apr", val: 43 }, { month: "Mei", val: 48 },
];

export default async function DashboardAdmin() {
  const [stats, kamarList] = await Promise.all([getKamarStats(), getAllKamar()]);
  const maxBar = Math.max(...bars.map((b) => b.val));

  return (
    <main className="p-6 lg:p-8 animate-fade-in-up">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
        <StatCard title="Total Kamar" value={stats.total} subtitle={`${stats.tersedia} kamar tersedia`} icon={BedDouble} iconBg="#dbeafe" iconColor="var(--info)" trend={0} delay={0} />
        <StatCard title="Penghuni Aktif" value={stats.terisi} subtitle={`dari ${stats.total} kamar`} icon={Users} iconBg="var(--status-terisi-bg)" iconColor="var(--status-terisi)" trend={5} delay={60} />
        <StatCard title="Pendapatan Bulan Ini" value="Rp 48jt" subtitle="vs bulan lalu" icon={Banknote} iconBg="#fef3c7" iconColor="var(--warning)" trend={12} delay={120} />
        <StatCard title="Pengaduan Baru" value="3" subtitle="belum ditangani" icon={MessageSquareWarning} iconBg="var(--status-maintenance-bg)" iconColor="var(--danger)" trend={-25} delay={180} />
      </div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">

        {/* Kamar Overview */}
        <div className="card lg:col-span-2 rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>Overview Kamar</h3>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>Data real dari database</p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { label: "Terisi", var: "--status-terisi" },
                { label: "Tersedia", var: "--status-tersedia" },
                { label: "Maintenance", var: "--status-maintenance" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--text-xmuted)" }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: `var(${s.var})` }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {kamarList.map((k) => (
              <div
                key={k.id}
                className="rounded-2xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                style={{
                  background: k.status === "terisi" ? "var(--status-terisi-bg)" : k.status === "maintenance" ? "var(--status-maintenance-bg)" : "var(--status-tersedia-bg)",
                  border: `1px solid ${k.status === "terisi" ? "var(--status-terisi-border)" : k.status === "maintenance" ? "var(--status-maintenance-border)" : "var(--status-tersedia-border)"}`,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm" style={{ color: "var(--text-main)" }}>{k.nomor}</span>
                  <span
                    className="badge"
                    style={{
                      background: "var(--surface)",
                      color: k.status === "terisi" ? "var(--status-terisi)" : k.status === "maintenance" ? "var(--status-maintenance)" : "var(--status-tersedia)",
                      border: "none",
                      fontSize: "9px",
                      padding: "2px 7px",
                    }}
                  >
                    {k.status}
                  </span>
                </div>
                <p className="text-xs font-semibold truncate" style={{ color: "var(--text-muted)" }}>
                  {k.kontrak?.[0]?.penghuni?.full_name || "—"}
                </p>
                <p className="text-sm font-black mt-1" style={{ color: "var(--primary-dark)" }}>
                  Rp {k.harga_per_bulan.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <Link
              href="/dashboard/admin/kamar"
              className="flex items-center gap-1.5 text-sm font-bold transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Lihat semua kamar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Aktivitas */}
        <div className="card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "280ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>Aktivitas Terbaru</h3>
            <button className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--primary)" }}>
              Lihat semua <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            {aktivitasData.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: a.bgVar }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: a.colorVar }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-relaxed" style={{ color: "var(--text-sub)" }}>{a.teks}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-xmuted)" }}>{a.waktu}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>Tren Pendapatan</h3>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>6 bulan terakhir</p>
            </div>
            <span className="badge badge-terisi">
              <TrendingUp className="w-3 h-3" /> +12% MTD
            </span>
          </div>

          <div className="flex items-end gap-2 h-36">
            {bars.map((b, i) => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold" style={{ color: "var(--text-xmuted)" }}>{b.val}jt</span>
                <div
                  className="w-full rounded-t-xl transition-all duration-300"
                  style={{
                    height: `${(b.val / maxBar) * 100}px`,
                    background: i === bars.length - 1
                      ? `linear-gradient(180deg, var(--primary), var(--primary-dark))`
                      : "var(--primary-light)",
                  }}
                />
                <span className="text-xs font-semibold" style={{ color: "var(--text-xmuted)" }}>{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kalender Pembayaran */}
        <div className="card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "440ms" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black" style={{ color: "var(--text-main)" }}>Kalender Pembayaran</h3>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-xmuted)" }}>Jatuh tempo bulan ini</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--primary)" }}>
              <Calendar className="w-3 h-3" /> Lihat semua
            </button>
          </div>

          {/* Day Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {calendarDays.map((d, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: d.isToday ? "var(--primary)" : "var(--surface)",
                  border: `1px solid ${d.isToday ? "transparent" : "var(--border)"}`,
                  minWidth: "52px",
                  boxShadow: d.isToday ? "var(--shadow-primary)" : "none",
                }}
              >
                <span className="text-[10px] font-bold uppercase" style={{ color: d.isToday ? "rgba(255,255,255,0.75)" : "var(--text-xmuted)" }}>
                  {d.day}
                </span>
                <span className="text-sm font-black" style={{ color: d.isToday ? "white" : "var(--text-main)" }}>
                  {d.date}
                </span>
                {d.hasEvent && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.isToday ? "white" : "var(--accent)" }} />
                )}
              </div>
            ))}
          </div>

          {/* Payment list */}
          <div className="space-y-3">
            {[
              { name: "Ngurah Fajar", kamar: "A-01", tanggal: "1 Jun", lunas: false },
              { name: "Dewi Sartika", kamar: "A-02", tanggal: "1 Jun", lunas: true },
              { name: "Budi Santoso", kamar: "B-01", tanggal: "3 Jun", lunas: false },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl transition-all"
                style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-dark))` }}
                >
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold" style={{ color: "var(--text-main)" }}>{p.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-xmuted)" }}>Kamar {p.kamar} · {p.tanggal}</p>
                </div>
                <span className={`badge ${p.lunas ? "badge-terisi" : "badge-tersedia"}`}>
                  {p.lunas ? "Lunas" : "Belum Bayar"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}