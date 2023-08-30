"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  defaultValue?: string;
};

export default function ProductSearch({ defaultValue = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(defaultValue);
  const fieldId = useId();

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === defaultValue) {
      return;
    }

    const query = new URLSearchParams(Array.from(searchParams.entries()));
    if (value.length > 0) {
      query.set("search", value);
    } else {
      query.delete("search");
    }
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="search"
        id={fieldId}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
