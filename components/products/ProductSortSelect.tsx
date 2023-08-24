"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductSort } from "@/sanity/lib/types";

const valueLabelMap = new Map<ProductSort, string>([
  ["date-desc", "Newest"],
  ["price-asc", "Price, low to high"],
  ["price-desc", "Price, high to low"],
]);

type Props = {
  defaultValue: ProductSort;
};

export default function ProductSortSelect({ defaultValue }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() =>
    valueLabelMap.has(defaultValue) ? defaultValue : "date-desc"
  );

  function onChange(value: ProductSort) {
    setValue(value);

    const query = new URLSearchParams(Array.from(searchParams.entries()));
    query.set("sort", value);
    router.push(`${pathname}?${query.toString()}`);
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {[...valueLabelMap].map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
