import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — JANGAN dihapus!
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Belum login → ke login page
  if (!user && (path.startsWith('/dashboard/admin') || path.startsWith('/dashboard/penghuni'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika user coba akses admin, belum ada profile check karena tabel profiles belum ada
  // Kita bypass aja sementara sampai profile terbuat. Nanti direvisi.

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/admin/:path*', '/dashboard/penghuni/:path*'],
}