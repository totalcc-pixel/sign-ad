import React from "react";
import { Link } from "react-router-dom";
import { Share2, MessageCircle, Mail, CheckCircle2, Clock, Car } from "lucide-react";

export default function ShareLeadCapture({ mockups, form }) {
  const mockupUrls = Object.entries(mockups).filter(([, url]) => url);
  const shareText = `Check out my Signad vehicle wrap design mockup!`;
  const shareUrl = mockupUrls.length > 0 ? mockupUrls[0][1] : window.location.href;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n")}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${mockupUrls.map(([v, url]) => `${v}: ${url}`).join("\n")}`)}`,
  };

  return (
    <div className="mt-5 bg-gradient-to-r from-[#F39C12]/15 to-transparent border border-[#F39C12]/30 rounded-xl p-5">
      {/* Share buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-white font-bold text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#F39C12]" />
            4면 디자인이 완성되었습니다!
          </h4>
          <p className="text-white/50 text-sm mt-1">공유하거나 아래에서 견적을 요청하세요.</p>
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

      {/* Quote Request CTA */}
      <div className="border-t border-white/10 pt-6 text-center">
        <h4 className="text-white font-bold text-xl mb-2">이 디자인으로 사인에드에게 견적 요청하기</h4>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F39C12]/10 border border-[#F39C12]/30 mb-5">
          <Clock className="w-4 h-4 text-[#F39C12]" />
          <span className="text-white/80 text-sm font-medium">견적 소요 시간: 12시간 ~ 24시간</span>
        </div>
        <div>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F39C12] text-black font-bold text-base hover:bg-[#ffb84d] hover:shadow-[0_0_24px_rgba(243,156,18,0.5)] transition-all duration-300"
          >
            <Car className="w-5 h-5" />
            견적 요청하기
          </Link>
        </div>
      </div>
    </div>
  );
}