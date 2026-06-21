import { getKamarById } from "@/lib/dal/kamar";
import EditKamarClient from "./EditKamarClient";

export default async function EditKamarPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const kamar = await getKamarById(id);

  return <EditKamarClient kamar={kamar} />;
}
