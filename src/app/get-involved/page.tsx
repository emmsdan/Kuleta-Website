"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Building, Mail, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readObjectArray, readStringArray } from "@/lib/cms/helpers";

type InterestOption = {
  value: string;
  label: string;
};

export default function GetInvolvedPage() {
  const [content, setContent] = useState<{
    title?: string;
    subtitle?: string;
    successMessage?: string;
    privacyMessage?: string;
    expectationTitle?: string;
    expectations?: string[];
    interestOptions?: InterestOption[];
  }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    interest: "buyer",
  });

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/cms?key=get-involved.page", { cache: "no-store" });
      const data = await response.json();
      setContent(data.value || {});
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(content.successMessage || "Thank you for joining our waitlist!");
    setFormData({ name: "", email: "", company: "", location: "", interest: "buyer" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const interestOptions = readObjectArray<InterestOption>(content.interestOptions).filter(
    (option) => Boolean(option.value && option.label)
  );
  const expectations = readStringArray(content.expectations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#177F00]/10 via-white to-[#E99C00]/10">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl mb-4">{content.title || "Join Our Community"}</h1>
              <p className="text-gray-600 text-lg">{content.subtitle}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-11"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-11"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-11"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-11"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    How would you like to get involved?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#177F00] focus:border-transparent"
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white py-6 text-lg"
                >
                  Get Involved
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4 text-center">{content.expectationTitle || "What to Expect:"}</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {expectations.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#177F00] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">{content.privacyMessage}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
