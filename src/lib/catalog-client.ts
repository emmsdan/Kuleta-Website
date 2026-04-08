import type { Category } from "@/app/types";

export function getCategoryShopUrl(category: Category, fallbackShopBaseUrl: string): string {
  if (category.links?.products) {
    return category.links.products;
  }

  const baseUrl = fallbackShopBaseUrl || "https://dev-preview-1025.kuleta.io";
  return `${baseUrl}/category/${encodeURIComponent(category.slug || String(category.id))}`;
}
