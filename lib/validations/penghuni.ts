import { z } from 'zod'

export const penghuniSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama terlalu panjang'),
  email: z
    .string()
    .email('Format email tidak valid'),
  phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{8,12}$/, 'Format nomor HP tidak valid')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .optional(),
  role: z.enum(['admin', 'penghuni']).default('penghuni'),
})

export type PenghuniFormData = z.infer<typeof penghuniSchema>
