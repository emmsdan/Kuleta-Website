import { useState } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is Kuleta?",
      answer: "Kuleta is an online marketplace that connects U.S. customers with women vendors of non-perishable goods that are authentic and sourced directly from the African continent. Our platform offers a curated selection of items ranging from fashion and home decor to authentic spices and teas, allowing shoppers to discover and support women vendors while connecting with their local African market.",
    },
    {
      question: "How are products priced?",
      answer: "Product prices on Kuleta are determined by the sellers, who set their own prices based on factors such as materials, craftsmanship, and market demand. We strive to ensure fair pricing for both customers and sellers, allowing women vendors to earn a sustainable income while providing customers with access to authentic and fairly priced African goods.",
    },
    {
      question: "How do I list my products on Kuleta?",
      answer: "If you're interested in selling your products on Kuleta, you can reach out to our team at info@kuleta.io and we will be in touch with you.",
    },
    {
      question: "What happens after I purchase a product?",
      answer: "After purchasing a product on Kuleta, you will receive an order confirmation email containing details about your purchase, including the items ordered, total cost, estimated delivery date, and tracking information.",
    },
    {
      question: "How can I track my purchase?",
      answer: "Once your order has been shipped, you will receive a shipping confirmation email with tracking information. You can use this information to track the status of your package and monitor its progress as it makes its way to you.",
    },
    {
      question: "How long does shipment usually take?",
      answer: "Shipping times vary depending on the seller's location, the destination of the package, and the shipping method selected at checkout. Generally, orders are processed and shipped within 1-3 business days, with delivery times ranging from 5-7 business days from shipping date.",
    },
    {
      question: "Can I refund an order?",
      answer: "Kuleta offers refunds for damaged or defective products in accordance with our refund policy. If you receive a damaged or defective item, please contact our customer support team within 7 days of receiving your order to initiate the refund process.",
    },
    {
      question: "My item has arrived, but I can't find it",
      answer: "If your item has been marked as delivered but you are unable to locate it, we recommend checking with neighbors, building management, and reach out to us to ensure your package was left in a secure location or held for pickup. If you are still unable to locate your package, please contact our customer support team for further assistance.",
    },
    {
      question: "Who do I contact for support?",
      answer: "For any questions, concerns, or assistance with your order, please contact Kuleta customer support via email at info@kuleta.io or by phone at +1 (502)319-2096. Our dedicated support team is here to help and ensure that you have a positive shopping experience with us.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find answers to common questions about Kuleta, our products, shipping, and more.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {index + 1}. {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#177F00] flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-semibold text-center mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Our support team is always ready to help you with any inquiries.
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a
                  href="mailto:info@kuleta.io"
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full">
                    <Mail className="h-6 w-6 text-[#177F00]" />
                  </div>
                  <span className="font-medium">Email Us</span>
                  <span className="text-sm text-gray-500">info@kuleta.io</span>
                </a>
                <a
                  href="tel:+15023192096"
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full">
                    <Phone className="h-6 w-6 text-[#177F00]" />
                  </div>
                  <span className="font-medium">Call Us</span>
                  <span className="text-sm text-gray-500">+1 (502)319-2096</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Looking for something else?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/waitlist"
                className="px-6 py-2 bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white rounded-full hover:shadow-lg transition-shadow"
              >
                Join Waitlist
              </a>
              <a
                href="/team"
                className="px-6 py-2 border border-[#177F00] text-[#177F00] rounded-full hover:bg-[#177F00] hover:text-white transition-colors"
              >
                Meet Our Team
              </a>
              <a
                href="/"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:border-[#177F00] hover:text-[#177F00] transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}