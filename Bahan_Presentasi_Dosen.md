# Bedah Kode Aplikasi Manajemen Indekos
**(Panduan Presentasi Dosen)**

Dokumen ini disusun secara terstruktur berdasarkan alur pengguna (User Flow) untuk memudahkan proses bedah kode (Code Review) bersama dosen. Teknologi utama yang digunakan adalah **Next.js (App Router)** dan **Supabase** (PostgreSQL, Auth, RLS).

---

## 1. Arsitektur Utama (Server-Side Rendering & Supabase)
Aplikasi ini menggunakan pola arsitektur modern dari Next.js (App Router) di mana manipulasi dan pembacaan database mayoritas dilakukan di server (Server Components & Server Actions) sebelum dikirim ke Client. Hal ini memberikan nilai plus pada keamanan *(Keamanan Kunci API, perlindungan CORS, dll)*.

---

## 2. Alur Autentikasi (Otentikasi Login)
**Skenario**: Pengguna membuka halaman web pertama kali, memasukkan Email dan Password, lalu menekan tombol Login.

### File Terkait:
- `app/login/page.tsx` (Antarmuka Pengguna)
- `app/actions/auth.ts` (atau di dalam page login)

### Bagaimana Kode Bekerja:
Saat tombol *Submit* ditekan, UI memanggil **Server Action**. Sistem akan menggunakan modul `createClient()` milik Supabase untuk mencocokkan di database. Jika benar, Supabase mengembalikan *token sesi* yang otomatis diikat (set) ke *Cookies* di browser.

**Snippets Code (Logika Autentikasi):**
```typescript
// /lib/supabase/server.ts 
// Pola standar Next.js untuk Supabase yang menyisipkan cookie JWT secara otomatis.
export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
             cookieStore.set(name, value, options)
          );
        },
      },
    }
  )
}
```

---

## 3. Alur Memasuki Dashboard Utama
**Skenario**: Setelah login berhasil, pengguna dilempar ke `/dashboard/admin`.
Sistem akan memuat sekumpulan grafik/indikator jumlah kamar dan aktivitas secara paralel tanpa membuat UI lemot.

### File Terkait:
- `app/dashboard/layout.tsx` (Kerangka Web / Sidebar & Topbar)
- `app/dashboard/admin/page.tsx` (Isi Dashboard)
- `lib/dal/kamar.ts` (Data Access Layer - Fungsi Database)

### Bagaimana Kode Bekerja:
Dashboard adalah **Server Component**. Ia akan memikirkan (fetching) seluruh data ke PostgreSQL _sebelum_ merender HTML ke layar. Kita menggunakan `Promise.all` agar banyak pengambilan data terjadi serentak dengan cepat. Di sini juga `Topbar` akan memeriksa token JWT untuk membaca nama Admin yang sedang online.

**Snippets Code (Pengambilan Paralel Server-Side):**
```tsx
// /app/dashboard/admin/page.tsx
export default async function DashboardAdmin() {
  // Mengeksekusi statistik dan list kamar secara bersamaan (Mencegah blocking)
  const [stats, kamarList] = await Promise.all([
     getKamarStats(), 
     getAllKamar()
  ]);

  return (
    <main>
      {/* Oper data mentah menjadi UI StatCard secara dinamis */}
      <StatCard title="Total Kamar" value={stats.total} />
      <StatCard title="Terisi" value={stats.terisi} />
    </main>
  );
}
```

---

## 4. Alur C.R.U.D Data Kamar (Hak Istimewa Admin)
**Skenario**: Admin masuk ke menu "Data Kamar", memfilter kamar dengan *Search*, lalu menekan fungsi "Tambah Kamar" atau "Hapus Kamar".

### Sorotan Teknis: Row-Level Security (RLS) Bypass
Supabase memiliki RLS (Keamanan Tingkat Baris) untuk menolak aksi perusakan database. Saat menambah/menghapus kamar, kita sengaja tidak menggunakan Client biasa, melainkan menyuntikkan **Service Role Key (Admin Client)** agar operasi ini mendapatkan hak absolut dari server untuk membobol ke dalam Database.

