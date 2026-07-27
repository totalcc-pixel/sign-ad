import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function Quote() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_type: "",
    service_type: "Full Vehicle Wrap",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await base44.entities.QuoteRequest.create(form);
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please call us on 027-4320-180.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Free Quote</span>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white mt-3">
            Get a Quote
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Tell us about your vehicle and what you're after. We'll get back to you with a tailored quote.
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          {done ? (
            <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F39C12]/15 mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#F39C12]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-zinc-900">Request Received!</h2>
              <p className="mt-3 text-zinc-500">
                Thanks, {form.name.split(" ")[0] || "there"}! Our team will be in touch shortly with your quote.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-zinc-100 p-8 sm:p-10 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="027 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Input id="vehicle" value={form.vehicle_type} onChange={(e) => set("vehicle_type", e.target.value)} placeholder="e.g. Ford Transit 2021" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select value={form.service_type} onValueChange={(v) => set("service_type", v)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Vehicle Wrap">Full Vehicle Wrap</SelectItem>
                    <SelectItem value="Partial Wrap & Decals">Partial Wrap & Decals</SelectItem>
                    <SelectItem value="Commercial Fleet">Commercial Fleet</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell us about your design ideas, colours, timeline..."
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={submitting} className="w-full bg-[#F39C12] text-black hover:bg-[#ffb84d] text-base py-6 font-semibold">
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  "Request Free Quote"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}