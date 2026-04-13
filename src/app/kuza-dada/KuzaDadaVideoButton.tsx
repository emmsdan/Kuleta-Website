"use client";

export default function KuzaDadaVideoButton({ videoUrl, heroImage }: { videoUrl?: string; heroImage?: string }) {
  return (
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
      <img src={heroImage || ""} alt="Kuza Dada" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#177F00]/30 to-[#E99C00]/30 flex items-center justify-center group-hover:from-[#177F00]/40 group-hover:to-[#E99C00]/40 transition-colors">
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          {/* @ts-ignore */}
          <svg className="h-10 w-10 text-[#177F00] ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
    </button>
  );
}
