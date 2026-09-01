import React from "react";
import { Image } from "@/components/ui/image";
import { Ruler, Lock, CheckCircle2 } from "lucide-react";

export default function BlueprintViewer({ blueprint, generating }) {
  const hasBlueprint = blueprint.front || blueprint.side;

  if (generating) {
    return (
      <div className="bg-white/5 border border-[#F39C12]/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="w-5 h-5 text-[#F39C12] animate-pulse" />
          <h3 className="text-white font-semibold">차량 블루프린트 생성 중...</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["정면", "측면"].map((label) => (
            <div key={label} className="aspect-[4/3] rounded-lg bg-black/40 border border-white/10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#F39C12] border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-white/50 text-xs">{label} 블루프린트</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!hasBlueprint) return null;

  return (
    <div className="bg-white/5 border border-[#F39C12]/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-[#F39C12]" />
          <h3 className="text-white font-semibold">차량 블루프린트</h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F39C12]/10 border border-[#F39C12]/30">
          <Lock className="w-3.5 h-3.5 text-[#F39C12]" />
          <span className="text-[#F39C12] text-xs font-medium">잠김 (변경 불가)</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {blueprint.front && (
          <div className="rounded-lg overflow-hidden border border-white/10">
            <div className="bg-black/40 px-3 py-2 text-white/70 text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              정면 뷰
            </div>
            <Image src={blueprint.front} alt="정면 블루프린트" className="w-full aspect-[4/3] object-cover" fittingType="fit" />
          </div>
        )}
        {blueprint.side && (
          <div className="rounded-lg overflow-hidden border border-white/10">
            <div className="bg-black/40 px-3 py-2 text-white/70 text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              측면 뷰
            </div>
            <Image src={blueprint.side} alt="측면 블루프린트" className="w-full aspect-[4/3] object-cover" fittingType="fit" />
          </div>
        )}
      </div>
      <p className="text-white/40 text-xs mt-3 text-center">
        블루프린트는 한 번 생성되면 변경되지 않으며, 이 도면을 기준으로 디자인 작업이 진행됩니다.
      </p>
    </div>
  );
}