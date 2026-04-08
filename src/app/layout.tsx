import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Kuleta — Bringing the local African Market to the world",
  description:
    "Shop authentic African products. Kuleta connects you directly with women-led businesses across the continent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
