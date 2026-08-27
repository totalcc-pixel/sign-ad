import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Eye, Triangle } from "lucide-react";

export default function RearDesignControls({ rear, setRear }) {
  const update = (key, val) => setRear((r) => ({ ...r, [key]: val }));

  return (
    <div className="space-y-4 border-t border-white/10 pt-5">
      <h3 className="text-white font-semibold text-sm flex items-center gap-2">
        <Triangle className="w-4 h-4 text-[#F39C12]" />
        Rear View Design
      </h3>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <Eye className="w-4 h-4 text-[#F39C12] mt-0.5" />
          <div>
            <Label className="text-white">One-Way Vision Film</Label>
            <p className="text-white/40 text-xs mt-0.5">Perforated vinyl on rear window</p>
          </div>
        </div>
        <Switch
          checked={rear.rear_window_perforated}
          onCheckedChange={(v) => update("rear_window_perforated", v)}
        />
      </div>

      {rear.rear_window_perforated && (
        <div>
          <Label className="text-white mb-1.5 block">Rear Window Graphics Text</Label>
          <Input
            value={rear.rear_window_graphics}
            onChange={(e) => update("rear_window_graphics", e.target.value)}
            placeholder="e.g. www.mybusiness.co.nz"
            className="bg-black/40 border-white/10 text-white placeholder:text-white/30"
          />
        </div>
      )}

      <p className="text-white/40 text-xs">
        Company logo, phone number, and social icons from your details above will be displayed on the tailgate.
      </p>
    </div>
  );
}