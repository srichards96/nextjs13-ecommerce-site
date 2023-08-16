import { SanityDocument } from "next-sanity";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: SanityDocument[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <Link key={p._id} href={`/${p.slug}`}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>{p.name ?? "Unnamed product"}</CardTitle>
            </CardHeader>
            {!!p.images.length && (
              <Image
                src={p.images[0].url}
                alt={p.name}
                width="300"
                height="300"
                className="w-full"
              />
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
