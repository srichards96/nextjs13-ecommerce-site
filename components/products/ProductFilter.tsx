"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  name: string;
  options: string[];
  defaultOptionsSelected: string[];
};

export default function ProductFilter({
  name,
  options,
  defaultOptionsSelected,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(defaultOptionsSelected);

  function toggleOptionSelected(option: string) {
    const currentlySelected = selected.includes(option);
    const newSelected = currentlySelected
      ? selected.filter((o) => o != option)
      : [...selected, option];

    setSelected(newSelected);

    const query = new URLSearchParams(Array.from(searchParams.entries()));
    if (newSelected.length > 0) {
      query.set(name, newSelected.join("+"));
    } else {
      query.delete(name);
    }
    router.push(`${pathname}?${query.toString()}`);
  }

  return (
    <div className="space-y-4">
      {options.map((o) => (
        <div key={o} className="flex items-center space-x-2">
          <Checkbox
            id={o}
            checked={selected.includes(o)}
            onCheckedChange={() => toggleOptionSelected(o)}
          />
          <label
            htmlFor={o}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
          >
            {o}
          </label>
        </div>
      ))}
    </div>
  );
}
