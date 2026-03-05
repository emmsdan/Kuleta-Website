import { Button } from "@/app/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import kuzaDadaImage from "@/assets/29d4542c8b108e0389991c23b1a793f7d500fb00.png";

export function KuzaDada() {
  const videoUrl = import.meta.env.VITE_KUZADADA_VIDEO_URL;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Video Placeholder */}
          <button
            type="button"
            onClick={() => {
              if (videoUrl) {
                window.open(videoUrl, "_blank", "noopener,noreferrer");
              }
            }}
            className="relative h-[400px] bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl overflow-hidden group cursor-pointer w-full text-left"
            aria-label="Play Kuza Dada video"
          >
            <img
              src={kuzaDadaImage}
              alt="Kuza Dada"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#177F00]/30 to-[#E99C00]/30 flex items-center justify-center group-hover:from-[#177F00]/40 group-hover:to-[#E99C00]/40 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="h-8 w-8 text-[#177F00] ml-1" />
              </div>
            </div>
          </button>

          {/* Right: Kuza Dada Info */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent">Kuza Dada</h2>
            <p className="text-lg text-gray-700">
              Kuza Dada, the non-profit arm of Kuleta is building a new wave of women entrepreneurs
            </p>
            <Link to="/kuza-dada">
              <Button className="bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}