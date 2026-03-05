import { Button } from "@/app/components/ui/button";

interface RegionCardProps {
  region: string;
  image: string;
  onClick: () => void;
  comingSoon?: boolean;
}

export function RegionCard({ region, image, onClick, comingSoon }: RegionCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-[#177F00] transition-all group min-w-[250px]">
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={region}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#177F00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {comingSoon && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#177F00] text-white text-center py-2 text-sm font-semibold">
            Coming Soon
          </div>
        )}
      </div>
      <h3 className="text-2xl bg-gradient-to-r from-[#177F00] to-[#E99C00] bg-clip-text text-transparent mb-4">{region}</h3>
      <Button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-[#177F00] to-[#E99C00] hover:from-[#177F00]/90 hover:to-[#E99C00]/90 text-white transition-all"
      >
        Shop now
      </Button>
    </div>
  );
}