**Snippets Code (Operasi DAL Kamar dengan Admin Client):**
```typescript
// /lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
// Meminta wewenang penuh (SuperUser) untuk memanipulasi Tabel Kamar & Auth
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// /lib/dal/kamar.ts
export async function createKamar(input: KamarInsert) {
  const supabase = createAdminClient(); // <-- Akses sakti
  const { data, error } = await supabase.from('kamar').insert(input);
  if (error) throw new Error(error.message);
  return data;
}
```

**Snippet Code (Pencarian / Search Bar Real-time di Client Component):**
Pencarian tidak diproses di server agar tidak membebani network. Data disaring di peramban pengguna menggunakan *React Hooks* `useMemo`.
```tsx
// /components/kamar/KamarGrid.tsx
const filteredKamar = useMemo(() => {
  return kamarList.filter(k => {
    // Toleransi Null Value dan mengacuhkan kapitalisasi huruf (toLowerCase)
    const matchSearch = 
      (k.nomor || "").toLowerCase().includes(search.toLowerCase()) || 
      (k.tipe || "").toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });
}, [kamarList, search]);
```

---

## 5. Alur Kompleks: Manajemen Data Penghuni
**Skenario Dosen Berpotensi Bertanya**: *"Bagaimana cara sistem mengelola pendaftaran penghuni dan memastikan ia memegang kamar?"*

Ini adalah logika **Transaksional** paling rumit di aplikasi. Saat Admin menambahkan penghuni baru dan menyertakan kamar, ada **4 langkah** database yang dieksekusi oleh 1 Server Action:

1. Membuat Akun Autentikasi Pengguna di sistem `auth.users` Supabase.
2. Membuat Profil identitasnya (Tabel `profiles`).
3. Merangkai Perjanjian Sewa (Tabel `kontrak`).
4. Merubah Status Kamar menjadi "terisi" (Tabel `kamar`).

### File Terkait:
- `app/actions/penghuni.ts`

**Snippets Code (Transaksi Tambah Penghuni):**
```typescript
// /app/actions/penghuni.ts
export async function penghuniTambahAction(formData: FormData) {
  const email = formData.get("email");
  const nama = formData.get("nama");
  const kamar_id = formData.get("kamar_id"); // Bisa kosong

  const supabaseAdmin = createAdminClient(); // Butuh kunci admin untuk membuat user
  
  // Tahap 1: Daftarkan kredensial akun Auth Supabase (Bypass konfirmasi email)
  const authInput = { email, password: "Password123", email_confirm: true };
  const { data: authUser } = await supabaseAdmin.auth.admin.createUser(authInput);

  // Tahap 2: Buat Profil publik penghuni tersebut
  await createPenghuni({
     id: authUser.user.id,
     full_name: nama,
     role: "penghuni"
  });

  // Tahap 3 & 4: Otomatisasi Penempatan Kontrak Kamar
  if (kamar_id) {
    const { data: kamar } = await getKamarById(kamar_id);
    // Buat kontrak berjalan selama 1 bulan otomatis (Langkah 3)
    await createKontrak({
      kamar_id: kamar_id,
      penghuni_id: authUser.user.id,
      harga_disepakati: kamar.harga_per_bulan,
      status: "aktif"
    }, true); // Parameter admin == true

    // Kunci kamar agar statusnya tertutup untuk disewa (Langkah 4)
    await supabaseAdmin.from('kamar').update({ status: 'terisi' }).eq('id', kamar_id);
  }
}
```

---

### Kesimpulan untuk Dosen:
Pendekatan program ini sangat menjunjung tinggi prinsip **Decoupling** dan **Symmetry**:
- Semua validasi form dijaga oleh *Zod* (Anti-XSS / Injeksi).
- Database Interactor terpisah di dalam berkas Data Access Layer (DAL) `lib/dal/*`.
- Semua antarmuka di-*render* secara *Server-First* (Server Component) sehingga load aplikasi amat cepat, dan sebagian fungsionalitas reaktif (seperti Input Teks dan Pop-up Edit) diletakkan di dalam *Client Component*. 
- Memanfaatkan Supabase RLS dengan penanganan hibrida (`createClient` untuk sesi reguler, dan `createAdminClient` untuk eksekusi krusial Admin).
