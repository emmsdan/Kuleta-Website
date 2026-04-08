import Link from "next/link";
import { getCollection, getSingleton } from "@/lib/cms";

export default async function FAQPage() {
  const [faqPage, faqItems, siteConfig, contactCards] = await Promise.all([
    getSingleton<{ title?: string; subtitle?: string }>("faq.page", {}),
    getCollection("faq.items"),
    getSingleton<{ contactEmail?: string }>("site.config", {}),
    getCollection("contact.cards"),
  ]);

  const phoneCard = contactCards.find((item) => item.slug === "phone");
  const email = siteConfig.contactEmail || "info@kuleta.io";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">{faqPage.title || "Frequently Asked Questions"}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {faqPage.subtitle || "Find answers to common questions."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <details key={faq.id} open={index === 0} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900">
                  {index + 1}. {faq.title}
                </summary>
                <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.body}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-semibold text-center mb-3">Still have questions?</h3>
              <p className="text-gray-600 text-center mb-6">Our support team is always ready to help.</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a href={`mailto:${email}`} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Email Us</span>
                  <span className="text-sm text-gray-500">{email}</span>
                </a>
                <a href={phoneCard?.linkUrl || "#"} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium">Call Us</span>
                  <span className="text-sm text-gray-500">{phoneCard?.subtitle || ""}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Looking for something else?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/team" className="px-6 py-2 border border-[#177F00] text-[#177F00] rounded-full hover:bg-[#177F00] hover:text-white transition-colors">Meet Our Team</Link>
              <Link href="/" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:border-[#177F00] hover:text-[#177F00] transition-colors">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
