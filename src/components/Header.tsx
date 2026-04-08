"use client";

import { ShoppingCart, User, Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KULETA_SHOP_BASE_URL } from "@/config";
import { useState } from "react";

const kuletaLogo = "/assets/logo.png";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: KULETA_SHOP_BASE_URL },
    { label: "About Us", path: "/about" },
    { label: "Kuza Dada", path: "/kuza-dada" },
    { label: "Contact", path: "/contact" }
  ];
  
  const dropdownItems = [
    { label: "Shop", path: KULETA_SHOP_BASE_URL },
    { label: "Join Our Newsletter", path: "/get-involved" },
    { label: "Meet the Team", path: "/team" },
    { label: "Advisory Board", path: "/advisory-board" },
    { label: "FAQ", path: "/faq" }
  ];

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    const searchUrl = encodedQuery
      ? `${KULETA_SHOP_BASE_URL}/search?keyword=${encodedQuery}&q=${encodedQuery}`
      : KULETA_SHOP_BASE_URL;

    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu Dropdown and Logo */}
          <div className="flex items-center gap-4">
            {/* Dropdown Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-[#177F00] transition-colors p-2">
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Dropdown Items */}
              <div className="absolute left-0 top-full mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                {dropdownItems.map((item) => (
                  item.path.startsWith("http") ? (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#177F00]/10 hover:to-[#E99C00]/10 hover:text-[#177F00] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.label}
                  </a>
                  ) : (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#177F00]/10 hover:to-[#E99C00]/10 hover:text-[#177F00] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.label}
                  </Link>
                  )
                ))}
              </div>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src={kuletaLogo} alt="Kuleta Inc" className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten" />
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              item.path.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-[#177F00] transition-colors relative pb-1"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`text-gray-700 hover:text-[#177F00] transition-colors relative pb-1 ${
                    index === 0 ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#177F00] after:to-[#E99C00]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex gap-2 flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Find product you like"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="pl-10 border-gray-300 focus-visible:ring-[#177F00] rounded-full h-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white rounded-full px-6">
              Search
            </Button>
          </div>

          {/* Right side - User and Cart */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-[#177F00]"
              onClick={() => window.open(`${KULETA_SHOP_BASE_URL}/users/login`, "_blank", "noopener,noreferrer")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:text-[#177F00]"
              onClick={() => window.open(`${KULETA_SHOP_BASE_URL}/cart`, "_blank", "noopener,noreferrer")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}