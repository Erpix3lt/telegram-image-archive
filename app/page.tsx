import Gallery from "@/components/archive/gallery";
import { getDisplayArchive } from "@/lib/archive";

export default async function Home() {

  const displayArchive = await getDisplayArchive()

  return (
    <div>
      <Gallery displayArchive={displayArchive}></Gallery>
    </div>
  );
}