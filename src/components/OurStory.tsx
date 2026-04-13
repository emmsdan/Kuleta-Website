"use client";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface Founder {
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface OurStoryProps {
  title: string;
  paragraphs: string[];
  founders: Founder[];
}

export function OurStory({ title, paragraphs, founders }: OurStoryProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent mb-8">
            {title}
          </h2>
          
          {/* Story Content */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Image */}
          <div className="mb-12">
          </div>

          {/* Co-founders */}
          <div className="grid md:grid-cols-2 gap-6">
            {founders.map((coFounder, index) => (
              <div
                key={coFounder.name}
                className={`flex gap-4 items-start p-6 bg-gradient-to-br ${
                  index % 2 === 0 ? "from-gray-50 to-yellow-50" : "from-gray-50 to-green-50"
                } rounded-xl relative`}
              >
                <ImageWithFallback
                  src={coFounder.image}
                  alt={coFounder.name}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{coFounder.name}</h3>
                  <p className={`text-sm ${index % 2 === 0 ? "text-[#177F00]" : "text-[#E99C00]"} mb-2`}>
                    {coFounder.title}
                  </p>
                  <p className="text-sm max-sm:opacity-0">{coFounder.bio}</p>
                  <p className="absolute top-35 left-10 right-10 text-sm text-gray-600 sm:hidden">{coFounder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}