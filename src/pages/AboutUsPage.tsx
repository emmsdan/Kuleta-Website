import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Target, Heart, Globe, Key, Clock, DollarSign } from "lucide-react";
import mandaImage from "figma:asset/c3fb5af5eb9b460f4206a2cc93c7b7f159a5893c.png";
import judithImage from "figma:asset/0781dbd8f8e47b7b7a2635ca5190583ab69776e2.png";

export function AboutUsPage() {
  const values = [
    {
      icon: Globe,
      title: "Global Connection",
      description: "We believe that commerce should connect people, cultures, and markets without compromising quality or trust.",
    },
    {
      icon: Key,
      title: "Access",
      description: "We create pathways for customers to purchase authentic products from Africa with confidence and ease.",
    },
    {
      icon: Target,
      title: "Authenticity",
      description: "Every product we offer is vetted, verified, and sourced directly from trusted vendors across the continent.",
    },
    {
      icon: Clock,
      title: "Timeliness & Reliability",
      description: "We know that trust is built through consistency. Our customers can count on us to deliver on time, every time.",
    },
    {
      icon: DollarSign,
      title: "Fair & Dignified Pricing",
      description: "We ensure fair value for customers while supporting sustainable income for vendors.",
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "We empower women-led businesses by giving them tools, platforms, and opportunities to grow with dignity.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
              About Kuleta
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connecting the vibrant markets of Africa with the world through authentic products
              and empowered communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Story Text with Side Accent */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent mb-8">
                Our Story
              </h2>
              
              {/* Story in Cards */}
              <div className="space-y-8">
                {/* Opening */}
                <div className="border-l-4 border-[#177F00] pl-6 py-2">
                  <p className="text-xl text-gray-800 font-medium">
                    Kuleta was born from a deeply personal and common experience that revealed a larger gap faced by millions who shop in, the global market.
                  </p>
                </div>

                {/* The Wedding Story */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-[#E99C00]">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    When Manda's mother was preparing for his eldest brother's wedding, she wanted a dress that reflected who she was, something authentic, culturally rooted, and made back home. What should have been a simple process turned into weeks of uncertainty. Finding the right vendor was difficult. Communicating across borders was unreliable. Shipping was expensive, slow, and unpredictable. At every stage, there was doubt. <span className="italic font-medium">Would it look like the photos? Would it arrive at all?</span>
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    This was a reminder of how disconnected global commerce still is from the lived realities of global communities. Despite strong demand, purchasing meaningful products from Africa often relies on informal channels, personal favors, or suitcase trade. There was no reliable, dignified, and transparent way to buy from home.
                  </p>
                </div>

                {/* The Problem */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      And my family wasn't alone.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-[#177F00]">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Across the United States, millions of African consumers are looking for trusted ways to access clothing, food, and cultural goods that connect them to home, and doing so without uncertainty, delays, or compromise. They don't just want products. The pathway itself.
                    </p>
                  </div>
                </div>

                {/* The Solution */}
                <div className="bg-gradient-to-r from-[#177F00] to-[#E99C00] rounded-2xl p-8 text-white">
                  <p className="text-2xl font-bold mb-4">
                    Kuleta was created to change that.
                  </p>
                  <p className="text-lg leading-relaxed mb-4 opacity-95">
                    We built Kuleta as a bridge between global customers and the markets they love, combining technology, logistics, and trust to make cross-border purchasing seamless and dependable. From verified sourcing and quality assurance to reliable delivery and transparent pricing, Kuleta removes the friction that has long defined buying from Africa.
                  </p>
                  <p className="text-lg leading-relaxed opacity-95">
                    Today, Kuleta enables customers in the U.S. to shop intentionally, accessing authentic, shelf-stable goods and cultural products with confidence. Every order is about more than a transaction; it's about restoring access, preserving identity, and making global commerce feel personal again.
                  </p>
                </div>
              </div>
            </div>

            {/* Co-founders - Redesigned */}
            <div>
              <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">Meet Our Co-Founders</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Co-founder 1 - Manda */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#177F00] to-[#E99C00] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#177F00] transition-all">
                    <div className="flex flex-col items-center text-center mb-6">
                      <ImageWithFallback
                        src={mandaImage}
                        alt="Manda Bwerevu"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#177F00] mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-900">Manda Bwerevu</h3>
                      <div className="inline-block bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
                        Co-Founder & CEO
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Manda leads Kuleta's vision, strategy, and customer growth. Raised across Africa and the United States, his lived experience navigating multiple cultures shaped Kuleta's demand-driven foundation. He brings experience across global supply chains, public policy, and entrepreneurship, with a focus on building scalable platforms that solve real consumer pain points. Manda holds graduate degrees from Harvard University and the University of Chicago, bringing expertise in areas of Education Policy, International Development, Social Entrepreneurship, and others. At Kuleta, he focuses on customer experience, diaspora engagement, and building a networked platform that feels as authentic as it is intentional.
                    </p>
                  </div>
                </div>

                {/* Co-founder 2 - Judith */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E99C00] to-[#D43500] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#E99C00] transition-all">
                    <div className="flex flex-col items-center text-center mb-6">
                      <ImageWithFallback
                        src={judithImage}
                        alt="Judith"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#E99C00] mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-900">Judith</h3>
                      <div className="inline-block bg-gradient-to-r from-[#E99C00] to-[#D43500] text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
                        Co-Founder & COO
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Judith leads Kuleta's operations, vendor partnerships, and program execution. Born and raised in Kenya, her lived experience working within informal and emerging market economies shaped Kuleta's operational backbone and commitment to quality and trust. She brings over a decade of experience across finance, public policy, and enterprise development, with a proven ability to help entrepreneurs and small businesses to operate sustainably and scale with confidence. In addition to many other degrees, Judith holds a PhD in Finance and a Master's degree in Banking, bringing deep expertise in financial systems and market access. As Chief Operating Officer at Kuleta, she focuses on operational excellence, vendor enablement, and ensuring that Kuleta's platform reflects both the integrity and standards of the markets it serves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#177F00]">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To deliver authentic, high-quality African products to global consumers through a trusted marketplace connecting customers directly to women-led businesses, ensuring fair value, reliable delivery, and meaningful impact with every purchase.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#E99C00]">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A global marketplace where customers everywhere can easily access authentic African goods they trust, through expanded market reach, sustainable income, and long-term economic opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-[#177F00]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-[#177F00] to-[#E99C00]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Women Vendors Supported</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Markets We Source From</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">7 days</div>
              <div className="text-lg opacity-90">Average Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Join Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you're a customer looking for authentic African products or a vendor wanting to
            share your craft with the world, we'd love to have you be part of the Kuleta family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white rounded-full hover:shadow-lg transition-shadow"
            >
              Start Shopping
            </a>
            <a
              href="/waitlist"
              className="px-8 py-3 border-2 border-[#177F00] text-[#177F00] rounded-full hover:bg-[#177F00] hover:text-white transition-colors"
            >
              Become a Vendor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}