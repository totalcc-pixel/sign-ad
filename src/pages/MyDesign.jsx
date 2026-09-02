import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Loader2, Car, Upload, CheckCircle, Facebook, Palette, LayoutGrid, ZoomIn, Download, Check, DownloadCloud, Paperclip, X, Ruler } from "lucide-react";

import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";

import DesignSummary from "@/components/design/DesignSummary";
import ShareLeadCapture from "@/components/ShareLeadCapture";
import MockupLightbox from "@/components/design/MockupLightbox";

const VIEWS = ["left", "rear"];

const VEHICLE_TEMPLATES = {
  hiace: {
    keywords: ["hiace", "hi-ace", "toyota hiace", "toyota van"],
    url: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/90e68bfc6_hiace.png",
    name: "Toyota Hiace 2012",
  },
  caravan: {
    keywords: ["caravan", "japanese van", "nissan caravan", "van"],
    url: "https://media.base44.com/images/public/6a67d1169c557b33993d409b/d1f45cf63_caravan.png",
    name: "Japanese Van",
  },
};

function matchVehicleTemplate(vehicleType) {
  if (!vehicleType) return null;
  const input = vehicleType.toLowerCase();
  for (const tpl of Object.values(VEHICLE_TEMPLATES)) {
    if (tpl.keywords.some((kw) => input.includes(kw))) {
      return tpl;
    }
  }
  return null;
}

const viewLabels = {
  left: "Left Side",
  right: "Right Side",
  front: "Front View",
  rear: "Rear View",
};

const mockupFieldMap = {
  left: "mockup_url",
  right: "right_mockup_url",
  front: "front_mockup_url",
  rear: "rear_mockup_url",
};

