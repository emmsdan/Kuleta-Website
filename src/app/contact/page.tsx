"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readObjectArray } from "@/lib/cms/helpers";

type ContactCard = {
  id: string;
  title: string;
  subtitle?: string | null;
  body?: string | null;
  linkUrl?: string | null;
  metadata?: unknown;
};

const iconMap = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  clock: Clock,
} as const;

export default function ContactPage() {
  const [content, setContent] = useState<{
    heroTitle?: string;
    heroSubtitle?: string;
    formTitle?: string;
    formSuccessMessage?: string;
    mapEmbedUrl?: string;
    faqTitle?: string;
    faqDescription?: string;
    socialTitle?: string;
    socialDescription?: string;
    subjectOptions?: string[];
  }>({});
  const [siteConfig, setSiteConfig] = useState<{
    contactEmail?: string;
    socials?: { linkedin?: string; instagram?: string };
  }>({});
  const [cards, setCards] = useState<ContactCard[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    void (async () => {
      const [contactRes, siteRes, cardsRes] = await Promise.all([
        fetch("/api/cms?key=contact.page", { cache: "no-store" }),
        fetch("/api/cms?key=site.config", { cache: "no-store" }),
        fetch("/api/cms?collection=contact.cards", { cache: "no-store" }),
      ]);

      const contactData = await contactRes.json();
      const siteData = await siteRes.json();
      const cardsData = await cardsRes.json();

      setContent(contactData.value || {});
      setSiteConfig(siteData.value || {});
      setCards(cardsData.items || []);
    })();
  }, []);

  const contactEmail = siteConfig.contactEmail || "info@kuleta.io";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject || "Contact form message");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    toast.success(content.formSuccessMessage || "Thank you for contacting us!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subjects = readObjectArray<string>(content.subjectOptions).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
              {content.heroTitle || "Get In Touch"}
            </h1>
            <p className="text-xl text-gray-600">{content.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cards.map((info) => {
              const iconName = ((info.metadata as { icon?: keyof typeof iconMap } | null)?.icon ||
                "mail") as keyof typeof iconMap;
              const Icon = iconMap[iconName] || Mail;

              return (
                <a
                  key={info.id}
                  href={info.linkUrl || "#"}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
                >
                  <div className="inline-flex p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4 group-hover:from-[#177F00]/20 group-hover:to-[#E99C00]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#177F00]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-gray-900 mb-1">{info.subtitle}</p>
                  <p className="text-sm text-gray-500">{info.body}</p>
                </a>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-3xl font-semibold mb-6">{content.formTitle || "Send Us a Message"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#177F00] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#177F00] focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white py-6 text-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl h-64 overflow-hidden border border-gray-200">
                <iframe
                  src={content.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kuleta Office Location"
                ></iframe>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">{content.faqTitle}</h3>
                <p className="text-gray-600 mb-6">{content.faqDescription}</p>
                <Link
                  href="/faq"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white rounded-full hover:shadow-lg transition-shadow"
                >
                  Visit FAQ
                </Link>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">{content.socialTitle}</h3>
                <p className="text-gray-600 mb-6">{content.socialDescription}</p>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.socials?.linkedin || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full hover:from-[#177F00]/20 hover:to-[#E99C00]/20 transition-colors"
                    aria-label="Kuleta LinkedIn"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.socials?.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full hover:from-[#177F00]/20 hover:to-[#E99C00]/20 transition-colors"
                    aria-label="Kuleta Instagram"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
