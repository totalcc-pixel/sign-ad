import React from "react";
import { X } from "lucide-react";

const tiers = [
  {
    name: "SIMPLE",
    details: ["SIGNAD logo", "027 4320 180"],
    original: "$330",
    price: "$299",
  },
  {
    name: "EXTENDED",
    details: ["SIGNAD logo", "027 4320 180", "www.signad.co.nz", "Building Signage", "Vehicle Graphics", "Internal Signage", "Business Cards"],
    original: "$500",
    price: "$449",
  },
  {
    name: "GREATER EXPOSURE",
    details: ["SIGNAD logo", "027 4320 180", "www.signad.co.nz", "Building Signage", "Vehicle Graphics", "Internal Signage", "Business Cards"],
    original: "$650",
    price: "$599",
  },
];

export default function PricingGuideModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121623] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#FF8C33] mb-6">
          Mobile Billboard Package Deal
        </h2>

        <div className="flex flex-col gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl bg-[#FF8C33] p-5 sm:p-6"
            >
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#121623] text-center mb-4">
                {tier.name}
              </h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                <VanView label="Front" />
                <VanView label="Side" details={tier.details} />
                <VanView label="Rear" />
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-lg sm:text-xl font-bold text-red-600 line-through">
                  {tier.original}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#121623]">
                  {tier.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#7A7A7A] text-sm mt-6">
          Maximum of 3 Different colours and fonts
        </p>
      </div>
    </div>
  );
}

function VanView({ label, details }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-[4/3] rounded-md bg-[#121623] flex items-center justify-center text-[#FF8C33]/40 text-xs">
        <svg viewBox="0 0 100 70" className="w-full h-full p-2">
          <rect x="5" y="20" width="80" height="35" rx="4" fill="currentColor" />
          <rect x="85" y="25" width="10" height="25" rx="2" fill="currentColor" />
          <circle cx="25" cy="58" r="6" fill="#121623" stroke="currentColor" strokeWidth="2" />
          <circle cx="75" cy="58" r="6" fill="#121623" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <span className="text-[10px] sm:text-xs text-[#121623]/70 mt-1">{label}</span>
      {details && (
        <ul className="mt-1 text-[8px] sm:text-[10px] text-[#121623] leading-tight text-center list-none">
          {details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}