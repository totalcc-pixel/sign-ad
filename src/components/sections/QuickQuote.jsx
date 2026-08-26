import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2, Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";

const vehicleTypeOptions = [
  "Van",
  "Ute",
  "Truck",
  "Car",
  "SUV",
  "Trailer",
  "Other",
];

const serviceOptions = [
  "Simple Vehicle Lettering",
  "Partial Vehicle Graphics",
  "Full Vehicle Graphics",
  "Not Sure — Recommend an Option",
];

export default function QuickQuote() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    vehicle_type: "",
    service_type: "Full Vehicle Graphics",
    message: "",
  });
  const [vehiclePhotoUrl, setVehiclePhotoUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setVehiclePhotoUrl(file_url);
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setLogoUrl(file_url);
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploadingLogo(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        vehicle_type: form.vehicle_type || vehicleTypeOptions[0],
        message: [
          form.message || "",
          vehiclePhotoUrl ? `Vehicle Photo: ${vehiclePhotoUrl}` : "",
          logoUrl ? `Business Logo: ${logoUrl}` : "",
        ].filter(Boolean).join("\n"),
      };
      await base44.entities.QuoteRequest.create(payload);
      try {
        await base44.integrations.Core.SendEmail({
          to: "totalcc@gmail.com",
          subject: `New Quote Request from ${form.name}`,
          body: `A new quote request has been submitted.<br><br>
            <strong>Name:</strong> ${form.name}<br>
            <strong>Email:</strong> ${form.email}<br>
            <strong>Phone:</strong> ${form.phone || "—"}<br>
            <strong>Vehicle Make:</strong> ${form.vehicle_make || "—"}<br>
            <strong>Vehicle Model:</strong> ${form.vehicle_model || "—"}<br>
            <strong>Vehicle Year:</strong> ${form.vehicle_year || "—"}<br>
            <strong>Vehicle Type:</strong> ${form.vehicle_type || "—"}<br>
            <strong>Service Type:</strong> ${form.service_type}<br>
            ${vehiclePhotoUrl ? `<strong>Vehicle Photo:</strong> <a href="${vehiclePhotoUrl}" target="_blank">View</a><br>` : ""}
            ${logoUrl ? `<strong>Business Logo:</strong> <a href="${logoUrl}" target="_blank">View</a><br>` : ""}
            <strong>Message:</strong> ${form.message || "—"}`,
        });
      } catch (_) {}
      setDone(true);
    } catch {
      setError("Something went wrong. Please call us on 027-4320-180.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center shadow-sm max-w-2xl mx-auto">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F39C12]/15 mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#F39C12]" />
        </div>
        <h3 className="font-display text-2xl font-bold text-zinc-900">Request Received!</h3>
        <p className="mt-3 text-zinc-500">
          Thanks, {form.name.split(" ")[0] || "there"}! Our team will be in touch shortly with your quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-5">
      {/* Contact */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="qq-name">Name *</Label>
          <Input id="qq-name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qq-phone">Phone</Label>
          <Input id="qq-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="027 123 4567" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="qq-email">Email *</Label>
          <Input id="qq-email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" />
        </div>
      </div>

      {/* Vehicle details */}
      <div className="border-t border-zinc-100 pt-5">
        <h4 className="text-sm font-bold text-zinc-900 mb-4">Vehicle Details</h4>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="qq-make">Vehicle Make</Label>
            <Input id="qq-make" value={form.vehicle_make} onChange={(e) => set("vehicle_make", e.target.value)} placeholder="e.g. Toyota" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qq-model">Vehicle Model</Label>
            <Input id="qq-model" value={form.vehicle_model} onChange={(e) => set("vehicle_model", e.target.value)} placeholder="e.g. Hiace" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qq-year">Vehicle Year</Label>
            <Input id="qq-year" value={form.vehicle_year} onChange={(e) => set("vehicle_year", e.target.value)} placeholder="e.g. 2021" />
          </div>
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select value={form.vehicle_type} onValueChange={(v) => set("vehicle_type", v)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {vehicleTypeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Service type */}
      <div className="space-y-2">
        <Label>Service Type</Label>
        <Select value={form.service_type} onValueChange={(v) => set("service_type", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {serviceOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Uploads */}
      <div className="border-t border-zinc-100 pt-5">
        <h4 className="text-sm font-bold text-zinc-900 mb-4">Uploads (Optional)</h4>
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Vehicle photo */}
          <div>
            <Label className="mb-2 block">Upload Vehicle Photo</Label>
            {vehiclePhotoUrl ? (
              <div className="relative w-full h-28 rounded-lg overflow-hidden border border-zinc-200">
                <Image src={vehiclePhotoUrl} alt="Vehicle" className="w-full h-full" fittingType="fill" />
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center w-full h-28 rounded-lg border-2 border-dashed border-zinc-200 hover:border-[#F39C12] transition-colors">
                  {uploadingPhoto ? <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" /> : <ImageIcon className="w-5 h-5 text-zinc-400" />}
                  <span className="text-xs text-zinc-400 mt-1">Click to upload</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}
          </div>
          {/* Business logo */}
          <div>
            <Label className="mb-2 block">Upload Business Logo</Label>
            {logoUrl ? (
              <div className="relative w-full h-28 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                <Image src={logoUrl} alt="Logo" className="w-full h-full" fittingType="fit" />
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center w-full h-28 rounded-lg border-2 border-dashed border-zinc-200 hover:border-[#F39C12] transition-colors">
                  {uploadingLogo ? <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" /> : <Upload className="w-5 h-5 text-zinc-400" />}
                  <span className="text-xs text-zinc-400 mt-1">Click to upload</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="qq-message">Message (Optional)</Label>
        <Textarea
          id="qq-message"
          rows={3}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your design ideas, colours, timeline..."
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={submitting} className="w-full bg-[#F39C12] text-black hover:bg-[#ffb84d] text-base py-6 font-bold">
        {submitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
        ) : (
          "GET MY QUOTE"
        )}
      </Button>
    </form>
  );
}