import React from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";

const PRICING_IMAGE_URL =
  "https://media.base44.com/images/public/6a67d1169c557b33993d409b/3877bfbcd_price.jpg";

export default function PricingGuideModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121623] p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <Image
          src={PRICING_IMAGE_URL}
          alt="Mobile Billboard Package Deal pricing guide"
          className="w-full h-auto rounded-lg"
          fittingType="fit"
        />
      </div>
    </div>
  );
}