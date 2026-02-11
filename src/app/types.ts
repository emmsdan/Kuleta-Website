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
