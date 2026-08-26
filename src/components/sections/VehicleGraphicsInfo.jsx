import React from "react";
import { Eye, Shield, TrendingUp, Wrench, Truck, Store, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "High Visual Impact",
    desc: "Turn your daily driving into powerful advertising, reaching thousands of potential customers every day at no extra cost.",
  },
  {
    icon: Shield,
    title: "Durability & Weather Resistance",
    desc: "Printed on premium vinyl with fade-resistant latex inks to withstand harsh sunlight, rain, and everyday road wear.",
  },
  {
    icon: TrendingUp,
    title: "Cost-Effective Marketing",
    desc: "A one-time investment delivers long-term exposure, making it the smart choice for any mobile business.",
  },
];

const applications = [
  {
    icon: Wrench,
    title: "Trades & Contractors",
    desc: "Perfect for plumbers, sparkies, water blasters, builders, landscapers, and more—featuring logos, service lists, and contact details.",
  },
  {
    icon: Truck,
    title: "Delivery & Service Fleets",
    desc: "Unify your fleet to project a credible, professional image that builds customer trust.",
  },
  {
    icon: Store,
    title: "Small Businesses",
    desc: "Promote your brand anywhere—in traffic, on job sites, or parked outside local shops.",
  },
  {
    icon: Calendar,
    title: "Events & Promotions",
    desc: "Ideal for branded event vehicles at festivals, trade shows, and community campaigns.",
  },
];

export default function VehicleGraphicsInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Vehicle Graphics</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 mt-3">
            Why Choose Vehicle Graphics?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 hover:border-[#F39C12]/40 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F39C12]/15 mb-4">
                <b.icon className="w-6 h-6 text-[#F39C12]" />
              </div>
              <h3 className="font-display text-lg font-bold text-zinc-900 mb-2">{b.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
            Ideal Applications
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {applications.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 bg-white rounded-2xl p-6 border border-zinc-200 hover:border-[#F39C12]/40 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#F39C12]/15">
                <a.icon className="w-6 h-6 text-[#F39C12]" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-zinc-900 mb-1">{a.title}</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black rounded-2xl p-8 sm:p-10 text-center">
          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Vehicle graphics are the most practical and impactful way to promote your business on the move.
            Let us help you make a lasting impression long after the engine is turned off.
          </p>
          <p className="mt-5 text-white/60 text-sm">
            For bulk order discounts and enquiries, please email us at{" "}
            <a href="mailto:totalcc@gmail.com" className="text-[#F39C12] font-semibold hover:underline">
              totalcc@gmail.com
            </a>{" "}
            or reach out via live chat.
          </p>
        </div>
      </div>
    </section>
  );
}