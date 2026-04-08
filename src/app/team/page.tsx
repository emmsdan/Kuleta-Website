import { Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const amaraImage = "/assets/f023eede0d58ad39ef886df4299294f1c3e4312c.png";
const judithImage = "/assets/4279e38172a19781e32b3d1f3a65bdbe7652f897.png";
const olanikeImage = "/assets/4b34ba07de50be7b560ee8392808eb7f2d76cb2f.png";
const nabilaImage = "/assets/cf177e722a650ccf5451db513c3a0761bb79a899.png";
const yusufImage = "/assets/aeea507adca44462f8989b624b16f88b3e856282.png";
const ximenaImage = "/assets/081f0117dce9c6a10008a481f034134e7a2a02e9.png";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Manda Bwerevu",
    title: "Co-Founder & CEO",
    bio: "Leads Kuleta's vision and strategy with experience across global supply chains, public policy, and entrepreneurship. Graduate of Harvard and University of Chicago, focused on building scalable platforms that solve real consumer pain points.",
    image: amaraImage,
    linkedin: "https://www.linkedin.com/in/manda-bwerevu/",
    email: "manda@kuleta.io",
  },
  {
    name: "Judith Nguli",
    title: "Co-Founder & COO",
    bio: "Leads operations, vendor partnerships, and program execution. Born in Kenya with over a decade of experience in finance, public policy, and enterprise development. Holds a PhD in Finance and Master's in Banking, focused on operational excellence and vendor enablement.",
    image: judithImage,
    linkedin: "https://www.linkedin.com/in/judith-nguli/",
    email: "judith@kuleta.io",
  },
  {
    name: "Olanike Ajayi",
    title: "Project Manager",
    bio: "Seasoned project manager translating user needs into product solutions, with a Master's in Public Policy from University of Chicago, focused on tech-enabled social impact in underserved communities.",
    image: olanikeImage,
    linkedin: "https://www.linkedin.com/in/olanike-ajayi/",
    email: "olanike@kuleta.io",
  },
  {
    name: "Nabila Ben Shaban",
    title: "Social Media Manager",
    bio: "International Relations specialist with expertise in diplomacy and foreign policy, serving as Chair of the Arab Community and PR representative for Young Diplomats Forum. Fluent in Arabic and English, passionate about bridging cultural divides and youth empowerment through effective cross-cultural communication.",
    image: nabilaImage,
    linkedin: "https://www.linkedin.com/in/nabila-ben-shaban/",
    email: "nabila@kuleta.io",
  },
  {
    name: "Yusuf Barre",
    title: "Development Lead",
    bio: "International relations and public relations professional, certified mediator, and Protocol Officer at the Somali Embassy in Nairobi. Leads development initiatives at Kuleta while driving youth empowerment and peace-building efforts as Pillar Lead for Youth, Peace, and Security at Ubuntu Justice and Peace Nexus. Committed to leveraging diplomacy and strategic communication for sustainable impact.",
    image: yusufImage,
    linkedin: "https://www.linkedin.com/in/yusuf-barre/",
    email: "yusuf@kuleta.io",
  },
  {
    name: "Ximena Valenzuela",
    title: "Kuza Dada Advisor",
    bio: "Lawyer and public policy advisor with over 10 years in public-private partnerships and regulatory reform. Master in Public Policy from University of Chicago, Obama Foundation Scholar, and co-founder of Kuza Dada (Kenya). Committed to advancing equitable development through education and women's economic empowerment, bridging public policy, law, and social innovation for historically excluded communities.",
    image: ximenaImage,
    linkedin: "https://www.linkedin.com/in/ximena-valenzuela/",
    email: "ximena@kuleta.io",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Meet The Team</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our passionate team is dedicated to revolutionizing African commerce and connecting
              businesses with customers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gradient-to-r from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100 transition-colors" aria-label={`${member.name}'s LinkedIn`}>
                        <Linkedin className="w-5 h-5 text-[#177F00]" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-gradient-to-r from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100 transition-colors" aria-label={`Email ${member.name}`}>
                        <Mail className="w-5 h-5 text-[#177F00]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
