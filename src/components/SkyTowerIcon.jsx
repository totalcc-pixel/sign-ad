import React from "react";

export default function SkyTowerIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Base */}
      <rect x="22" y="100" width="20" height="18" fill="#F39C12" opacity="0.9" />
      <rect x="18" y="112" width="28" height="6" rx="2" fill="#F39C12" />
      {/* Tower shaft */}
      <path d="M30 100 L31 30 L33 30 L34 100 Z" fill="#F39C12" opacity="0.85" />
      {/* Observation deck */}
      <rect x="26" y="42" width="12" height="14" rx="2" fill="#F39C12" />
      <rect x="24" y="46" width="16" height="3" rx="1" fill="#ffb84d" />
      {/* Upper shaft */}
      <path d="M31 42 L31.5 18 L32.5 18 L33 42 Z" fill="#F39C12" opacity="0.85" />
      {/* Mast */}
      <line x1="32" y1="18" x2="32" y2="4" stroke="#F39C12" strokeWidth="1.5" />
      {/* Top light */}
      <circle cx="32" cy="4" r="2.5" fill="#F39C12" />
      <circle cx="32" cy="4" r="4" fill="#F39C12" opacity="0.3" />
    </svg>
  );
}