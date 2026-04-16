export const dynamic = "force-dynamic";
import { Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { getCollection, getSingleton } from "@/lib/cms";

export default async function TeamPage() {
  const [teamPage, teamMembers] = await Promise.all([
    getSingleton<{ title?: string; subtitle?: string }>("team.page", {}),
    getCollection("team.members"),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">{teamPage.title || "Meet The Team"}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {teamPage.subtitle || "Our passionate team is dedicated to our mission."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member) => {
              const metadata = (member.metadata as { email?: string } | null) || {};

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={member.imageUrl || ""}
                      alt={member.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.title}</h3>
                    <p className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent font-medium mb-3">
                      {member.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">{member.body}</p>
                    <div className="flex gap-3">
                      {member.linkUrl ? (
                        <a href={member.linkUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gradient-to-r from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100 transition-colors" aria-label={`${member.title} LinkedIn`}>
                          <Linkedin className="w-5 h-5 text-[#177F00]" />
                        </a>
                      ) : null}
                      {metadata.email ? (
                        <a href={`mailto:${metadata.email}`} className="p-2 rounded-full bg-gradient-to-r from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100 transition-colors" aria-label={`Email ${member.title}`}>
                          <Mail className="w-5 h-5 text-[#177F00]" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
