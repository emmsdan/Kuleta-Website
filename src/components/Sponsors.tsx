"use client";

import Slider from "react-slick";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface SponsorItem {
  title: string;
  imageUrl?: string;
}

interface SponsorsProps {
  sponsors: SponsorItem[];
  partners: SponsorItem[];
  featured: SponsorItem[];
}

export function Sponsors({ sponsors, partners, featured }: SponsorsProps) {

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="py-16 pb-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Sponsored By */}
          <div>
            <h3 className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent text-sm uppercase tracking-wider mb-6 text-center font-semibold">
              Sponsored by
            </h3>
            <div className="h-[300px]">
              <Slider {...carouselSettings}>
                {sponsors.map((sponsor, index) => (
                  <div key={`${sponsor.title}-${index}`} className="px-2">
                    {sponsor.imageUrl ? (
                      <div className="h-28 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={sponsor.imageUrl}
                          alt={sponsor.title}
                          className="max-h-24 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2 text-lg">
                        {sponsor.title}
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Partnered With */}
          <div>
            <h3 className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent text-sm uppercase tracking-wider mb-6 text-center font-semibold">
              Partnered with
            </h3>
            <div className="h-[400px] overflow-hidden">
              <Slider {...carouselSettings}>
                {partners.map((partner, index) => (
                  <div key={`${partner.title}-${index}`} className="px-2">
                    {partner.imageUrl ? (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={partner.imageUrl}
                          alt={partner.title}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2">
                        {partner.title}
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Featured In */}
          <div>
            <h3 className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent text-sm uppercase tracking-wider mb-6 text-center font-semibold">
              Featured in
            </h3>
            <div className="h-[400px]">
              <Slider {...carouselSettings}>
                {featured.map((media, index) => (
                  <div key={`${media.title}-${index}`} className="px-2">
                    {media.imageUrl ? (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={media.imageUrl}
                          alt={media.title}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2">
                        {media.title}
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}