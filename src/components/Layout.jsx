import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PromoBar from "@/components/PromoBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PromoBar />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}