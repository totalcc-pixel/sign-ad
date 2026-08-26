import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Camera, Pencil, DollarSign, ArrowRight, ArrowDown, Phone } from "lucide-react";
import { Image } from "@/components/ui/image";
import SkyTowerIcon from "@/components/SkyTowerIcon";
import VanSlideshow from "@/components/sections/VanSlideshow";

const steps = [
{ icon: Camera, title: "Upload Your Vehicle", desc: "Upload a photo of your car, van, ute or truck." },
{ icon: Pencil, title: "Design It Free", desc: "Try your logo, colours and business details on your vehicle." },
{ icon: DollarSign, title: "Get Your Quote", desc: "Send your design to SIGN AD and receive a professional quote." }];


export default function Hero() {
  const quoteRef = useRef(null);

  const scrollToQuote = () => {
    quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-black pt-28 lg:pt-44 pb-16 lg:pb-24">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg"
            alt="SIGNAD vehicle graphics showcase"
            className="w-full h-full object-cover opacity-30"
            fittingType="fill" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT — Headline + CTAs */}
            <div>
              {/* Auckland badge */}
              <div className="inline-flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full bg-gradient-to-r from-[#F39C12]/25 via-[#F39C12]/12 to-transparent border-2 border-[#F39C12]/50 backdrop-blur-md shadow-[0_4px_30px_rgba(243,156,18,0.25)] mb-6">
                <SkyTowerIcon className="w-10 h-20 -my-8 drop-shadow-[0_0_8px_rgba(243,156,18,0.5)]" />
                <span className="text-white text-sm font-bold tracking-[0.05em]">Auckland · New Zealand</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F39C12] animate-pulse" />
              </div>

              <h1 className="font-display font-extrabold text-white leading-[1.05] text-5xl sm:text-6xl lg:text-7xl">
                <span className="block">DESIGN YOUR  </span>
                <span className="block text-[#F39C12]">VEHICLE —FREE</span>
              </h1>

              <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
                Upload your vehicle photo, try your design online, and see how your business could look on the road.
              </p>
              <p className="mt-2 text-sm text-white/50 font-medium">
                No commitment. No design experience needed.
              </p>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/my-design"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F39C12] text-black font-bold text-lg shadow-[0_8px_30px_rgba(243,156,18,0.4)] hover:shadow-[0_12px_40px_rgba(243,156,18,0.6)] hover:scale-[1.02] transition-all w-full sm:w-auto">
                  
                  START FREE DESIGN
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={scrollToQuote}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border-2 border-[#F39C12]/40 text-white font-bold text-lg hover:bg-white/15 hover:border-[#F39C12] transition-all w-full sm:w-auto">
                  
                  GET A QUICK QUOTE
                </button>
              </div>
            </div>

            {/* RIGHT — Vehicle image */}
            <div className="relative">
              <VanSlideshow />
            </div>
          </div>

          {/* ===== TRUST SECTION ===== */}
          <div className="mt-14 lg:mt-20 border-t border-white/10 pt-10 text-center">
            <h3 className="font-display font-extrabold text-white text-2xl lg:text-3xl tracking-wide">
              VEHICLE GRAPHICS SPECIALISTS SINCE 2004
            </h3>
            <p className="mt-2 text-white/55 text-sm">
              Auckland-based design, print and installation.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium">
                <span className="text-[#F39C12]">✓</span> 20+ Years Experience
              </span>
              <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium">
                <span className="text-[#F39C12]">✓</span> Professional Design & Installation
              </span>
              <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium">
                <span className="text-[#F39C12]">✓</span> Auckland Vehicle Graphics Specialists
              </span>
            </div>
          </div>
        </div>
      </section>

    </>);

}