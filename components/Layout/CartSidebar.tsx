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
import { redirect } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function SheetDemo() {
  const { toast } = useToast();
  const cart = useCartStore((s) => s.cart);
  const removeItemFromCart = useCartStore((s) => s.removeItem);
  const changeCartItemQuantity = useCartStore((s) => s.changeItemQuantity);
  const clearCart = useCartStore((s) => s.clear);

  async function submitToCheckout() {
    const body = [...cart.entries()].map(([_k, v]) => ({
      stripeProductId: v.stripeProductId,
      quantity: v.quantity,
    }));

    try {
      const req = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const url = await req.json();
      location.href = url;
    } catch {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  }

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
          {cart.size === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your cart is empty!</CardTitle>
              </CardHeader>
            </Card>
          )}

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
            <Button
              type="submit"
              disabled={cart.size === 0}
              onClick={submitToCheckout}
            >
              Go to checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
