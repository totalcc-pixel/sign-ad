import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function MockupLightbox({ views, currentKey, onClose, onNavigate }) {
  const currentIndex = views.findIndex((v) => v.key === currentKey);
  const current = views[currentIndex];

  const goPrev = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + views.length) % views.length;
    onNavigate(views[prevIndex].key);
  };

  const goNext = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % views.length;
    onNavigate(views[nextIndex].key);
  };

  return (
    <Dialog open={!!currentKey} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-5xl bg-[#121623] border-white/10 p-0 overflow-hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="text-white px-6 pt-5 pb-2">{current?.label}</DialogTitle>
        {current && (
          <div className="relative px-6 pb-6">
            <div className="flex items-center justify-center bg-black/30 rounded-lg">
              <img
                src={current.url}
                alt={current.label}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Navigation arrows */}
            {views.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#F39C12] hover:text-black hover:border-[#F39C12] transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter + download */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-white/50 text-sm">
                {currentIndex + 1} / {views.length}
              </span>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F39C12] text-sm font-medium hover:underline"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}