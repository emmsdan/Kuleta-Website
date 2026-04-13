import { Clock, DollarSign, Globe, Heart, Key, Target } from "lucide-react";
import { getCollection, getSingleton } from "@/lib/cms";
import { readStringArray } from "@/lib/cms/helpers";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const iconMap = {
  globe: Globe,
  key: Key,
  target: Target,
  clock: Clock,
  dollarSign: DollarSign,
  heart: Heart,
} as const;

export default async function AboutPage() {
  const [about, story, values, stats, founders] = await Promise.all([
    getSingleton<{
      heroTitle?: string;
      heroSubtitle?: string;
      missionTitle?: string;
      missionText?: string;
      visionTitle?: string;
      visionText?: string;
      ctaTitle?: string;
      ctaText?: string;
      ctaLabel?: string;
      ctaLink?: string;
    }>("about.page", {}),
    getSingleton<{ heading?: string; paragraphs?: string[] }>("about.story", {}),
    getCollection("about.values"),
    getCollection("about.stats"),
    getCollection("about.founders"),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
            {about.heroTitle || "About Kuleta"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {about.heroSubtitle || "Connecting the vibrant markets of Africa with the world."}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent mb-8">
            {story.heading || "Our Story"}
          </h2>
          <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
            {readStringArray(story.paragraphs).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <h3 className="text-3xl font-semibold text-center mt-16 mb-8 text-gray-800">
            Meet Our Co-Founders
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder) => (
              <div key={founder.id} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                <div className="flex flex-col items-center text-center mb-6">
                  <ImageWithFallback
                    src={founder.imageUrl || ""}
                    alt={founder.title}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#177F00] mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">{founder.title}</h3>
                  <div className="inline-block bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
                    {founder.subtitle}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{founder.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#177F00]">
                {about.missionTitle || "Our Mission"}
              </h3>
              <p className="text-gray-700 leading-relaxed">{about.missionText}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#E99C00]">
                {about.visionTitle || "Our Vision"}
              </h3>
              <p className="text-gray-700 leading-relaxed">{about.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => {
              const iconName = ((value.metadata as { icon?: keyof typeof iconMap } | null)?.icon ||
                "heart") as keyof typeof iconMap;
              const Icon = iconMap[iconName] || Heart;

              return (
                <div key={value.id} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="inline-flex p-4 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-[#177F00]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#177F00] to-[#E99C00]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.id}>
                <div className="text-5xl font-bold mb-2">{stat.title}</div>
                <div className="text-lg opacity-90">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-6">{about.ctaTitle || "Join Our Journey"}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{about.ctaText}</p>
          <a
            href={about.ctaLink || "https://dev-preview-1025.kuleta.io"}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white rounded-full hover:shadow-lg transition-shadow"
          >
            {about.ctaLabel || "Start Shopping"}
          </a>
        </div>
      </section>
    </div>
  );
}
