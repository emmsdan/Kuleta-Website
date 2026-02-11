import { Quote } from "lucide-react";

export function CustomerReview() {
  return (
    <section className="bg-gradient-to-r from-[#177F00] to-[#E99C00] py-20 relative overflow-hidden">
      {/* Animated Gradient Circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute left-0 top-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Quote className="h-12 w-12 mx-auto mb-6 text-white/80" />
          <blockquote className="text-2xl md:text-3xl mb-6 leading-relaxed">
            "Kuleta has transformed how I access authentic African products. The quality is exceptional and shipping is always reliable. I feel connected to my roots with every purchase!"
          </blockquote>
          <div className="space-y-1">
            <p className="text-xl font-semibold text-white mb-1">Kuleta Customer</p>
          </div>
        </div>
      </div>
    </section>
  );
}