import type { Category } from "@/app/types";

export function getCategoryShopUrl(category: Category, fallbackShopBaseUrl: string): string {
  if (category.links?.products) {
    return category.links.products;
  }

  const baseUrl = fallbackShopBaseUrl || "https://shop.kuleta.io";
  return `${baseUrl}/category/${encodeURIComponent(category.slug || String(category.id))}`;
}
