import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductGridItem from "../../components/products/ProductGridItem";
import { Product } from "@/sanity/lib/models/Product";

const testProductNoImage: Product = {
  _id: "123456789",
  slug: "test-product",
  name: "Test Product",
  description: "A test product description",
  price: 1000,
  currency: "GBP",
  images: [],
  stripeProductId: "12345",
  categories: [],
  sizes: [],
  colors: [],
};

const testProductWithImage: Product = {
  _id: "123456789",
  slug: "test-product",
  name: "Test Product",
  description: "A test product description",
  price: 1000,
  currency: "GBP",
  images: [{ url: "" }],
  stripeProductId: "12345",
  categories: [],
  sizes: [],
  colors: [],
};

test("Product link has href of `/products/${slug}`", () => {
  render(<ProductGridItem product={testProductNoImage} />);

  expect(screen.getByRole("link")).toHaveProperty(
    "href",
    `http://localhost/products/${testProductNoImage.slug}`
  );
});

test("Product displays no image if product has 0 images", () => {
  render(<ProductGridItem product={testProductNoImage} />);

  expect(screen.queryByRole("img")).toBeNull();
});

test("Product displays image if product has 1+ images", () => {
  render(<ProductGridItem product={testProductWithImage} />);

  expect(screen.queryByRole("img")).toBeDefined();
});

test("Product image alt attribute should be product name", () => {
  render(<ProductGridItem product={testProductWithImage} />);

  expect(screen.queryByRole("img")).toHaveProperty(
    "alt",
    testProductWithImage.name
  );
});

test("Product price should be divided by 100, formatted to 2dp, and be prefixed with `£`", () => {
  const price = `£${(testProductNoImage.price / 100).toFixed(2)}`;
  render(<ProductGridItem product={testProductNoImage} />);

  expect(screen.getByText("£", { exact: false })).toHaveTextContent(price);
});
