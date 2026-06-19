"use client";
import { Users, Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";

const penghuniData = [
  { id: "1", nama: "Ngurah Fajar", kamar: "A-01", hp: "081234567890", masuk: "01 Jan 2024", status: "Aktif", bayar: "Lunas" },
  { id: "2", nama: "Dewi Sartika", kamar: "A-02", hp: "082345678901", masuk: "15 Feb 2024", status: "Aktif", bayar: "Lunas" },
  { id: "3", nama: "Budi Santoso", kamar: "B-01", hp: "083456789012", masuk: "10 Mar 2024", status: "Aktif", bayar: "Belum" },
  { id: "4", nama: "Siti Aisyah", kamar: "B-03", hp: "084567890123", masuk: "20 Apr 2024", status: "Aktif", bayar: "Lunas" },
  { id: "5", nama: "Rina Wati", kamar: "C-01", hp: "085678901234", masuk: "05 Mei 2024", status: "Non-aktif", bayar: "-" },
];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = ["#059669", "#3b82f6", "#f97316", "#8b5cf6", "#ef4444"];

export default function PenghuniPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(240,253,244,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--primary-light)" }}
            >
              <Users style={{ width: 20, height: 20, color: "var(--primary-dark)" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>
                Data Penghuni
              </h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                Kelola data penghuni kos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              <Download style={{ width: 15, height: 15 }} />
              Export
            </button>
            <Link
              href="/dashboard/admin/penghuni/tambah"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                textDecoration: "none",
              }}
            >
              <Plus style={{ width: 16, height: 16 }} />
              Tambah Penghuni
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up">
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-full flex-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Search style={{ width: 16, height: 16, color: "var(--text-xmuted)", flexShrink: 0 }} />
              <input
                placeholder="Cari nama atau kamar penghuni..."
                className="flex-1 outline-none text-sm font-semibold bg-transparent"
                style={{ color: "var(--text-main)" }}
              />
            </div>
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold flex-shrink-0"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                cursor: "pointer",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Filter style={{ width: 15, height: 15 }} />
              Filter
            </button>
          </div>

          {/* Summary chips */}
          <div className="flex gap-2 mb-6 animate-fade-in-up flex-wrap">
            {[
              { label: "Semua", count: 5, active: true },
              { label: "Aktif", count: 4, active: false },
              { label: "Non-aktif", count: 1, active: false },
            ].map((chip) => (
              <button
                key={chip.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: chip.active ? "var(--primary)" : "var(--surface)",
                  color: chip.active ? "white" : "var(--text-muted)",
                  border: chip.active ? "none" : "1px solid var(--border)",
                  cursor: "pointer",
                }}
              >
                {chip.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: chip.active ? "rgba(255,255,255,0.25)" : "var(--primary-light)",
                    color: chip.active ? "white" : "var(--primary-dark)",
                    fontWeight: 800,
                  }}
                >
                  {chip.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table Card */}
          <div
            className="rounded-3xl overflow-hidden animate-fade-in-up"
            style={{
              background: "var(--surface)",
              boxShadow: "var(--shadow-card)",
              animationDelay: "100ms",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--primary-xlight)" }}>
                    {["Penghuni", "Kamar", "No. HP", "Tgl Masuk", "Bayar", "Status", "Aksi"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-4 text-xs font-black uppercase tracking-wide"
                        style={{ color: "var(--primary-dark)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {penghuniData.map((p, i) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: i < penghuniData.length - 1 ? "1px solid var(--border)" : "none",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--primary-xlight)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {/* Penghuni */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                            style={{ background: avatarColors[i % avatarColors.length] }}
                          >
                            {getInitials(p.nama)}
                          </div>
                          <span className="text-sm font-bold" style={{ color: "var(--text-main)" }}>
                            {p.nama}
                          </span>
                        </div>
                      </td>

                      {/* Kamar */}
                      <td className="px-6 py-4">
                        <span
                          className="px-2.5 py-1 rounded-xl text-xs font-black"
                          style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}
                        >
                          {p.kamar}
                        </span>
                      </td>

                      {/* HP */}
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                        {p.hp}
                      </td>

                      {/* Masuk */}
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                        {p.masuk}
                      </td>

                      {/* Bayar */}
                      <td className="px-6 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: p.bayar === "Lunas" ? "#d1fae5" : p.bayar === "Belum" ? "#fee2e2" : "#f1f5f9",
                            color: p.bayar === "Lunas" ? "#059669" : p.bayar === "Belum" ? "#dc2626" : "#64748b",
                          }}
                        >
                          {p.bayar}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: p.status === "Aktif" ? "#d1fae5" : "#f1f5f9",
                            color: p.status === "Aktif" ? "#059669" : "#64748b",
                          }}
                        >
                          {p.status}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/admin/penghuni/edit/${p.id}`}
                            className="px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{
                              background: "var(--primary-light)",
                              color: "var(--primary-dark)",
                              textDecoration: "none",
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            className="px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{
                              background: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold" style={{ color: "var(--text-xmuted)" }}>
                Menampilkan {penghuniData.length} dari {penghuniData.length} data
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className="w-8 h-8 rounded-xl text-sm font-bold"
                    style={{
                      background: n === 1 ? "var(--primary)" : "transparent",
                      color: n === 1 ? "white" : "var(--text-muted)",
                      border: n === 1 ? "none" : "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
