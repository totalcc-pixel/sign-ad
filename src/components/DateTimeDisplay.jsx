import React, { useState, useEffect } from "react";

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-NZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
      <span className="w-2 h-2 rounded-full bg-[#F39C12] animate-pulse" />
      <span className="text-white text-sm font-medium tracking-wide">{dateStr}</span>
      <span className="text-white/40">·</span>
      <span className="text-[#F39C12] text-sm font-semibold tabular-nums">{timeStr}</span>
    </div>
  );
}