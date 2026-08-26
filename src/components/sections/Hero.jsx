import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Camera, Pencil, DollarSign, ArrowRight, ArrowDown, Phone } from "lucide-react";
import { Image } from "@/components/ui/image";
import SkyTowerIcon from "@/components/SkyTowerIcon";
import QuickQuote from "@/components/sections/QuickQuote";

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
                <span className="block">DESIGN YOUR</span>
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
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg"
                  alt="Professional vehicle graphics on a white trade van"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[460px]"
                  fittingType="fill" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Before/After label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-semibold border border-white/10">
                    Plain White Van
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#F39C12]" />
                  <span className="px-3 py-1.5 rounded-lg bg-[#F39C12] text-black text-xs font-bold">
                    Branded SIGN AD Vehicle
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 3-STEP PROCESS ===== */}
          <div className="mt-14 lg:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((step, i) =>
              <div key={i} className="relative flex flex-col items-center text-center">
                  {/* Arrow between steps (desktop) */}
                  {i < steps.length - 1 &&
                <ArrowRight className="hidden sm:block absolute top-7 -right-4 lg:-right-6 w-6 h-6 text-[#F39C12]/60 z-10" />
                }
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F39C12]/15 border-2 border-[#F39C12]/40 mb-4">
                    <step.icon className="w-6 h-6 text-[#F39C12]" />
                  </div>
                  <div className="text-xs font-bold tracking-widest text-[#F39C12] mb-1">STEP {i + 1}</div>
                  <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
                </div>
              )}
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

      {/* ===== QUICK QUOTE SECTION ===== */}
      <section ref={quoteRef} id="quick-quote" className="scroll-mt-28 bg-zinc-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Quick Quote</span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 mt-3">
              Get a Quick Quote
            </h2>
            <p className="mt-4 text-zinc-500 text-lg max-w-xl mx-auto">
              Tell us about your vehicle. We'll get back to you fast with a tailored quote.
            </p>
          </div>
          <QuickQuote />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-black py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            READY TO SEE YOUR BUSINESS<br className="hidden sm:block" /> ON YOUR VEHICLE?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Try it free before you decide.
          </p>
          <Link
            to="/my-design"
            className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#F39C12] text-black font-bold text-lg shadow-[0_8px_30px_rgba(243,156,18,0.4)] hover:shadow-[0_12px_40px_rgba(243,156,18,0.6)] hover:scale-[1.02] transition-all">
            
            START MY FREE DESIGN
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>);

}