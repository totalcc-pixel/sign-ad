import React from "react";
import { ArrowRight } from "lucide-react";

const VIDEO_URL = "https://media.base44.com/videos/public/6a67d1169c557b33993d409b/7168bef1c_before.mp4";

export default function VanSlideshow() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[460px]">
        <video
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Label bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-bold border border-white/10">
          Plain White Van
        </span>
        <ArrowRight className="w-5 h-5 text-[#F39C12]" />
        <span className="px-3 py-1.5 rounded-lg bg-[#F39C12] text-black text-xs font-bold">
          Branded SIGN AD Vehicle
        </span>
      </div>
    </div>
  );
}