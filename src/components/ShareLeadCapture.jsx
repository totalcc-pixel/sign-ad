import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { CheckCircle2, Clock, Car, Loader2 } from "lucide-react";

export default function ShareLeadCapture({ mockups, form }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const mockupUrls = Object.entries(mockups).filter(([, url]) => url);

  const handleQuoteRequest = async () => {
    setSubmitting(true);
    try {
      const mockupLinks = mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n");
      const company = form.company_name || "—";
      const vehicle = `${form.vehicle_year || ""} ${form.vehicle_color || ""} ${form.vehicle_type || ""}`.trim() || "—";
      const wrapType = form.wrap_type || "Full Wrap";

      await base44.entities.QuoteRequest.create({
        name: user?.full_name || user?.email || "Design User",
        email: user?.email || "",
        service_type: "Full Vehicle Wrap",
        message: `Quote request from My Design page.\nCompany: ${company}\nVehicle: ${vehicle}\nWrap Coverage: ${wrapType}\n\nDesign Mockup Links:\n${mockupLinks}`,
      });

      try {
        await base44.integrations.Core.SendEmail({
          to: user?.email || "",
          subject: `[Signad] Quote Request Received`,
          body: `<p>Hi,</p>
            <p>Your quote request has been successfully received.</p>
            <p><strong>Company:</strong> ${company}<br>
            <strong>Vehicle:</strong> ${vehicle}<br>
            <strong>Wrap Type:</strong> ${wrapType}</p>
            <p>Our team will review and get back to you within 12–24 hours.</p>
            <p>Thank you.<br>Signad Vehicle Graphics</p>`,
        });
      } catch (_) {}

      alert("Your quote request has been received! Please check your email. Redirecting to the home page...");
      navigate("/");
    } catch (e) {
      alert("An error occurred while submitting your quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-5 bg-gradient-to-r from-[#F39C12]/15 to-transparent border border-[#F39C12]/30 rounded-xl p-5">
      <div className="text-center">
        <h4 className="text-white font-bold text-lg flex items-center justify-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-[#F39C12]" />
          Your 2-View Design is Complete!
        </h4>
        <h4 className="text-white font-bold text-xl mb-2">This is a rough draft. We will update the design and get back to you with a quote soon.</h4>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F39C12]/10 border border-[#F39C12]/30 mb-5">
          <Clock className="w-4 h-4 text-[#F39C12]" />
          <span className="text-white/80 text-sm font-medium">Estimated Quote Time: 12–24 hours</span>
        </div>
        <div>
          <button
            onClick={handleQuoteRequest}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F39C12] text-black font-bold text-base hover:bg-[#ffb84d] hover:shadow-[0_0_24px_rgba(243,156,18,0.5)] transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <><Car className="w-5 h-5" /> Request Quote</>}
          </button>
        </div>
      </div>
    </div>
  );
}