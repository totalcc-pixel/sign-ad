import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Image } from "@/components/ui/image";

const links = [
{ label: "Home", path: "/" },
{ label: "Portfolio", path: "/portfolio" },
{ label: "Services", path: "/#services" },
{ label: "Order Processing", path: "/quote" }];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-48 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Image
            src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/6f8bdcae0_sign.gif"
            alt="AD Vehicle Graphics logo"
            className="h-[176px] w-[176px] rounded-md"
            fittingType="fit" />
          
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) =>
          <li key={l.label}>
              <Link
              to={l.path}
              className={`font-medium transition-colors text-xl ${
              pathname === l.path ? "text-[#F39C12]" : "text-white/80 hover:text-white"}`
              }>
              
                {l.label}
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <a href="tel:0274320180" className="flex items-center gap-2 text-white/90 text-sm font-medium hover:text-[#F39C12] transition-colors">
            <Phone className="w-4 h-4" /> 027-4320-180
          </a>
          <Link
            to="/quote"
            className="px-5 py-2 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-colors">
            
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open &&
      <div className="md:hidden bg-black border-t border-white/10 px-5 py-4 flex flex-col gap-3">
          {links.map((l) =>
        <Link key={l.label} to={l.path} onClick={() => setOpen(false)} className="text-white/80 hover:text-[#F39C12] text-sm font-medium py-1">
              {l.label}
            </Link>
        )}
          <a href="tel:0274320180" className="flex items-center gap-2 text-white/90 text-sm py-1">
            <Phone className="w-4 h-4" /> 027-4320-180
          </a>
          <Link to="/quote" onClick={() => setOpen(false)} className="mt-1 px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm">
            Get Quote
          </Link>
        </div>
      }
    </header>);

}