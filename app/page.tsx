import { getCachedClient } from "@/sanity/lib/getClient";
import { SanityDocument } from "sanity";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const products = await getCachedClient()<SanityDocument[]>(
    `*[_type == "product"] {
      _id,
      "slug": slug.current,
      name,
      "images": images[].asset->{url},
      currency,
      price,
    }`
  );

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-4">
        <div>sidepanel</div>
        <div className="col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
