"use client";
import { useState } from "react";
import { ArrowLeft, Save, User, Mail, Phone, Lock, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { penghuniEditAction } from "@/app/actions/penghuni";

export default function EditPenghuniClient({ 
  profile, 
  kamarTersedia, 
  activeContract 
}: { 
  profile: any; 
  kamarTersedia: any[];
  activeContract: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Kombinasikan kamar tersedia dengan kamar yg sedang ia tempati
  // Supaya di dropdown kamar yang sekarang muncul
  const availableRooms = [...kamarTersedia];
  if (activeContract?.kamar) {
    if (!availableRooms.find(k => k.id === activeContract.kamar.id)) {
      availableRooms.unshift(activeContract.kamar);
    }
  }

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    formData.append("id", profile.id); // Kirim ID profil
    
    // We append the old_kamar_id to identify if it was changed
    if (activeContract?.kamar_id) {
       formData.append("old_kamar_id", activeContract.kamar_id);
    }

    const result = await penghuniEditAction(formData);
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
            <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>Edit Penghuni</h1>
            <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Perbarui profil atau tetapkan kamar</p>
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
                  <input required name="full_name" defaultValue={profile.full_name} placeholder="Contoh: Budi Santoso" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

              {/* No. Telepon */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>No. Telepon / WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <input name="phone" defaultValue={profile.phone} type="tel" placeholder="081234567890" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all" style={{ background: "var(--bg-main)", border: "1px solid var(--border)", color: "var(--text-main)" }} />
                </div>
              </div>

               {/* Kamar Assignment */}
               <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Kamar</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <select name="kamar_id" defaultValue={activeContract?.kamar_id || ""} className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all appearance-none cursor-pointer" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-main)" }}>
                    <option value="">-- Kosong / Cabut Kamar --</option>
                    {availableRooms.map(k => (
                      <option key={k.id} value={k.id}>
                        {k.nomor} - Rp {k.harga_per_bulan?.toLocaleString('id-ID')}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-xmuted)" }}>Jika kosong, sistem akan merubahnya menjadi Non-Aktif.</p>
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
