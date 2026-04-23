"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  
  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:border-[#177F00] transition-all w-full">

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {product.discount && (
          <Badge className="absolute top-3 right-3 bg-[#D43500] hover:bg-[#D43500]">
            -{product.discount}%
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-50 to-yellow-50 text-[#177F00] border-0">
            {product.category}
          </Badge>
        </div>
        <h3 className="mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}