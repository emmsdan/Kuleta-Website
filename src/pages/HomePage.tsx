import { AnnouncementBar } from "@/app/components/AnnouncementBar";
import { Hero } from "@/app/components/Hero";
import { RegionCard } from "@/app/components/RegionCard";
import { FeaturedProductsCarousel } from "@/app/components/FeaturedProductsCarousel";
import { OurStory } from "@/app/components/OurStory";
import { KuzaDada } from "@/app/components/KuzaDada";
import { CustomerReview } from "@/app/components/CustomerReview";
import { Sponsors } from "@/app/components/Sponsors";
import type { Product } from "@/app/types";
import { toast } from "sonner";

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function HomePage({ products, onAddToCart }: HomePageProps) {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      
      {/* Product Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Product Categories</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <RegionCard
              region="West Africa"
              image="https://images.unsplash.com/photo-1734255026082-82fdc81991f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQWZyaWNhJTIwbGFuZHNjYXBlJTIwbWFya2V0fGVufDF8fHx8MTc2OTEwNTg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onClick={() => toast.info("West Africa products coming soon!")}
              comingSoon={true}
            />
            <RegionCard
              region="East Africa"
              image="https://images.unsplash.com/photo-1694891178685-76e09c390735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXN0JTIwYWZyaWNhJTIwY3VsdHVyZXxlbnwxfHx8fDE3Njg2ODEwODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onClick={() => toast.info("East Africa products coming soon!")}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Featured Products</h2>
          <FeaturedProductsCarousel products={products.slice(0, 6)} onAddToCart={onAddToCart} />
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