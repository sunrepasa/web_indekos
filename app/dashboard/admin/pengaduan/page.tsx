import { MessageSquareWarning, Clock, CheckCircle2, AlertCircle, Send, Plus } from "lucide-react";

const pengaduanData = [
  {
    id: 1,
    nama: "Ngurah Fajar",
    kamar: "A-01",
    kategori: "Fasilitas",
    isi: "Keran air di kamar mandi bocor, sudah 3 hari belum diperbaiki.",
    waktu: "30 Mei 2025, 09:15",
    status: "Proses",
    statusColor: "#f59e0b",
    statusBg: "#fef3c7",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    kamar: "B-01",
    kategori: "Keamanan",
    isi: "Lampu lorong di lantai 2 mati, area gelap saat malam hari.",
    waktu: "29 Mei 2025, 20:30",
    status: "Pending",
    statusColor: "#f97316",
    statusBg: "#ffedd5",
  },
  {
    id: 3,
    nama: "Dewi Sartika",
    kamar: "A-02",
    kategori: "Kebersihan",
    isi: "Area dapur bersama perlu dibersihkan, bau tidak sedap.",
    waktu: "28 Mei 2025, 14:00",
    status: "Selesai",
    statusColor: "#10b981",
    statusBg: "#d1fae5",
  },
  {
    id: 4,
    nama: "Siti Aisyah",
    kamar: "B-03",
    kategori: "Fasilitas",
    isi: "AC kamar tidak dingin, sepertinya freon habis.",
    waktu: "27 Mei 2025, 11:45",
    status: "Selesai",
    statusColor: "#10b981",
    statusBg: "#d1fae5",
  },
];

const statusIcon: Record<string, React.ElementType> = {
  "Proses": Clock,
  "Pending": AlertCircle,
  "Selesai": CheckCircle2,
};

const kategoriColor: Record<string, { bg: string; color: string }> = {
  "Fasilitas": { bg: "#dbeafe", color: "#2563eb" },
  "Keamanan": { bg: "#fee2e2", color: "#dc2626" },
  "Kebersihan": { bg: "#d1fae5", color: "#059669" },
};

export default function PengaduanPage() {
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#fee2e2" }}>
              <MessageSquareWarning style={{ width: 20, height: 20, color: "#dc2626" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Pengaduan</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Laporan & aduan penghuni</p>
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
            <Plus style={{ width: 15, height: 15 }} />
            Tambah Laporan
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {/* Status summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Pending", count: 1, bg: "#ffedd5", col: "#f97316" },
              { label: "Proses", count: 1, bg: "#fef3c7", col: "#f59e0b" },
              { label: "Selesai", count: 2, bg: "#d1fae5", col: "#059669" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-3xl p-4 animate-fade-in-up"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: s.bg }}>
                  <span className="text-xs font-black" style={{ color: s.col }}>{s.count}</span>
                </div>
                <p className="text-xl font-black" style={{ color: "var(--text-main)" }}>{s.count}</p>
                <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Complaint cards */}
          <div className="space-y-4">
            {pengaduanData.map((p, i) => {
              const StatusIcon = statusIcon[p.status] || AlertCircle;
              const katStyle = kategoriColor[p.kategori] || { bg: "#e2e8f0", color: "#64748b" };
              return (
                <div
                  key={p.id}
                  className="rounded-3xl p-5 animate-fade-in-up"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-card)",
                    animationDelay: `${i * 80}ms`,
                    border: "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid var(--primary-light)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                    >
                      {p.nama.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="font-black text-sm" style={{ color: "var(--text-main)" }}>{p.nama}</p>
                          <p className="text-xs" style={{ color: "var(--text-xmuted)" }}>Kamar {p.kamar} · {p.waktu}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: katStyle.bg, color: katStyle.color }}
                          >
                            {p.kategori}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: p.statusBg, color: p.statusColor }}
                          >
                            <StatusIcon style={{ width: 11, height: 11 }} />
                            {p.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-semibold mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {p.isi}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        {p.status !== "Selesai" && (
                          <button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: "var(--primary)", color: "white", border: "none", cursor: "pointer" }}
                          >
                            <CheckCircle2 style={{ width: 11, height: 11 }} />
                            Tandai Selesai
                          </button>
                        )}
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            background: "var(--primary-xlight)",
                            color: "var(--primary-dark)",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <Send style={{ width: 11, height: 11 }} />
                          Balas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
    </div>
  );
}
