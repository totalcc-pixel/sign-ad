import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Loader2, Printer, ArrowLeft } from "lucide-react";

export default function DesignProjectPrint() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      setLoading(false);
      return;
    }
    base44.entities.DesignProject
      .get(id)
      .then((p) => setProject(p))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-6 h-6 animate-spin text-[#F39C12]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-white/60 mb-4">Project not found.</p>
        <Link to="/design-projects" className="text-[#F39C12] hover:underline">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Toolbar — hidden in print */}
      <div className="no-print flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
        <Link
          to="/design-projects"
          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-all"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Printable content */}
      <div className="max-w-4xl mx-auto px-8 py-10 print:px-6 print:py-4">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Design Rule Sheet</h1>
          <p className="text-sm text-gray-500 mt-1">
            {project.business_name || "Untitled"} ·{" "}
            {[project.vehicle_make, project.vehicle_model, project.vehicle_year].filter(Boolean).join(" ") || "Vehicle not specified"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Generated: {new Date(project.created_date).toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Status banner */}
        {project.status === "approved" && project.approved_direction && (
          <div className="bg-green-50 border border-green-300 rounded-lg px-4 py-3 mb-6">
            <p className="text-sm font-semibold text-green-800">
              ✓ Approved Direction: {project.approved_direction}
            </p>
          </div>
        )}

        {/* Project details */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-6 pb-6 border-b border-gray-200">
          {project.business_type && <div><span className="text-gray-500">Business type:</span> <span className="font-medium">{project.business_type}</span></div>}
          {project.vehicle_color && <div><span className="text-gray-500">Vehicle colour:</span> <span className="font-medium">{project.vehicle_color}</span></div>}
          {project.coverage_level && <div><span className="text-gray-500">Coverage:</span> <span className="font-medium">{project.coverage_level}</span></div>}
          {project.phone && <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{project.phone}</span></div>}
          {project.website && <div><span className="text-gray-500">Website:</span> <span className="font-medium">{project.website}</span></div>}
          {project.preferred_colors && <div><span className="text-gray-500">Preferred colours:</span> <span className="font-medium">{project.preferred_colors}</span></div>}
        </div>

        {/* Photos */}
        {(project.logo_url || project.driver_photo_url || project.passenger_photo_url || project.rear_photo_url) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {project.logo_url && (
              <div>
                <img src={project.logo_url} alt="Logo" className="h-24 w-24 object-contain border border-gray-200 rounded" />
                <p className="text-xs text-gray-400 mt-1 text-center">Logo</p>
              </div>
            )}
            {project.driver_photo_url && (
              <div>
                <img src={project.driver_photo_url} alt="Driver side" className="h-24 w-32 object-cover border border-gray-200 rounded" />
                <p className="text-xs text-gray-400 mt-1 text-center">Driver</p>
              </div>
            )}
            {project.passenger_photo_url && (
              <div>
                <img src={project.passenger_photo_url} alt="Passenger side" className="h-24 w-32 object-cover border border-gray-200 rounded" />
                <p className="text-xs text-gray-400 mt-1 text-center">Passenger</p>
              </div>
            )}
            {project.rear_photo_url && (
              <div>
                <img src={project.rear_photo_url} alt="Rear" className="h-24 w-32 object-cover border border-gray-200 rounded" />
                <p className="text-xs text-gray-400 mt-1 text-center">Rear</p>
              </div>
            )}
          </div>
        )}

        {/* Design rule sheet */}
        {project.design_rule_sheet && (
          <div className="prose prose-sm max-w-none [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_strong]:text-gray-900">
            <ReactMarkdown>{project.design_rule_sheet}</ReactMarkdown>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400">
          Signad Vehicle Graphics · Auckland, NZ · This document is a design guideline, not a print-ready file.
        </div>
      </div>
    </div>
  );
}