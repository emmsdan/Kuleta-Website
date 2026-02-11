import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/app/components/Header";
import { Cart } from "@/app/components/Cart";
import { HomePage } from "@/pages/HomePage";
import { MeetTheTeamPage } from "@/pages/MeetTheTeamPage";
import { AdvisoryBoardPage } from "@/pages/AdvisoryBoardPage";
import { WaitListPage } from "@/pages/WaitListPage";
import { FAQPage } from "@/pages/FAQPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { KuzaDadaPage } from "@/pages/KuzaDadaPage";
import { ContactPage } from "@/pages/ContactPage";
import type { Product, CartItem } from "@/app/types";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2ODY2NzczMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    rating: 4.8,
    reviews: 1234,
  },
  {
    id: "2",
    name: "True Wireless Earbuds Pro",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY4NjU1NDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    rating: 4.6,
    reviews: 892,
  },
  {
    id: "3",
    name: "Smart Watch Ultra",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2ODYxMDI0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Wearables",
    rating: 4.9,
    reviews: 2156,
  },
  {
    id: "4",
    name: "MacBook Pro 16-inch",
    price: 2499.99,
    originalPrice: 2799.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njg2NDgwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Computers",
    rating: 4.9,
    reviews: 3421,
  },
  {
    id: "5",
    name: "Premium Phone Case Set",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: "https://images.unsplash.com/photo-1566793474285-2decf0fc182a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2ODU5MjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Accessories",
    rating: 4.4,
    reviews: 567,
  },
  {
    id: "6",
    name: "Professional Camera Lens 50mm",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1608186336271-53313eeaf864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBsZW5zfGVufDF8fHx8MTc2ODY3NzA1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Photography",
    rating: 4.7,
    reviews: 445,
  },
  {
    id: "7",
    name: "RGB Mechanical Gaming Keyboard",
    price: 159.99,
    originalPrice: 219.99,
    discount: 27,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3Njg1OTk1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gaming",
    rating: 4.5,
    reviews: 1089,
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXJ8ZW58MXx8fHwxNzY4NjQ4ODE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    rating: 4.6,
    reviews: 723,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
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

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header cartItemCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/team" element={<MeetTheTeamPage />} />
          <Route path="/advisory-board" element={<AdvisoryBoardPage />} />
          <Route path="/waitlist" element={<WaitListPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/kuza-dada" element={<KuzaDadaPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#177F00] via-[#E99C00] to-[#D43500] text-white py-4">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-white text-4xl font-bold tracking-[0.3em] mix-blend-screen text-[32px]">
                    K U L E T A
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
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">All Products</a></li>
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">Collections</a></li>
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">About</a></li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="mb-4 text-white">Contact</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">Contact</a></li>
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">Privacy</a></li>
                  <li><a href="/" className="hover:text-[#E99C00] transition-colors">Terms</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="mb-4 text-white">Newsletter</h3>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button className="bg-gradient-to-r from-[#E99C00] to-[#d48a00] hover:from-[#E99C00]/90 hover:to-[#d48a00]/90 text-white">
                    Subscribe
                  </Button>
                </div>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-[#E99C00] transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
              © 2026 Kuleta Inc. All rights reserved.
            </div>
          </div>
        </footer>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        <Toaster />
      </div>
    </BrowserRouter>
  );
}