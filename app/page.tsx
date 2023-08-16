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
    }`
  );

  return (
    <div className="container mx-auto overflow-x-scroll pt-4">
      <ProductGrid products={products} />
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
