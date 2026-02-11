import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import kuletaLogo from "@/assets/5e98c01aef652a24d8b46d28069814fdee46a433.png";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Kuza Dada", path: "/kuza-dada" },
    { label: "Contact", path: "/contact" }
  ];
  
  const dropdownItems = [
    { label: "Shop", path: "/" },
    { label: "Join Our Newsletter", path: "/waitlist" },
    { label: "Meet the Team", path: "/team" },
    { label: "Advisory Board", path: "/advisory-board" },
    { label: "FAQ", path: "/faq" }
  ];
  
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
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#177F00]/10 hover:to-[#E99C00]/10 hover:text-[#177F00] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={kuletaLogo} alt="Kuleta Inc" className="h-8 w-auto mix-blend-darken" />
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-gray-700 hover:text-[#177F00] transition-colors relative pb-1 ${
                  index === 0 ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#177F00] after:to-[#E99C00]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex gap-2 flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Find product you like"
                className="pl-10 border-gray-300 focus-visible:ring-[#177F00] rounded-full h-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white rounded-full px-6">
              Search
            </Button>
          </div>

          {/* Right side - User and Cart */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-[#177F00]"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:text-[#177F00]"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#177F00] to-[#E99C00] text-xs flex items-center justify-center text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}