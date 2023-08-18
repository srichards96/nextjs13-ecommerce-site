"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Circle,
  CircleEllipsis,
  CircleEllipsisIcon,
  Loader2,
  LucideCircleEllipsis,
  Moon,
  MoreHorizontal,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
          <Button variant="ghost">
            <ShoppingCart />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <MoreHorizontal />
      </Button>
    );
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button
      variant={"ghost"}
      size="icon"
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
