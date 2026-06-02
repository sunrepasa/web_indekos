"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Building2, Eye, EyeOff, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true)
      await new Promise(r => setTimeout(r, 800))
      // Set auth token cookie so middleware allows dashboard access
      document.cookie = "token=demo-token; path=/; max-age=86400"
      router.push("/dashboard/admin")
    } else {
      alert("Isi email dan password")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative">
        <div className="absolute inset-0 bg-emerald-900/20" />
        {/* Brand */}
        <div className="relative z-10 flex items-center text-lg font-medium">
          <Building2 className="mr-2 h-6 w-6" />
          INDEKOS
        </div>

        {/* Quote */}
        <div className="relative z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Platform manajemen kos ini telah menghemat ratusan jam kerja kami setiap bulannya.
              Sangat direkomendasikan untuk pemilik properti modern!"
            </p>
            <footer className="text-sm text-zinc-400">Sofia Davis, Property Manager</footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center p-8 bg-white relative">
        {/* Back/Other Links (Top Right) */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <span className="text-sm font-medium text-slate-500">Need help? <a href="#" className="underline underline-offset-4 hover:text-slate-900">Contact Support</a></span>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Log in to your account
            </h1>
            <p className="text-sm text-slate-500">
              Enter your email below to log in to your dashboard
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[26px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white shadow hover:bg-emerald-600/90 h-9 px-4 py-2 w-full mt-2"
            >
              {loading ? (
                 <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : null}
              Sign In
            </button>
          </form>

          {/* Demo Info */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Demo Login Details</span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-md">
            <div><strong>Email:</strong> admin</div>
            <div><strong>Pass:</strong> 123</div>
          </div>

          <p className="px-8 text-center text-sm text-slate-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-slate-900">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-slate-900">Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  )
}