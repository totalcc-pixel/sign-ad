import React from "react";
import { ArrowLeftRight, Car, Undo2, RotateCw } from "lucide-react";

const views = [
  { id: "side", label: "Side", icon: ArrowLeftRight },
  { id: "front", label: "Front", icon: Car },
  { id: "rear", label: "Rear", icon: Undo2 },
  { id: "3d", label: "3D", icon: RotateCw },
];

export default function ViewSelector({ activeView, onChange }) {
  return (
    <div className="flex gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => onChange(v.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeView === v.id
              ? "bg-[#F39C12] text-black"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <v.icon className="w-4 h-4" />
          {v.label}
        </button>
      ))}
    </div>
  );
}