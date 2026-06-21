import { getKamarTersedia } from "@/lib/dal/kamar";
import TambahPenghuniClient from "./TambahPenghuniClient";

export default async function TambahPenghuniPage() {
  const kamarTersedia = await getKamarTersedia();

  return <TambahPenghuniClient kamarTersedia={kamarTersedia} />;
}
