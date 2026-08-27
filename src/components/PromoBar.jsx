import React, { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "signad_promo_dismissed";

export default function PromoBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
    } catch (_) {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (_) {}
  };

  const handleClaim = () => {
    const el = document.getElementById("quote-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/my-design";
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-gradient-to-r from-[#F39C12] via-[#e67e22] to-[#F39C12] text-black">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-center">
        <p className="text-xs sm:text-sm font-semibold">
          🔥 Auckland Special: Get a Free 3D/4-View Design Mockup &amp; 10% Off Your First Vehicle Wrap or Signage Project!
        </p>
        <button
          onClick={handleClaim}
          className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white text-xs font-bold hover:bg-black/80 transition-colors whitespace-nowrap"
        >
          Claim Offer <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={handleClaim}
          className="sm:hidden px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-bold whitespace-nowrap"
        >
          Claim
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}