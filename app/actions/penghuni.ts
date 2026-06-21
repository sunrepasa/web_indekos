"use server"

import { penghuniSchema } from "@/lib/validations/penghuni"
import { createPenghuni, deletePenghuni, updatePenghuni } from "@/lib/dal/penghuni"
import { createKontrak, deleteKontrakAktif } from "@/lib/dal/kontrak"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"




export async function penghuniTambahAction(formData: FormData) {
  try {
    const rawData = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || "",
      password: formData.get("password") as string || undefined,
      role: "penghuni" as any,
    }

    const validated = penghuniSchema.parse(rawData)

    const supabaseAdmin = createAdminClient();

    // 1. Create User di Supabase Auth terlebih dahulu
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validated.email,
      password: validated.password || "Indekos123!", // default password jika kosong
      email_confirm: true,
    });

    if (authError || !authData.user) {
      throw new Error(authError?.message || "Gagal membuat akun autentikasi Penghuni.");
    }

    const newId = authData.user.id;

    // 2. Insert ke tabel profiles dengan ID dari auth.users
    await createPenghuni({
      id: newId,
      full_name: validated.full_name,
      phone: validated.phone,
      role: validated.role,
    });

    const kamar_id = formData.get("kamar_id") as string | null;

    // 3. Jika admin memilih kamar, daftarkan kontrak
    if (kamar_id) {
      const { data: kamar } = await supabaseAdmin
        .from("kamar")
        .select("harga_per_bulan")
        .eq("id", kamar_id)
        .single();
        
      if (kamar) {
        await createKontrak({
          kamar_id,
          penghuni_id: newId,
          tanggal_masuk: new Date().toISOString().split("T")[0],
          harga_disepakati: kamar.harga_per_bulan,
          durasi_bulan: 1,
          status: "aktif",
        }, true); // isAdmin mode

        // Update status kamar jadi terisi
        await supabaseAdmin
          .from("kamar")
          .update({ status: "terisi" })
          .eq("id", kamar_id);
      }
    }

    revalidatePath("/dashboard/admin/penghuni")
    revalidatePath("/dashboard/admin/kamar")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    return { success: false, error: error.message || "Terjadi kesalahan saat menyimpan Penghuni." }
  }
}

export async function penghuniEditAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const full_name = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    
    const old_kamar_id = formData.get("old_kamar_id") as string | null;
    const new_kamar_id = formData.get("kamar_id") as string | null;

    const supabaseAdmin = createAdminClient();

    // 1. Update basic profile info
    await updatePenghuni(id, { full_name, phone });

    // 2. Handle room change safely using admin client
    if (old_kamar_id !== new_kamar_id) {
      if (old_kamar_id) {
        await deleteKontrakAktif(id);
        await supabaseAdmin.from("kamar").update({ status: "tersedia" }).eq("id", old_kamar_id);
      }
      
      if (new_kamar_id) {
        const { data: kamar } = await supabaseAdmin
          .from("kamar")
          .select("harga_per_bulan")
          .eq("id", new_kamar_id)
          .single();
          
        if (kamar) {
          await createKontrak({
            kamar_id: new_kamar_id,
            penghuni_id: id,
            tanggal_masuk: new Date().toISOString().split("T")[0],
            harga_disepakati: kamar.harga_per_bulan,
            durasi_bulan: 1,
            status: "aktif",
          }, true);

          await supabaseAdmin.from("kamar").update({ status: "terisi" }).eq("id", new_kamar_id);
        }
      }
    }

    revalidatePath("/dashboard/admin/penghuni");
    revalidatePath("/dashboard/admin/kamar");
    return { success: true };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error.message || "Gagal memperbarui Penghuni." };
  }
}

export async function deletePenghuniAction(id: string) {
  try {
    await deletePenghuni(id)
    revalidatePath("/dashboard/admin/penghuni")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    return { success: false, error: error.message || "Tidak dapat menghapus data penghuni." }
  }
}
