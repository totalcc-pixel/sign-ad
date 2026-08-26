import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

const reviews = [
  {
    name: "James Mitchell",
    text: "Absolutely brilliant work from the team. My van wrap looks stunning and has brought in so many new customers. Highly recommend SIGN AD for anyone in Auckland!",
    date: "2 weeks ago",
  },
  {
    name: "Sarah Thompson",
    text: "Professional, fast, and great quality. The design process was easy and the final result exceeded my expectations. My fleet looks incredible on the road.",
    date: "1 month ago",
  },
  {
    name: "David Chen",
    text: "Best vehicle graphics company in Auckland. The attention to detail and customer service was outstanding. Will definitely use them again for my next project.",
    date: "1 month ago",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Signad+Vehicle+Graphics+New+Zealand";

export default function CustomerReviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const r = reviews[index];

  return (
    <section className="py-8 lg:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-10">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-white mt-2">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <GoogleIcon className="w-5 h-5" />
            <span className="text-white/70 text-sm font-medium">Google Reviews</span>
            <div className="flex items-center gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F39C12] text-[#F39C12]" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-bold ml-1">5.0</span>
          </div>
        </div>

        {/* Review card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F39C12] to-[#e67e22] flex items-center justify-center text-white font-bold text-lg">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-base">{r.name}</p>
                  <p className="text-zinc-400 text-xs">{r.date}</p>
                </div>
              </div>
              <GoogleIcon className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F39C12] text-[#F39C12]" />
              ))}
            </div>

            <p className="text-zinc-700 leading-relaxed text-sm lg:text-base">
              "{r.text}"
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-5 w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/40 text-white flex items-center justify-center hover:bg-[#F39C12] hover:text-black transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-5 w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/40 text-white flex items-center justify-center hover:bg-[#F39C12] hover:text-black transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-[#F39C12]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F39C12] text-black font-bold text-base shadow-[0_8px_30px_rgba(243,156,18,0.4)] hover:shadow-[0_12px_40px_rgba(243,156,18,0.6)] hover:scale-[1.02] transition-all"
          >
            <GoogleIcon className="w-5 h-5" />
            Read All Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
}