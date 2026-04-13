export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryLinkMap {
  products?: string;
  sub_categories?: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  banner?: string;
  cover_image?: string;
  icon?: string;
  number_of_children?: number;
  links?: CategoryLinkMap;
}

export interface ApiListResponse<T> {
  data: T[];
  success: boolean;
  status: number;
}
