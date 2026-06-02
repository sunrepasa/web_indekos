# Panduan Desain UI (Acuan: Dashboard Travenly)

Dokumen ini berisi panduan desain dan spesifikasi UI/UX berdasarkan referensi gambar dashboard yang diberikan pengguna (Dashboard Travenly). Panduan ini akan digunakan sebagai acuan utama dalam membangun antarmuka web aplikasi/indekos kedepannya.

## 1. Arsitektur Layout Utama
Layout menggunakan model **3-Kolom** (Three-column layout):
- **Kolom Kiri (Sidebar / Navigasi):** ~20% lebar layar. Berisi logo aplikasi, menu navigasi utama (vertikal), banner promosi kecil berbentuk rounded, dan tombol logout di bagian bawah.
- **Kolom Tengah (Main Content):** ~55% lebar layar. Area ini memiliki ruang lebar, memuat:
  - *Header*: Teks sapaan ("Hello, Nama!"), sub-teks, dan komponen Search Bar & Filter.
  - *Seksi Konten Primer*: (Contoh: "Discover World") menggunakan tab navigasi inline, disusul barisan Card berbentuk portrait/vertikal.
  - *Seksi Konten Sekunder*: (Contoh: "Event Dates") menampilkan kalender inline horizontal dan list Card berukuran memanjang (landscape) disusun dalam _grid_.
- **Kolom Kanan (Profile & Sidebar Kanan):** ~25% lebar layar. Menampilkan profil pengguna (avatar, nama, role), dan list ringkasan/widget. Ruang ini memiliki **background image spesifik** (seperti ilustrasi alam/vektor) yang memenuhi seluruh tinggi kolom.

## 2. Palet Warna (Color Palette)
- **Primary Color:** Hijau cerah (misal: `#10b981` atau Emerald di Tailwind). Digunakan kuat untuk:
  - Menu aktif (Background dan icon)
  - Tombol utama (Search)
  - Indikator tanggal aktif
  - Harga atau teks _highlight_
- **Secondary/Soft Color:** Hijau transparan atau sangat muda (misal: `#ecfdf5`). Digunakan untuk tombol sekunder (misal tombol *heart/favorite* pada card).
- **Background Color (Base):** Putih gading / abu-abu sangat muda (misal: `#f8fafc`). Area utama aplikasi tidak murni putih, melainkan _off-white_ agar komponen card terlihat menonjol.
- **Surface Color (Cards):** Putih murni (`#ffffff`).
- **Accent/Alert Color:** Oranye cerah untuk *badge* notifikasi (seperti di menu "Message" atau lonceng notifikasi).
- **Text Main:** Hitam pekat atau Dark Slate (misal: `#1e293b`) untuk heading/title.
- **Text Muted:** Abu-abu (misal: `#94a3b8`) untuk sub-text, menu tidak aktif, dan teks meta.

## 3. Tipografi (Typography)
- **Font Family:** Font Sans-Serif yang terlihat modern, membulat, dan clean (Sangat disarankan: **Nunito**, **Outfit**, **Poppins**, atau **Inter**).
- **Headers:** Tebal (Bold/Semibold) membulat, sangat tebal pada sapaan utama (H1) dan judul seksi.
- **Body & Sub-text:** Reguler, ukuran font agak lebih kecil namun terbaca jelas, memberikan kesan _clean_.

## 4. Gaya UI & Elemen Visual (UI Styling)

### A. Rounded Corners (Sudut Membulat)
Elemen utama desain ini adalah seberapa besar lengkungan tiap komponen.
- **Cards (Kartu):** `border-radius: 20px` hingga `24px` (Sangat membulat).
- **Images di dalam Card:** Mengikuti lengkungan luar card, namun sisi pinggirnya memiliki semacam margin/padding putih (tidak memenuhi card *edge-to-edge* secara penuh pada versi _landscape_).
- **Button, Search, & Badge:** Bentuk pil / *Pill-shaped* (`rounded-full`).

### B. Drop Shadows (Bayangan)
Bayangan yang digunakan **sangat halus, berskala luas (spread besar), dan tidak gelap**.
- Box-shadow menggunakan opacity sangat rendah dengan blur yang tinggi. Ini membuat card terlihat "melayang" (floating effect) tanpa terkesan kotor.

### C. Komponen Detail
- **Search Bar Area:** 
  Input search berupa *pill-shape* yang bersih dengan *box-shadow*. Di sebelahnya ada tombol filter kecil dan tombol 'Search' solid.
- **Cards (Desain Kartu):**
  - **Portrait Card:** Gambar memenuhi area atas card (rounded top edge), di bawahnya terdapat deskripsi. Di pojok kanan bawah terdapat tombol aksi (ikon Love) bulat hijau.
  - **Landscape Card:** Gambar berada di sisi kiri berbentuk kotak rounded. Area teks di kanan. 
- **Kalender Horizontal:** 
  Bentuk indikator _pill_ memanjang ke bawah. Teks nama hari di atas dan tanggal di bawah. Jika sedang aktif (selected), backgound menjadi hijau solid.
- **Right Panel (Glassmorphism Tipis):**
  Elemen data (seperti card 'Destination Trip' di sisi kanan) melayang di atas ilustrasi background. Mereka direpresentasikan sebagai kotak semi-putih atau shadow tinggi agar teks tetap terbaca dari background bergambar.
  
## 5. Eksekusi Teknis (Rekomendasi Tailwind CSS)
Jika dikembangkan menggunakan framework seperti Tailwind CSS:
- Gunakan kelas `rounded-2xl` atau `rounded-3xl` untuk card.
- Gunakan kelas `rounded-full` untuk button dan input search.
- Gunakan kelas `shadow-xl shadow-green-900/5` (contoh) untuk mendapat pencahayaan shadow halus.
- Batasi penggunaan garis/border tepi; percayakan pemisahan visual (_separation_) menggunakan white-space dan drop-shadow.

## Kesimpulan
Keseluruhan tema desain memberikan kesan: **Fresh, Organik, Welcoming, dan Premium**. Jangan memadatkan elemen; biarkan tiap komponen memiliki "ruang napas" (padding) yang luas.
