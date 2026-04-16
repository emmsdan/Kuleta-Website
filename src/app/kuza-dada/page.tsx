export const dynamic = "force-dynamic";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCollection, getSingleton } from "@/lib/cms";

const iconMap = {
  award: Award,
  bookOpen: BookOpen,
  users: Users,
  trendingUp: TrendingUp,
} as const;

export default async function KuzaDadaPage() {
  const [kuzaPage, programs, impact, stories] = await Promise.all([
    getSingleton<{
      heroTitle?: string;
      heroSubtitle?: string;
      heroBody?: string;
      heroImage?: string;
      videoUrl?: string;
      missionTitle?: string;
      missionBody?: string;
      getInvolvedTitle?: string;
      getInvolvedBody?: string;
      getInvolvedLabel?: string;
    }>("kuza.page", {}),
    getCollection("kuza.programs"),
    getCollection("kuza.impact"),
    getCollection("kuza.stories"),
  ]);


  const KuzaDadaVideoButtonWrapper = (await import("./KuzaDadaVideoButtonWrapper")).default;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <KuzaDadaVideoButtonWrapper videoUrl={kuzaPage.videoUrl} heroImage={kuzaPage.heroImage} />
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
                {kuzaPage.heroTitle || "Kuza Dada"}
              </h1>
              <p className="text-2xl text-gray-700">{kuzaPage.heroSubtitle}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{kuzaPage.heroBody}</p>
              <Link href="/get-involved">
                <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                  {kuzaPage.getInvolvedLabel || "Get Involved"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
              {kuzaPage.missionTitle || "Our Mission"}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">{kuzaPage.missionBody}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program) => {
              const iconName =
                ((program.metadata as { icon?: keyof typeof iconMap } | null)?.icon as
                  | keyof typeof iconMap
                  | undefined) || "users";
              const Icon = iconMap[iconName] || Users;

              return (
                <div
                  key={program.id}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex p-4 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-[#177F00]" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{program.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#177F00] to-[#E99C00]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {impact.map((stat) => (
              <div key={stat.id}>
                <div className="text-5xl font-bold mb-2">{stat.title}</div>
                <div className="text-lg opacity-90">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img src={story.imageUrl || ""} alt={story.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
                  <p className="text-sm text-[#177F00] mb-3">{story.subtitle}</p>
                  <p className="text-gray-700 italic">&quot;{story.body}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl mb-6">{kuzaPage.getInvolvedTitle || "Get Involved"}</h2>
          <p className="text-lg text-gray-600 mb-8">{kuzaPage.getInvolvedBody}</p>
          <Link href="/get-involved">
            <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
              {kuzaPage.getInvolvedLabel || "Get Involved"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
