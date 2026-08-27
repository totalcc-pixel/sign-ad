import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Image as ImageIcon, Loader2, Car, Upload, CheckCircle, Facebook, Palette, LayoutGrid, ZoomIn, Download, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";
import RearDesignControls from "@/components/design/RearDesignControls";
import DesignSummary from "@/components/design/DesignSummary";

const VIEWS = ["left", "right", "front", "rear"];

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

function buildPrompt(view, form, rear) {
  const vehicleType = form.vehicle_type || "commercial van";
  const vehicleColor = form.vehicle_color || "white";
  const vehicleYear = form.vehicle_year || "";
  const baseInfo = `Professional vehicle wrap design for a ${vehicleYear ? `${vehicleYear} ` : ""}${vehicleColor} ${vehicleType}. Company name: "${form.company_name}". ${form.phone ? `Phone: ${form.phone}.` : ""} ${form.address ? `Address: ${form.address}.` : ""}`;
  const logoInstruction = form.logo_url ? ` IMPORTANT: Incorporate the uploaded company logo as the central branding element on the vehicle. Use the logo's exact design, colors, and text.` : "";
  const styleInstruction = form.design_style?.trim() ? ` Design style: ${form.design_style}.` : "";

  const exclusionRules = ` CRITICAL EXCLUSION RULES: Keep both the front and rear bumpers completely clean and blank (factory original paint or unpainted plastic). Do not apply any decals, graphics, text, or wrap patterns to the bumpers. Keep all license plates/number plates completely standard, blank, or clean factory style. Never place logos, wrap designs, graphics, or promotional text over or inside the license plate areas. Negative prompt constraint: no graphics on bumpers, no decals on license plates, clean factory bumpers, standard untouched number plates.`;

  const symmetryRule = (view === "left" || view === "right") ? ` SYMMETRY & BRANDING CONSISTENCY: This side view must share the exact same branding layout, color palette, graphic proportions, and design structure as the opposite side view. Logos, contact details, typography, and wrap patterns must match in relative position, scale, and visual balance on both driver and passenger sides. All text, phone numbers, website URLs, and company logos must be properly oriented and horizontally legible — do NOT mirror or invert readable text.` : "";

  let viewPrompt = "";
  switch (view) {
    case "right":
      viewPrompt = ` Photorealistic 3D render, RIGHT SIDE VIEW showing the full right side panel wrap design. High quality, sharp details, professional commercial vehicle graphics.`;
      break;
    case "front":
      viewPrompt = ` Photorealistic 3D render, FRONT VIEW showing the front grille, headlights, and hood wrap design. High quality, sharp details, professional commercial vehicle graphics.`;
      break;
    case "rear":
      viewPrompt = ` Photorealistic 3D render, REAR VIEW showing the rear window, tailgate/boot door, and rear bumper area. Display company name "${form.company_name}" and phone number on the tailgate.`;
      if (rear.rear_window_perforated) {
        viewPrompt += ` Apply one-way vision perforated vinyl film on the rear window${rear.rear_window_graphics ? ` with text: "${rear.rear_window_graphics}"` : ""}.`;
      }
      if (rear.rear_chevron) {
        viewPrompt += ` Add red and white rear chevron safety reflective stripes on the lower rear for commercial fleet visibility.`;
      }
      viewPrompt += ` High quality, sharp details, professional commercial vehicle graphics.`;
      break;
    default:
      viewPrompt = ` Photorealistic 3D render, LEFT SIDE VIEW showing the full left side panel wrap design. High quality, sharp details, professional commercial vehicle graphics.`;
  }
  return `${baseInfo}${logoInstruction}${styleInstruction}${viewPrompt}${symmetryRule}${exclusionRules}`;
}

