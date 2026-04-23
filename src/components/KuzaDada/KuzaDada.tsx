"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

interface KuzaDadaProps {
  imageUrl: string;
  title: string;
  description: string;
  buttonLabel: string;
  videoUrl?: string;
}
  const KuzaDadaVideoButtonWrapper = (await import("@/components/KuzaDada/KuzaDadaVideoButtonWrapper")).default;

export function KuzaDada({ imageUrl, title, description, buttonLabel, videoUrl }: KuzaDadaProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Video Placeholder */}
          
            <KuzaDadaVideoButtonWrapper videoUrl={videoUrl} heroImage={imageUrl} />

          {/* Right: Kuza Dada Info */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">{title}</h2>
            <p className="text-lg text-gray-700">
              {description}
            </p>
            <Link href="/kuza-dada">
              <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                {buttonLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}