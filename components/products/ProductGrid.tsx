import { SanityDocument } from "next-sanity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: SanityDocument[];
};

const formatPrice = (price: number) => {
  return "£" + (price / 100).toFixed(2);
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <Link key={p._id} href={`/${p.slug}`}>
          <Card className="overflow-hidden h-full flex flex-col hover:bg-accent transition-colors">
            {!!p.images.length && (
              <Image
                src={p.images[0].url}
                alt={p.name ?? "Unnamed product"}
                width="400"
                height="400"
                className="w-full"
              />
            )}
            <CardHeader>
              <CardTitle>{p.name ?? "Unnamed product"}</CardTitle>
            </CardHeader>

            {!!p.price && (
              <CardContent className="mt-auto">
                <CardDescription>{formatPrice(p.price)}</CardDescription>
              </CardContent>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
