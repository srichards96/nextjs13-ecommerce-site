import { getCachedClient } from "@/sanity/lib/getClient";
import { SanityDocument } from "sanity";
import ProductGrid from "@/components/ProductGrid";
import ProductSortSelect, {
  ProductSortSelectValue,
} from "@/components/products/ProductSortSelect";
import ProductFilter from "@/components/products/ProductFilter";

type Props = {
  searchParams: {
    sort: ProductSortSelectValue;
  };
};

const orderByMap = new Map<ProductSortSelectValue, string>([
  ["date-desc", "createdAt desc"],
  ["price-asc", "price asc"],
  ["price-desc", "price desc"],
]);

export default async function Home({ searchParams }: Props) {
  const { sort = "date-desc" } = searchParams;

  const uniqueCategories = await getCachedClient()<string[]>(`
    array::unique(*[_type == "product"].categories[] | order(@))
  `);
  const uniqueSizes = await getCachedClient()<string[]>(`
    array::unique(*[_type == "product"].sizes[] | order(@))
  `);
  const uniqueColors = await getCachedClient()<string[]>(`
    array::unique(*[_type == "product"].colors[] | order(@))
  `);
  const products = await getCachedClient()<SanityDocument[]>(
    `*[_type == "product"] | order(${orderByMap.get(sort)}) {
      _id,
      "slug": slug.current,
      name,
      "images": images[].asset->{url},
      currency,
      price,
      colors,
    }[0...20]`
  );

  return (
    <div className="container mx-auto py-4">
      <div className="pb-4 max-w-[200px] ml-auto">
        <ProductSortSelect defaultValue={sort} />
      </div>

      <div className="grid grid-cols-4">
        <div>
          <ProductFilter
            name="categories"
            title="Categories"
            options={uniqueCategories}
          />
          <ProductFilter name="sizes" title="Sizes" options={uniqueSizes} />
          <ProductFilter name="colors" title="Colors" options={uniqueColors} />
        </div>
        <div className="col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
