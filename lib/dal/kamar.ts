import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type KamarInsert = Database['public']['Tables']['kamar']['Insert']
type KamarUpdate = Database['public']['Tables']['kamar']['Update']

// ─── READ ───────────────────────────────────────────────
export async function getAllKamar() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('kamar')
    .select(`
      *,
      kontrak (
        id,
        status,
        penghuni:profiles (
          id,
          full_name,
          phone
        )
      )
    `)
    // removed .eq('kontrak.status', 'aktif') for now as it restricts returning empty kamar
    .order('nomor')

  if (error) throw new Error(error.message)
  return data
}

export async function getKamarById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('kamar')
    .select(`
      *,
      kontrak (
        *,
        penghuni:profiles (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── CREATE ─────────────────────────────────────────────
export async function createKamar(input: KamarInsert) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('kamar')
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── UPDATE ─────────────────────────────────────────────
export async function updateKamar(id: string, input: KamarUpdate) {
  const supabase = await createClient()
  // Ensure we are passing updated_at if needed, but not forcing it since type might not expect it this way
  const { data, error } = await supabase
    .from('kamar')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── DELETE ─────────────────────────────────────────────
export async function deleteKamar(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('kamar')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ─── STATS ──────────────────────────────────────────────
export async function getKamarStats() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('kamar')
    .select('status')

  if (error) throw new Error(error.message)

  return {
    total: data.length,
    terisi: data.filter(k => k.status === 'terisi').length,
    tersedia: data.filter(k => k.status === 'tersedia').length,
    maintenance: data.filter(k => k.status === 'maintenance').length,
  }
}
