import React from "react";
import { Car, Layers, Truck } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Full Vehicle Wraps",
    desc: "Complete color change or branded wraps that protect your paint and make a statement.",
  },
  {
    icon: Layers,
    title: "Partial Wraps & Decals",
    desc: "Strategic graphics and lettering to promote your business or personal style.",
  },
  {
    icon: Truck,
    title: "Commercial Fleet Graphics",
    desc: "Consistent branding across your entire fleet for maximum visibility on the road.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-4 lg:py-16 bg-zinc-50 scroll-mt-48 lg:scroll-mt-56">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4 lg:mb-10">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">What We Do</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 mt-2">
            Our Services
          </h2>
          <p className="mt-2 text-zinc-500 text-base lg:text-lg">
            Professional vehicle graphics solutions for every need.
          </p>
        </div>

        <div className="grid gap-2 md:gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-zinc-100 hover:border-[#F39C12]/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-black text-white border-2 border-[#F39C12] mb-3 lg:mb-6 group-hover:bg-[#F39C12] group-hover:text-black group-hover:border-[#F39C12] transition-colors">
                <s.icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2} />
              </div>
              <h3 className="font-display text-base lg:text-xl font-bold text-zinc-900 mb-1 lg:mb-3">{s.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}