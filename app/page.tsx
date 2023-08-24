import { getCachedClient } from "@/sanity/lib/getClient";
import { SanityDocument } from "sanity";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSortSelect from "@/components/products/ProductSortSelect";
import ProductFilter from "@/components/products/ProductFilter";
import {
  productsQuery,
  uniqueProductCategoriesQuery,
  uniqueProductSizesQuery,
  uniqueProductColorsQuery,
} from "@/sanity/lib/queries";
import { ProductSort } from "@/sanity/lib/types";

type Props = {
  searchParams: {
    sort?: ProductSort;
    categories?: string;
    sizes?: string;
    colors?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const { sort = "date-desc", categories, sizes, colors } = searchParams;
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
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
    })
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
