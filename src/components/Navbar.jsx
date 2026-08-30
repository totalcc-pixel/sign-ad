import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Facebook, Car, Palette } from "lucide-react";
import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";
import { useAuth } from "@/lib/AuthContext";

const links = [
{ label: "Home", path: "/" },
{ label: "Vehicle Graphics", path: "/portfolio/vehicle-graphics" },
{ label: "Shop Signage", path: "/portfolio/building-signs" },
{ label: "Services", path: "/#services" },
{ label: "About Car Wrap", path: "/quote" }];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout, navigateToLogin } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      {/* Top decorative gradient line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F39C12] to-transparent opacity-70" />
      <div className="absolute top-0 inset-x-0 h-[40px] bg-gradient-to-b from-[#F39C12]/8 to-transparent pointer-events-none" />

      <nav className="max-w-7xl mx-auto px-4 lg:px-8 pt-0 pb-2 flex flex-col gap-0">
       <div className="flex items-center justify-between h-20 lg:h-40">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Image src="https://media.base44.com/images/public/6a67d1169c557b33993d409b/ca4db7a8d_sign.gif"
            alt="AD Vehicle Graphics logo"
            className="relative h-[96px] w-[96px] lg:h-[264px] lg:w-[264px] rounded-md"
            fittingType="fit" />
          </div>
        </Link>

        <ul className="group hidden md:flex items-center gap-1 flex-1 justify-center px-3 py-1.5 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-[#F39C12]/30 backdrop-blur-md shadow-[0_0_24px_rgba(243,156,18,0.15),0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(243,156,18,0.15)] opacity-100 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_36px_rgba(243,156,18,0.25),0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(243,156,18,0.2)]">
          <div className="absolute pointer-events-none inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#F39C12]/60 to-transparent rounded-full" />
          <div className="absolute pointer-events-none inset-0 rounded-full bg-gradient-to-r from-[#F39C12]/0 via-[#F39C12]/5 to-[#F39C12]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute pointer-events-none -left-1/4 -top-2 w-1/2 h-full bg-[#F39C12]/10 blur-xl rounded-full group-hover:translate-x-[300%] transition-transform duration-[1200ms] ease-in-out" />
          {links.map((l) =>
          <li key={l.label}>
              <Link
              to={l.path}
              className={`block px-4 py-1.5 rounded-full font-medium whitespace-nowrap text-base transition-all duration-300 ${
              pathname === l.path ?
              "text-[#F39C12] border border-[#F39C12]/60 bg-[#F39C12]/10 shadow-[0_0_16px_rgba(243,156,18,0.35)]" :
              "text-white border border-transparent hover:text-[#F39C12] hover:bg-gradient-to-b hover:from-[#F39C12]/15 hover:to-transparent hover:border-[#F39C12]/30 hover:shadow-[0_0_12px_rgba(243,156,18,0.25)]"}`
              }>

                {l.label}
              </Link>
            </li>
          )}
        </ul>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
       </div>

        <div className="hidden md:flex items-center justify-end gap-3 pb-3">
          <a
            href="https://www.facebook.com/signad04nz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/30 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] hover:shadow-[0_0_12px_rgba(243,156,18,0.4)] transition-all">

            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Signad+Vehicle+Graphics+New+Zealand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/30 hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] hover:shadow-[0_0_12px_rgba(243,156,18,0.4)] transition-all">

            <GoogleIcon className="w-5 h-5" />
          </a>
          <div className="flex flex-col items-end">
            {isAuthenticated && user ?
            <>
              <div className="flex items-center gap-3">
                <span className="text-white/80 text-sm font-medium max-w-[180px] truncate">
                  {user.email}
                </span>

                <button
                onClick={() => logout()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] hover:shadow-[0_0_16px_rgba(243,156,18,0.5)] transition-all">

                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </> :

            <Link
              to="/register"
              className="px-5 py-2 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] hover:shadow-[0_0_16px_rgba(243,156,18,0.5)] transition-all">

                Sign Up
              </Link>
            }
          </div>
        </div>
      </nav>

      {open &&
      <div className="md:hidden bg-black border-t border-white/10 px-5 py-4 flex flex-col gap-3">
          {links.map((l) =>
        <Link key={l.label} to={l.path} onClick={() => setOpen(false)} className="text-white/80 hover:text-[#F39C12] text-sm font-medium py-1">
              {l.label}
            </Link>
        )}
          {isAuthenticated && user ?
        <div className="mt-1 px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm flex items-center justify-center gap-1.5">
              <span className="truncate max-w-[140px]">{user.email}</span>
              <button onClick={() => {logout();setOpen(false);}} aria-label="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div> :

        <div className="mt-1 space-y-2">
          <button onClick={() => {setOpen(false);navigateToLogin();}} className="block w-full px-5 py-2.5 rounded-md bg-white/10 border border-white/20 text-white font-semibold text-center text-sm">
            Login
          </button>
          <Link to="/register" onClick={() => setOpen(false)} className="block px-5 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-center text-sm">
            Sign Up
          </Link>
          <Link to="/my-design" onClick={() => setOpen(false)} className="block px-5 py-2.5 rounded-md bg-white/10 border border-white/20 text-white font-semibold text-center text-sm">
            My Design
          </Link>
        </div>
        }
        </div>
      }
    </header>);
}