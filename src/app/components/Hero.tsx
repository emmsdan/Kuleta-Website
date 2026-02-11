import { Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import heroImage from "@/asset/8726d5e6ffba4ae21af7897c6a167c91a610b0a3.png";
import backgroundImage from "@/asset/b968a02aa95c98f64d11bb742ce5b76a609a84a9.png";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-green-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center m-[10px] p-[10px] mx-[20px] my-[10px] relative">
          {/* Background Image */}
          <img 
            src={backgroundImage} 
            alt="" 
            className="absolute top-0 left-0 right-0 w-full h-full object-contain opacity-15 z-0 scale-125"
          />
          
          {/* Left: Headline */}
          <div className="space-y-6 relative z-10 mt-[200px]">
            <h1 className="md:text-7xl leading-tight text-center text-[96px]">
              Bringing the local{" "}
              <span className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
                African Market
              </span>{" "}
              to the world
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}