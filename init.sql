-- =============================================
-- 1. BERSIHKAN DATABASE (Reset)
-- =============================================
DROP TABLE IF EXISTS aktivitas_log CASCADE;
DROP TABLE IF EXISTS pengaduan CASCADE;
DROP TABLE IF EXISTS pembayaran CASCADE;
DROP TABLE IF EXISTS kontrak CASCADE;
DROP TABLE IF EXISTS kamar CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP TYPE IF EXISTS kamar_status CASCADE;
DROP TYPE IF EXISTS pembayaran_status CASCADE;
DROP TYPE IF EXISTS pengaduan_status CASCADE;
DROP TYPE IF EXISTS pengaduan_kategori CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- =============================================
-- 2. ENUM TYPES
-- =============================================
CREATE TYPE kamar_status AS ENUM ('tersedia', 'terisi', 'maintenance');
CREATE TYPE pembayaran_status AS ENUM ('lunas', 'belum_bayar', 'telat');
CREATE TYPE pengaduan_status AS ENUM ('pending', 'proses', 'selesai');
CREATE TYPE pengaduan_kategori AS ENUM ('fasilitas', 'keamanan', 'kebersihan', 'lainnya');
CREATE TYPE user_role AS ENUM ('admin', 'penghuni');

-- =============================================
-- 3. BIKIN TABEL
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

CREATE TABLE kamar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor TEXT NOT NULL UNIQUE,          
  lantai INTEGER NOT NULL DEFAULT 1,
  tipe TEXT NOT NULL DEFAULT 'standar',
  harga_per_bulan INTEGER NOT NULL,
  fasilitas TEXT[],                    
  status kamar_status NOT NULL DEFAULT 'tersedia',
  foto_url TEXT[],
  deskripsi TEXT,
  luas_m2 INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE kontrak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kamar_id UUID NOT NULL REFERENCES kamar(id),
  penghuni_id UUID NOT NULL REFERENCES profiles(id),
  tanggal_masuk DATE NOT NULL,
  tanggal_keluar DATE,                 
  harga_disepakati INTEGER NOT NULL,   
  durasi_bulan INTEGER NOT NULL DEFAULT 12,
  status TEXT NOT NULL DEFAULT 'aktif',
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pembayaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kontrak_id UUID NOT NULL REFERENCES kontrak(id),
  penghuni_id UUID NOT NULL REFERENCES profiles(id),
  kamar_id UUID NOT NULL REFERENCES kamar(id),
  bulan INTEGER NOT NULL,              
  tahun INTEGER NOT NULL,
  jumlah INTEGER NOT NULL,
  status pembayaran_status NOT NULL DEFAULT 'belum_bayar',
  tanggal_jatuh_tempo DATE NOT NULL,
  tanggal_bayar TIMESTAMPTZ,
  bukti_url TEXT,                      
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kontrak_id, bulan, tahun)     
);

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

CREATE TABLE aktivitas_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,                
  entity_type TEXT NOT NULL,           
  entity_id UUID,
  metadata JSONB,                      
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kamar ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontrak ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembayaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaduan ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE POLICY "Admin full access kamar" ON kamar FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Penghuni read kamar" ON kamar FOR SELECT USING (get_user_role() = 'penghuni');

CREATE POLICY "Admin full access kontrak" ON kontrak FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Penghuni baca kontrak sendiri" ON kontrak FOR SELECT USING (penghuni_id = auth.uid());

CREATE POLICY "Admin full access pembayaran" ON pembayaran FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Penghuni baca & upload bukti pembayaran sendiri" ON pembayaran FOR SELECT USING (penghuni_id = auth.uid());
CREATE POLICY "Penghuni update bukti bayar sendiri" ON pembayaran FOR UPDATE USING (penghuni_id = auth.uid()) WITH CHECK (penghuni_id = auth.uid());

CREATE POLICY "Admin full access pengaduan" ON pengaduan FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Penghuni CRUD pengaduan sendiri" ON pengaduan FOR ALL USING (penghuni_id = auth.uid());

-- ==========================================
-- 5. SEED DATA (Masukin Data)
-- ==========================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DELETE FROM auth.users WHERE email IN ('admin@indekos.com', 'penghuni@indekos.com');

INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'admin@indekos.com', crypt('admin123', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'penghuni@indekos.com', crypt('penghuni123', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', '');

INSERT INTO public.profiles (id, full_name, phone, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Admin Utama', '08123456789', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'Budi Santoso', '08198765432', 'penghuni');

INSERT INTO public.kamar (id, nomor, lantai, tipe, harga_per_bulan, fasilitas, status, luas_m2)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'A-01', 1, 'standar', 1200000, ARRAY['Kipas Angin', 'Kamar Mandi Luar'], 'terisi', 12),
  ('a0000000-0000-0000-0000-000000000002', 'A-02', 1, 'premium', 1800000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi'], 'tersedia', 16),
  ('a0000000-0000-0000-0000-000000000003', 'B-01', 2, 'vip', 2500000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi', 'Water Heater', 'TV'], 'maintenance', 24),
  ('a0000000-0000-0000-0000-000000000004', 'B-02', 2, 'premium', 1800000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi'], 'tersedia', 16),
  ('a0000000-0000-0000-0000-000000000005', 'C-01', 3, 'standar', 1200000, ARRAY['Kipas Angin', 'Kamar Mandi Luar'], 'tersedia', 12);

INSERT INTO public.kontrak (kamar_id, penghuni_id, tanggal_masuk, harga_disepakati, durasi_bulan, status)
VALUES
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', CURRENT_DATE - INTERVAL '1 month', 1200000, 12, 'aktif');
