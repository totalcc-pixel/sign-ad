import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Loader2, Printer, Check, RefreshCw, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";

const STATUS_STYLES = {
  pending_review: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  approved: "bg-green-500/20 text-green-400 border-green-500/40",
  revision_requested: "bg-blue-500/20 text-blue-400 border-blue-500/40",
};

const STATUS_LABELS = {
  pending_review: "Pending Review",
  approved: "Approved",
  revision_requested: "Revision Requested",
};

export default function DesignProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updating, setUpdating] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.DesignProject.filter({}, "-created_date", 50);
      setProjects(data);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleApprove = async (project, direction) => {
    setUpdating(project.id);
    try {
      await base44.entities.DesignProject.update(project.id, {
        status: "approved",
        approved_direction: direction,
      });
      await loadProjects();
    } finally {
      setUpdating(null);
    }
  };

  const handleRevision = async (project) => {
    setUpdating(project.id);
    try {
      await base44.entities.DesignProject.update(project.id, {
        status: "revision_requested",
      });
      await loadProjects();
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F39C12]">My Design Projects</h1>
            <p className="text-sm text-white/60 mt-1">Review, approve, or print your vehicle graphics design rules.</p>
          </div>
          <Link
            to="/design-director"
            className="px-4 py-2 rounded-lg bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-all"
          >
            New Chat
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#F39C12]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">No design projects yet.</p>
            <Link to="/design-director" className="text-[#F39C12] text-sm hover:underline mt-2 inline-block">
              Start a conversation →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => {
              const isExpanded = expandedId === p.id;
              const isUpdating = updating === p.id;
              return (
                <div
                  key={p.id}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{p.business_name || "Untitled Project"}</h3>
                      <p className="text-xs text-white/50 mt-0.5">
                        {[p.vehicle_make, p.vehicle_model, p.vehicle_year].filter(Boolean).join(" ") || "Vehicle not specified"}
                        {" · "}
                        {new Date(p.created_date).toLocaleDateString("en-NZ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[p.status] || ""}`}>
                        {STATUS_LABELS[p.status] || p.status}
                      </span>
                      {p.approved_direction && (
                        <span className="text-xs text-green-400 font-medium">
                          {p.approved_direction}
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-white/10 px-5 py-4">
                      {/* Project details */}
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        {p.coverage_level && (
                          <div><span className="text-white/40">Coverage:</span> <span className="text-white/80">{p.coverage_level}</span></div>
                        )}
                        {p.phone && (
                          <div><span className="text-white/40">Phone:</span> <span className="text-white/80">{p.phone}</span></div>
                        )}
                        {p.website && (
                          <div><span className="text-white/40">Website:</span> <span className="text-white/80">{p.website}</span></div>
                        )}
                        {p.vehicle_color && (
                          <div><span className="text-white/40">Colour:</span> <span className="text-white/80">{p.vehicle_color}</span></div>
                        )}
                      </div>

                      {/* Photos */}
                      {(p.logo_url || p.driver_photo_url || p.passenger_photo_url || p.rear_photo_url) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.logo_url && <img src={p.logo_url} alt="Logo" className="h-16 w-16 object-cover rounded-lg border border-white/10" />}
                          {p.driver_photo_url && <img src={p.driver_photo_url} alt="Driver" className="h-16 w-16 object-cover rounded-lg border border-white/10" />}
                          {p.passenger_photo_url && <img src={p.passenger_photo_url} alt="Passenger" className="h-16 w-16 object-cover rounded-lg border border-white/10" />}
                          {p.rear_photo_url && <img src={p.rear_photo_url} alt="Rear" className="h-16 w-16 object-cover rounded-lg border border-white/10" />}
                        </div>
                      )}

                      {/* Design rule sheet */}
                      {p.design_rule_sheet && (
                        <div className="bg-black/40 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                          <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_strong]:text-[#F39C12]">
                            {p.design_rule_sheet}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {p.status !== "approved" && (
                          <>
                            <span className="text-xs text-white/40 mr-1">Approve direction:</span>
                            {["Simple", "Partial", "Full Wrap"].map((dir) => (
                              <button
                                key={dir}
                                onClick={() => handleApprove(p, dir)}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-all disabled:opacity-50"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {dir}
                              </button>
                            ))}
                            <button
                              onClick={() => handleRevision(p)}
                              disabled={isUpdating}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-all disabled:opacity-50"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              Request Revision
                            </button>
                          </>
                        )}
                        <Link
                          to={`/design-project/print?id=${p.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F39C12]/20 border border-[#F39C12]/40 text-[#F39C12] text-xs font-medium hover:bg-[#F39C12]/30 transition-all ml-auto"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          Print
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}