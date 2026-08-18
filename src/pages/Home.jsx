import React from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import PortfolioCategories from "@/components/sections/PortfolioCategories";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioCategories />
      <CTASection />
    </>
  );
}