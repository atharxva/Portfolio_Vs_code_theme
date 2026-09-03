"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/data/experience";

const SLOT_WIDTH = 360;

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  function scrollByAmount(amount: number) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function onMouseDown(e: React.MouseEvent) {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.pageX,
      scrollLeft: trackRef.current.scrollLeft,
    };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !trackRef.current) return;
    const dx = e.pageX - dragState.current.startX;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  }
  function endDrag() {
    setIsDragging(false);
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-6">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
          <span className="h-7 w-1 rounded bg-accent" />
          Experience
        </h1>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-text-muted">
          drag or scroll to travel through time
          <ChevronRight size={14} />
        </p>
      </div>

      <div className="relative mt-4 h-[440px] select-none">
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className={`relative flex h-full items-center overflow-x-auto px-[10vw] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollSnapType: "x proximity" }}
        >
          {/* center line */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-strong" />

          {EXPERIENCE.map((item, i) => {
            const top = i % 2 === 0;
            return (
              <div
                key={item.id}
                className="relative flex shrink-0 items-center justify-center"
                style={{ width: SLOT_WIDTH, scrollSnapAlign: "center" }}
              >
                {/* giant faint year */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[5.5rem] font-bold text-white/[0.03] select-none">
                  {item.current ? "NOW" : item.year}
                </span>

                {/* node */}
                <div className="relative z-10 h-4 w-4 rounded-full border-2 border-accent bg-app" />

                {/* card */}
                <motion.div
                  initial={{ opacity: 0, y: top ? 16 : -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35 }}
                  className={`absolute z-10 w-[310px] rounded-xl border border-border-subtle bg-elevated p-3.5 shadow-lg ${
                    top ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"
                  }`}
                >
                  {item.current && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-white">
                      MOST RECENT
                    </span>
                  )}
                  <p className="text-[14px] font-semibold text-text-bright">
                    {item.role}
                  </p>
                  <p className="text-[12px] font-medium text-accent">{item.company}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2.5 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {item.dateRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {item.location}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-text-primary">
                    {item.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollByAmount(-SLOT_WIDTH)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-elevated text-text-muted hover:text-text-bright shadow-md"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollByAmount(SLOT_WIDTH)}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-elevated text-text-muted hover:text-text-bright shadow-md"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
