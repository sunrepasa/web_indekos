import { z } from 'zod'

export const kamarSchema = z.object({
  nomor: z
    .string()
    .min(1, 'Nomor kamar wajib diisi')
    .regex(/^[A-Z]-\d{2}$/, 'Format: A-01, B-02, dst'),
  lantai: z
    .number({ message: 'Lantai harus angka' })
    .int()
    .min(1, 'Lantai minimal 1')
    .max(20, 'Lantai maksimal 20'),
  tipe: z.enum(['standar', 'premium', 'vip'], {
    message: 'Tipe harus standar, premium, atau vip',
  }),
  harga_per_bulan: z
    .number({ message: 'Harga harus angka' })
    .int()
    .min(100_000, 'Harga minimal Rp 100.000')
    .max(50_000_000, 'Harga terlalu besar'),
  deskripsi: z.string().optional(),
  fasilitas: z.array(z.string()).optional(),
  luas_m2: z.number().int().positive().optional().nullable(),
  status: z.enum(['tersedia', 'terisi', 'maintenance']).default('tersedia'),
})

export type KamarFormData = z.infer<typeof kamarSchema>
