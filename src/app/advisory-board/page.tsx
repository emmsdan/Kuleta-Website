export const dynamic = "force-dynamic";
import { Linkedin } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { getCollection, getSingleton } from "@/lib/cms";

export default async function AdvisoryBoardPage() {
  const [advisoryPage, advisors] = await Promise.all([
    getSingleton<{ title?: string; subtitle?: string; quote?: string; quoteAuthor?: string }>(
      "advisory.page",
      {}
    ),
    getCollection("advisory.members"),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">{advisoryPage.title || "Advisory Board"}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{advisoryPage.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {advisors.map((advisor) => {
              const metadata = (advisor.metadata as { company?: string } | null) || {};

              return (
                <div
                  key={advisor.id}
                  className="bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={advisor.imageUrl || ""}
                      alt={advisor.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-1">{advisor.title}</h3>
                    <p className="text-sm font-medium text-[#177F00] mb-1">{advisor.subtitle}</p>
                    <p className="text-sm text-gray-500 mb-3">{metadata.company || ""}</p>
                    <p className="text-gray-600 text-sm mb-4">{advisor.body}</p>
                    {advisor.linkUrl ? (
                      <a href={advisor.linkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#177F00] hover:text-[#E99C00] transition-colors" aria-label={`${advisor.title} LinkedIn`}>
                        <Linkedin className="w-5 h-5" />
                        <span>Connect</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block max-w-3xl">
              <p className="text-lg text-gray-700 leading-relaxed italic">&quot;{advisoryPage.quote}&quot;</p>
              <p className="mt-6 text-gray-600">- {advisoryPage.quoteAuthor || "Kuleta Leadership Team"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
