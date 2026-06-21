"use server"

import { revalidatePath } from "next/cache"

export async function penyewaTambahAction(formData: FormData) {
  try {
    const rawData = {
      nik: formData.get("nik") as string,
      nama: formData.get("nama") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    }

    // Since there is no penyewa table or strict validation defined yet,
    // we log the operation to represent backend handling.
    console.log("Mock Insert Penyewa:", rawData);

    // Simulate delay to show premium loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    revalidatePath("/dashboard/admin/penyewa")
    return { success: true }
  } catch (error: any) {
    console.error("Action error:", error)
    return { success: false, error: error.message || "Terjadi kesalahan saat menyimpan Penyewa." }
  }
}
