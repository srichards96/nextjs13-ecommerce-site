"use client";

import { useCartStore } from "@/app/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Image from "next/image";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Link from "next/link";

export default function SheetDemo() {
  const cart = useCartStore((s) => s.cart);
  const addItemToCart = useCartStore((s) => s.addItem);
  const removeItemFromCart = useCartStore((s) => s.removeItem);
  const changeCartItemQuantity = useCartStore((s) => s.changeItemQuantity);
  const clearCart = useCartStore((s) => s.clear);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>Make changes to your cart here.</SheetDescription>
        </SheetHeader>

        <div className="py-4 overflow-x-hidden space-y-4">
          {Array.from(cart.entries()).map(([key, value]) => (
            <Card key={key} className="overflow-hidden">
              {value.imageUrl && (
                <Image
                  src={value.imageUrl}
                  alt={value.name}
                  draggable={false}
                  width="400"
                  height="400"
                  className="w-full"
                />
              )}

              <CardHeader>
                <CardTitle className="mb-2">{value.name}</CardTitle>
                {value.size}
              </CardHeader>

              <CardContent>
                <CardDescription>
                  Price: {formatPrice(value.price)}
                </CardDescription>
                <CardDescription>Quantity: {value.quantity}</CardDescription>
                <Separator className="my-2" />
                <CardDescription>
                  Total: {formatPrice(value.price * value.quantity)}
                </CardDescription>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={value.quantity >= 10}
                  onClick={() =>
                    changeCartItemQuantity(value.id, value.size, 1)
                  }
                >
                  <Plus />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={value.quantity <= 1}
                  onClick={() =>
                    changeCartItemQuantity(value.id, value.size, -1)
                  }
                >
                  <Minus />
                </Button>
                <ConfirmDialog
                  onConfirm={() => removeItemFromCart(value.id, value.size)}
                  triggerContent={
                    <Button
                      className="ml-auto"
                      size="icon"
                      variant="destructive"
                    >
                      <X />
                    </Button>
                  }
                />
              </CardFooter>
            </Card>
          ))}

          {/* <pre>{JSON.stringify(Array.from(cart.entries()), null, 2)}</pre> */}
        </div>

        <SheetFooter className="gap-4">
          <ConfirmDialog
            onConfirm={clearCart}
            triggerContent={
              <Button
                type="button"
                variant="secondary"
                className="sm:mr-auto"
                disabled={cart.size === 0}
              >
                Clear
              </Button>
            }
          />
          <SheetClose asChild>
            <Button type="submit" disabled={cart.size === 0}>
              Go to checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
