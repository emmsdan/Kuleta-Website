import categoriesMock from "@/store/mock/categories.json";
import productsMock from "@/store/mock/product.json";
import productsListMock from "@/store/mock/product-list.json";
import type { ApiListResponse, Category } from "@/app/types";

export const mockStore = {
  homeCategories: categoriesMock as ApiListResponse<Category>,
  categories: productsMock as ApiListResponse<Category>,
  products: productsListMock as ApiListResponse<Category>,
};
