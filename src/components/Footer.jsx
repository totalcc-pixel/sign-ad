import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/6f8bdcae0_sign.gif"
            alt="AD Vehicle Graphics logo"
            className="h-14 w-14 rounded-md mb-4 bg-white"
            fittingType="fit"
          />
          <p className="text-sm leading-relaxed max-w-sm">
            Premium vehicle wraps, graphics, and signage solutions since 2004. Quality craftsmanship you can trust.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-[#F39C12] transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#F39C12] transition-colors">Portfolio</Link></li>
            <li><Link to="/quote" className="hover:text-[#F39C12] transition-colors">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#F39C12]" /> 027-4320-180</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#F39C12]" /> totalcc@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#F39C12]" /> Auckland, NZ</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row gap-2 justify-between">
        <p>© {new Date().getFullYear()} WrapPro Vehicle Graphics. All rights reserved.</p>
        <p>Premium craftsmanship since 2004.</p>
      </div>
    </footer>
  );
}