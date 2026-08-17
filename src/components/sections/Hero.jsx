import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Image } from "@/components/ui/image";

const stats = [
  { value: "22+", label: "Years Experience" },
  { value: "350+", label: "Vehicles Wrapped" },
  { value: "90%+", label: "Satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg"
          alt="SIGNAD vehicle graphics showcase"
          className="w-full h-full object-cover opacity-80"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-56 pb-16 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F39C12]/15 border border-[#F39C12]/30 mb-6">
            <Star className="w-3.5 h-3.5 text-[#F39C12] fill-[#F39C12]" />
            <span className="text-[#F39C12] text-xs font-semibold tracking-[0.2em] uppercase">
              Premium Vehicle Graphics Since 2004
            </span>
          </div>

          <div className="flex flex-col items-start">
            <Image
              src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/499a71044_n.JPG"
              alt="SIGNAD"
              className="w-[504px] sm:w-[756px] select-none"
              fittingType="fit"
            />
          </div>

          <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
            Expert vehicle wraps, graphics, and signage solutions tailored to your vision. Quality craftsmanship you can trust.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] transition-all hover:shadow-[0_8px_30px_rgba(243,156,18,0.35)]"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-white/10 text-white font-semibold border border-white/20 backdrop-blur hover:bg-white/20 transition-colors"
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}