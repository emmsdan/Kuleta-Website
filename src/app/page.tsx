export const dynamic = "force-dynamic";
import {
  getHomeCategoriesWithFallback,
  getCategoriesWithFallback,
  getProductsWithFallback,
} from "@/lib/catalog-api";
import { HomePageContent } from "@/components/HomePageContent";
import { getCollection, getSingleton } from "@/lib/cms";
import { readStringArray } from "@/lib/cms/helpers";

export default async function HomePage() {
  const [
    homeResult,
    categoriesResult,
    productsResult,
    siteConfig,
    announcement,
    hero,
    homeContent,
    story,
    founderItems,
    sponsors,
    partners,
    featuredIn,
    reviewItems,
    kuzaPage,
  ] = await Promise.all([
    getHomeCategoriesWithFallback(),
    getCategoriesWithFallback(),
    getProductsWithFallback(),
    getSingleton<{ shopBaseUrl?: string }>("site.config", {}),
    getSingleton<{ message?: string }>("home.announcement", {}),
    getSingleton<{
      headlineBefore?: string;
      highlighted?: string;
      headlineAfter?: string;
      backgroundImage?: string;
    }>("home.hero", {}),
    getSingleton<{
      categoriesTitle?: string;
      categoriesCtaLabel?: string;
      featuredTitle?: string;
      reviewQuote?: string;
      reviewAuthor?: string;
    }>("home.content", {}),
    getSingleton<{ heading?: string; paragraphs?: string[] }>(
      "about.story",
      {},
    ),
    getCollection("about.founders"),
    getCollection("home.sponsors"),
    getCollection("home.partners"),
    getCollection("home.featured-in"),
    getCollection("home.review"),
    getSingleton<{
      heroImage?: string;
      videoUrl?: string;
      heroTitle?: string;
      heroSubtitle?: string;
    }>("kuza.page", {}),
  ]);

  const categories = homeResult.categories.length
    ? homeResult.categories
    : categoriesResult.categories;

  return (
    <HomePageContent
      categories={categories}
      products={productsResult.products}
      announcementMessage={announcement.message || ""}
      shopBaseUrl={siteConfig.shopBaseUrl || "https://shop.kuleta.io"}
      hero={{
        headlineBefore: hero.headlineBefore || "Bringing the local",
        highlighted: hero.highlighted || "African Market",
        headlineAfter: hero.headlineAfter || "to the world",
        backgroundImage:
          hero.backgroundImage ||
          "/assets/b968a02aa95c98f64d11bb742ce5b76a609a84a9.png",
      }}
      homeContent={{
        categoriesTitle: homeContent.categoriesTitle || "Shop by Category",
        categoriesCtaLabel: homeContent.categoriesCtaLabel || "Shop Now",
        featuredTitle: homeContent.featuredTitle || "Featured Products",
        reviewQuote:
        homeContent.reviewQuote ||
        reviewItems[0]?.body ||
          "Kuleta has transformed how I access authentic African products.",
        reviewAuthor:
          reviewItems[0]?.title ||
          homeContent.reviewAuthor ||
          "Kuleta Customer",
      }}
      story={{
        title: story.heading || "Our Story",
        paragraphs: readStringArray(story.paragraphs),
        founders: founderItems.map((item) => ({
          name: item.title,
          title: item.subtitle || "",
          bio: item.body || "",
          image: item.imageUrl || "",
        })),
      }}
      kuza={{
        title: kuzaPage.heroTitle || "Kuza Dada",
        description:
          kuzaPage.heroSubtitle ||
          "Building a new wave of women entrepreneurs across Africa",
        buttonLabel: "Learn More",
        imageUrl:
          kuzaPage.heroImage ||
          "/assets/29d4542c8b108e0389991c23b1a793f7d500fb00.png",
        videoUrl: kuzaPage.videoUrl || undefined,
      }}
      sponsors={sponsors.map((item) => ({
        title: item.title,
        imageUrl: item.imageUrl || undefined,
      }))}
      partners={partners.map((item) => ({
        title: item.title,
        imageUrl: item.imageUrl || undefined,
      }))}
      featuredIn={featuredIn.map((item) => ({
        title: item.title,
        imageUrl: item.imageUrl || undefined,
      }))}
    />
  );
}
