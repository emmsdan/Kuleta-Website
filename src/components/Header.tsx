"use client";

import { ShoppingCart, User, Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface NavLink {
  label: string;
  path: string;
}

interface HeaderProps {
  logoUrl: string;
  menuItems: NavLink[];
  dropdownItems: NavLink[];
  shopBaseUrl: string;
}

export function Header({ logoUrl, menuItems, dropdownItems, shopBaseUrl }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    const searchUrl = encodedQuery
      ? `${shopBaseUrl}/search?keyword=${encodedQuery}&q=${encodedQuery}`
      : shopBaseUrl;

    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".relative.group")) return;

    setOpenDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu Dropdown and Logo */}
          <div className="flex items-center gap-4">
            {/* Dropdown Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-[#177F00] transition-colors p-2" onClick={() => setOpenDropdown(!openDropdown)}>
                <Menu className="h-6 w-6" />
              </button>

              {/* Dropdown Items */}
              {openDropdown && <>
                <div className={clsx("absolute max-sm:fixed left-0 top-full mt-0 w-48 bg-white shadow-lg rounded-lg transition-all duration-200 border border-gray-100", {
                  "max-sm:w-full": openDropdown,
                })}>
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

              </>}
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="Kuleta Inc" className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten" />
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
                  className={`text-gray-700 hover:text-[#177F00] transition-colors relative pb-1 ${index === 0 ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#177F00] after:to-[#E99C00]' : ''
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
              onClick={() => window.open(`${shopBaseUrl}/users/login`, "_blank", "noopener,noreferrer")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:text-[#177F00]"
              onClick={() => window.open(`${shopBaseUrl}/cart`, "_blank", "noopener,noreferrer")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}