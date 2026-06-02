'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createKamar, updateKamar, deleteKamar } from '@/lib/dal/kamar'
import { kamarSchema } from '@/lib/validations/kamar'

export async function createKamarAction(formData: FormData) {
  const raw = {
    nomor: formData.get('nomor') as string,
    lantai: Number(formData.get('lantai')),
    tipe: formData.get('tipe') as string,
    harga_per_bulan: Number(formData.get('harga_per_bulan')),
    deskripsi: formData.get('deskripsi') as string,
    status: 'tersedia' as const,
  }

  const parsed = kamarSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await createKamar(parsed.data)
  } catch (e) {
    return { error: { _form: ['Gagal menyimpan kamar'] } }
  }

  revalidatePath('/dashboard/admin/kamar')
  redirect('/dashboard/admin/kamar')
}

export async function deleteKamarAction(id: string) {
  try {
    await deleteKamar(id)
  } catch (e) {
    return { error: 'Gagal menghapus kamar' }
  }
  revalidatePath('/dashboard/admin/kamar')
}
