"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CartSidebar from "./CartSidebar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <header className="p-2 bg-background/60 backdrop-blur sticky top-0 border-b text-foreground z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="Brand Logo" width={48} height={48} />
          <h1 className="text-xl md:text-2xl font-bold">Invigorated</h1>
        </Link>

        <div className="flex items-center gap-4">
          <CartSidebar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
