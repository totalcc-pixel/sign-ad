import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, FileText } from "lucide-react";
import { Image } from "@/components/ui/image";
import jsPDF from "jspdf";

const viewLabels = {
  left: "Left Side",
  right: "Right Side",
  front: "Front View",
  rear: "Rear View",
};

export default function DesignSummary({ open, onClose, form, rear, mockups }) {
  const [exporting, setExporting] = useState(false);
  const generatedViews = Object.entries(mockups).filter(([, url]) => url);

  const handleExportPDF = () => {
    setExporting(true);
    try {
      const doc = new jsPDF();
      let y = 20;

      doc.setFontSize(22);
      doc.setTextColor(20, 20, 20);
      doc.text("Vehicle Wrap Design Summary", 20, y);
      y += 12;

      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(`Company: ${form.company_name}`, 20, y); y += 7;
      doc.text(`Phone: ${form.phone || "—"}`, 20, y); y += 7;
      doc.text(`Vehicle: ${form.vehicle_type || "—"}`, 20, y); y += 7;
      doc.text(`Color: ${form.vehicle_color || "—"}`, 20, y); y += 7;
      doc.text(`Year: ${form.vehicle_year || "—"}`, 20, y); y += 7;
      if (form.design_style) { doc.text(`Style: ${form.design_style}`, 20, y); y += 7; }

      y += 4;
      doc.setFontSize(14);
      doc.setTextColor(20, 20, 20);
      doc.text("Rear View Configuration", 20, y); y += 8;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`One-Way Vision Film: ${rear.rear_window_perforated ? "Yes" : "No"}`, 20, y); y += 7;
      doc.text(`Rear Window Text: ${rear.rear_window_graphics || "—"}`, 20, y); y += 7;
      doc.text(`Rear Chevron Stripes: ${rear.rear_chevron ? "Yes" : "No"}`, 20, y); y += 10;

      doc.setFontSize(14);
      doc.setTextColor(20, 20, 20);
      doc.text("Generated Mockups", 20, y); y += 8;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      for (const [view, url] of generatedViews) {
        const lines = doc.splitTextToSize(`${viewLabels[view]}: ${url}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 7;
      }

      doc.save(`design-summary-${form.company_name || "mockup"}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121623] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Design Summary</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-white/50">Company:</span> <span className="text-white">{form.company_name}</span></div>
            <div><span className="text-white/50">Phone:</span> <span className="text-white">{form.phone || "—"}</span></div>
            <div><span className="text-white/50">Vehicle:</span> <span className="text-white">{form.vehicle_type || "—"}</span></div>
            <div><span className="text-white/50">Color:</span> <span className="text-white">{form.vehicle_color || "—"}</span></div>
          </div>

          <div className="bg-black/30 rounded-xl p-4 space-y-2 text-sm">
            <h4 className="text-white font-semibold">Rear View Configuration</h4>
            <div className="flex justify-between"><span className="text-white/50">One-Way Vision Film:</span><span className="text-white">{rear.rear_window_perforated ? "Yes" : "No"}</span></div>
            <div className="flex justify-between"><span className="text-white/50">Rear Window Text:</span><span className="text-white">{rear.rear_window_graphics || "—"}</span></div>
            <div className="flex justify-between"><span className="text-white/50">Rear Chevron Stripes:</span><span className="text-white">{rear.rear_chevron ? "Yes" : "No"}</span></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {generatedViews.length === 0 && (
              <div className="col-span-full text-center py-8 text-white/40">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                No mockups generated yet.
              </div>
            )}
            {generatedViews.map(([view, url]) => (
              <div key={view} className="rounded-xl overflow-hidden border border-white/10">
                <div className="bg-black/40 px-3 py-2 text-white/70 text-xs font-medium">{viewLabels[view]}</div>
                <Image src={url} alt={viewLabels[view]} className="w-full" fittingType="fit" />
              </div>
            ))}
          </div>

          <Button
            onClick={handleExportPDF}
            disabled={exporting || generatedViews.length === 0}
            className="w-full bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d]"
          >
            <FileText className="w-4 h-4 mr-2" />
            {exporting ? "Exporting..." : "Export PDF Summary"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}