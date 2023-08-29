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
        draggable={false}
        className="rounded-md w-auto max-h-[70vh]"
      />
      <div className="flex flex-wrap gap-4 mt-4">
        {product.images.map(({ url }, i) => (
          <button
            key={`${product.name}-image-${i}`}
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={url}
              alt={`${product.name}-image-${i}`}
              width="400"
              height="400"
              draggable={false}
              className={cn(
                "object-cover object-center w-[90px] rounded-md outline outline-offset-2 outline-transparent transition-[outline-color]",
                {
                  "outline-purple-600": i === selectedIndex,
                }
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
