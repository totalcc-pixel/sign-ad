import React, { useState, useEffect } from "react";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    src: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg",
    label: "Plain White Van",
    badgeClass: "bg-black/70 backdrop-blur text-white border border-white/10"
  },
  {
    src: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg",
    label: "Branded SIGN AD Vehicle",
    badgeClass: "bg-[#F39C12] text-black"
  }
];

export default function VanSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[460px]">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              className="w-full h-full"
              fittingType="fill"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Label bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-500 ${index === 0 ? SLIDES[0].badgeClass : "opacity-40 bg-black/70 text-white"}`}>
          Plain White Van
        </span>
        <ArrowRight className="w-5 h-5 text-[#F39C12]" />
        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-500 ${index === 1 ? SLIDES[1].badgeClass : "opacity-40 bg-black/70 text-white"}`}>
          Branded SIGN AD Vehicle
        </span>
      </div>

      {/* Progress dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-[#F39C12]" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}