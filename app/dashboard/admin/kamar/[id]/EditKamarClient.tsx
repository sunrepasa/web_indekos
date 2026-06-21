"use client";
import { useState } from "react";
import { ArrowLeft, Save, BedDouble, Info, DollarSign, List, Home, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { kamarEditAction, kamarDeleteAction } from "@/app/actions/kamar";

export default function EditKamarClient({ kamar }: { kamar: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    formData.append("id", kamar.id);
    const result = await kamarEditAction(formData);
    setLoading(false);
    
    if (result.success) {
      router.push("/dashboard/admin/kamar");
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async () => {
    if (kamar.status === "terisi") {
      const confirmDelete = window.confirm(
        "PERINGATAN: Kamar ini sedang terisi! Jika kamar Dihapus, seluruh riwayat kontrak penghuni bersangkutan di kamar ini akan ikut TERHAPUS. Anda yakin ingin melanjutkan?"
      );
      if (!confirmDelete) return;
    } else {
      if (!window.confirm("Apakah Anda yakin ingin menghapus kamar ini?")) return;
    }

    setLoading(true);
    const result = await kamarDeleteAction(kamar.id);
    setLoading(false);
    
    if (result.success) {
      router.push("/dashboard/admin/kamar");
    } else {
      alert(result.error);
    }
  };

  const fasilitasStr = kamar.fasilitas?.join(", ") || "";

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
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/admin/kamar"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-200"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <ArrowLeft style={{ width: 18, height: 18, color: "var(--text-main)" }} />
          </Link>
          <div>
            <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Edit Detail Kamar</h1>
            <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{kamar.nomor} - {kamar.tipe}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-full transition-all"
          style={{ background: "#ef4444", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
        >
          <Trash2 size={16} />
          Hapus Kamar
        </button>
      </header>

      <main className="flex-1 p-6 lg:p-8">
        <form action={handleAction} className="max-w-3xl space-y-6 animate-fade-in-up">
          <div className="rounded-3xl p-6 lg:p-8" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
            <h2 className="text-base font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
              <BedDouble size={18} style={{ color: "var(--primary-dark)" }} /> Informasi Utama
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Nomor Kamar */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Nomor Kamar <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <List size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input required name="nomor" defaultValue={kamar.nomor} placeholder="Contoh: A-01" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-xmuted)" }}>Format: A-01, B-02, dst.</p>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Status Kamar</label>
                <select name="status" defaultValue={kamar.status} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none appearance-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }}>
                  <option value="tersedia">Tersedia</option>
                  <option value="terisi">Terisi</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {/* Tipe Kamar */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Tipe Kamar <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <select required name="tipe" defaultValue={kamar.tipe} className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none appearance-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }}>
                    <option value="standar">Standar</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>

              {/* Lantai */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Lantai <span className="text-red-500">*</span></label>
                <input required name="lantai" defaultValue={kamar.lantai} type="number" min="1" max="20" placeholder="1" className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
              </div>

              {/* Harga */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Harga Per Bulan (Rp) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input required name="harga" defaultValue={kamar.harga_per_bulan} type="number" min="100000" placeholder="1500000" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

              {/* Fasilitas */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Fasilitas</label>
                <input name="fasilitas" defaultValue={fasilitasStr} placeholder="AC, WiFi, Kamar Mandi Dalam (pisahkan dengan koma)" className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
              </div>

              {/* Deskripsi */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Deskripsi</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Info size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <textarea name="deskripsi" defaultValue={kamar.deskripsi || ""} rows={4} placeholder="Tuliskan deskripsi atau catatan khusus untuk kamar ini..." className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all resize-none" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-full text-sm font-bold transition-all" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-main)", cursor: "pointer" }}>
              Batal
            </button>
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-full transition-all" style={{ background: "linear-gradient(135deg, #10b981, #059669)", border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.3)", opacity: loading ? 0.7 : 1 }}>
              <Save size={16} />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
