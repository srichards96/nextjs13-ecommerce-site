import { SanityDocument } from "@sanity/client";
import { getCachedClient } from "@/sanity/lib/getClient";
import { redirect } from "next/navigation";
import { productBySlugQuery } from "@/sanity/lib/queries";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const product = await getCachedClient()<SanityDocument>(
    productBySlugQuery(slug)
  );

  if (!product) {
    return redirect("/");
  }

  return <pre>{JSON.stringify(product, null, 4)}</pre>;
}
