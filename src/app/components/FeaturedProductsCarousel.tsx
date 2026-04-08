"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { ProductCard } from "@/app/components/ProductCard";
import type { Product } from "@/app/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "usehooks-ts";

interface FeaturedProductsCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function FeaturedProductsCarousel({
  products,
  onAddToCart,
}: FeaturedProductsCarouselProps) {
  const sliderRef = useRef<Slider>(null);
  const mobile = useMediaQuery("(max-width: 640px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: mobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },{
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="max-sm:min-w-[300px] px-4">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </Slider>

      {/* Custom Navigation Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
}