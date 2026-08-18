import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";

const links = [
  { label: "Home", path: "/" },
  {
    label: "Portfolio",
    children: [
      { label: "Vehicle Graphic", path: "/portfolio/vehicle-graphics" },
      { label: "Building Sign", path: "/portfolio/building-signs" },
    ],
  },
  { label: "Services", path: "/#services" },
  { label: "Order Processing", path: "/quote" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-48 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Image src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/ca4db7a8d_sign.gif"
          alt="AD Vehicle Graphics logo"
          className="h-[176px] w-[176px] rounded-md"
          fittingType="fit" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            <li key={l.label} className="relative"
              onMouseEnter={() => l.children && setPortfolioOpen(true)}
              onMouseLeave={() => l.children && setPortfolioOpen(false)}
            >
              {l.children ? (
                <>
                  <button
                    onClick={() => setPortfolioOpen(!portfolioOpen)}
                    className={`flex items-center gap-1 font-medium transition-colors text-2xl ${
                      pathname.startsWith("/portfolio") ? "text-[#F39C12]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                    <ChevronDown className={`w-5 h-5 transition-transform ${portfolioOpen ? "rotate-180" : ""}`} />
                  </button>
                  {portfolioOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-black border border-white/10 rounded-lg overflow-hidden min-w-[220px] shadow-xl">
                        {l.children.map((c) => (
                          <Link
                            key={c.label}
                            to={c.path}
                            className={`block px-5 py-3 text-base font-medium transition-colors ${
                              pathname === c.path ? "text-[#F39C12] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={l.path}
                  className={`font-medium transition-colors text-2xl ${
                    pathname === l.path ? "text-[#F39C12]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              )}
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-5">
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
            l.children ? (
              <div key={l.label}>
                <button
                  onClick={() => setPortfolioOpen(!portfolioOpen)}
                  className="flex items-center gap-1 text-white/80 hover:text-[#F39C12] text-sm font-medium py-1 w-full"
                >
                  {l.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${portfolioOpen ? "rotate-180" : ""}`} />
                </button>
                {portfolioOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {l.children.map((c) => (
                      <Link key={c.label} to={c.path} onClick={() => { setOpen(false); setPortfolioOpen(false); }}
                        className={`text-sm font-medium py-1 ${pathname === c.path ? "text-[#F39C12]" : "text-white/60 hover:text-[#F39C12]"}`}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.label} to={l.path} onClick={() => setOpen(false)} className="text-white/80 hover:text-[#F39C12] text-sm font-medium py-1">
                {l.label}
              </Link>
            )
          )}
          <Link to="/quote" onClick={() => setOpen(false)} className="mt-1 px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm">
            Get Quote
          </Link>
        </div>
      }
    </header>);
}