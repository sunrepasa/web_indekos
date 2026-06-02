import { ArrowLeft, User, Phone, Home, Calendar, Save } from "lucide-react";
import Link from "next/link";

export default function EditPenghuniPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 flex flex-col">
      <header
          className="sticky top-0 z-30 flex items-center gap-4 px-8 py-4"
          style={{
            background: "rgba(240,253,244,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/dashboard/admin/penghuni"
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              textDecoration: "none",
              color: "var(--text-muted)",
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
          </Link>
          <div>
            <h1 className="text-lg font-black" style={{ color: "var(--text-main)" }}>
              Edit Penghuni
            </h1>
            <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
              ID: {params.id}
            </p>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-2xl">
            <div
              className="rounded-3xl p-6 lg:p-8 animate-fade-in-up"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="space-y-5">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-main)" }}>
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
                    <input
                      type="text"
                      placeholder="Nama lengkap penghuni"
                      defaultValue="Ngurah Fajar"
                      className="w-full py-3 pl-11 pr-4 text-sm font-semibold outline-none rounded-2xl"
                      style={{
                        background: "var(--primary-xlight)",
                        border: "2px solid transparent",
                        color: "var(--text-main)",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.background = "white";
                        e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "var(--primary-xlight)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* No HP */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-main)" }}>
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
                    <input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      defaultValue="081234567890"
                      className="w-full py-3 pl-11 pr-4 text-sm font-semibold outline-none rounded-2xl"
                      style={{
                        background: "var(--primary-xlight)",
                        border: "2px solid transparent",
                        color: "var(--text-main)",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.background = "white";
                        e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "var(--primary-xlight)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Kamar */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-main)" }}>
                    Nomor Kamar
                  </label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
                    <select
                      defaultValue="A-01"
                      className="w-full py-3 pl-11 pr-4 text-sm font-semibold outline-none rounded-2xl appearance-none"
                      style={{
                        background: "var(--primary-xlight)",
                        border: "2px solid transparent",
                        color: "var(--text-main)",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "var(--primary-xlight)";
                      }}
                    >
                      {["A-01", "A-02", "A-03", "B-01", "B-02", "B-03", "C-01"].map(k => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tanggal Masuk */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-main)" }}>
                    Tanggal Masuk
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 16, height: 16, color: "var(--text-xmuted)" }} />
                    <input
                      type="date"
                      defaultValue="2024-01-01"
                      className="w-full py-3 pl-11 pr-4 text-sm font-semibold outline-none rounded-2xl"
                      style={{
                        background: "var(--primary-xlight)",
                        border: "2px solid transparent",
                        color: "var(--text-main)",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "var(--primary-xlight)";
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-main)" }}>
                    Status
                  </label>
                  <div className="flex gap-3">
                    {["Aktif", "Non-aktif"].map((s) => (
                      <label
                        key={s}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          defaultChecked={s === "Aktif"}
                          style={{ accentColor: "var(--primary)" }}
                        />
                        <span className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Link
                    href="/dashboard/admin/penghuni"
                    className="flex-1 py-3 rounded-2xl text-sm font-bold text-center"
                    style={{
                      background: "var(--primary-xlight)",
                      color: "var(--primary-dark)",
                      textDecoration: "none",
                      border: "1px solid var(--primary-light)",
                    }}
                  >
                    Batal
                  </Link>
                  <button
                    className="flex-1 py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                    }}
                  >
                    <Save style={{ width: 15, height: 15 }} />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
