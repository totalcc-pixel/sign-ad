import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Loader2, MessageCircle, Mail, CheckCircle2, Clock, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ShareLeadCapture({ mockups, form }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "", location: "" });

  const mockupUrls = Object.entries(mockups).filter(([, url]) => url);
  const shareText = `Check out my Signad vehicle wrap design mockup!`;
  const shareUrl = mockupUrls.length > 0 ? mockupUrls[0][1] : window.location.href;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n")}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n")}`)}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const mockupLinks = mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n");
      await base44.entities.QuoteRequest.create({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        service_type: "Full Vehicle Wrap",
        message: `Quote request from My Design page.\nLocation/Suburb: ${lead.location}\nCompany: ${form.company_name || "—"}\nVehicle: ${form.vehicle_type || "—"} (${form.vehicle_year || "—"})\nWrap Coverage: ${form.wrap_type || "Full Wrap"}\n\nDesign Mockup Links:\n${mockupLinks}`,
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "totalcc@gmail.com",
          subject: `New Quote Request with Design — ${lead.name}`,
          body: `A lead from the My Design page requested an official quote.<br><br>
            <strong>Name:</strong> ${lead.name}<br>
            <strong>Phone:</strong> ${lead.phone || "—"}<br>
            <strong>Email:</strong> ${lead.email}<br>
            <strong>Suburb/Location:</strong> ${lead.location || "—"}<br>
            <strong>Company:</strong> ${form.company_name || "—"}<br>
            <strong>Vehicle:</strong> ${form.vehicle_type || "—"} (${form.vehicle_year || "—"})<br>
            <strong>Wrap Coverage:</strong> ${form.wrap_type || "Full Wrap"}<br><br>
            <strong>Design Mockup Links:</strong><br>
            ${mockupUrls.map(([v, url]) => `<a href="${url}" target="_blank">${v}</a>`).join("<br>")}`,
        });
      } catch (_) {}
      setDone(true);
      toast({ title: "Quote Request Sent!", description: "Our team will contact you shortly." });
    } catch (e) {
      toast({ title: "Submission Failed", description: "Please try again or call 027-4320-180.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setDone(false);
    setLead({ name: "", phone: "", email: "", location: "" });
  };

  return (
    <div className="mt-5 bg-gradient-to-r from-[#F39C12]/15 to-transparent border border-[#F39C12]/30 rounded-xl p-5">
      {/* Share buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-white font-bold text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#F39C12]" />
            Your 4-View Mockup is Ready!
          </h4>
          <p className="text-white/50 text-sm mt-1">Share it or request an official quote with this design below.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#1864c4] transition-colors"
          >
            <Share2 className="w-4 h-4" /> Facebook
          </a>
          <a
            href={shareLinks.email}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      </div>

      {/* Inline Quote Request Form */}
      <div className="border-t border-white/10 pt-6">
        {done ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#F39C12] mx-auto mb-3" />
            <h4 className="text-white font-bold text-lg mb-2">견적 요청이 완료되었습니다!</h4>
            <p className="text-white/70 max-w-md mx-auto">
              감사합니다, {lead.name.split(" ")[0]}님! 저희 팀이 12~24시간 이내에 연락드리며, 첫 거래 시 10% 할인이 적용됩니다.
            </p>
            <Button onClick={resetForm} className="mt-5 bg-[#F39C12] text-black hover:bg-[#ffb84d]">
              새 견적 요청하기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-[#F39C12]" />
              <h4 className="text-white font-bold text-lg">이 디자인으로 사인에드에게 견적 요청하기</h4>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F39C12]/10 border border-[#F39C12]/30 mb-2">
              <Clock className="w-4 h-4 text-[#F39C12]" />
              <span className="text-white/80 text-sm font-medium">견적 소요 시간: 12시간 ~ 24시간</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-1.5 block">이름 *</Label>
                <Input
                  required
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  placeholder="홍길동"
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white mb-1.5 block">연락처 *</Label>
                <Input
                  required
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  placeholder="021 123 4567"
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white mb-1.5 block">이메일 *</Label>
                <Input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  placeholder="you@email.com"
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white mb-1.5 block">지역 / suburb</Label>
                <Input
                  value={lead.location}
                  onChange={(e) => setLead({ ...lead, location: e.target.value })}
                  placeholder="예: Albany, Auckland"
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#F39C12] text-black font-bold hover:bg-[#ffb84d] disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 전송 중...</>
              ) : (
                "견적 요청하기"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}