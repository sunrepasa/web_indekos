"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Building2, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Isi email dan password")
      return
    }

    setError("")
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError("Login gagal: " + authError.message)
      setLoading(false)
      return
    }

    router.push("/dashboard/admin")
    router.refresh()
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
        <div className="relative z-10 flex items-center gap-2 text-lg font-black tracking-tight">
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
              "Platform manajemen kos ini telah menghemat ratusan jam kerja kami setiap bulannya.
              Sangat direkomendasikan untuk pemilik properti modern!"
            </p>
            <footer className="text-sm" style={{ color: "var(--text-xmuted)" }}>
              Sofia Davis, Property Manager
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center p-8 relative" style={{ background: "var(--surface)" }}>
        {/* Top help link */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Belum punya akun?{" "}
            <a href="/register" className="underline underline-offset-4" style={{ color: "var(--text-sub)" }}>
              Daftar di sini
            </a>
          </span>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">

          {/* Title */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
              Masuk ke Akun
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Masukkan email dan password untuk mengakses dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="text-sm font-semibold px-4 py-3 rounded-xl"
              style={{ background: "var(--error-bg)", color: "var(--error-text)" }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type="email"
                  placeholder="admin@indekos.com"
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

            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-sub)" }}>Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-xmuted)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading && (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              Sign In
            </button>
          </form>

          {/* Demo Info */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full" style={{ borderTop: "1px solid var(--border)" }} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 font-semibold" style={{ background: "var(--surface)", color: "var(--text-xmuted)" }}>
                Demo Login
              </span>
            </div>
          </div>
          <div
            className="flex justify-between text-sm font-semibold p-3 rounded-xl"
            style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--text-sub)" }}
          >
            <div><strong style={{ color: "var(--text-main)" }}>Email:</strong> admin@indekos.com</div>
            <div><strong style={{ color: "var(--text-main)" }}>Pass:</strong> admin123</div>
          </div>

          <p className="px-8 text-center text-xs" style={{ color: "var(--text-xmuted)" }}>
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4" style={{ color: "var(--text-muted)" }}>Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4" style={{ color: "var(--text-muted)" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}