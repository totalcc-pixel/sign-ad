import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

export default function FeaturedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Project.filter({ featured: true }, "-created_date", 6).
    then(setProjects).
    catch(() => setProjects([])).
    finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Gallery</span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 mt-3">
              Featured Work
            </h2>
            <p className="mt-4 text-zinc-500 text-lg">Our latest vehicle transformation projects.</p>
          </div>
          <Link to="/portfolio" className="group inline-flex items-center gap-2 text-zinc-900 font-semibold hover:text-[#F39C12] transition-colors text-xl">View All Projects


          </Link>
        </div>

        {loading ?
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) =>
          <div key={i} className="aspect-[4/3] rounded-2xl bg-zinc-100 animate-pulse" />
          )}
          </div> :

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) =>
          <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-zinc-900">
                <div className="aspect-[4/3] overflow-hidden">
                  {p.image_url &&
              <Image
                src={p.image_url}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fittingType="fill" />

              }
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#F39C12] text-black text-[11px] font-semibold mb-2">
                    {p.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </section>);

}