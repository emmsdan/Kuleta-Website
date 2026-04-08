"use client";

import { AnnouncementBar } from "@/app/components/AnnouncementBar";
import { Hero } from "@/app/components/Hero";
import { RegionCard } from "@/app/components/RegionCard";
import { FeaturedProductsCarousel } from "@/app/components/FeaturedProductsCarousel";
import { OurStory } from "@/app/components/OurStory";
import { KuzaDada } from "@/app/components/KuzaDada";
import { CustomerReview } from "@/app/components/CustomerReview";
import { Sponsors } from "@/app/components/Sponsors";
import type { Product, Category } from "@/app/types";
import { getCategoryShopUrl } from "@/app/lib/catalog-api";
import { KULETA_SHOP_BASE_URL } from "@/app/config";

interface HomePageContentProps {
  products: Product[];
  categories: Category[];
}

export function HomePageContent({ products, categories }: HomePageContentProps) {
  const handleAddToCart = (product: Product) => {
    window.location.href = `${KULETA_SHOP_BASE_URL}/search?product/${String(product.id)}`;
  };

  return (
    <>
      <AnnouncementBar />
      <Hero />

      {/* Product Categories Section */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-6">Shop by Category</h2>
          <div className="flex justify-center mb-10">
            <a
              href={KULETA_SHOP_BASE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#177F00] to-[#E99C00] px-10 py-3 text-white shadow-lg hover:opacity-95 transition-opacity"
            >
              Shop Now
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto overflow-y-auto pb-9">
            {categories.slice(0, 4).map((category) => (
              <RegionCard
                key={category.id}
                region={category.name}
                image={
                  category.cover_image ||
                  category.banner ||
                  category.icon ||
                  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                }
                onClick={() =>
                  window.open(getCategoryShopUrl(category), "_blank", "noopener,noreferrer")
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Featured Products</h2>
          <FeaturedProductsCarousel
            products={products.slice(0, 10)}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* Our Story */}
      <OurStory />

      {/* Kuza Dada Section */}
      <KuzaDada />

      {/* Customer Review */}
      <CustomerReview />

      {/* Sponsors */}
      <Sponsors />
    </>
  );
}
