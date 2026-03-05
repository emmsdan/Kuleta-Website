import { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/app/components/Header";
import { HomePage } from "@/pages/HomePage";
import { MeetTheTeamPage } from "@/pages/MeetTheTeamPage";
import { AdvisoryBoardPage } from "@/pages/AdvisoryBoardPage";
import { FAQPage } from "@/pages/FAQPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { KuzaDadaPage } from "@/pages/KuzaDadaPage";
import { ContactPage } from "@/pages/ContactPage";
import { WaitListPage } from "@/pages/WaitListPage";
import type { Product, CartItem, Category } from "@/app/types";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Instagram, Linkedin } from "lucide-react";
import { CONTACT_EMAIL, KULETA_SHOP_BASE_URL, SOCIAL_LINKS } from "@/app/config";
import { getCategoriesWithFallback, getHomeCategoriesWithFallback, getProductsWithFallback } from "@/app/lib/catalog-api";
import kuletaLogo from "@/assets/logo.png";


export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [homeCategories, setHomeCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
    const loadCatalog = async () => {
      const [homeResult, categoriesResult, productsResult] = await Promise.all([
        getHomeCategoriesWithFallback(),
        getCategoriesWithFallback(),
        getProductsWithFallback(),
      ]);

      const selectedCategories = homeResult.categories.length
        ? homeResult.categories
        : categoriesResult.categories;

      setHomeCategories(selectedCategories);
      setProducts(productsResult.categories);

      if (homeResult.source === "mock" && categoriesResult.source === "mock") {
        // toast.info("Catalog loaded from local mock data.");
      }
    };

    loadCatalog();
  }, []);

  const handleAddToCart = (product: Product) => {
    window.location.href = `${KULETA_SHOP_BASE_URL}/search?/product/${encodeURIComponent(product.slug || String(product.id))}`;
    return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success("Increased quantity in cart");
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success("Added to cart");
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for joining our newsletter!");
    setNewsletterEmail("");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header
          cartItemCount={totalItems}
          onCartClick={() => window.open(`${KULETA_SHOP_BASE_URL}/cart`, "_blank", "noopener,noreferrer")}
        />
        
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                categories={homeCategories}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/team" element={<MeetTheTeamPage />} />
          <Route path="/advisory-board" element={<AdvisoryBoardPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/kuza-dada" element={<KuzaDadaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-involved" element={<WaitListPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#177F00] via-[#E99C00] to-[#D43500] text-white py-4">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-white text-4xl font-bold tracking-[0.3em] mix-blend-screen text-[32px]">
                    <img src={kuletaLogo} alt="Kuleta Inc" className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten" />
                  </span>
                </div>
                <p className="text-white/80 text-sm text-center">
                  Bringing the local African Market to the world
                </p>
              </div>
              
              {/* Shop Column */}
              <div>
                <h3 className="mb-4 text-white">Shop</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><a href="#" onClick={(event) => { event.preventDefault(); window.open(KULETA_SHOP_BASE_URL, "_blank", "noopener,noreferrer"); }} className="hover:text-[#E99C00] transition-colors">Shop</a></li>
                  <li><a href="/#categories" className="hover:text-[#E99C00] transition-colors">Categories</a></li>
                  <li><a href="/#featured-products" className="hover:text-[#E99C00] transition-colors">Featured Products</a></li>
                  <li><a href="/about" className="hover:text-[#E99C00] transition-colors">About</a></li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="mb-4 text-white">Contact</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><a href="/contact" className="hover:text-[#E99C00] transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="mb-4 text-white">Newsletter</h3>
                <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-[#E99C00] to-[#d48a00] hover:from-[#E99C00]/90 hover:to-[#d48a00]/90 text-white">
                    Subscribe
                  </Button>
                </form>
                <div className="flex gap-3 mt-4">
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-4 text-xs text-white/70">
                  For media and support, email us at <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
              © 2026 Kuleta Inc. All rights reserved.
            </div>
          </div>
        </footer>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}