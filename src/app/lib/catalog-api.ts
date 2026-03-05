import { KULETA_API_BASE_URL, KULETA_SHOP_BASE_URL } from "@/app/config";
import type { ApiListResponse, Category } from "@/app/types";
import { mockStore } from "@/store/mock";

const REQUEST_TIMEOUT_MS = 8000;

function buildRequestHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = import.meta.env.VITE_KULETA_AUTH_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const apiKey = import.meta.env.VITE_KULETA_API_KEY;
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  return headers;
}

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: buildRequestHeaders(),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface CatalogLoadResult {
  categories: Category[];
  source: "api" | "mock";
}

export async function getHomeCategoriesWithFallback(): Promise<CatalogLoadResult> {
  try {
    const response = await fetchJson<ApiListResponse<Category>>(`${KULETA_API_BASE_URL}/categories/home`);
    return {
      categories: response.data,
      source: "api",
    };
  } catch {
    return {
      categories: mockStore.homeCategories.data,
      source: "mock",
    };
  }
}

export async function getCategoriesWithFallback(): Promise<CatalogLoadResult> {
  try {
    const response = await fetchJson<ApiListResponse<Category>>(`${KULETA_API_BASE_URL}/categories?parent_id=0`);
    return {
      categories: response.data,
      source: "api",
    };
  } catch {
    return {
      categories: mockStore.categories.data,
      source: "mock",
    };
  }
}

export function getCategoryShopUrl(category: Category): string {
  return `${KULETA_SHOP_BASE_URL}/category/${encodeURIComponent(category.slug || String(category.id))}`;
}
