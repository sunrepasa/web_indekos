import { createClient } from '@/lib/supabase/server'

export async function getAllPenghuni() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      kontrak (
        id,
        status,
        tanggal_masuk,
        tanggal_keluar,
        kamar:kamar (
          id,
          nomor,
          tipe,
          harga_per_bulan
        )
      )
    `)
    .eq('role', 'penghuni')
    .order('full_name')

  if (error) throw new Error(error.message)
  return data
}

export async function getPenghuniById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      kontrak (
        *,
        kamar:kamar (*),
        pembayaran (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}
