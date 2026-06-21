import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function getAllPenghuni() {
  const supabase = createAdminClient()
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
  const supabase = createAdminClient()
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

export async function createPenghuni(input: { id: string; full_name: string; phone?: string; role: 'admin' | 'penghuni' }) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updatePenghuni(id: string, input: { full_name: string; phone?: string }) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deletePenghuni(id: string) {
  const supabaseAdmin = createAdminClient()
  
  // Karena profiles biasanya dihapus via ON DELETE CASCADE saat user terhapus
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)

  if (authError) {
    // Apabila auth gagal dihapus, kita coba hapus dari profiles seandainya bukan cascade
    const { error } = await supabaseAdmin.from('profiles').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}

