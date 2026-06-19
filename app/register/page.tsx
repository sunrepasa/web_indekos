"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Building2, Eye, EyeOff, User, Phone } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const supabase = createClient()

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Mohon isi semua field yang wajib")
      return
    }

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok")
      return
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    setError("")
    setSuccess("")
    setLoading(true)

    // Menyimpan metadata ke Supabase Auth
    // Harap dicatat: Anda mungkin memerlukan Trigger di PostgreSQL untuk
    // menyalin data dari auth.users ke tabel public.profiles secara otomatis.
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone || null,
        }
      }
    })

    if (authError) {
      setError("Registrasi gagal: " + authError.message)
      setLoading(false)
      return
    }

    setSuccess("Registrasi berhasil! Silakan periksa email Anda, atau arahkan ke halaman Login.")
    setLoading(false)
    
    // Opsional: Redirect langsung ke login setelah beberapa detik
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "var(--bg)" }}>

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between p-10 text-white relative overflow-hidden"
        style={{ background: "var(--text-main)" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(5,150,105,0.08)" }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-2 text-lg font-black tracking-tight cursor-pointer" onClick={() => router.push('/')}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-dark))` }}
          >
            <Building2 className="w-4.5 h-4.5" />
          </div>
          INDEKOS
        </div>

        {/* Quote */}
        <div className="relative z-10 mt-auto">
          <blockquote className="space-y-3">
            <p className="text-lg leading-relaxed opacity-90">
              "Bergabung bersama kami dan nikmati kemudahan mengelola serta menyewa hunian impian Anda. Prosesnya cepat, aman, dan tanpa repot!"
            </p>
            <footer className="text-sm" style={{ color: "var(--text-xmuted)" }}>
              Komunitas Penghuni Indekos
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center p-8 relative" style={{ background: "var(--surface)" }}>
        {/* Top help link */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Sudah punya akun?{" "}
            <a href="/login" className="underline underline-offset-4" style={{ color: "var(--text-sub)" }}>
              Masuk di sini
            </a>
          </span>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] my-10">

          {/* Title */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
              Daftar Akun Baru
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Lengkapi data berikut untuk bergabung dengan Indekos
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div
              className="text-sm font-semibold px-4 py-3 rounded-xl"
              style={{ background: "var(--error-bg)", color: "var(--error-text)" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="text-sm font-semibold px-4 py-3 rounded-xl"
              style={{ background: "var(--success-bg, #ecfdf5)", color: "var(--success-text, #059669)" }}
            >
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Nama Lengkap <span className="text-red-500">*</span></label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl text-sm font-semibold outline-none transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-main)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-light)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl text-sm font-semibold outline-none transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-main)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-light)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Nomor HP (Opsional)</label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type="text"
                  placeholder="08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl text-sm font-semibold outline-none transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-main)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-light)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-xl text-sm font-semibold outline-none transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-main)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-light)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-xmuted)" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Konfirmasi Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-xl text-sm font-semibold outline-none transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text-main)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-light)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-xmuted)" }}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading && (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              Sign Up
            </button>
          </form>

          <p className="px-8 text-center text-xs pt-4" style={{ color: "var(--text-xmuted)" }}>
            Dengan mendaftar, Anda menyetujui{" "}
            <a href="#" className="underline underline-offset-4" style={{ color: "var(--text-muted)" }}>Persyaratan Layanan</a>{" "}
            dan{" "}
            <a href="#" className="underline underline-offset-4" style={{ color: "var(--text-muted)" }}>Kebijakan Privasi</a> kami.
          </p>
        </div>
      </div>
    </div>
  )
}