export default function MyDesign() {
  const { user, isAuthenticated, logout, navigateToLogin } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [form, setForm] = useState({
    company_name: "",
    phone: "",
    address: "",
    logo_url: "",
    mockup_url: "",
    right_mockup_url: "",
    front_mockup_url: "",
    rear_mockup_url: "",
    vehicle_type: "",
    vehicle_color: "",
    vehicle_year: "",
    design_style: ""
  });
  const [rear, setRear] = useState({
    rear_window_graphics: "",
    rear_window_perforated: false,
    rear_chevron: false,
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
          address: p.address || "",
          logo_url: p.logo_url || "",
          mockup_url: p.mockup_url || "",
          right_mockup_url: p.right_mockup_url || "",
          front_mockup_url: p.front_mockup_url || "",
          rear_mockup_url: p.rear_mockup_url || "",
          vehicle_type: p.vehicle_type || "",
          vehicle_color: p.vehicle_color || "",
          vehicle_year: p.vehicle_year || "",
          design_style: p.design_style || ""
        });
        setRear({
          rear_window_graphics: p.rear_window_graphics || "",
          rear_window_perforated: p.rear_window_perforated || false,
          rear_chevron: p.rear_chevron || false,
        });
        setMockups({
          left: p.mockup_url || null,
          right: p.right_mockup_url || null,
          front: p.front_mockup_url || null,
          rear: p.rear_mockup_url || null,
        });
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
      toast({ title: "Logo Uploaded", description: "Your company logo has been uploaded." });
    } catch (e) {
      toast({ title: "Upload Failed", description: "An error occurred while uploading the logo.", variant: "destructive" });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.company_name.trim()) {
      toast({ title: "Company Name Required", description: "Please enter your company name.", variant: "destructive" });
      return;
    }
    setGenerating(true);
    setProgress(0);
    try {
      const newMockups = { ...mockups };

      await Promise.all(VIEWS.map(async (view) => {
        const prompt = buildPrompt(view, form, rear);
        const result = await base44.integrations.Core.GenerateImage({
          prompt,
          ...(form.logo_url ? { existing_image_urls: [form.logo_url] } : {})
        });
        newMockups[view] = result.url;
        setProgress((p) => p + 1);
      }));

      const data = {
        ...form,
        ...rear,
        mockup_url: newMockups.left,
        right_mockup_url: newMockups.right,
        front_mockup_url: newMockups.front,
        rear_mockup_url: newMockups.rear,
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

      const generatedViews = Object.entries(newMockups).filter(([, url]) => url);
      const mockupLinks = generatedViews.map(([v, url]) => `<a href="${url}" target="_blank">${viewLabels[v]}</a>`).join("<br>");
      const rearConfig = [
        `<strong>One-Way Vision Film:</strong> ${rear.rear_window_perforated ? "Yes" : "No"}`,
        `<strong>Rear Window Text:</strong> ${rear.rear_window_graphics || "—"}`,
        `<strong>Rear Chevron Stripes:</strong> ${rear.rear_chevron ? "Yes" : "No"}`,
      ].join("<br>");

      try {
        await base44.integrations.Core.SendEmail({
          to: "totalcc@gmail.com",
          subject: `New Design Mockup - All 4 Views - ${form.company_name}`,
          body: `A member has generated all 4 vehicle wrap mockup views.<br><br>
            <strong>Company Name:</strong> ${form.company_name}<br>
            <strong>Member Email:</strong> ${user?.email || "—"}<br>
            <strong>Phone:</strong> ${form.phone || "—"}<br>
            <strong>Address:</strong> ${form.address || "—"}<br>
            <strong>Vehicle Type:</strong> ${form.vehicle_type || "—"}<br>
            <strong>Vehicle Color:</strong> ${form.vehicle_color || "—"}<br>
            <strong>Vehicle Year:</strong> ${form.vehicle_year || "—"}<br>
            <strong>Design Style:</strong> ${form.design_style || "—"}<br><br>
            <strong>Rear View Configuration:</strong><br>
            ${rearConfig}<br><br>
            <strong>Generated Mockups:</strong><br>
            ${mockupLinks}`
        });
      } catch (_) {}
      toast({ title: "All Views Generated", description: "4 vehicle wrap mockups have been created." });
    } catch (e) {
      console.error(e);
      toast({ title: "Generation Failed", description: "An error occurred while generating the mockups.", variant: "destructive" });
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black pt-24 lg:pt-48">
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
      <div className="min-h-[60vh] flex items-center justify-center bg-black pt-24 lg:pt-48">
        <Loader2 className="w-8 h-8 text-[#F39C12] animate-spin" />
      </div>);
  }

  const hasAnyMockup = Object.values(mockups).some(Boolean);

  return (
    <div className="min-h-screen bg-black pt-24 lg:pt-48 pb-16">
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
            Enter your company details and our AI will generate all 4 vehicle wrap views at once.
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
              <Label className="text-white mb-1.5 block">Address</Label>
              <Textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Auckland, New Zealand"
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
              <Label className="text-white mb-1.5 block">Company Logo</Label>
              <div className="flex items-center gap-3">
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

            {/* Rear View Design Controls */}
            <RearDesignControls rear={rear} setRear={setRear} />

            <Button
              type="submit"
              disabled={generating}
              className="w-full bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] disabled:opacity-50">
              {generating ?
              <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating... ({progress}/4)
                </> :
              <>
                  <Car className="w-4 h-4 mr-2" />
                  🚗 Generate All 4 Views (Front, Rear, Left &amp; Right)
                </>
              }
            </Button>
          </form>

          {/* Mockup Preview — 2x2 Grid */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F39C12]" />
                All 4 Views
              </h3>
              {hasAnyMockup && !generating && (
                <button
                  type="button"
                  onClick={() => setSummaryOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Summary &amp; Export
                </button>
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
                      onClick={() => setZoomImage({ url: mockups[v], title: viewLabels[v] })}
                    >
                      <Image src={mockups[v]} alt={viewLabels[v]} className="w-full aspect-[4/3] object-cover" fittingType="fill" />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">{viewLabels[v]}</div>
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
                <p className="text-white/40">"Generate All 4 Views" to see your mockups here.</p>
              </div>
            )}

            {/* Progress bar during generation */}
            {generating && (
              <div className="mt-4">
                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#F39C12] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(progress / 4) * 100}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs text-center mt-2">Generating {progress} of 4 views...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={!!zoomImage} onOpenChange={(v) => !v && setZoomImage(null)}>
        <DialogContent className="max-w-5xl bg-[#121623] border-white/10">
          <DialogTitle className="text-white">{zoomImage?.title}</DialogTitle>
          {zoomImage && (
            <div className="space-y-3">
              <Image src={zoomImage.url} alt={zoomImage.title} className="w-full rounded-lg" fittingType="fit" />
              <a
                href={zoomImage.url}
                download
                className="inline-flex items-center gap-2 text-[#F39C12] text-sm font-medium hover:underline"
              >
                <Download className="w-4 h-4" />
                Download Image
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DesignSummary
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        form={form}
        rear={rear}
        mockups={mockups}
      />
    </div>);
}