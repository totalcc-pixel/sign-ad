import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const categories = [
  {
    name: "Vehicle Graphic",
    desc: "Full wraps, partial decals, and commercial fleet branding.",
    image: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/992b48a31_cv.jpg",
    path: "/portfolio/vehicle-graphics",
  },
  {
    name: "Building Sign",
    desc: "Wall wraps, signage, and storefront graphics.",
    image: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/5f8971a8b_1.jpg",
    path: "/portfolio/building-signs",
  },
];

export default function Portfolio() {
  return (
    <div className="pt-24">
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white mt-3">
            Portfolio
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Two decades of transformations — explore our work by category.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-8 md:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={c.path}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fittingType="fill"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8">
                <h2 className="font-display text-3xl font-extrabold text-white">{c.name}</h2>
                <p className="text-white/70 text-sm mt-2 max-w-sm">{c.desc}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-[#F39C12] font-semibold text-sm">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}