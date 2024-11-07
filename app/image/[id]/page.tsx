import { getImageUrlByFileId } from "@/lib/archive";

export default async function Page({ params }: { params: { id: string } }) {
  return <div className="">
    <img src={await getImageUrlByFileId(params.id)}></img>
    <div></div>
  </div>
}