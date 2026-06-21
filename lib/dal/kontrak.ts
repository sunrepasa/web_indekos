import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Database } from '@/types/database'

type KontrakInsert = Database['public']['Tables']['kontrak']['Insert']

export async function createKontrak(input: KontrakInsert, isAdmin = false) {
  const supabase = isAdmin ? createAdminClient() : await createClient()

  // Use select() to return inserted data
  const { data, error } = await supabase
    .from('kontrak')
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteKontrakAktif(penghuni_id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('kontrak')
    .delete()
    .eq('penghuni_id', penghuni_id)
    .eq('status', 'aktif')

  if (error) throw new Error(error.message)
}
