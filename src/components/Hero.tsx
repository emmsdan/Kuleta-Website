"use client";

interface HeroProps {
  backgroundImage: string;
  headlineBefore: string;
  highlighted: string;
  headlineAfter: string;
}

export function Hero({ backgroundImage, headlineBefore, highlighted, headlineAfter }: HeroProps) {
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
          <div className="space-y-6 relative z-10 sm:mt-[200px]">
            <h1 className="md:text-7xl leading-tight text-center text-7xl">
              {headlineBefore}{" "}
              <span className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
                {highlighted}
              </span>{" "}
              {headlineAfter}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}