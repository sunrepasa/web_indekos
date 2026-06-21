"use server"

import { kamarSchema } from "@/lib/validations/kamar"
import { createKamar, updateKamar, deleteKamar } from "@/lib/dal/kamar"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"


export async function kamarTambahAction(formData: FormData) {
  try {
    const rawData = {
      nomor: formData.get("nomor") as string,
      tipe: formData.get("tipe") as any,
      lantai: Number(formData.get("lantai")),
      harga_per_bulan: Number(formData.get("harga")),
      fasilitas: (formData.get("fasilitas") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [],
      deskripsi: formData.get("deskripsi") as string || undefined,
      status: "tersedia" as any,
    }

    const validated = kamarSchema.parse(rawData)

    await createKamar(validated)

    revalidatePath("/dashboard/admin/kamar")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    if (error instanceof ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    if (error.message?.includes("violates unique constraint")) {
      return { success: false, error: "Nomor kamar tersebut sudah dipakai! Silakan pilih nomor lain." }
    }
    return { success: false, error: error.message || "Terjadi kesalahan saat menyimpan Kamar." }
  }
}

export async function kamarEditAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const rawData = {
      nomor: formData.get("nomor") as string,
      tipe: formData.get("tipe") as any,
      lantai: Number(formData.get("lantai")),
      harga_per_bulan: Number(formData.get("harga")),
      fasilitas: (formData.get("fasilitas") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [],
      deskripsi: formData.get("deskripsi") as string || undefined,
      status: formData.get("status") as any,
    }

    const validated = kamarSchema.parse(rawData)

    await updateKamar(id, validated)

    revalidatePath("/dashboard/admin/kamar")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    if (error instanceof ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    if (error.message?.includes("violates unique constraint")) {
      return { success: false, error: "Nomor kamar tersebut sudah dipakai! Silakan pilih nomor lain." }
    }
    return { success: false, error: error.message || "Terjadi kesalahan saat memperbarui Kamar." }
  }
}

export async function kamarDeleteAction(id: string) {
  try {
    await deleteKamar(id)
    revalidatePath("/dashboard/admin/kamar")
    // Revalidate other endpoints that might be affected
    revalidatePath("/dashboard/admin/penghuni")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    return { success: false, error: error.message || "Terjadi kesalahan saat menghapus Kamar." }
  }
}

