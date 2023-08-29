import { getCachedClient } from "@/sanity/lib/getClient";
import { redirect } from "next/navigation";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { Product } from "@/sanity/lib/models/Product";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductDetails from "@/components/products/ProductDetails";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 300;

export default async function Page({ params }: Props) {
  const { slug } = params;

  const product = await getCachedClient()<Product>(productBySlugQuery(slug));

  if (!product) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto py-4 overflow-x-hidden max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageGallery product={product} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
