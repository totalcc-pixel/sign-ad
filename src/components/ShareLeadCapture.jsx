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
          subject: `[Signad] 견적 요청이 접수되었습니다`,
          body: `<p>안녕하세요,</p>
            <p>고객님의 견적 요청이 정상적으로 접수되었습니다.</p>
            <p><strong>업체명:</strong> ${company}<br>
            <strong>차량:</strong> ${vehicle}<br>
            <strong>랩 종류:</strong> ${wrapType}</p>
            <p>저희 팀이 검토 후 12~24시간 이내에 연락드리겠습니다.</p>
            <p>감사합니다.<br>Signad Vehicle Graphics</p>`,
        });
      } catch (_) {}

      alert("견적 요청이 접수되었습니다! 이메일을 확인해주세요. 메인페이지로 이동합니다.");
      navigate("/");
    } catch (e) {
      alert("견적 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-5 bg-gradient-to-r from-[#F39C12]/15 to-transparent border border-[#F39C12]/30 rounded-xl p-5">
      <div className="text-center">
        <h4 className="text-white font-bold text-lg flex items-center justify-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-[#F39C12]" />
          4면 디자인이 완성되었습니다!
        </h4>
        <h4 className="text-white font-bold text-xl mb-2">이 디자인으로 사인에드에게 견적 요청하기</h4>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F39C12]/10 border border-[#F39C12]/30 mb-5">
          <Clock className="w-4 h-4 text-[#F39C12]" />
          <span className="text-white/80 text-sm font-medium">견적 소요 시간: 12시간 ~ 24시간</span>
        </div>
        <div>
          <button
            onClick={handleQuoteRequest}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F39C12] text-black font-bold text-base hover:bg-[#ffb84d] hover:shadow-[0_0_24px_rgba(243,156,18,0.5)] transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> 전송 중...</> : <><Car className="w-5 h-5" /> 견적 요청하기</>}
          </button>
        </div>
      </div>
    </div>
  );
}