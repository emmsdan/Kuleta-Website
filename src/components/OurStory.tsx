"use client";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const mandaImage = "/assets/c3fb5af5eb9b460f4206a2cc93c7b7f159a5893c.png";
const kwameImage = "/assets/0781dbd8f8e47b7b7a2635ca5190583ab69776e2.png";

const CO_FOUNDERS = [
  {
    name: "Manda Bwerevu",
    title: "Co-Founder & CEO",
    titleColorClassName: "text-[#177F00]",
    cardGradientClassName: "from-gray-50 to-yellow-50",
    image: mandaImage,
    imageAlt: "Manda Bwerevu",
    bio:
      "Manda leads Kuleta's vision, strategy, and customer growth. Raised across Africa and the United States, his lived experience navigating multiple cultures shaped Kuleta's demand-driven foundation. He brings experience across global supply chains, public policy, and entrepreneurship, with a focus on building scalable platforms that solve real consumer pain points. Manda holds graduate degrees from Harvard University and the University of Chicago, bringing expertise in areas of Education Policy, International Development, Social Entrepreneurship, and others. At Kuleta, he focuses on customer experience, diaspora engagement, and building a networked platform that feels as authentic as it is intentional.",
  },
  {
    name: "Judith",
    title: "Co-Founder & COO",
    titleColorClassName: "text-[#E99C00]",
    cardGradientClassName: "from-gray-50 to-green-50",
    image: kwameImage,
    imageAlt: "Judith",
    bio:
      "Judith leads Kuleta's operations, vendor partnerships, and program execution. Born and raised in Kenya, her lived experience working within informal and emerging market economies shaped Kuleta's operational backbone and commitment to quality and trust. She brings over a decade of experience across finance, public policy, and enterprise development, with a proven ability to help entrepreneurs and small businesses to operate sustainably and scale with confidence. In addition to many other degrees, Judith holds a PhD in Finance and a Master's degree in Banking, bringing deep expertise in financial systems and market access. As Chief Operating Officer at Kuleta, she focuses on operational excellence, vendor enablement, and ensuring that Kuleta's platform reflects both the integrity and standards of the markets it serves.",
  },
];

export function OurStory() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent mb-8">
            Our Story
          </h2>
          
          {/* Story Content */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
            <p>
              Kuleta was born from a deeply personal and common experience that revealed a larger gap faced by millions who shop in, the global market.
            </p>
            <p>
              When my Manda&apos;s mother was preparing for his eldest brother&apos;s wedding, she wanted a dress that reflected who she was, something authentic, culturally rooted, and made back home. What should have been a simple process turned into weeks of uncertainty. Finding the right vendor was difficult. Communicating across borders was unreliable. Shipping was expensive, slow, and unpredictable. At every stage, there was doubt. Would it look like the photos? Would it arrive at all?
            </p>
            <p>
              This was a reminder of how disconnected global commerce still is from the lived realities of global communities. Despite strong demand, purchasing meaningful products from Africa often relies on informal channels, personal favors, or suitcase trade. There was no reliable, dignified, and transparent way to buy from home.
            </p>
            <p>
              And my family wasn&apos;t alone.
            </p>
            <p>
              Across the United States, millions of African consumers are looking for trusted ways to access clothing, food, and cultural goods that connect them to home, and doing so without uncertainty, delays, or compromise. They don&apos;t just want products. The pathway itself.
            </p>
            <p className="font-semibold">
              Kuleta was created to change that.
            </p>
            <p>
              We built Kuleta as a bridge between global customers and the markets they love, combining technology, logistics, and trust to make cross-border purchasing seamless and dependable. From verified sourcing and quality assurance to reliable delivery and transparent pricing, Kuleta removes the friction that has long defined buying from Africa.
            </p>
            <p>
              Today, Kuleta enables customers in the U.S. to shop intentionally, accessing authentic, shelf-stable goods and cultural products with confidence. Every order is about more than a transaction; it&apos;s about restoring access, preserving identity, and making global commerce feel personal again.
            </p>
          </div>

          {/* Image */}
          <div className="mb-12">
          </div>

          {/* Co-founders */}
          <div className="grid md:grid-cols-2 gap-6">
            {CO_FOUNDERS.map((coFounder) => (
              <div
                key={coFounder.name}
                className={`flex gap-4 items-start p-6 bg-gradient-to-br ${coFounder.cardGradientClassName} rounded-xl relative`}
              >
                <ImageWithFallback
                  src={coFounder.image}
                  alt={coFounder.imageAlt}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{coFounder.name}</h3>
                  <p className={`text-sm ${coFounder.titleColorClassName} mb-2`}>
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