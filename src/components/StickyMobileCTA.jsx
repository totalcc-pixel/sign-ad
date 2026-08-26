import React from "react";
import { Link } from "react-router-dom";
import { Palette, FileText, Phone } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur border-t border-[#F39C12]/30 px-3 py-2.5 flex items-center gap-2">
      <Link
        to="/my-design"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#F39C12] text-black font-bold text-sm shadow-[0_4px_16px_rgba(243,156,18,0.4)]"
      >
        <Palette className="w-4 h-4" />
        FREE DESIGN
      </Link>
      <a
        href="#quick-quote"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white/10 border border-[#F39C12]/40 text-white font-bold text-sm"
      >
        <FileText className="w-4 h-4" />
        QUICK QUOTE
      </a>
      <a
        href="tel:0274320180"
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-sm"
      >
        <Phone className="w-4 h-4" />
        CALL
      </a>
    </div>
  );
}