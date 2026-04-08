"use client";

import Slider from "react-slick";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const obamaFoundationLogo = "/assets/c765af3d8366941d8c4bbc789d42f7b0d0e6179f.png";

export function Sponsors() {
  const sponsors: { type: string; name: string; logo: string; subtitle?: string }[] = [
    { type: "image", name: "UChicago Booth Rustandy Center", logo: "https://www.chicagobooth.edu/-/media/enterprise/centers/rustandy/what-we-do/module-imgs500/rustandy-center-logo-vert-rgb_web.jpg?h=10%25&w=33%25&hash=E7D671F6CC7AC8DA8C231F4A5931FA08" },
    { type: "image", name: "Simply Tabasamu", logo: "https://simplytabasamu.com/cdn/shop/files/6.png?height=628&pad_color=ffffff&v=1762535191&width=1200" },
    { type: "image", name: "Peace for People", logo: "https://www.middlebury.edu/sites/default/files/2021-12/PfP%20HQ%20Logo.png?fv=e6Y7bbAn" }
  ];
  const partners = [
    { type: "image", name: "Obama Foundation Scholars", logo: obamaFoundationLogo },
    { type: "image", name: "Clinton Global Initiative University", logo: "https://resolutionproject.org/wp-content/uploads/2019/08/CGI-U-Logo-White-Space_0.png" },
    { type: "image", name: "HAE", logo: "https://static1.squarespace.com/static/54eec84be4b05469cef74217/t/66be5c2acf91032734bce048/1639407998110/HAELogo2021.png?format=1500w" },
    { type: "image", name: "Social New Venture Challenge", logo: "https://polsky.uchicago.edu/wp-content/uploads/2022/05/SNVC_vertical_RGB.png?_t=1715956434" },
    { type: "image", name: "Partner 5", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3M75uTqtn6vmI5rIqST2p2VZS8mC6KrfEw&s" },
    { type: "image", name: "Partner 6", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2idkKnFiftBrAfGbQ2LPtupUnQuLh-avn5Q&s" },
    { type: "image", name: "Tarrson Impact Investment Fund", logo: "https://www.chicagobooth.edu/-/media/project/chicago-booth/centers/rustandy/what-we-do/impact-investing/steven-tarrson-impact-investment-fund/tarrson-wordmark-rgb.png?w=47%25&hash=5175350F7C3F6A145649DC93FF436B3E" },
    { type: "image", name: "Congolese Diaspora Impact Summit", logo: "https://congolesediasporaimpactsummit.com/wp-content/uploads/2023/06/logo2-final.png" }
  ];
  const featured = [
    { type: "image", name: "Media 1", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJEkmrwnLBubIeRmnIrkMMGq0DoPoa0XG_TQ&s" },
    { type: "image", name: "Media 2", logo: "https://banner2.cleanpng.com/20180513/ksw/avccjerrd.webp" },
    { type: "image", name: "Media 3", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2OlFZUJZ5DuvMjzSZfsaNuYpYPsQzkug1g&s" }
  ];

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
                  <div key={`${sponsor.name}-${index}`} className="px-2">
                    {sponsor.type === "custom" ? (
                      <div className="h-24 bg-transparent rounded flex flex-col items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <div className="text-[#800020] font-bold text-lg leading-tight tracking-wide">
                          {sponsor.name}
                        </div>
                        <div className="text-[#800020] text-sm leading-tight mt-1 opacity-90">
                          {sponsor.subtitle}
                        </div>
                      </div>
                    ) : sponsor.type === "image" ? (
                      <div className="h-28 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-24 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2 text-lg">
                        {sponsor.name}
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
                  <div key={`${partner.name}-${index}`} className="px-2">
                    {partner.type === "image" ? (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2">
                        {partner.name}
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
                  <div key={`${media.name}-${index}`} className="px-2">
                    {media.type === "image" ? (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center transition-all cursor-pointer my-2 px-4">
                        <ImageWithFallback
                          src={media.logo}
                          alt={media.name}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-transparent rounded flex items-center justify-center text-gray-600 transition-colors cursor-pointer my-2">
                        {media.name}
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