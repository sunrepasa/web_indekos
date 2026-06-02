-- ==========================================
-- SEED DATA (Masukin Data)
-- ==========================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. BERSIHKAN TABEL ANAK DULU SEBELUM MENGHAPUS USER (Mencegah error Foreign Key)
DELETE FROM public.pembayaran;
DELETE FROM public.kontrak;
DELETE FROM public.kamar;

-- 2. Hapus User Lama (Otomatis menghapus public.profiles karena ON DELETE CASCADE)
DELETE FROM auth.users WHERE email IN ('admin@indekos.com', 'penghuni@indekos.com');

-- 3. Insert Auth User
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'admin@indekos.com', crypt('admin123', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'penghuni@indekos.com', crypt('penghuni123', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', '');

-- 4. Insert Profiles
INSERT INTO public.profiles (id, full_name, phone, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Admin Utama', '08123456789', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'Budi Santoso', '08198765432', 'penghuni');

-- 5. Insert Kamar
INSERT INTO public.kamar (id, nomor, lantai, tipe, harga_per_bulan, fasilitas, status, luas_m2)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'A-01', 1, 'standar', 1200000, ARRAY['Kipas Angin', 'Kamar Mandi Luar'], 'terisi', 12),
  ('a0000000-0000-0000-0000-000000000002', 'A-02', 1, 'premium', 1800000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi'], 'tersedia', 16),
  ('a0000000-0000-0000-0000-000000000003', 'B-01', 2, 'vip', 2500000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi', 'Water Heater', 'TV'], 'maintenance', 24),
  ('a0000000-0000-0000-0000-000000000004', 'B-02', 2, 'premium', 1800000, ARRAY['AC', 'Kamar Mandi Dalam', 'WiFi'], 'tersedia', 16),
  ('a0000000-0000-0000-0000-000000000005', 'C-01', 3, 'standar', 1200000, ARRAY['Kipas Angin', 'Kamar Mandi Luar'], 'tersedia', 12);

-- 6. Insert Kontrak
INSERT INTO public.kontrak (kamar_id, penghuni_id, tanggal_masuk, harga_disepakati, durasi_bulan, status)
VALUES
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', CURRENT_DATE - INTERVAL '1 month', 1200000, 12, 'aktif');
