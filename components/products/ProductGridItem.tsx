import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Product } from "@/sanity/lib/models/Product";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
};

export default function ProductGridItem({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden h-full flex flex-col hover:bg-accent transition-colors">
        {!!product.images.length && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            width="400"
            height="400"
            className="w-full"
          />
        )}
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>

        {!!product.price && (
          <CardContent className="mt-auto">
            <CardDescription>{formatPrice(product.price)}</CardDescription>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
