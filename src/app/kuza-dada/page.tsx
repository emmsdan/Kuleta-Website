"use client";

import { Button } from "@/app/components/ui/button";
import { Play, Award, BookOpen, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const kuzaDadaImage = "/assets/29d4542c8b108e0389991c23b1a793f7d500fb00.png";

const programs = [
  {
    icon: BookOpen,
    title: "Training & Education",
    description:
      "Comprehensive business skills training covering e-commerce, financial literacy, and digital marketing for women entrepreneurs.",
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description:
      "Connect with experienced business mentors and successful entrepreneurs who guide you through your journey.",
  },
  {
    icon: Award,
    title: "Certification Programs",
    description:
      "Earn recognized certifications in various business and technical skills to boost your credibility and capabilities.",
  },
  {
    icon: TrendingUp,
    title: "Market Access",
    description:
      "Direct access to Kuleta's platform and international markets, helping you reach customers worldwide.",
  },
];

const impact = [
  { number: "1,000+", label: "Women Trained" },
  { number: "15", label: "African Countries" },
  { number: "85%", label: "Success Rate" },
  { number: "$2M+", label: "Revenue Generated" },
];

const stories = [
  {
    name: "Fatima Ahmed",
    location: "Lagos, Nigeria",
    story: "Through Kuza Dada, I learned how to market my handmade jewelry online. Now I ship to customers in 5 countries!",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Grace Mwangi",
    location: "Nairobi, Kenya",
    story: "The mentorship program connected me with experienced entrepreneurs who helped me scale my textile business.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Adama Diallo",
    location: "Accra, Ghana",
    story: "I now employ 10 women in my community, all thanks to the skills I gained from Kuza Dada's training programs.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export default function KuzaDadaPage() {
  const videoUrl = process.env.NEXT_PUBLIC_KUZADADA_VIDEO_URL;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Video/Image */}
            <button
              type="button"
              onClick={() => {
                if (videoUrl) {
                  window.open(videoUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className="relative h-[400px] bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl overflow-hidden group cursor-pointer w-full text-left"
              aria-label="Play Kuza Dada video"
            >
              <img
                src={kuzaDadaImage}
                alt="Kuza Dada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#177F00]/30 to-[#E99C00]/30 flex items-center justify-center group-hover:from-[#177F00]/40 group-hover:to-[#E99C00]/40 transition-colors">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="h-10 w-10 text-[#177F00] ml-1" />
                </div>
              </div>
            </button>

            {/* Right: Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
                Kuza Dada
              </h1>
              <p className="text-2xl text-gray-700">
                Building a new wave of women entrepreneurs across Africa
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kuza Dada, the non-profit arm of Kuleta, is dedicated to empowering African women
                through entrepreneurship training, mentorship, and direct market access. We believe
                every woman has the potential to build a thriving business and transform her
                community.
              </p>
              <Link href="/get-involved">
                <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To empower African women with the skills, resources, and opportunities they need to
              build successful businesses, create economic independence, and drive positive change
              in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4">
                  <program.icon className="h-8 w-8 text-[#177F00]" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-gradient-to-r from-[#177F00] to-[#E99C00]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {impact.map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.name}
                className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{story.name}</h3>
                  <p className="text-sm text-[#177F00] mb-3">{story.location}</p>
                  <p className="text-gray-700 italic">&quot;{story.story}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-6">Get Involved</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join us in empowering the next generation of African women entrepreneurs. Whether
              you want to participate in our programs, become a mentor, or support our mission,
              there&apos;s a place for you in the Kuza Dada community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-involved">
                <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
