import type { Category, Product } from "@/app/types";
import { getCollection } from "@/lib/cms";

export interface CatalogLoadResult {
  categories: Category[];
  source: "api" | "mock" | "cms";
}

export interface ProductLoadResult {
  products: Product[];
  source: "cms";
}

export async function getHomeCategoriesWithFallback(): Promise<CatalogLoadResult> {
  const records = await getCollection("categories");
  return {
    categories: records.map((item, index) => ({
      id: Number((item.metadata as { id?: number } | null)?.id ?? index + 1),
      slug: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
      name: item.title,
      banner: item.imageUrl || undefined,
      cover_image: item.imageUrl || undefined,
      icon: item.imageUrl || undefined,
      links: item.linkUrl ? { products: item.linkUrl } : undefined,
    })),
    source: "cms",
  };
}

export async function getCategoriesWithFallback(): Promise<CatalogLoadResult> {
  return getHomeCategoriesWithFallback();
}
export async function getProductsWithFallback(): Promise<ProductLoadResult> {
  const records = await getCollection("products");
  return {
    products: records.map((item, index) => {
      const metadata = (item.metadata as {
        id?: string;
        price?: number;
        originalPrice?: number;
        discount?: number;
        rating?: number;
        reviews?: number;
      } | null) || { id: String(index + 1) };

      return {
        id: metadata.id || String(index + 1),
        name: item.title,
        category: item.subtitle || "General",
        image: item.imageUrl || "",
        description: item.body || undefined,
        price: Number(metadata.price ?? 0),
        originalPrice: metadata.originalPrice,
        discount: metadata.discount,
        rating: Number(metadata.rating ?? 0),
        reviews: Number(metadata.reviews ?? 0),
      };
    }),
    source: "cms",
  };
}

export function getCategoryShopUrl(category: Category): string {
  if (category.links?.products) {
    return category.links.products;
  }

  const fallbackShopUrl = process.env.NEXT_PUBLIC_KULETA_SHOP_BASE_URL || "https://dev-preview-1025.kuleta.io";
  return `${fallbackShopUrl}/category/${encodeURIComponent(category.slug || String(category.id))}`;
}
