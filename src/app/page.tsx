import {
  getHomeCategoriesWithFallback,
  getCategoriesWithFallback,
  getProductsWithFallback,
} from "@/lib/catalog-api";
import { HomePageContent } from "@/components/HomePageContent";

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
      products={productsResult.products}
    />
  );
}
