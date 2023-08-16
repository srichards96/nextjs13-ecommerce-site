"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { key: "1", href: "#", label: "About" },
  { key: "2", href: "#", label: "Contact Us" },
  { key: "3", href: "#", label: "Legal" },
  { key: "4", href: "#", label: "Privacy Policy" },
  { key: "5", href: "#", label: "Cookie Policy" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <footer className="py-4 bg-background border-t">
      <div className="container mx-auto">
        <div>
          <div className="pb-2">
            {links.map(({ key, href, label }) => (
              <Link
                key={key}
                href={href}
                className="text-xl px-2 border-r last:border-r-0 border-black"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xl font-bold">
            @ Invigorated Clothing Ltd (not a real company...)
          </p>
        </div>
      </div>
    </footer>
  );
}
