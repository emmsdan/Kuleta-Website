import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for contacting us! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@kuleta.io",
      description: "Send us an email anytime",
      link: "mailto:info@kuleta.io",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (502)319-2096",
      description: "Mon-Fri from 9am to 6pm CST",
      link: "tel:+15023192096",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "1130 South Canal Street, #1591 Chicago, IL 60607",
      description: "Visit our headquarters",
      link: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM CST",
      description: "We're here to help",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600">
              Have a question or want to learn more about Kuleta? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.link}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full mb-4 group-hover:from-[#177F00]/20 group-hover:to-[#E99C00]/20 transition-colors">
                  <info.icon className="h-6 w-6 text-[#177F00]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                <p className="text-gray-900 mb-1">{info.details}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </a>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-3xl font-semibold mb-6">Send Us a Message</h2>
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
                    <option value="general">General Inquiry</option>
                    <option value="vendor">Become a Vendor</option>
                    <option value="order">Order Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
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

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="rounded-2xl h-64 overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.7346729171893!2d-87.64153892346498!3d41.86973297124021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cb9c4f4f4f5%3A0x4b4b4b4b4b4b4b4b!2s1130%20S%20Canal%20St%2C%20Chicago%2C%20IL%2060607!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kuleta Inc Office Location"
                ></iframe>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
                <p className="text-gray-600 mb-6">
                  Looking for quick answers? Check out our FAQ section for common questions about
                  orders, shipping, and more.
                </p>
                <a
                  href="/faq"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#177F00] to-[#E99C00] text-white rounded-full hover:shadow-lg transition-shadow"
                >
                  Visit FAQ
                </a>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for updates, new products, and community
                  stories.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full hover:from-[#177F00]/20 hover:to-[#E99C00]/20 transition-colors"
                  >
                    <svg className="h-6 w-6 text-[#177F00]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full hover:from-[#177F00]/20 hover:to-[#E99C00]/20 transition-colors"
                  >
                    <svg className="h-6 w-6 text-[#177F00]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                      <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gradient-to-r from-[#177F00]/10 to-[#E99C00]/10 rounded-full hover:from-[#177F00]/20 hover:to-[#E99C00]/20 transition-colors"
                  >
                    <svg className="h-6 w-6 text-[#177F00]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
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