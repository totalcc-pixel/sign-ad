import React from "react";
import { Phone, MessageCircle, MessageSquare } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <>
      {/* Spacer to prevent content being hidden behind the bar */}
      <div className="lg:hidden h-[70px]" />

      {/* Fixed bottom action bar — mobile only */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-black/95 backdrop-blur-md border-t border-[#F39C12]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-3 gap-1.5 px-3 py-2.5">
          {/* Call */}
          <a
            href="tel:0274320180"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-white/10 border border-[#F39C12]/40 text-white active:bg-[#F39C12] active:text-black transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-xs font-bold">Call Us</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/64274320180"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-white/10 border border-[#25D366]/50 text-white active:bg-[#25D366] active:text-black transition-colors"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] ring-1 ring-black" />
            </div>
            <span className="text-xs font-bold">WhatsApp</span>
          </a>

          {/* Text Message */}
          <a
            href="sms:0274320180"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-white/10 border border-[#F39C12]/40 text-white active:bg-[#F39C12] active:text-black transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-bold">Text</span>
          </a>
        </div>
      </div>
    </>
  );
}