"use client";
import { UserCheck, Plus, Search, Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";


const penyewaData = [
  { id: "1", nama: "Ahmad Rizki", nik: "3271234567890001", hp: "081234567890", email: "ahmad@mail.com", kamar: "A-01", kontrak: "1 Jan 2024 – 31 Des 2024", status: "Aktif" },
  { id: "2", nama: "Marina Putri", nik: "3271234567890002", hp: "082345678901", email: "marina@mail.com", kamar: "A-02", kontrak: "1 Mar 2024 – 28 Feb 2025", status: "Aktif" },
  { id: "3", nama: "Yoga Pratama", nik: "3271234567890003", hp: "083456789012", email: "yoga@mail.com", kamar: "B-01", kontrak: "1 Jun 2023 – 31 Mei 2024", status: "Selesai" },
];

const avatarColors = ["#059669", "#3b82f6", "#8b5cf6"];

export default function PenyewaPage() {
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#dbeafe" }}>
              <UserCheck style={{ width: 20, height: 20, color: "#3b82f6" }} />
            </div>
            <div>
              <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Data Penyewa</h1>
              <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Kelola data penyewa kos</p>
            </div>
          </div>
          <Link
            href="/dashboard/admin/penyewa/tambah"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.3)", textDecoration: "none" }}
          >
            <Plus style={{ width: 15, height: 15 }} /> Tambah Penyewa
          </Link>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {/* Searchbar */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-full mb-6 animate-fade-in-up"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
          >
            <Search style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
            <input
              placeholder="Cari nama atau NIK penyewa..."
              className="flex-1 outline-none text-sm font-semibold bg-transparent"
              style={{ color: "var(--text-main)" }}
            />
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {penyewaData.map((p, i) => (
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
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black text-white"
                      style={{ background: avatarColors[i % avatarColors.length] }}
                    >
                      {p.nama.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-black text-sm" style={{ color: "var(--text-main)" }}>{p.nama}</p>
                      <p className="text-xs font-semibold" style={{ color: "var(--text-xmuted)" }}>NIK: {p.nik.slice(-8)}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: p.status === "Aktif" ? "#d1fae5" : "#f1f5f9",
                      color: p.status === "Aktif" ? "#059669" : "#64748b",
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Phone style={{ width: 13, height: 13, color: "var(--text-xmuted)", flexShrink: 0 }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{p.hp}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail style={{ width: 13, height: 13, color: "var(--text-xmuted)", flexShrink: 0 }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{p.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar style={{ width: 13, height: 13, color: "var(--text-xmuted)", flexShrink: 0 }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{p.kontrak}</span>
                  </div>
                </div>

                {/* Kamar badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1.5 rounded-xl" style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}>
                    Kamar {p.kamar}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--primary-xlight)", color: "var(--primary-dark)", border: "none", cursor: "pointer" }}>Edit</button>
                    <button className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "#fee2e2", color: "#dc2626", border: "none", cursor: "pointer" }}>Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
    </div>
  );
}

