import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Product } from "@/sanity/lib/models/Product";
import ProductImageGallery from "@/components/products/ProductImageGallery";

const testProduct: Product = {
  _id: "123456789",
  slug: "test-product",
  name: "Test Product",
  description: "A test product description",
  price: 1000,
  currency: "GBP",
  images: [{ url: "https://google.com" }, { url: "https://amazon.com" }],
  stripeProductId: "12345",
  categories: [],
  sizes: [],
  colors: [],
};

test("Should render n + 1 images where n is number of images for the product (+1 is the main image)", () => {
  render(<ProductImageGallery product={testProduct} />);

  expect(screen.queryAllByRole("img")).toHaveLength(
    testProduct.images.length + 1
  );
});

test("Initially, the first image should be shown as the main image", () => {
  render(<ProductImageGallery product={testProduct} />);

  expect(screen.getByAltText<HTMLImageElement>(testProduct.name).src).toMatch(
    "google.com"
  );
});

test("Clicking the button for an image should update the main image", async () => {
  render(<ProductImageGallery product={testProduct} />);

  const secondImageButton = screen.getAllByRole("button")[1];
  fireEvent.click(secondImageButton);

  await waitFor(() => {
    expect(screen.getByAltText<HTMLImageElement>(testProduct.name).src).toMatch(
      "amazon.com"
    );
  });
});