function buildPrompt(view, form) {
  const vehicleType = form.vehicle_type || "commercial van";
  const vehicleColor = form.vehicle_color || "white";
  const vehicleYear = form.vehicle_year || "";
  const baseInfo = `Professional vehicle wrap design for a ${vehicleYear ? `${vehicleYear} ` : ""}${vehicleColor} ${vehicleType}. Company name: "${form.company_name}". ${form.phone ? `Phone: ${form.phone}.` : ""} ${form.website ? `Website/Facebook: ${form.website}.` : ""}`;
  const logoInstruction = form.logo_url ? ` IMPORTANT: Incorporate the uploaded company logo as the central branding element on the vehicle. Use the logo's exact design, colors, and text.` : "";
  const styleInstruction = form.design_style?.trim() ? ` Design style: ${form.design_style}.` : "";

  const wrapType = form.wrap_type || "Full Wrap";
  let wrapCoverageInstruction = "";
  if (wrapType === "Full Wrap") {
    wrapCoverageInstruction = ` WRAP COVERAGE: Full vehicle wrap — 100% full coverage, complete color change and full branding across the ENTIRE vehicle body including all side panels, doors, hood/bonnet, roof, tailgate, and rear quarter panels. Vibrant full-coverage graphics with the company branding, colors, and design extending across every exterior panel except the bumpers and license plates.`;
  } else if (wrapType === "Half Wrap") {
    wrapCoverageInstruction = ` WRAP COVERAGE: Half / partial wrap — 50-60% coverage. Keep the FRONT HALF of the vehicle (hood/bonnet, front doors, front fenders) in its original factory paint color. Apply design graphics and branding ONLY to the REAR HALF of the vehicle: rear doors, rear quarter panels, tailgate/boot door, and rear window area. The transition between factory paint and wrapped section should be clean and professional.`;
  } else {
    wrapCoverageInstruction = ` WRAP COVERAGE: Simple signage / spot decals — keep the vehicle body completely clean in its original factory paint color. Apply ONLY clean cut-vinyl logos and text: company logo on each front door, a small logo on the bonnet/hood, and phone number / website text on the rear tailgate only. Do NOT wrap any panels or apply full-panel graphics. Minimal, professional spot decals only.`;
  }

  const vehicleSpec = `${vehicleYear ? `${vehicleYear} ` : ""}${vehicleColor} ${vehicleType}`;

  const globalVehicleRule = ` PERMANENT GLOBAL VEHICLE DESIGN RULE (applies to every generation, every view): Selected Vehicle: ${vehicleSpec}. Vehicle Year: ${vehicleYear || "N/A"}. Vehicle Colour: ${vehicleColor}. Use the selected vehicle above as the FIXED base vehicle. Do NOT change it to another vehicle or a similar vehicle. Keep the EXACT SAME vehicle consistently in all 4 views (Left, Right, Front, and Rear). Apply the graphic design ONLY — do NOT redesign or replace the vehicle itself. Create a clean, modern, professional commercial vehicle design with strong readability of: 1. Company Name, 2. Main Service, 3. Phone Number, 4. Website / Email. Keep the design realistic for actual vehicle signage production.`;

  const consistencyRule = ` VEHICLE CONSISTENCY RULE: This is part of a synchronized 4-view generation (Left, Right, Front, Rear). All 4 views MUST depict the EXACT SAME vehicle — identical make, model, year, body shape, trim, and body type. Do NOT switch between different vehicle types (no mixing sedan, SUV, van, station wagon, or hatchback across views). LOCKED BASE PAINT COLOR: the factory base body paint must be exactly "${vehicleColor}" in all 4 views with zero variation in tone or shade — any non-wrapped panels must show the identical base color. COHESIVE STUDIO ENVIRONMENT: use the identical studio backdrop, neutral background, and lighting intensity across all 4 angles to prevent visual distortion. Treat these vehicle specifications as strict global parameters applied identically to every view: Vehicle="${vehicleSpec}", Base Color="${vehicleColor}".`;

  const exclusionRules = ` CRITICAL EXCLUSION RULES: Keep both the front and rear bumpers completely clean and blank (factory original paint or unpainted plastic). Do not apply any decals, graphics, text, or wrap patterns to the bumpers. Keep all license plates/number plates completely standard, blank, or clean factory style. Never place logos, wrap designs, graphics, or promotional text over or inside the license plate areas. Do NOT add any road sign, traffic sign, warning sign, directional sign, or signboard-style graphics on or near the rear bumper. NEVER add any red and white chevron hazard tape, safety striped tape, or diagonal striped band across the tailgate or rear bumper area. Do NOT add any reflective safety stripes or hazard warning bands. Negative prompt constraint: no graphics on bumpers, no decals on license plates, no road signs on rear bumper, no traffic signs, no signboard graphics on bumper, no red and white chevron tape, no safety stripes, no hazard warning bands, clean factory bumpers, standard untouched number plates.`;

  const symmetryRule = (view === "left" || view === "right") ? ` SYMMETRY & BRANDING CONSISTENCY: This side view must share the exact same branding layout, color palette, graphic proportions, and design structure as the opposite side view. Logos, contact details, typography, and wrap patterns must match in relative position, scale, and visual balance on both driver and passenger sides. All text, phone numbers, website URLs, and company logos must be properly oriented and horizontally legible — do NOT mirror or invert readable text.` : "";

  let viewPrompt = "";
  switch (view) {
    case "right":
      viewPrompt = ` Photorealistic 3D render, RIGHT SIDE VIEW showing the full right side panel wrap design. High quality, sharp details, professional commercial vehicle graphics.`;
      break;
    case "front":
      viewPrompt = ` Photorealistic 3D render, STRICTLY FRONT VIEW ONLY — camera positioned directly in front of the vehicle, head-on straight angle. Show ONLY the front fascia: front grille, headlights, front bumper, hood/bonnet, and front windscreen. Do NOT show any side panels, side doors, rear, or any other angle. The entire image must be the front of the vehicle filling the frame, centered and symmetrical. High quality, sharp details, professional commercial vehicle graphics.`;
      break;
    case "rear":
      viewPrompt = ` Photorealistic 3D render, STRICTLY REAR VIEW ONLY — camera positioned directly behind the vehicle, head-on straight rear angle. Show ONLY the exact rear end: rear window, tailgate/boot door, rear bumper, taillights, and rear license plate area. Do NOT show any side panels, side doors, front, or any other angle. The entire image must be the complete rear of the vehicle filling the frame, centered and symmetrical. Display company name "${form.company_name}" and phone number on the tailgate.`;
      viewPrompt += ` Do NOT add any red and white chevron hazard tape or safety striped band across the tailgate or rear bumper.`;
      viewPrompt += ` High quality, sharp details, professional commercial vehicle graphics.`;
      break;

    default:
      viewPrompt = ` Photorealistic 3D render, LEFT SIDE VIEW showing the full left side panel wrap design. High quality, sharp details, professional commercial vehicle graphics.`;
  }
  const viewNegative = (view === "front" || view === "rear") ? ` CRITICAL ANGLE CONSTRAINT: This image must show ONLY the ${view.toUpperCase()} of the vehicle from a straight head-on ${view} camera angle. Absolutely NO side panels, NO side doors, NO quarter panels, NO profile/3-quarter views. The vehicle must be directly facing the camera — a flat, symmetrical, straight-on ${view} perspective filling the entire frame. Do NOT rotate or angle the vehicle. Negative prompt: no side view, no side panels, no 3/4 angle, no profile, no multiple views, no collage, single straight ${view} view only.` : "";

  return `${globalVehicleRule}${viewPrompt}${viewNegative}${baseInfo}${consistencyRule}${logoInstruction}${styleInstruction}${wrapCoverageInstruction}${symmetryRule}${exclusionRules}`;
}

