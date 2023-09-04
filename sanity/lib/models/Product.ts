export type Product = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  images: { url: string }[];
  currency: string;
  price: number;
  categories: string[];
  sizes: string[];
  colors: string[];
  stripeProductId: string;
};
