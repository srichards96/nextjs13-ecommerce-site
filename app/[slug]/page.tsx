import { SanityDocument } from "@sanity/client";
import { getCachedClient } from "@/sanity/lib/getClient";
import { redirect } from "next/navigation";
import { productBySlugQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { Product } from "@/sanity/lib/models/Product";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const product = await getCachedClient()<Product>(productBySlugQuery(slug));

  if (!product) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto py-4 overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageGallery product={product} />
        <div>
          <h1 className="text-2xl">{product.name}</h1>
          <h2 className="text-xl">{formatPrice(product.price)}</h2>
          <p>{product.description}</p>
          <ul>
            {product.sizes.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <Button variant={"default"}>
            <Plus className="mr-2 h-4 w-4" /> Add to cart
          </Button>
        </div>
      </div>
      <pre>{JSON.stringify(product, null, 4)}</pre>;
    </div>
  );
}
