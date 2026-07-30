import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#F39C12]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#F39C12]/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Transform <span className="text-[#F39C12]">Your Vehicle?</span>
        </h2>
        <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
          Get a free, no-obligation quote today. Our team is ready to bring your vision to life.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/quote"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] transition-all hover:shadow-[0_8px_30px_rgba(243,156,18,0.4)]"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}