import { groq } from "next-sanity";
import { ProductSort } from "./types";

export const uniqueProductCategoriesQuery = groq`array::unique(*[_type == "product"].categories[] | order(@))`;

export const uniqueProductSizesQuery = groq`array::unique(*[_type == "product"].sizes[] | order(@))`;

export const uniqueProductColorsQuery = groq`array::unique(*[_type == "product"].colors[] | order(@))`;

type ProductsQueryOptions = {
  sort?: ProductSort;
  search?: string;
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  count?: number;
  offset?: number;
};
const productSortFilterMap = new Map<ProductSort, string>([
  ["date-desc", "createdAt desc"],
  ["price-asc", "price asc"],
  ["price-desc", "price desc"],
]);
export const productsQuery = (options?: ProductsQueryOptions) => {
  const sort = options?.sort ?? "date-desc";
  const search = options?.search ?? "";
  const categories = options?.categories ?? [];
  const sizes = options?.sizes ?? [];
  const colors = options?.colors ?? [];
  const count = options?.count ?? 20;
  const offset = options?.offset ?? 0;

  return groq`
    *[_type == "product"] | order(${productSortFilterMap.get(sort)}) {
      _id,
      "slug": slug.current,
      name,
      "images": images[].asset->{url},
      currency,
      price,
      categories,
      colors,
      sizes,
      colors,
    }
    [name match "*${search}*"]
    [${categories.map((c) => `"${c}" in categories`).join(" || ")}]
    [${sizes.map((s) => `"${s}" in sizes`).join(" || ")}]
    [${colors.map((c) => `"${c}" in colors`).join(" || ")}]
    [${offset}...${offset + count}]`;
};

export const productBySlugQuery = (slug: string) => groq`
  *[_type == "product" && slug.current == "${slug}"] {
    _id,
    "slug": slug.current,
    name,
    description,
    "images": images[].asset->{url},
    currency,
    price,
    categories,
    colors,
    sizes,
    colors,
  }[0]`;
