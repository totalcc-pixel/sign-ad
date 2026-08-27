import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Loader2, Car, Upload, CheckCircle, Facebook, Palette, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";
import GoogleIcon from "@/components/GoogleIcon";

export default function MyDesign() {
  const { user, isAuthenticated, logout, navigateToLogin } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedMockup, setGeneratedMockup] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    phone: "",
    address: "",
    logo_url: "",
    mockup_url: "",
    vehicle_type: "",
    vehicle_color: "",
    vehicle_year: "",
    design_style: ""
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
          vehicle_type: p.vehicle_type || "",
          vehicle_color: p.vehicle_color || "",
          vehicle_year: p.vehicle_year || "",
          design_style: p.design_style || ""
        });
        setGeneratedMockup(p.mockup_url || null);
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
    try {
      // Generate vehicle wrap mockup using AI
      const vehicleType = form.vehicle_type || "commercial van";
      const vehicleColor = form.vehicle_color || "white";
      const vehicleYear = form.vehicle_year || "";
      const logoInstruction = form.logo_url ?
      ` IMPORTANT: You must incorporate the uploaded company logo as the central branding element on the vehicle side. Use the logo's exact design, colors, and text. Place the logo prominently and scale it to be clearly visible. The logo is the primary graphic on the wrap.` :
      "";
      const designStyle = form.design_style?.trim();
      const styleInstruction = designStyle ?
      ` The client requests the following design style: ${designStyle}. Incorporate this style direction into the wrap design, colors, layout, and overall aesthetic.` :
      "";
      const prompt = `Professional vehicle wrap design mockup for a ${vehicleYear ? `${vehicleYear} ` : ""}${vehicleColor} ${vehicleType}. The vehicle features the company name "${form.company_name}" prominently displayed on the side. ${form.phone ? `Phone number: ${form.phone}.` : ""} ${form.address ? `Address: ${form.address}.` : ""} Modern, clean automotive vinyl wrap design with bold typography and professional branding. Photorealistic 3D render of a ${vehicleColor} ${vehicleType} parked in a clean studio environment, side view showing the full wrap design. High quality, sharp details, professional commercial vehicle graphics.${logoInstruction}${styleInstruction}`;

      const result = await base44.integrations.Core.GenerateImage({
        prompt,
        ...(form.logo_url ? { existing_image_urls: [form.logo_url] } : {})
      });

      const mockupUrl = result.url;
      const data = { ...form, mockup_url: mockupUrl };

      if (profile) {
        const updated = await base44.entities.CompanyProfile.update(profile.id, data);
        setProfile(updated);
      } else {
        const created = await base44.entities.CompanyProfile.create(data);
        setProfile(created);
      }
      setForm((f) => ({ ...f, mockup_url: mockupUrl }));
      setGeneratedMockup(mockupUrl);
      try {
        await base44.integrations.Core.SendEmail({
          to: "totalcc@gmail.com",
          subject: `New Design Mockup Request - ${form.company_name}`,
          body: `A member has generated a new vehicle wrap mockup.<br><br>
            <strong>Company Name:</strong> ${form.company_name}<br>
            <strong>Member Email:</strong> ${user?.email || "—"}<br>
            <strong>Phone:</strong> ${form.phone || "—"}<br>
            <strong>Address:</strong> ${form.address || "—"}<br>
            <strong>Vehicle Type:</strong> ${form.vehicle_type || "—"}<br>
            <strong>Vehicle Color:</strong> ${form.vehicle_color || "—"}<br>
            <strong>Vehicle Year:</strong> ${form.vehicle_year || "—"}<br>
            <strong>Design Style:</strong> ${form.design_style || "—"}<br><br>
            <a href="${mockupUrl}" target="_blank">View Generated Mockup</a>`
        });
      } catch (_) {}
      toast({ title: "Mockup Generated", description: "Your vehicle wrap mockup has been created." });
    } catch (e) {
      console.error(e);
      toast({ title: "Generation Failed", description: "An error occurred while generating the mockup.", variant: "destructive" });
    } finally {
      setGenerating(false);
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
             Enter your company details and our AI will generate a custom vehicle wrap mockup for you.
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
            <Button
              type="submit"
              disabled={generating}
              className="w-full bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] disabled:opacity-50">
              
              {generating ?
              <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                  </> :

                  <>
                  <Car className="w-4 h-4 mr-2" />
                  Generate Mockup
                </>
              }
            </Button>
          </form>

          {/* Mockup Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#F39C12]" />
               Generated Mockup
            </h3>
            {generating ?
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-10 h-10 text-[#F39C12] animate-spin mb-3" />
                <p className="text-white/60 text-sm">AI is generating your vehicle wrap mockup...</p>
              </div> :
            generatedMockup ?
            <div className="flex-1">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <Image src={generatedMockup} alt="Vehicle wrap mockup" className="w-full" fittingType="fit" />
                </div>
                <a
                href={generatedMockup}
                download
                className="mt-4 inline-flex items-center gap-2 text-[#F39C12] text-sm font-medium hover:underline">
                
                  <Upload className="w-4 h-4" />
                  Download Image
                </a>
              </div> :

            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-center">
                <Car className="w-16 h-16 text-white/20 mb-3" />
                <p className="text-white/40">Enter your company details and click "Generate Mockup"</p>
                <p className="text-white/40">to see your custom vehicle wrap mockup here.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}