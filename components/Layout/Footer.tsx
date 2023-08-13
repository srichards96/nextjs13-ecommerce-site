"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { key: "1", href: "javascript:void", label: "About" },
  { key: "2", href: "javascript:void", label: "Contact Us" },
  { key: "3", href: "javascript:void", label: "Legal" },
  { key: "4", href: "javascript:void", label: "Privacy Policy" },
  { key: "5", href: "javascript:void", label: "Cookie Policy" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <footer className="py-4 bg-red-500">
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
