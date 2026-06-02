-- =============================================
-- ENUM TYPES
-- =============================================
CREATE TYPE kamar_status AS ENUM ('tersedia', 'terisi', 'maintenance');
CREATE TYPE pembayaran_status AS ENUM ('lunas', 'belum_bayar', 'telat');
CREATE TYPE pengaduan_status AS ENUM ('pending', 'proses', 'selesai');
CREATE TYPE pengaduan_kategori AS ENUM ('fasilitas', 'keamanan', 'kebersihan', 'lainnya');
CREATE TYPE user_role AS ENUM ('admin', 'penghuni');

-- =============================================
-- PROFILES (extends auth.users dari Supabase)
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'penghuni',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- KAMAR
-- =============================================
CREATE TABLE kamar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor TEXT NOT NULL UNIQUE,          -- "A-01", "B-02", dll
  lantai INTEGER NOT NULL DEFAULT 1,
  tipe TEXT NOT NULL DEFAULT 'standar', -- "standar", "premium", dll
  harga_per_bulan INTEGER NOT NULL,
  fasilitas TEXT[],                    -- ["AC", "Kamar Mandi Dalam", "WiFi"]
  status kamar_status NOT NULL DEFAULT 'tersedia',
  foto_url TEXT[],
  deskripsi TEXT,
  luas_m2 INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- KONTRAK (menghubungkan penghuni ke kamar)
-- =============================================
CREATE TABLE kontrak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kamar_id UUID NOT NULL REFERENCES kamar(id),
  penghuni_id UUID NOT NULL REFERENCES profiles(id),
  tanggal_masuk DATE NOT NULL,
  tanggal_keluar DATE,                 -- NULL = masih aktif
  harga_disepakati INTEGER NOT NULL,   -- bisa beda dari harga kamar
  durasi_bulan INTEGER NOT NULL DEFAULT 12,
  status TEXT NOT NULL DEFAULT 'aktif', -- 'aktif', 'selesai', 'dibatalkan'
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PEMBAYARAN
-- =============================================
CREATE TABLE pembayaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kontrak_id UUID NOT NULL REFERENCES kontrak(id),
  penghuni_id UUID NOT NULL REFERENCES profiles(id),
  kamar_id UUID NOT NULL REFERENCES kamar(id),
  bulan INTEGER NOT NULL,              -- 1-12
  tahun INTEGER NOT NULL,
  jumlah INTEGER NOT NULL,
  status pembayaran_status NOT NULL DEFAULT 'belum_bayar',
  tanggal_jatuh_tempo DATE NOT NULL,
  tanggal_bayar TIMESTAMPTZ,
  bukti_url TEXT,                      -- URL foto bukti bayar (Supabase Storage)
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kontrak_id, bulan, tahun)     -- 1 tagihan per bulan per kontrak
);

-- =============================================
-- PENGADUAN
-- =============================================
CREATE TABLE pengaduan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  penghuni_id UUID NOT NULL REFERENCES profiles(id),
  kamar_id UUID NOT NULL REFERENCES kamar(id),
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  kategori pengaduan_kategori NOT NULL DEFAULT 'lainnya',
  status pengaduan_status NOT NULL DEFAULT 'pending',
  foto_url TEXT[],
  tanggal_selesai TIMESTAMPTZ,
  catatan_admin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- AKTIVITAS LOG (audit trail)
-- =============================================
CREATE TABLE aktivitas_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,                -- "kamar.created", "pembayaran.lunas", dll
  entity_type TEXT NOT NULL,           -- "kamar", "penghuni", "pembayaran"
  entity_id UUID,
  metadata JSONB,                      -- data tambahan
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kamar ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontrak ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembayaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaduan ENABLE ROW LEVEL SECURITY;

-- Helper function cek role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- KAMAR: admin bisa semua, penghuni hanya baca
CREATE POLICY "Admin full access kamar"
  ON kamar FOR ALL
  USING (get_user_role() = 'admin');

CREATE POLICY "Penghuni read kamar"
  ON kamar FOR SELECT
  USING (get_user_role() = 'penghuni');

-- KONTRAK: admin semua, penghuni hanya miliknya
CREATE POLICY "Admin full access kontrak"
  ON kontrak FOR ALL
  USING (get_user_role() = 'admin');

CREATE POLICY "Penghuni baca kontrak sendiri"
  ON kontrak FOR SELECT
  USING (penghuni_id = auth.uid());

-- PEMBAYARAN: admin semua, penghuni hanya miliknya
CREATE POLICY "Admin full access pembayaran"
  ON pembayaran FOR ALL
  USING (get_user_role() = 'admin');

CREATE POLICY "Penghuni baca & upload bukti pembayaran sendiri"
  ON pembayaran FOR SELECT
  USING (penghuni_id = auth.uid());

CREATE POLICY "Penghuni update bukti bayar sendiri"
  ON pembayaran FOR UPDATE
  USING (penghuni_id = auth.uid())
  WITH CHECK (penghuni_id = auth.uid());

-- PENGADUAN: admin semua, penghuni hanya miliknya
CREATE POLICY "Admin full access pengaduan"
  ON pengaduan FOR ALL
  USING (get_user_role() = 'admin');

CREATE POLICY "Penghuni CRUD pengaduan sendiri"
  ON pengaduan FOR ALL
  USING (penghuni_id = auth.uid());
