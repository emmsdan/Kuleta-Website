import {
  getHomeCategoriesWithFallback,
  getCategoriesWithFallback,
  getProductsWithFallback,
} from "@/app/lib/catalog-api";
import { HomePageContent } from "@/app/components/HomePageContent";
import type { Product } from "@/app/types";

export default async function HomePage() {
  const [homeResult, categoriesResult, productsResult] = await Promise.all([
    getHomeCategoriesWithFallback(),
    getCategoriesWithFallback(),
    getProductsWithFallback(),
  ]);

  const categories = homeResult.categories.length
    ? homeResult.categories
    : categoriesResult.categories;

  return (
    <HomePageContent
      categories={categories}
      products={productsResult.categories as unknown as Product[]}
    />
  );
}
