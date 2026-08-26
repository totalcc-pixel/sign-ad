import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Facebook } from "lucide-react";
import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/3e0af2045_Untitled-5.gif"

          alt="AD Vehicle Graphics logo"
          className="h-14 w-14 rounded-md mb-4 bg-white"
          fittingType="fit" />
          
          <p className="text-sm leading-relaxed max-w-sm">
            Premium vehicle wraps, graphics, and signage solutions since 2004. Quality craftsmanship you can trust.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-[#F39C12] transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#F39C12] transition-colors">Portfolio</Link></li>
            <li><Link to="/quote" className="hover:text-[#F39C12] transition-colors">Order Processing</Link></li>
            <li><Link to="/admin" className="hover:text-[#F39C12] transition-colors">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase">Jason <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Building Sign</span></p>
              <ul className="space-y-1.5 mt-1.5">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#F39C12]" /> 027-4320-180</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#F39C12]" /> totalcc@gmail.com</li>
              </ul>
            </div>
            <div>
              <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase">Vincent <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Vehicle Graphic</span></p>
              <ul className="space-y-1.5 mt-1.5">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#F39C12]" /> 021 0296 4174</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#F39C12]" /> vincentsignad@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <p>© {new Date().getFullYear()} Signad Vehicle Graphics. All rights reserved.</p>
        <p>Premium craftsmanship since 2004.</p>
      </div>
    </footer>);

}