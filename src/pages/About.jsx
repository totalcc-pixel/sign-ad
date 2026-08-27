import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function About() {
  return (
    <div className="bg-black min-h-screen pt-28 lg:pt-44 pb-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">About Us</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
          Auckland's Trusted Vehicle Graphics Specialists
        </h1>
        <p className="mt-5 text-lg text-white/70 leading-relaxed">
          Signad Vehicle Graphics has been transforming vehicles and storefronts across Auckland since 2004.
        </p>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 mt-12 space-y-6">
        <p className="text-white/75 leading-relaxed">
          Signad Vehicle Graphics is a premier signage and vehicle wrapping company based in Auckland, New Zealand.
          For over two decades, we have specialised in delivering high-quality vehicle wraps, fleet graphics, building
          signage, and digital large-format printing. Our mission is simple: to help businesses stand out on the road
          and in the streets with bold, durable, and visually striking graphics that elevate brand identity.
        </p>
        <p className="text-white/75 leading-relaxed">
          Our platform is designed for business owners, fleet managers, and individuals who want to visualise their
          branding on a vehicle before committing. With our free AI-powered design tool, members can upload their
          company logo, choose wrap styles, and generate photorealistic mockups of all four vehicle views — front,
          rear, left, and right — in minutes. This makes it easy to experiment with different looks and share them
          with stakeholders for feedback.
        </p>
        <p className="text-white/75 leading-relaxed">
          Beyond digital mockups, our experienced team handles the full production process: design, printing,
          and professional installation. Whether you need a full vehicle wrap, partial decals, or commercial fleet
          branding, we use premium materials and proven techniques to ensure a flawless, long-lasting finish.
          Our shop signage division, led by Jason, covers building signs, shopfronts, and indoor displays, while
          Vincent heads our vehicle graphics division for mobile branding that turns heads.
        </p>
        <p className="text-white/75 leading-relaxed">
          Built and maintained by the Signad team, this app reflects our commitment to combining craftsmanship
          with modern technology — giving every customer the confidence to see their vision come to life before
          a single panel is wrapped.
        </p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          {[
            "22+ years of industry experience",
            "AI-powered free design mockups",
            "Premium materials & professional installation",
            "Full-service: design, print & install",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-white/80">
              <CheckCircle className="w-5 h-5 text-[#F39C12] shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-8 text-center">
          <Link
            to="/quote"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] transition-all"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}