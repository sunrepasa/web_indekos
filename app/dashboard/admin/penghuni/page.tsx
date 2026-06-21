import { getAllPenghuni } from "@/lib/dal/penghuni";
import PenghuniClient from "./PenghuniClient";

export default async function PenghuniPage() {
  const penghuniList = await getAllPenghuni();

  return <PenghuniClient initialData={penghuniList} />;
}
