import { Linkedin } from "lucide-react";

interface Advisor {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export function AdvisoryBoardPage() {
  const advisors: Advisor[] = [
    {
      name: "Therese Kayikwamba Wagner",
      title: "Minister of Foreign Affairs",
      company: "Democratic Republic of the Congo",
      bio: "Therese brings deep diplomatic, policy, and economic development experience with a focus on Africa's global engagement. Her leadership includes high-level international cooperation, trade, and investment advocacy, making her a key strategic voice on Africa-U.S. relations.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGEbm0TFuhbVg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702822237302?e=1770854400&v=beta&t=Q06scLJV14jC9T9Oonk2mSsW7kaeGh9YecUlO7_onmg",
      linkedin: "#",
    },
    {
      name: "Kenneth Asher",
      title: "President",
      company: "Kasher Capital",
      bio: "Kenneth's expertise spans venture finance, impact investing, and growth-stage advisory. With a strong background in social enterprise acceleration, he helps Kuleta align business models with investor-ready financial frameworks and measurable social impact.",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGVVERU5Q4fgQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1608269362196?e=1770854400&v=beta&t=IMYAIHkfDtzjd_lbV1CykP28-ThAyN2aaFxDDA779lI",
      linkedin: "#",
    },
    {
      name: "Eric Mboma",
      title: "CEO",
      company: "EFGH Bank - Africa",
      bio: "With 20+ years of leadership across global financial and strategic growth operations in America, Europe, Asia, and Africa, Eric is a proven steward of value creation and organizational transformation. He also actively supports initiatives in healthcare and education for vulnerable communities.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEs3H_IQb446g/profile-displayphoto-crop_800_800/B4DZsUAij7H4AI-/0/1765567246188?e=1770854400&v=beta&t=3Fr1D67NV-nzxlBlqxJ3IMdjIC4yzdcNipxlIosurBI",
      linkedin: "#",
    },
    {
      name: "Ashveena Gajeelee",
      title: "Founder and CEO",
      company: "Veritas Quest",
      bio: "Ashveena has extensive experience in international development, ESG strategy, and sustainable trade. Her insight into global development policy and inclusive growth ensures Kuleta remains aligned with global ESG trends and development goals.",
      image: "https://beed.global/wp-content/uploads/2024/09/ashveena-gajeelee-1024x1024.jpg",
      linkedin: "#",
    },
    {
      name: "Chris Folayan",
      title: "Entrepreneur",
      company: "",
      bio: "A seasoned founder and investor, Chris built and scaled MallforAfrica to become one of the continent's most recognizable cross-border e-commerce platforms. Now advising Kuleta, he brings firsthand insights into African marketplace growth, logistics, and scalability strategies.",
      image: "https://media.licdn.com/dms/image/v2/D5603AQE7lqHaYe_q6Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695189235268?e=1770854400&v=beta&t=CxLVMJyZnXJ5dT9rAb9TrZdwZAskytRyx9s7bewmb-A",
      linkedin: "#",
    },
    {
      name: "Nenye Njoku",
      title: "Project Manager",
      company: "US Pharmacopeia",
      bio: "PMI-certified project management leader with 12+ years of experience managing global health and sustainable infrastructure programs. Proven track record of driving operational excellence and managing donor-funded portfolios. Recognized for cultivating cross-sector partnerships that strengthen health systems across Africa, Asia, and the Pacific. A trusted collaborator with executive leadership, governments, and international organizations; fluent in English with professional proficiency in French.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHycKRz3fBM9A/profile-displayphoto-crop_800_800/B4EZnlkYWSGYAI-/0/1760493144274?e=1770854400&v=beta&t=bFEV5h4_ZiMwmWSaXu0IK0fJu-FXM4t8lTaY8a2i-xQ",
      linkedin: "#",
    },
  ];

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
                  <img
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
                    <a
                      href={advisor.linkedin}
                      className="inline-flex items-center gap-2 text-sm text-[#177F00] hover:text-[#E99C00] transition-colors"
                      aria-label={`${advisor.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Connect</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-block max-w-3xl">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "Our advisory board represents decades of combined experience in finance, international trade, diplomacy, and sustainable development. Their strategic guidance ensures Kuleta remains committed to empowering African women entrepreneurs while building bridges between continents."
              </p>
              <p className="mt-6 text-gray-600">
                — Kuleta Leadership Team
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}