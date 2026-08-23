import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Facebook } from "lucide-react";
import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { label: "Home", path: "/" },
  { label: "Vehicle Graphic", path: "/portfolio/vehicle-graphics" },
  { label: "Building Sign", path: "/portfolio/building-signs" },
  { label: "Services", path: "/#services" },
  { label: "Order Processing", path: "/quote" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-48 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Image src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/ca4db7a8d_sign.gif"
          alt="AD Vehicle Graphics logo"
          className="h-[176px] w-[176px] rounded-md"
          fittingType="fit" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {links.map((l) =>
            <li key={l.label}>
              <Link
                to={l.path}
                className={`font-medium transition-colors whitespace-nowrap text-xl ${
                  pathname === l.path ? "text-[#F39C12]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.facebook.com/signad04nz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Signad+Vehicle+Graphics+New+Zealand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors"
          >
            <GoogleIcon className="w-5 h-5" />
          </a>
          {isAuthenticated && user ? (
            <>
              <span className="text-white/80 text-sm font-medium max-w-[180px] truncate">
                {user.email}
              </span>
              <button
                onClick={() => logout()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="px-5 py-2 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-colors"
            >
              Sign Up
            </Link>
          )}
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
          {isAuthenticated && user ? (
            <div className="mt-1 px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm flex items-center justify-center gap-1.5">
              <span className="truncate max-w-[140px]">{user.email}</span>
              <button onClick={() => { logout(); setOpen(false); }} aria-label="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/register" onClick={() => setOpen(false)} className="mt-1 px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm">
              Sign Up
            </Link>
          )}
        </div>
      }
    </header>);
}