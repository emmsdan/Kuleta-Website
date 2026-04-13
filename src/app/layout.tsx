import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getSingleton } from "@/lib/cms";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Kuleta — Bringing the local African Market to the world",
  description:
    "Shop authentic African products. Kuleta connects you directly with women-led businesses across the continent.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getSingleton<{
    siteTitle?: string;
    siteDescription?: string;
    shopBaseUrl?: string;
    contactEmail?: string;
    socials?: { instagram?: string; linkedin?: string };
  }>("site.config", {});

  const headerNavigation = await getSingleton<{
    menu?: { label: string; path: string }[];
    dropdown?: { label: string; path: string }[];
  }>("navigation.header", {});

  const footerNavigation = await getSingleton<{
    shopLinks?: { label: string; path: string }[];
    contactLinks?: { label: string; path: string }[];
  }>("navigation.footer", {});

  const footerBrand = await getSingleton<{
    logoUrl?: string;
    tagline?: string;
    copyright?: string;
    newsletterTitle?: string;
    newsletterPlaceholder?: string;
  }>("footer.brand", {});

  const shopBaseUrl = siteConfig.shopBaseUrl || "https://shop.kuleta.io";

  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Header
          logoUrl={footerBrand.logoUrl || "/assets/logo.png"}
          menuItems={headerNavigation.menu || []}
          dropdownItems={headerNavigation.dropdown || []}
          shopBaseUrl={shopBaseUrl}
        />
        {children}
        <Footer
          logoUrl={footerBrand.logoUrl || "/assets/logo.png"}
          tagline={footerBrand.tagline || "Bringing the local African Market to the world"}
          copyright={footerBrand.copyright || "2026 Kuleta Inc. All rights reserved."}
          contactEmail={siteConfig.contactEmail || "info@kuleta.io"}
          socialLinks={{
            instagram: siteConfig.socials?.instagram || "https://www.instagram.com/kuleta.io/",
            linkedin: siteConfig.socials?.linkedin || "https://www.linkedin.com/company/kuleta/",
          }}
          shopLinks={footerNavigation.shopLinks || []}
          contactLinks={footerNavigation.contactLinks || []}
          newsletterTitle={footerBrand.newsletterTitle || "Newsletter"}
          newsletterPlaceholder={footerBrand.newsletterPlaceholder || "Your email"}
        />
        <Toaster />
      </body>
    </html>
  );
}
