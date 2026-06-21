"use client";
import { useState } from "react";
import { ArrowLeft, Save, User, Mail, Phone, Lock, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { penghuniTambahAction } from "@/app/actions/penghuni";

export default function TambahPenghuniClient({ kamarTersedia }: { kamarTersedia: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    const result = await penghuniTambahAction(formData);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard/admin/penghuni");
    } else {
      alert(result.error);
    }
  };

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
            href="/dashboard/admin/penghuni"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-200"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <ArrowLeft style={{ width: 18, height: 18, color: "var(--text-main)" }} />
          </Link>
          <div>
            <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Tambah Penghuni Baru</h1>
            <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Lengkapi data personal penghuni</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-8">
        <form action={handleAction} className="max-w-3xl space-y-6 animate-fade-in-up">
          <div className="rounded-3xl p-6 lg:p-8" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
            <h2 className="text-base font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-main)" }}>
              <User size={18} style={{ color: "var(--primary-dark)" }} /> Data Personal
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Nama Lengkap <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input required name="full_name" placeholder="Contoh: Budi Santoso" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input required name="email" type="email" placeholder="budi@mail.com" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

              {/* No. Telepon */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>No. Telepon / WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input name="phone" type="tel" placeholder="081234567890" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

              {/* Kamar Assignment (Optional) */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Pilih Kamar (Opsional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <select name="kamar_id" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all appearance-none cursor-pointer" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }}>
                    <option value="">-- Lewati (Status: Non-aktif) --</option>
                    {kamarTersedia.map(k => (
                      <option key={k.id} value={k.id}>
                        {k.nomor} - Rp {k.harga_per_bulan.toLocaleString('id-ID')}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-xmuted)" }}>Jika dipilih, status penghuni otomatis menjadi Aktif</p>
              </div>

              {/* Password Akses */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Password Akses</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input name="password" type="password" placeholder="Minimal 8 karakter" minLength={8} className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-xmuted)" }}>Biarkan kosong jika tidak membuat akun aplikasi</p>
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-full text-sm font-bold transition-all" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-main)", cursor: "pointer" }}>
              Batal
            </button>
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-full transition-all" style={{ background: "linear-gradient(135deg, #10b981, #059669)", border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.3)", opacity: loading ? 0.7 : 1 }}>
              <Save size={16} />
              {loading ? "Menyimpan..." : "Simpan Penghuni"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
