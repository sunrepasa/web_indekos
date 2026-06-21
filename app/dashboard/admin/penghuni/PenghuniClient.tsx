"use client";
import { useState, useMemo } from "react";
import { Users, Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { deletePenghuniAction } from "@/app/actions/penghuni";

function getInitials(name: string) {
  if (!name) return "XX";
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = ["#059669", "#3b82f6", "#f97316", "#8b5cf6", "#ef4444"];

export default function PenghuniClient({ initialData }: { initialData: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [data, setData] = useState(initialData);

  const mappedData = useMemo(() => {
    return data.map(profile => {
      // Find active or most recent contract
      const contract = profile.kontrak?.[0];
      const status = contract ? (contract.status === 'aktif' ? 'Aktif' : 'Non-aktif') : 'Non-aktif';
      // Mute payment status for now since payment logic is not fully defined
      const bayar = "Cek Detail";

      return {
        id: profile.id,
        nama: profile.full_name || "Tanpa Nama",
        kamar: contract?.kamar?.nomor || "Belum ada",
        hp: profile.phone || "-",
        masuk: contract?.tanggal_masuk ? new Date(contract.tanggal_masuk).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-",
        status,
        bayar,
      };
    });
  }, [data]);

  const filteredData = useMemo(() => {
    return mappedData.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.kamar.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "Semua" ? true : p.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter, mappedData]);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data penghuni ini?")) {
      const result = await deletePenghuniAction(id);
      if (result.success) {
        setData((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(result.error);
      }
    }
  };

  const stats = [
    { label: "Semua", count: mappedData.length, active: filter === "Semua" },
    { label: "Aktif", count: mappedData.filter((d) => d.status === "Aktif").length, active: filter === "Aktif" },
    { label: "Non-aktif", count: mappedData.filter((d) => d.status === "Non-aktif").length, active: filter === "Non-aktif" },
  ];

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            {stats.map((chip) => (
              <button
                key={chip.label}
                onClick={() => setFilter(chip.label)}
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
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                        Tidak ada data penghuni ditemukan.
                      </td>
                    </tr>
                  )}
                  {filteredData.map((p, i) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: i < filteredData.length - 1 ? "1px solid var(--border)" : "none",
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
                            onClick={() => handleDelete(p.id)}
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
                Menampilkan {filteredData.length} data
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
