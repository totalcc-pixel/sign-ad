import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const PAGE_SIZE = 9;

export default function CategoryPortfolio({ category }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    base44.entities.Project.list("-created_date", 200)
      .then((all) => setProjects(all.filter((p) => p.category === category)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [category]);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const currentProjects = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="pt-32 lg:pt-56">
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4">
            {category === "Building Sign" ? "Shop Signage" : category === "Vehicle Graphic" ? "Vehicle Graphics" : category}
          </h1>
          <div className="mt-5">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F39C12] text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </div>
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
              {currentProjects.map((p) => (
                <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-zinc-900">
                  {p.before_image_url && p.image_url ? (
                    <BeforeAfterSlider beforeSrc={p.before_image_url} afterSrc={p.image_url} alt={p.title} />
                  ) : (
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
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <span className="font-display text-lg font-bold text-white block">{p.title}</span>
                    {p.description && (
                      <p className="text-white/60 text-sm mt-1.5 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-zinc-700 disabled:opacity-30 hover:bg-[#F39C12] hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                    page === i + 1
                      ? "bg-[#F39C12] text-black"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-zinc-700 disabled:opacity-30 hover:bg-[#F39C12] hover:text-black transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
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