"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/sanity/lib/models/Product";
import { useEffect, useState } from "react";
import { ProductSort } from "@/sanity/lib/types";
import { Button } from "../ui/button";
import ProductGridItem from "./ProductGridItem";

type Props = {
  initialProducts: Product[];
  fetchSize: number;
  sort?: ProductSort;
  search?: string;
  categories?: string[];
  sizes?: string[];
  colors?: string[];
};

export default function ProductGrid({
  initialProducts,
  fetchSize,
  sort = "date-desc",
  search = "",
  categories,
  sizes,
  colors,
}: Props) {
  const [moreProductsLeft, setMoreProductsLeft] = useState(
    initialProducts.length === fetchSize
  );
  const [products, setProducts] = useState(initialProducts);

  function getSearchParams() {
    const searchParams = new URLSearchParams();
    searchParams.set("count", fetchSize.toString());
    searchParams.set("offset", products.length.toString());
    searchParams.set("sort", sort);
    searchParams.set("search", search);
    if (categories?.length) {
      searchParams.set("categories", categories?.join("+"));
    }
    if (sizes?.length) {
      searchParams.set("sizes", sizes.join("+"));
    }
    if (colors?.length) {
      searchParams.set("colors", colors.join("+"));
    }

    return searchParams;
  }
  async function fetchMoreProducts() {
    const searchParams = getSearchParams();

    const req = await fetch(`/api/products?${searchParams.toString()}`);
    const additionalProducts = await req.json();
    setProducts((p) => [...p, ...additionalProducts]);
    setMoreProductsLeft(additionalProducts.length === fetchSize);
  }

  // If initial products or any search criteria change, reset product list
  useEffect(() => {
    setProducts(initialProducts);
    setMoreProductsLeft(initialProducts.length === fetchSize);
  }, [initialProducts, fetchSize, sort, search, categories, sizes, colors]);

  return (
    <>
      <Card className="mb-4 md:max-w-xs mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {products.length > 0
              ? `Found ${products.length}${
                  moreProductsLeft ? "+" : ""
                } products`
              : "No products found!"}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {products.map((p) => (
          <ProductGridItem key={p._id} product={p} />
        ))}
      </div>

      {moreProductsLeft && (
        <Button onClick={fetchMoreProducts}>Get more...</Button>
      )}

      {!moreProductsLeft && products.length > 0 && (
        <Card className="md:max-w-xs mx-auto">
          <CardHeader>
            <CardTitle>End of results</CardTitle>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
