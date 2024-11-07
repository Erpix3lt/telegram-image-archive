import { getDisplayArchive } from "@/lib/archive";
import Gallery from "../components/archive/gallery";


export default async function Home() {

  const displayArchive = await getDisplayArchive()

  return (
    <div>
      <Gallery displayArchive={displayArchive ?? [""]}></Gallery>
    </div>
  );
}
