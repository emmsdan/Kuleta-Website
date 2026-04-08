"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { CONTACT_EMAIL, KULETA_SHOP_BASE_URL, SOCIAL_LINKS } from "@/app/config";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

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
    <footer className="bg-gradient-to-br from-[#177F00] via-[#E99C00] to-[#D43500] text-white py-4">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="Kuleta Inc"
                className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten"
              />
            </div>
            <p className="text-white/80 text-sm text-center">
              Bringing the local African Market to the world
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-4 text-white">Shop</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(KULETA_SHOP_BASE_URL, "_blank", "noopener,noreferrer");
                  }}
                  className="hover:text-[#E99C00] transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a href="/#categories" className="hover:text-[#E99C00] transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/#featured-products" className="hover:text-[#E99C00] transition-colors">
                  Featured Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#E99C00] transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="/contact" className="hover:text-[#E99C00] transition-colors">
                  Contact
                </a>
              </li>
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
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#E99C00] to-[#d48a00] hover:from-[#E99C00]/90 hover:to-[#d48a00]/90 text-white"
              >
                Subscribe
              </Button>
            </form>
            <div className="flex gap-3 mt-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#E99C00] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#E99C00] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-white/70">
              For media and support, email us at{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          © 2026 Kuleta Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
