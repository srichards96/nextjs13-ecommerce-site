import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ProductFilter from "./ProductFilter";

type Props = {
  categories: string[];
  defaultCategoriesSelected: string[];
  sizes: string[];
  defaultSizesSelected: string[];
  colors: string[];
  defaultColorsSelected: string[];
};

export default function ProductFilters({
  categories,
  defaultCategoriesSelected,
  sizes,
  defaultSizesSelected,
  colors,
  defaultColorsSelected,
}: Props) {
  const categoriesValue = "categories";
  const sizesValue = "sizes";
  const colorsValue = "colors";

  // Pre-expand items which have options selected on-load
  const defaultValues: string[] = [];
  if (defaultCategoriesSelected.length > 0) defaultValues.push(categoriesValue);
  if (defaultSizesSelected.length > 0) defaultValues.push(sizesValue);
  if (defaultColorsSelected.length > 0) defaultValues.push(colorsValue);

  return (
    <>
      <h2 className="text-xl mb-4">Filter By</h2>

      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={defaultValues}
      >
        <AccordionItem value={categoriesValue}>
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <ProductFilter
              name="categories"
              options={categories}
              defaultOptionsSelected={defaultCategoriesSelected}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value={sizesValue}
          aria-expanded={defaultSizesSelected.length > 0}
        >
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <ProductFilter
              name="sizes"
              options={sizes}
              defaultOptionsSelected={defaultSizesSelected}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={colorsValue}>
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <ProductFilter
              name="colors"
              options={colors}
              defaultOptionsSelected={defaultColorsSelected}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
