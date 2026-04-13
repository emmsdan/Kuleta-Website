"use client";

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Hero } from "@/components/Hero";
import { RegionCard } from "@/components/RegionCard";
import { FeaturedProductsCarousel } from "@/components/FeaturedProductsCarousel";
import { OurStory } from "@/components/OurStory";
import { KuzaDada } from "@/components/KuzaDada";
import { CustomerReview } from "@/components/CustomerReview";
import { Sponsors } from "@/components/Sponsors";
import type { Product, Category } from "@/app/types";
import { getCategoryShopUrl } from "@/lib/catalog-client";

interface HomePageContentProps {
  products: Product[];
  categories: Category[];
  announcementMessage: string;
  shopBaseUrl: string;
  hero: {
    headlineBefore: string;
    highlighted: string;
    headlineAfter: string;
    backgroundImage: string;
  };
  homeContent: {
    categoriesTitle: string;
    categoriesCtaLabel: string;
    featuredTitle: string;
    reviewQuote: string;
    reviewAuthor: string;
  };
  story: {
    title: string;
    paragraphs: string[];
    founders: { name: string; title: string; bio: string; image: string }[];
  };
  kuza: {
    title: string;
    description: string;
    buttonLabel: string;
    imageUrl: string;
    videoUrl?: string;
  };
  sponsors: { title: string; imageUrl?: string }[];
  partners: { title: string; imageUrl?: string }[];
  featuredIn: { title: string; imageUrl?: string }[];
}

export function HomePageContent({
  products,
  categories,
  announcementMessage,
  shopBaseUrl,
  hero,
  homeContent,
  story,
  kuza,
  sponsors,
  partners,
  featuredIn,
}: HomePageContentProps) {
  const handleAddToCart = (product: Product) => {
    window.location.href = `${shopBaseUrl}/search?keyword=${String(product.id)}`;
  };

  return (
    <>
      <AnnouncementBar message={announcementMessage} />
      <Hero
        backgroundImage={hero.backgroundImage}
        headlineBefore={hero.headlineBefore}
        highlighted={hero.highlighted}
        headlineAfter={hero.headlineAfter}
      />

      {/* Product Categories Section */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-6">{homeContent.categoriesTitle}</h2>
          <div className="flex justify-center mb-10">
            <a
              href={shopBaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#177F00] to-[#E99C00] px-10 py-3 text-white shadow-lg hover:opacity-95 transition-opacity"
            >
              {homeContent.categoriesCtaLabel}
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
                  window.open(
                    getCategoryShopUrl(category, shopBaseUrl),
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">{homeContent.featuredTitle}</h2>
          <FeaturedProductsCarousel
            products={products.slice(0, 10)}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* Our Story */}
      <OurStory title={story.title} paragraphs={story.paragraphs} founders={story.founders} />

      {/* Kuza Dada Section */}
      <KuzaDada
        title={kuza.title}
        description={kuza.description}
        buttonLabel={kuza.buttonLabel}
        imageUrl={kuza.imageUrl}
        videoUrl={kuza.videoUrl}
      />

      {/* Customer Review */}
      <CustomerReview quote={homeContent.reviewQuote} author={homeContent.reviewAuthor} />

      {/* Sponsors */}
      <Sponsors sponsors={sponsors} partners={partners} featured={featuredIn} />
    </>
  );
}
