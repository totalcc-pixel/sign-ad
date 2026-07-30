import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";

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

        <div className="mt-10 pt-8 border-t border-white/10 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto text-sm">
          <div className="text-left">
            <p className="text-white font-semibold text-xs tracking-[0.2em] uppercase">Jason <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Building Sign</span></p>
            <a href="tel:0274320180" className="flex items-center gap-2 mt-2 text-white/70 hover:text-[#F39C12] transition-colors">
              <Phone className="w-4 h-4 text-[#F39C12]" /> 027-4320-180
            </a>
            <a href="mailto:totalcc@gmail.com" className="flex items-center gap-2 mt-1.5 text-white/70 hover:text-[#F39C12] transition-colors">
              <Mail className="w-4 h-4 text-[#F39C12]" /> totalcc@gmail.com
            </a>
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-xs tracking-[0.2em] uppercase">Vincent <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Vehicle Graphic</span></p>
            <a href="tel:02102964174" className="flex items-center gap-2 mt-2 text-white/70 hover:text-[#F39C12] transition-colors">
              <Phone className="w-4 h-4 text-[#F39C12]" /> 021 0296 4174
            </a>
            <a href="mailto:vincentsignad@gmail.com" className="flex items-center gap-2 mt-1.5 text-white/70 hover:text-[#F39C12] transition-colors">
              <Mail className="w-4 h-4 text-[#F39C12]" /> vincentsignad@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}