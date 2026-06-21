import { getPenghuniById } from "@/lib/dal/penghuni";
import { getKamarTersedia } from "@/lib/dal/kamar";
import EditPenghuniClient from "./EditPenghuniClient";

export default async function EditPenghuniPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const profile = await getPenghuniById(id);
  const kamarTersedia = await getKamarTersedia();

  const activeContract = profile.kontrak?.find((k: any) => k.status === 'aktif');

  return (
    <EditPenghuniClient 
      profile={profile} 
      kamarTersedia={kamarTersedia} 
      activeContract={activeContract} 
    />
  );
}
