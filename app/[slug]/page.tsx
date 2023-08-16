import { SanityDocument } from "@sanity/client";
import { draftMode } from "next/headers";
import Post from "@/components/Post";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewPost from "@/components/PreviewPost";
import { cachedClient } from "@/sanity/lib/client";
import { postPathsQuery, postQuery } from "@/sanity/lib/queries";
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
