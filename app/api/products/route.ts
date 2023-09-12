import { getCachedClient } from "@/sanity/lib/getClient";
import { Product } from "@/sanity/lib/models/Product";
import { productsQuery } from "@/sanity/lib/queries";
import { productSortEnum } from "@/sanity/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const searchParamsSchema = z.object({
  count: z.number().min(1).max(50),
  offset: z.number().min(0),

  sort: productSortEnum,
  search: z.string().optional().default(""),
  categories: z.array(z.string()).optional().default([]),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
});

async function getSearchParameters(searchParams: URLSearchParams) {
  const count = Number(searchParams.get("count"));
  const offset = Number(searchParams.get("offset"));
  const sort = searchParams.get("sort");
  const search = searchParams.get("search") ?? "";
  const categories = searchParams.get("categories")?.split("+") ?? [];
  const sizes = searchParams.get("sizes")?.split("+") ?? [];
  const colors = searchParams.get("colors")?.split("+") ?? [];

  return await searchParamsSchema.parseAsync({
    count,
    offset,
    sort,
    search,
    categories,
    sizes,
    colors,
  });
}

export async function GET(req: NextRequest) {
  try {
    const { count, offset, sort, search, categories, sizes, colors } =
      await getSearchParameters(req.nextUrl.searchParams);
    console.log({ count, offset, sort, search, categories, sizes, colors });

    const client = getCachedClient();
    const products = await client<Product[]>(
      productsQuery({ sort, search, categories, sizes, colors, count, offset })
    );
    return new NextResponse(JSON.stringify(products));
  } catch (err) {
    if (err instanceof ZodError) {
      return new NextResponse(err.message, { status: 400 });
    } else {
      return new NextResponse("Something went wrong", { status: 500 });
    }
  }
}
