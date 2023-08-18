"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

export type ProductSortSelectValue = "date-desc" | "price-asc" | "price-desc";

const valueLabelMap = new Map<ProductSortSelectValue, string>([
  ["date-desc", "Newest"],
  ["price-asc", "Price, low to high"],
  ["price-desc", "Price, high to low"],
]);

type Props = {
  defaultValue: ProductSortSelectValue;
  urlBase?: string;
};

export default function ProductSortSelect({
  defaultValue,
  urlBase = "/",
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(() =>
    valueLabelMap.has(defaultValue) ? defaultValue : "date-desc"
  );

  function onChange(value: ProductSortSelectValue) {
    setValue(value);
    router.push(`${urlBase}?sort=${value}`);
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
