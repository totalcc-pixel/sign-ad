import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

export default function CategoryPortfolio({ category }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.Project.list("-created_date", 50)
      .then((all) => setProjects(all.filter((p) => p.category === category)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="pt-24">
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white mt-3">
            {category}
          </h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 mt-5 text-white/60 hover:text-[#F39C12] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-zinc-100 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-zinc-500 py-12">No projects in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
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
                    {p.description && (
                      <p className="text-white/60 text-sm mt-1.5 line-clamp-2">{p.description}</p>
                    )}
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