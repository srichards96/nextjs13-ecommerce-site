import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Product } from "@/sanity/lib/models/Product";
import ProductGrid from "@/components/products/ProductGrid";
import { rest } from "msw";
import { setupServer } from "msw/node";

const testProduct: Product = {
  _id: "",
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
const testProductsArray: Product[] = [
  { ...testProduct, _id: "1" },
  { ...testProduct, _id: "2" },
  { ...testProduct, _id: "3" },
];

const server = setupServer(
  rest.get("/api/products", (_req, res, ctx) => {
    return res(
      ctx.json([
        { ...testProduct, _id: "4" },
        { ...testProduct, _id: "5" },
        { ...testProduct, _id: "6" },
      ])
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("No grid items should be rendered if no products are provided", () => {
  render(<ProductGrid initialProducts={[]} fetchSize={10} />);

  expect(screen.queryAllByRole("link")).toHaveLength(0);
});

test("3 grid items should be rendered if 3 products are provided", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={10} />);

  expect(screen.queryAllByRole("link")).toHaveLength(3);
});

test("`No products found!` card should be rendered if no products are provided", () => {
  render(<ProductGrid initialProducts={[]} fetchSize={10} />);

  expect(screen.queryByText("No products found!")).toBeDefined();
});

test("`Found 3+ products` card should be rendered if 3 products are provided and fetch size is <= 3", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={3} />);

  expect(screen.queryByText("Found 3+ products")).toBeDefined();
});

test("`Found 3 products` card should be rendered if 3 products are provided and fetch size is > 3", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={4} />);

  expect(screen.getByText("Found 3 products")).toBeDefined();
});

test("`Get more...` button should be rendered if number of products provided is >= fetch size", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={3} />);

  expect(screen.queryByRole("button")).toBeDefined();
});

test("`Get more...` button should not be rendered if number of products provided is < fetch size", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={4} />);

  expect(screen.queryByRole("button")).toBeNull();
});

test("`End of results` card should be rendered if 1+ products are provided and number of produces is < fetch size", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={4} />);

  expect(screen.queryByText("End of results")).toBeDefined();
});

test("`End of results` card should not be rendered if 1+ products are provided and number of produces is >= fetch size", () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={3} />);

  expect(screen.queryByText("End of results")).toBeNull();
});

test("Clicking `Get more...` button should fetch and display more products", async () => {
  render(<ProductGrid initialProducts={testProductsArray} fetchSize={3} />);

  fireEvent.click(screen.getByText("Get more..."));

  await waitFor(() => expect(screen.queryAllByRole("link")).toHaveLength(6));
});

test("When fetching more products, if the number of products returned is < fetch size, the `Get more...` button should be replaced by the `End of results` card", async () => {
  server.use(
    rest.get("/api/products", (_req, res, ctx) => {
      return res(ctx.json([{ ...testProduct, _id: "4" }]));
    })
  );

  render(<ProductGrid initialProducts={testProductsArray} fetchSize={3} />);

  fireEvent.click(screen.getByText("Get more..."));

  await waitFor(() => {
    expect(screen.queryByText("Get more...")).toBeNull();
    expect(screen.queryByText("End of results")).toBeDefined();
  });
});
