import { SanityDocument } from "@sanity/client";
import { getCachedClient } from "@/sanity/lib/getClient";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const product = await getCachedClient()<SanityDocument[]>(
    `*[_type == "product" && slug.current == "${params.slug}"] {
      _id,
      name,
      "images": images[].asset->{url},
    }`
  );

  if (!product) {
    return redirect("/");
  }

  return <pre>{JSON.stringify(product, null, 4)}</pre>;
}
