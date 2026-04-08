import { Linkedin } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const thereseImage = "/assets/images/therese-kayikwamba-wagner.png";
const kennethAsherImage = "/assets/images/kenneth-asher.png";
const ericMbomaImage = "/assets/images/eric-mboma.png";
const ashveenaGajeeleeImage = "/assets/images/ashveena-gajeelee.png";
const chrisFolayanImage = "/assets/images/chris-folayan.png";

interface Advisor {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  linkedin?: string;
}

const advisors: Advisor[] = [
  {
    name: "Therese Kayikwamba Wagner",
    title: "Minister of Foreign Affairs",
    company: "Democratic Republic of the Congo",
    bio: "Therese brings deep diplomatic, policy, and economic development experience with a focus on Africa's global engagement. Her leadership includes high-level international cooperation, trade, and investment advocacy, making her a key strategic voice on Africa-U.S. relations.",
    image: thereseImage,
    linkedin: "https://www.linkedin.com/in/therese-kayikwamba-wagner/",
  },
  {
    name: "Kenneth Asher",
    title: "President",
    company: "Kasher Capital",
    bio: "Kenneth's expertise spans venture finance, impact investing, and growth-stage advisory. With a strong background in social enterprise acceleration, he helps Kuleta align business models with investor-ready financial frameworks and measurable social impact.",
    image: kennethAsherImage,
    linkedin: "https://www.linkedin.com/in/kenneth-asher/",
  },
  {
    name: "Eric Mboma",
    title: "CEO",
    company: "EFGH Bank - Africa",
    bio: "With 20+ years of leadership across global financial and strategic growth operations in America, Europe, Asia, and Africa, Eric is a proven steward of value creation and organizational transformation. He also actively supports initiatives in healthcare and education for vulnerable communities.",
    image: ericMbomaImage,
    linkedin: "https://www.linkedin.com/in/eric-mboma/",
  },
  {
    name: "Ashveena Gajeelee",
    title: "Founder and CEO",
    company: "Veritas Quest",
    bio: "Ashveena has extensive experience in international development, ESG strategy, and sustainable trade. Her insight into global development policy and inclusive growth ensures Kuleta remains aligned with global ESG trends and development goals.",
    image: ashveenaGajeeleeImage,
    linkedin: "https://www.linkedin.com/in/agajeelee/",
  },
  {
    name: "Chris Folayan",
    title: "Entrepreneur",
    company: "",
    bio: "A seasoned founder and investor, Chris built and scaled MallforAfrica to become one of the continent's most recognizable cross-border e-commerce platforms. Now advising Kuleta, he brings firsthand insights into African marketplace growth, logistics, and scalability strategies.",
    image: chrisFolayanImage,
    linkedin: "https://www.linkedin.com/in/chris-folayan/",
  },
  {
    name: "Nenye Njoku",
    title: "Project Manager",
    company: "US Pharmacopeia",
    bio: "PMI-certified project management leader with 12+ years of experience managing global health and sustainable infrastructure programs. Proven track record of driving operational excellence and managing donor-funded portfolios. Recognized for cultivating cross-sector partnerships that strengthen health systems across Africa, Asia, and the Pacific. A trusted collaborator with executive leadership, governments, and international organizations; fluent in English with professional proficiency in French.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHycKRz3fBM9A/profile-displayphoto-crop_800_800/B4EZnlkYWSGYAI-/0/1760493144274?e=1770854400&v=beta&t=bFEV5h4_ZiMwmWSaXu0IK0fJu-FXM4t8lTaY8a2i-xQ",
    linkedin: "https://www.linkedin.com/in/nenye-njoku-msc-pmp-74455054/",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Advisory Board</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              World-class advisors guiding our mission to transform African commerce and create
              lasting impact across the continent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{advisor.name}</h3>
                  <p className="text-sm font-medium text-[#177F00] mb-1">{advisor.title}</p>
                  <p className="text-sm text-gray-500 mb-3">{advisor.company}</p>
                  <p className="text-gray-600 text-sm mb-4">{advisor.bio}</p>
                  {advisor.linkedin && (
                    <a href={advisor.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#177F00] hover:text-[#E99C00] transition-colors" aria-label={`${advisor.name} LinkedIn`}>
                      <Linkedin className="w-5 h-5" />
                      <span>Connect</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block max-w-3xl">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                &quot;Our advisory board represents decades of combined experience in finance, international trade, diplomacy, and sustainable development. Their strategic guidance ensures Kuleta remains committed to empowering African women entrepreneurs while building bridges between continents.&quot;
              </p>
              <p className="mt-6 text-gray-600">— Kuleta Leadership Team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
