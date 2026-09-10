"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight, X, Briefcase, CheckCircle, Sparkles } from "lucide-react";
import { EXPERIENCE } from "@/data/experience";
import { ExperienceItem } from "@/lib/types";

const SLOT_WIDTH = 360;

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
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
          drag or scroll to travel through time · click any card for detailed work log
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
                  onClick={() => setSelectedExperience(item)}
                  className={`group absolute z-10 w-[310px] cursor-pointer rounded-xl border border-border-subtle bg-elevated p-3.5 shadow-lg transition-all hover:border-accent/50 hover:bg-elevated-hover hover:shadow-2xl ${
                    top ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"
                  }`}
                >
                  {item.current && (
                    <span className="absolute top-3 right-3 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-white shadow-xs">
                      MOST RECENT
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-titlebar p-1 shadow-sm">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={`${item.company} logo`}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                            (e.target as HTMLElement).nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <span className={`text-[13px] font-bold text-accent ${item.logo ? "hidden" : ""}`}>
                        {item.company.charAt(0)}
                      </span>
                    </div>

                    <div className={`min-w-0 flex-1 ${item.current ? "pr-20" : ""}`}>
                      <p className="text-[14px] font-semibold text-text-bright truncate group-hover:text-accent transition-colors">
                        {item.role}
                      </p>
                      <p className="text-[12px] font-medium text-accent truncate">{item.company}</p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {item.dateRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {item.location}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-text-primary">
                    {item.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="rounded-full border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Click to know more trigger link */}
                  <div className="mt-3 flex items-center justify-between border-t border-border-subtle/80 pt-2 text-[11px] font-medium text-accent">
                    <span className="group-hover:underline">Click to know more</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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

      {/* Detailed Work Log Modal Window */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperience(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs select-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-elevated shadow-2xl"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between border-b border-border-subtle bg-titlebar px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-app p-1">
                    {selectedExperience.logo ? (
                      <img
                        src={selectedExperience.logo}
                        alt={`${selectedExperience.company} logo`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                          (e.target as HTMLElement).nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <span className={`text-[13px] font-bold text-accent ${selectedExperience.logo ? "hidden" : ""}`}>
                      {selectedExperience.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-bright">{selectedExperience.role}</h3>
                    <p className="text-xs font-medium text-accent">{selectedExperience.company}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExperience(null)}
                  className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-elevated-hover hover:text-text-bright"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="max-h-[75vh] overflow-y-auto p-5 space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted border-b border-border-subtle pb-3">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={13} className="text-accent" /> {selectedExperience.dateRange}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin size={13} className="text-accent" /> {selectedExperience.location}
                  </span>
                  {selectedExperience.current && (
                    <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold text-accent border border-accent/30">
                      CURRENT ROLE
                    </span>
                  )}
                </div>

                {/* Quantified Impact Metrics (if present) */}
                {selectedExperience.metrics && selectedExperience.metrics.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-400" /> Key Impact Highlights
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {selectedExperience.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-border-subtle bg-app p-2.5 text-center">
                          <p className="text-lg font-bold text-accent">{m.value}</p>
                          <p className="text-[10px] text-text-muted mt-0.5 leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Work Log Bullets */}
                <div>
                  <h4 className="mb-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase size={13} className="text-accent" /> Detailed Internship Work Log
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedExperience.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-text-primary">
                        <CheckCircle size={14} className="mt-0.5 text-emerald-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Technologies & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-bright"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end border-t border-border-subtle bg-titlebar px-4 py-3">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="rounded-lg bg-accent px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  Close Work Log
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
