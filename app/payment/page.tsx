"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment() {
  const clearCart = useCartStore((s) => s.clear);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="container mx-auto py-4 max-w-lg">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Your payment has been accepted!</CardTitle>
          <CardDescription>Thank you for using us!</CardDescription>
        </CardHeader>

        <CardContent>
          <CardDescription>
            If you have any questions about your order, please contact us via
            our support email.
          </CardDescription>
        </CardContent>
      </Card>
      <Button variant="link" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
