import { getCachedClient } from "@/sanity/lib/getClient";
import { SanityDocument } from "sanity";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSortSelect from "@/components/products/ProductSortSelect";
import {
  productsQuery,
  uniqueProductCategoriesQuery,
  uniqueProductSizesQuery,
  uniqueProductColorsQuery,
} from "@/sanity/lib/queries";
import { ProductSort } from "@/sanity/lib/types";
import ProductFilters from "@/components/products/ProductFilters";
import ProductSearch from "@/components/products/ProductSearch";

type Props = {
  searchParams: {
    search?: string;
    sort?: ProductSort;
    categories?: string;
    sizes?: string;
    colors?: string;
  };
};

export const revalidate = 300;

export default async function Home({ searchParams }: Props) {
  const {
    sort = "date-desc",
    search,
    categories,
    sizes,
    colors,
  } = searchParams;
  const selectedCategories = categories?.split("+") ?? [];
  const selectedSizes = sizes?.split("+") ?? [];
  const selectedColors = colors?.split("+") ?? [];

  const client = getCachedClient();

  const uniqueCategories = await client<string[]>(uniqueProductCategoriesQuery);
  const uniqueSizes = await client<string[]>(uniqueProductSizesQuery);
  const uniqueColors = await client<string[]>(uniqueProductColorsQuery);

  const products = await client<SanityDocument[]>(
    productsQuery({
      sort,
      search,
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
    })
  );

  return (
    <div className="container mx-auto py-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        <div className="sm:relative">
          <div className="sm:sticky sm:top-[81px]">
            <ProductFilters
              categories={uniqueCategories}
              defaultCategoriesSelected={selectedCategories}
              sizes={uniqueSizes}
              defaultSizesSelected={selectedSizes}
              colors={uniqueColors}
              defaultColorsSelected={selectedColors}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between">
            <div className="md:w-[300px]">
              <ProductSearch defaultValue={search} />
            </div>
            <div className="md:w-[180px]">
              <ProductSortSelect defaultValue={sort} />
            </div>
          </div>
          <div>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
