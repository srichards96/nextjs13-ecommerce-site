"use client";

import { Product } from "@/sanity/lib/models/Product";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
};

export default function ProductImageGallery({ product }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (product.images.length === 0) {
    return null;
  }

  return (
    <div className="md:ml-auto">
      <Image
        src={product.images[selectedIndex].url}
        alt={product.name}
        width="400"
        height="400"
        className="rounded-md max-h-[70vh]"
      />
      <div className="flex flex-wrap gap-4 mt-4">
        {product.images.map(({ url }, i) => (
          <Image
            key={`${product.name}-image-${i}`}
            src={url}
            alt=""
            width="400"
            height="400"
            onClick={() => setSelectedIndex(i)}
            className={cn(
              "object-cover object-center w-[90px] rounded-md outline outline-offset-2 outline-transparent transition-[outline-color]",
              {
                "outline-purple-600": i === selectedIndex,
              }
            )}
          />
        ))}
      </div>
    </div>
  );
}
