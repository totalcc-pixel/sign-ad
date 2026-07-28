import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

const categories = ["All", "Vehicle Graphic", "Building Sign"];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    base44.entities.Project.list("-created_date", 50)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-24">
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white mt-3">
            Portfolio
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Two decades of vehicle transformations — wraps, decals, and fleet branding.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === c
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-zinc-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-zinc-900">
                  <div className="aspect-[4/3] overflow-hidden">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fittingType="fill"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#F39C12] text-black text-[11px] font-semibold mb-2">
                      {p.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                    {p.description && <p className="text-white/60 text-sm mt-1.5 line-clamp-2">{p.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] transition-all"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}