"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

export type ProductSortSelectValue = "date-desc" | "price-asc" | "price-desc";

type Props = {
  defaultValue: ProductSortSelectValue;
  urlBase?: string;
};

export default function ProductSortSelect({
  defaultValue,
  urlBase = "/",
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

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
        <SelectItem value="date-desc">Newest</SelectItem>
        <SelectItem value="price-asc">Price, low to high</SelectItem>
        <SelectItem value="price-desc">Price, high to low</SelectItem>
      </SelectContent>
    </Select>
  );
}
