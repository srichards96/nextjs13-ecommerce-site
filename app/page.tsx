import { getCachedClient } from "@/sanity/lib/getClient";
import { SanityDocument } from "sanity";
import ProductGrid from "@/components/ProductGrid";
import ProductSortSelect, {
  ProductSortSelectValue,
} from "@/components/products/ProductSortSelect";
import ProductFilter from "@/components/products/ProductFilter";

type Props = {
  searchParams: {
    sort?: ProductSortSelectValue;
    categories?: string;
    sizes?: string;
    colors?: string;
  };
};

const orderByMap = new Map<ProductSortSelectValue, string>([
  ["date-desc", "createdAt desc"],
  ["price-asc", "price asc"],
  ["price-desc", "price desc"],
]);

export default async function Home({ searchParams }: Props) {
  const { sort = "date-desc", categories, sizes, colors } = searchParams;
  const selectedCategories = categories?.split("+") ?? [];
  const selectedSizes = sizes?.split("+") ?? [];
  const selectedColors = colors?.split("+") ?? [];

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
      categories,
      sizes,
      colors,
    }
    [${selectedCategories.map((c) => `"${c}" in categories`).join(" || ")}]
    [${selectedSizes.map((s) => `"${s}" in sizes`).join(" || ")}]
    [${selectedColors.map((c) => `"${c}" in colors`).join(" || ")}]
    [0...20]`
  );

  return (
    <div className="container mx-auto py-4">
      <div className="pb-4 sm:max-w-[200px] ml-auto">
        <ProductSortSelect defaultValue={sort} />
      </div>

      <div className="sm:grid sm:grid-cols-4">
        <div className="sm:relative">
          <div className="sm:sticky sm:top-[81px]">
            <ProductFilter
              name="categories"
              title="Categories"
              options={uniqueCategories}
              defaultOptionsSelected={selectedCategories}
            />
            <ProductFilter
              name="sizes"
              title="Sizes"
              options={uniqueSizes}
              defaultOptionsSelected={selectedSizes}
            />
            <ProductFilter
              name="colors"
              title="Colors"
              options={uniqueColors}
              defaultOptionsSelected={selectedColors}
            />
          </div>
        </div>
        <div className="col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
