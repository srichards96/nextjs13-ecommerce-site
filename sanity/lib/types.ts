import { z } from "zod";

export const productSortEnum = z.enum(["date-desc", "price-asc", "price-desc"]);

export type ProductSort = z.infer<typeof productSortEnum>;
