"use client";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/sanity/lib/models/Product";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getKey, useCartStore } from "@/store/useCartStore";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Input } from "../ui/input";

const formSchema = z.object({
  quantity: z
    .string()
    .transform((v) => Number(v) || 0)
    .refine((v) => v > 0, "Quantity must be a positive number"),
  size: z.string().min(1, "A size must be selected"),
});

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const cart = useCartStore((s) => s.cart);
  const addItemToCart = useCartStore((s) => s.addItem);
  const changeCartItemQuantity = useCartStore((s) => s.changeItemQuantity);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "1" as unknown as number,
      size: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { _id: id, name, images, price, stripeProductId } = product;
    const { size, quantity } = values;
    const key = getKey(id, size);

    if (cart.has(key)) {
      changeCartItemQuantity(id, size, 1);
    } else {
      addItemToCart({
        id,
        size,
        name,
        imageUrl: images[0]?.url ?? "",
        price,
        quantity,
        stripeProductId,
      });
    }

    toast({
      title: "Added to your cart:",
      description: `${quantity} * ${name} (size: ${size})`,
      action: (
        <ToastAction
          altText="Undo last cart addition"
          onClick={() => {
            changeCartItemQuantity(id, size, -quantity);
          }}
        >
          Undo
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-2xl mb-2">{product.name}</h1>
        <h2 className="text-xl mb-4">{formatPrice(product.price)}</h2>
        <p className="mb-4">{product.description}</p>

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-foreground">Size:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {product.sizes.map((s) => (
                    <FormItem
                      key={s}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={s} />
                      </FormControl>
                      <FormLabel className="font-normal text-foreground">
                        {s}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="mb-4 max-w-xs">
              <FormLabel className="text-foreground">Quantity:</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"default"}>
          <Plus className="mr-2 h-4 w-4" /> Add to cart
        </Button>
      </form>
    </Form>
  );
}
