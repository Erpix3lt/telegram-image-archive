/* eslint-disable @next/next/no-img-element */
import Header from "@/components/ui/header";
import { getImageUrlByFileId } from "@/lib/archive";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const image_url = await getImageUrlByFileId(slug)
  return (
    <div>
      <Header />
      <img alt="_" src={image_url}></img>
      <div></div>
    </div>
  );
}