export default function MyDesign() {
  const { user, isAuthenticated, logout, navigateToLogin } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingReference, setUploadingReference] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [blueprint, setBlueprint] = useState({ front: null, side: null });
  const [generatingBlueprint, setGeneratingBlueprint] = useState(false);
  const [designCount, setDesignCount] = useState(0);
  const FREE_DESIGN_LIMIT = 2;
  const isAdmin = user?.email === "totalcc@gmail.com";
  const [form, setForm] = useState({
    company_name: "",
    phone: "",
    website: "",
    logo_url: "",
    reference_file_url: "",
    mockup_url: "",
    right_mockup_url: "",
    front_mockup_url: "",
    rear_mockup_url: "",
    vehicle_type: "",
    vehicle_color: "",
    vehicle_year: "",
    design_style: "",
    wrap_type: "Full Wrap"
  });

  const [mockups, setMockups] = useState({
    left: null,
    right: null,
    front: null,
    rear: null,
  });

  useEffect(() => {
    if (!isAuthenticated) return;
    loadProfile();
  }, [isAuthenticated]);

  const loadProfile = async () => {
    try {
      const profiles = await base44.entities.CompanyProfile.list();
      if (profiles.length > 0) {
        const p = profiles[0];
        setProfile(p);
        setForm({
          company_name: p.company_name || "",
          phone: p.phone || "",
          website: p.website || "",
          logo_url: p.logo_url || "",
          reference_file_url: p.reference_file_url || "",
          mockup_url: p.mockup_url || "",
          right_mockup_url: p.right_mockup_url || "",
          front_mockup_url: p.front_mockup_url || "",
          rear_mockup_url: p.rear_mockup_url || "",
          vehicle_type: p.vehicle_type || "",
          vehicle_color: p.vehicle_color || "",
          vehicle_year: p.vehicle_year || "",
          design_style: p.design_style || "",
          wrap_type: p.wrap_type || "Full Wrap"
        });

        setMockups({
          left: p.mockup_url || null,
          right: p.right_mockup_url || null,
          front: p.front_mockup_url || null,
          rear: p.rear_mockup_url || null,
        });

        setBlueprint({
          front: p.blueprint_front_url || null,
          side: p.blueprint_side_url || null,
        });

        setDesignCount(p.design_count || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, logo_url: file_url }));
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleReferenceUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingReference(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, reference_file_url: file_url }));
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingReference(false);
    }
  };

  const handleRemoveReference = () => {
    setForm((f) => ({ ...f, reference_file_url: "" }));
  };

  const buildBlueprintPrompt = (view, form) => {
    const vehicleType = form.vehicle_type || "commercial van";
    const vehicleColor = form.vehicle_color || "white";
    const vehicleYear = form.vehicle_year || "";
    const vehicleSpec = `${vehicleYear ? `${vehicleYear} ` : ""}${vehicleColor} ${vehicleType}`;

    const baseRule = `Create a precise technical blueprint / engineering line drawing of a ${vehicleSpec}. This is a VEHICLE BLUEPRINT — a clean, accurate, to-scale technical illustration showing the exact vehicle body shape, proportions, and dimensions. Style: white background, thin black technical lines, no color fill, no graphics, no branding, no text overlays. Show accurate vehicle outline with precise body panels, doors, windows, wheels, headlights, and bumpers.`;

    if (view === "front") {
      return `${baseRule} STRICTLY FRONT VIEW ONLY — camera positioned directly in front of the vehicle, head-on straight angle. Show ONLY the exact front fascia: front grille, headlights, front bumper, hood/bonnet, and front windscreen. The entire image must be the front of the vehicle filling the frame, centered and symmetrical. Technical blueprint style, precise proportions, no side panels visible.`;
    }
    return `${baseRule} STRICTLY SIDE VIEW ONLY — exact profile of the vehicle. Show the complete left side: full body outline, side doors, windows, wheel arches, side mirrors. The entire image must be the side profile of the vehicle filling the frame. Technical blueprint style, precise proportions, no front or rear angle visible.`;
  };

  const generateBlueprint = async () => {
    setGeneratingBlueprint(true);
    try {
      const vehicleTemplate = matchVehicleTemplate(form.vehicle_type);
      const blueprintRefImages = vehicleTemplate ? [vehicleTemplate.url] : [];

      const [frontResult, sideResult] = await Promise.all([
        base44.integrations.Core.GenerateImage({
          prompt: buildBlueprintPrompt("front", form),
          ...(blueprintRefImages.length > 0 ? { existing_image_urls: blueprintRefImages } : {}),
        }),
        base44.integrations.Core.GenerateImage({
          prompt: buildBlueprintPrompt("side", form),
          ...(blueprintRefImages.length > 0 ? { existing_image_urls: blueprintRefImages } : {}),
        }),
      ]);

      const newBlueprint = { front: frontResult.url, side: sideResult.url };
      setBlueprint(newBlueprint);

      const data = {
        ...form,
        blueprint_front_url: newBlueprint.front,
        blueprint_side_url: newBlueprint.side,
      };

      if (profile) {
        const updated = await base44.entities.CompanyProfile.update(profile.id, data);
        setProfile(updated);
      } else {
        const created = await base44.entities.CompanyProfile.create(data);
        setProfile(created);
      }

      return newBlueprint;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setGeneratingBlueprint(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.company_name.trim()) {
      return;
    }

    let activeBlueprint = blueprint;
    if (!blueprint.front || !blueprint.side) {
      activeBlueprint = await generateBlueprint();
      if (!activeBlueprint) return;
    }

    setGenerating(true);
    setProgress(0);
    try {
      if (!isAdmin && designCount >= FREE_DESIGN_LIMIT) {
        return;
      }
      const newMockups = { ...mockups };

      const vehicleTemplate = matchVehicleTemplate(form.vehicle_type);

      await Promise.all(VIEWS.map(async (view) => {
        let prompt = buildPrompt(view, form);
        const refImages = [form.logo_url, form.reference_file_url, activeBlueprint.front, activeBlueprint.side].filter(Boolean);
        if (vehicleTemplate) {
          refImages.unshift(vehicleTemplate.url);
          prompt = `CRITICAL VEHICLE SHAPE LOCK: The attached blueprint/specification image shows the EXACT vehicle shape and proportions that MUST be preserved. Use this vehicle template as the base — do NOT change the vehicle make, model, body shape, or proportions. Apply ONLY the wrap design and branding graphics on top of this exact vehicle shape. ${vehicleTemplate.name} — keep its exact body style, door layout, window shapes, and proportions. ${prompt}`;
        }
        const result = await base44.integrations.Core.GenerateImage({
          prompt,
          ...(refImages.length > 0 ? { existing_image_urls: refImages } : {})
        });
        newMockups[view] = result.url;
        setProgress((p) => p + 1);
      }));

      const newCount = isAdmin ? designCount : designCount + 1;
      const data = {
        ...form,
        blueprint_front_url: activeBlueprint.front,
        blueprint_side_url: activeBlueprint.side,
        mockup_url: newMockups.left,
        right_mockup_url: newMockups.right,
        front_mockup_url: newMockups.front,
        rear_mockup_url: newMockups.rear,
        design_count: newCount,
      };

      if (profile) {
        const updated = await base44.entities.CompanyProfile.update(profile.id, data);
        setProfile(updated);
      } else {
        const created = await base44.entities.CompanyProfile.create(data);
        setProfile(created);
      }
      setForm((f) => ({
        ...f,
        mockup_url: newMockups.left,
        right_mockup_url: newMockups.right,
        front_mockup_url: newMockups.front,
        rear_mockup_url: newMockups.rear,
      }));
      setMockups(newMockups);
      setDesignCount(newCount);

      const generatedViews = Object.entries(newMockups).filter(([, url]) => url);
      const mockupLinks = generatedViews.map(([v, url]) => `<a href="${url}" target="_blank">${viewLabels[v]}</a>`).join("<br>");
      const mockupLinksHtml = mockupLinks;
      try {
        await base44.integrations.Core.SendEmail({
          to: "totalcc@gmail.com",
          subject: `New Design Mockup - Side & Rear Views - ${form.company_name}`,
          body: `A member has generated side and rear vehicle wrap mockup views.<br><br>
            <strong>Company Name:</strong> ${form.company_name}<br>
            <strong>Member Email:</strong> ${user?.email || "—"}<br>
            <strong>Phone:</strong> ${form.phone || "—"}<br>
            <strong>Website/Facebook:</strong> ${form.website || "—"}<br>
            <strong>Vehicle Type:</strong> ${form.vehicle_type || "—"}<br>
            <strong>Vehicle Color:</strong> ${form.vehicle_color || "—"}<br>
            <strong>Vehicle Year:</strong> ${form.vehicle_year || "—"}<br>
            <strong>Wrap Type:</strong> ${form.wrap_type || "Full Wrap"}<br>
            <strong>Design Style:</strong> ${form.design_style || "—"}<br><br>
            <strong>Generated Mockups:</strong><br>
            ${mockupLinksHtml}`
        });
      } catch (_) {}
      if (user?.email) {
        try {
          await base44.integrations.Core.SendEmail({
            to: user.email,
            subject: `Your 2-View Design Mockup - ${form.company_name}`,
            body: `<p>Hi,</p>
              <p>Your vehicle wrap design mockup has been generated.</p>
              <p><strong>Company Name:</strong> ${form.company_name}<br>
              <strong>Vehicle Type:</strong> ${form.vehicle_type || "—"}<br>
              <strong>Vehicle Color:</strong> ${form.vehicle_color || "—"}<br>
              <strong>Vehicle Year:</strong> ${form.vehicle_year || "—"}<br>
              <strong>Wrap Type:</strong> ${form.wrap_type || "Full Wrap"}</p>
              <p><strong>Generated Mockups:</strong><br>
              ${mockupLinksHtml}</p>
              <p>This is a rough draft. We will update the design and get back to you with a quote soon.</p>
              <p>Signad Vehicle Graphics</p>`
          });
        } catch (_) {}
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black pt-32 lg:pt-80">
        <div className="text-center">
          <Car className="w-16 h-16 text-[#F39C12] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Members Only</h2>
          <p className="text-white/60 mb-6">Please log in to use the design mockup tool.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigateToLogin()}
              className="px-6 py-2.5 rounded-md bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
              Login
            </button>
            <a
              href="/register"
              className="px-6 py-2.5 rounded-md bg-[#F39C12] text-black font-semibold text-sm hover:bg-[#ffb84d] transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      </div>);
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black pt-32 lg:pt-80">
        <Loader2 className="w-8 h-8 text-[#F39C12] animate-spin" />
      </div>);
  }

  const hasAnyMockup = Object.values(mockups).some(Boolean);

  return (
    <div className="min-h-screen bg-black pt-32 lg:pt-80 pb-16">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* My Design symbol + Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F39C12]/20 via-[#F39C12]/10 to-transparent border-2 border-[#F39C12]/50 shadow-[0_0_30px_rgba(243,156,18,0.2)]">
            <Palette className="w-7 h-7 text-[#F39C12]" />
            <span className="text-2xl font-display font-extrabold tracking-wide">
              <span className="text-white">My</span>
              <span className="text-[#F39C12]">Design</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-white/50 text-sm font-medium">Connect:</span>
            <a
              href="https://www.facebook.com/signad04nz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Signad+Vehicle+Graphics+New+Zealand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors">
              <GoogleIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-3">
            Create Your Vehicle Wrap Mockup
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Enter your company details and our AI will generate side and rear vehicle wrap views.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <Label className="text-white mb-1.5 block">Company Name *</Label>
              <Input
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                placeholder="e.g. ABC Trading"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Phone Number</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 09-123-4567"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Website / Facebook Page</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="e.g. www.yourcompany.co.nz or facebook.com/yourpage"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div className="border-t border-white/10 pt-5">
              <h3 className="text-white font-semibold mb-3 text-sm">Vehicle Details</h3>
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Vehicle Type</Label>
              <Input
                value={form.vehicle_type}
                onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
                placeholder="e.g. Van, Sedan, Truck, SUV"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Vehicle Color</Label>
              <Input
                value={form.vehicle_color}
                onChange={(e) => setForm({ ...form, vehicle_color: e.target.value })}
                placeholder="e.g. White, Black, Silver"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Vehicle Year</Label>
              <Input
                value={form.vehicle_year}
                onChange={(e) => setForm({ ...form, vehicle_year: e.target.value })}
                placeholder="e.g. 2023"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Wrap Coverage / Package</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: "Full Wrap", title: "Full Wrap" },
                  { value: "Half Wrap", title: "Half / Partial Wrap" },
                  { value: "Simple", title: "Simple Signage" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, wrap_type: opt.value })}
                    className={`text-center px-3 py-2.5 rounded-lg border transition-colors ${
                      (form.wrap_type || "Full Wrap") === opt.value
                        ? "bg-[#F39C12]/15 border-[#F39C12]"
                        : "bg-black/40 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className={`text-sm font-bold ${(form.wrap_type || "Full Wrap") === opt.value ? "text-[#F39C12]" : "text-white"}`}>
                      {opt.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Company Logo</Label>
              <div className="flex items-center gap-3 flex-wrap">
                {form.logo_url ?
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                    <Image src={form.logo_url} alt="Logo" className="w-full h-full object-contain" fittingType="fit" />
                  </div> :
                <div className="w-20 h-20 rounded-lg border border-dashed border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-white/30" />
                  </div>
                }
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                    {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploadingLogo ? "Uploading..." : "Upload Logo"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                {form.reference_file_url ? (
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <Image src={form.reference_file_url} alt="Reference" className="w-full h-full object-contain" fittingType="fit" />
                    </div>
                    <a
                      href={form.reference_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      <Paperclip className="w-4 h-4" /> View
                    </a>
                    <button
                      type="button"
                      onClick={handleRemoveReference}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                      aria-label="Remove reference file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                      {uploadingReference ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
                      {uploadingReference ? "Uploading..." : "Upload Reference File"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleReferenceUpload} />
                  </label>
                )}
              </div>
            </div>
            <div>
              <Label className="text-white mb-1.5 block">Design Style</Label>
              <Textarea
                value={form.design_style}
                onChange={(e) => setForm({ ...form, design_style: e.target.value })}
                placeholder="e.g. Clean and modern style, black and orange colour, geometric patterns, retro vibe, minimal text-focused, etc."
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30 min-h-[100px]" />
            </div>

            <Button
              type="submit"
              disabled={generating || generatingBlueprint || (!isAdmin && designCount >= FREE_DESIGN_LIMIT)}
              className="w-full bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] disabled:opacity-50">
              {!isAdmin && designCount >= FREE_DESIGN_LIMIT ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Free Design Limit Reached ({designCount}/{FREE_DESIGN_LIMIT})
                </>
              ) : generatingBlueprint ? (
                <>
                  <Ruler className="w-4 h-4 mr-2 animate-spin" />
                  Generating Blueprint...
                </>
              ) : generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Design... ({progress}/2)
                </>
              ) : blueprint.front && blueprint.side ? (
                <>
                  <Car className="w-4 h-4 mr-2" />
                  🚗 Start Design (2-View)
                </>
              ) : (
                <>
                  <Ruler className="w-4 h-4 mr-2" />
                  📐 Start Pre-Design ({designCount}/{FREE_DESIGN_LIMIT})
                </>
              )}
            </Button>
            {!isAdmin && designCount >= FREE_DESIGN_LIMIT && (
              <p className="text-center text-white/50 text-sm mt-2">
                You have used all {FREE_DESIGN_LIMIT} free design attempts. Please request a quote for additional designs.
              </p>
            )}
          </form>

          {/* Mockup Preview — 2x2 Grid */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F39C12]" />
                Side &amp; Rear Views
              </h3>
              {hasAnyMockup && !generating && (
                <div className="flex items-center gap-2">
                  <a
                    href={Object.values(mockups).filter(Boolean)[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F39C12] text-black text-xs font-bold hover:bg-[#ffb84d] transition-colors"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    Download All
                  </a>
                  <button
                    type="button"
                    onClick={() => setSummaryOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Summary &amp; Export
                  </button>
                </div>
              )}
            </div>

            {generating ? (
              <div className="grid grid-cols-2 gap-3">
                {VIEWS.map((v, i) => (
                  <div key={v} className="aspect-[4/3] rounded-lg bg-black/40 border border-white/10 flex flex-col items-center justify-center">
                    {progress > i ? (
                      <Check className="w-8 h-8 text-green-500 mb-2" />
                    ) : (
                      <Loader2 className="w-8 h-8 text-[#F39C12] animate-spin mb-2" />
                    )}
                    <p className="text-white/50 text-xs">{viewLabels[v]}</p>
                  </div>
                ))}
              </div>
            ) : hasAnyMockup ? (
              <div className="grid grid-cols-2 gap-3">
                {VIEWS.map((v) => (
                  mockups[v] ? (
                    <div
                      key={v}
                      className="relative group cursor-pointer rounded-lg overflow-hidden border border-white/10"
                      onClick={() => setZoomImage({ key: v })}
                    >
                      <Image src={mockups[v]} alt={viewLabels[v]} className="w-full aspect-[4/3] object-cover" fittingType="fill" />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">{viewLabels[v]}</div>
                      <a
                        href={mockups[v]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#F39C12] hover:text-black transition-colors"
                        aria-label={`Download ${viewLabels[v]}`}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div key={v} className="aspect-[4/3] rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white/10" />
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <Car className="w-16 h-16 text-white/20 mb-3" />
                <p className="text-white/40">Enter your details and click</p>
                <p className="text-white/40">"Start Pre-Design" to see your mockups here.</p>
              </div>
            )}

            {/* Progress bar during generation */}
            {generating && (
              <div className="mt-4">
                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#F39C12] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(progress / 2) * 100}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs text-center mt-2">Generating {progress} of 2 views...</p>
              </div>
            )}

            {/* Share & Lead Capture — shown after mockups are generated */}
            {hasAnyMockup && !generating && (
              <ShareLeadCapture mockups={mockups} form={form} />
            )}
          </div>
        </div>
      </div>

      {/* Lightbox with navigation */}
      <MockupLightbox
        views={VIEWS.filter((v) => mockups[v]).map((v) => ({ key: v, label: viewLabels[v], url: mockups[v] }))}
        currentKey={zoomImage?.key}
        onClose={() => setZoomImage(null)}
        onNavigate={(key) => setZoomImage({ key })}
      />

      <DesignSummary
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        form={form}
        mockups={mockups}
      />
    </div>);
}