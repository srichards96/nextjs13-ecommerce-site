"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <header className="p-2 bg-red-500">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="Brand Logo" width={48} height={48} />
          <h1 className="text-2xl font-bold">Invigorated</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </header>
  );
}
