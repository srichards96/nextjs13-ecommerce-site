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

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getCachedClient()<Product>(productBySlugQuery(slug));

  if (!product) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto py-4 overflow-x-hidden max-w-5xl">
      <div className="flex flex-col md:flex-row-reverse gap-8">
        <div className="w-full">
          <ProductDetails product={product} />
        </div>
        <div className="w-full">
          <ProductImageGallery product={product} />
        </div>
      </div>
    </div>
  );
}
