"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  ArrowRight,
  X,
  Briefcase,
  CheckCircle,
  Sparkles,
  GitCommit,
  GitPullRequest,
  Clock,
  Plus,
  Minus,
  FileCode,
} from "lucide-react";
import { EXPERIENCE } from "@/data/experience";
import { EXPERIENCE_DIFFS, ExperienceDiffItem } from "@/data/experienceDiffs";
import { ExperienceItem } from "@/lib/types";

const SLOT_WIDTH = 360;

// Premium cubic-bezier easing curve for snappy, high-end feel
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const [viewMode, setViewMode] = useState<"timeline" | "git-diff">("timeline");
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  // Accessibility: fallback to instant render for prefers-reduced-motion
  const shouldReduceMotion = useReducedMotion();

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
    <div className="flex min-h-full flex-col justify-start py-8">
      {/* ---------------- PHASE 1: HEADER & CONTROLS ---------------- */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: EASE_PREMIUM,
          delay: 0.05,
        }}
        className="mx-auto w-full max-w-5xl px-6 sm:px-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
              <motion.span
                initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: EASE_PREMIUM }}
                className="h-7 w-1 rounded bg-accent origin-bottom"
              />
              Experience
            </h1>
            <p className="mt-1 flex items-center gap-1 text-[13px] text-text-muted">
              {viewMode === "timeline"
                ? "drag or scroll to travel through time · click any card for detailed work log"
                : "git blame & split-diff editor · legacy friction (-) vs engineered solutions (+)"}
            </p>
          </div>

          {/* Toggle Button: View: Timeline | Git Diff */}
          <div className="flex items-center gap-1 rounded-lg border border-border-strong bg-titlebar p-1 select-none text-xs font-mono">
            <span className="px-2 text-text-muted font-sans text-[11px] hidden sm:inline">View:</span>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-accent text-white font-medium shadow-xs"
                  : "text-text-muted hover:text-text-bright hover:bg-elevated"
              }`}
            >
              <Clock size={13} />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setViewMode("git-diff")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                viewMode === "git-diff"
                  ? "bg-accent text-white font-medium shadow-xs"
                  : "text-text-muted hover:text-text-bright hover:bg-elevated"
              }`}
            >
              <GitPullRequest size={13} />
              <span>Git Diff</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Experience View */}
      {viewMode === "timeline" ? (
        /* TIMELINE VIEW WITH LEFT-TO-RIGHT STAGGERED ENTRANCE */
        <div className="relative mt-8 h-[440px] select-none overflow-hidden">
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
            {/* ---------------- PHASE 2: CENTRAL LINE EXPANDING LEFT-TO-RIGHT ---------------- */}
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : 0.15,
                ease: EASE_PREMIUM,
              }}
              style={{ originX: 0 }}
              className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-accent/80 via-accent to-accent/40 shadow-[0_0_12px_rgba(77,166,255,0.4)]"
            />

            {EXPERIENCE.map((item, i) => {
              const top = i % 2 === 0;

              // Staggered delay for each mark and card:
              // Index 0: Playbox TV (2024) -> ~0.38s
              // Index 1: LetsUpgrade (2025) -> ~0.55s
              // Index 2: Winvesta (NOW)     -> ~0.72s
              const cardDelay = shouldReduceMotion ? 0 : 0.35 + i * 0.17;
              const nodeDelay = shouldReduceMotion ? 0 : 0.28 + i * 0.17;
              const yearDelay = shouldReduceMotion ? 0 : 0.45 + i * 0.14;

              return (
                <div
                  key={item.id}
                  className="relative flex shrink-0 items-center justify-center"
                  style={{ width: SLOT_WIDTH, scrollSnapAlign: "center" }}
                >
                  {/* ---------------- PHASE 4: BACKGROUND YEARS ---------------- */}
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 0.03 } : { opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.5,
                      delay: yearDelay,
                      ease: EASE_PREMIUM,
                    }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-[5.5rem] font-bold text-white select-none"
                  >
                    {item.current ? "NOW" : item.year}
                  </motion.span>

                  {/* ---------------- TIMELINE NODE (POPS AS LINE ARRIVES) ---------------- */}
                  <motion.div
                    initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      delay: nodeDelay,
                      ease: EASE_PREMIUM,
                    }}
                    className="relative z-10 h-4 w-4 rounded-full border-2 border-accent bg-app shadow-[0_0_10px_rgba(77,166,255,0.7)]"
                  />

                  {/* ---------------- PHASE 3: STAGGERED CARDS ---------------- */}
                  {/* Playbox TV: slides downward (top card) */}
                  {/* LetsUpgrade: slides upward (bottom card) */}
                  {/* Winvesta: slides in and highlights MOST RECENT badge */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, y: 0, x: 0 }
                        : {
                            opacity: 0,
                            y: top ? -28 : 28, // Top card slides down; bottom card slides up
                            x: -16, // Slight left-to-right drift
                            scale: 0.94,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      delay: cardDelay,
                      ease: EASE_PREMIUM,
                    }}
                    onClick={() => setSelectedExperience(item)}
                    className={`group absolute z-10 w-[310px] cursor-pointer rounded-xl border border-border-subtle bg-elevated p-3.5 shadow-lg transition-all hover:border-accent/50 hover:bg-elevated-hover hover:shadow-2xl ${
                      top ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"
                    }`}
                  >
                    {/* MOST RECENT Badge with pulse highlight */}
                    {item.current && (
                      <motion.span
                        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.4,
                          delay: cardDelay + 0.2,
                          ease: EASE_PREMIUM,
                        }}
                        className="absolute top-3 right-3 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-white shadow-md shadow-accent/30 ring-2 ring-accent/30"
                      >
                        MOST RECENT
                      </motion.span>
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

          {/* ---------------- PHASE 4: NAVIGATION ARROW CONTROLS ---------------- */}
          <motion.button
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              delay: shouldReduceMotion ? 0 : 0.85,
              ease: EASE_PREMIUM,
            }}
            onClick={() => scrollByAmount(-SLOT_WIDTH)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-elevated text-text-muted hover:text-text-bright shadow-md cursor-pointer transition-colors"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <motion.button
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              delay: shouldReduceMotion ? 0 : 0.85,
              ease: EASE_PREMIUM,
            }}
            onClick={() => scrollByAmount(SLOT_WIDTH)}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-elevated text-text-muted hover:text-text-bright shadow-md cursor-pointer transition-colors"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      ) : (
        /* GIT DIFF MODE */
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          className="mx-auto w-full max-w-5xl px-6 sm:px-10 mt-6 space-y-8 font-mono"
        >
          {EXPERIENCE_DIFFS.map((diff, diffIdx) => (
            <motion.div
              key={diff.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : diffIdx * 0.12,
                ease: EASE_PREMIUM,
              }}
              className="overflow-hidden rounded-xl border border-border-strong bg-titlebar shadow-xl"
            >
              {/* Commit Metadata Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle bg-sidebar px-4 py-3 text-xs select-none">
                <div className="flex items-center gap-2 overflow-hidden">
                  <GitCommit size={15} className="text-accent shrink-0" />
                  <span className="rounded bg-elevated px-2 py-0.5 font-bold text-accent border border-border-subtle">
                    commit {diff.commitHash}
                  </span>
                  <span className="font-semibold text-text-bright truncate">{diff.commitMsg}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-text-muted shrink-0">
                  <span>{diff.author}</span>
                  <span className="hidden md:inline">· {diff.dateRange}</span>
                </div>
              </div>

              {/* Sub-header file label */}
              <div className="flex items-center justify-between border-b border-border-subtle/80 bg-app px-4 py-2 text-[11px] text-text-muted select-none">
                <div className="flex items-center gap-2">
                  <FileCode size={13} className="text-amber-400" />
                  <span className="text-text-bright font-semibold">
                    src/experiences/{diff.id}.tsx
                  </span>
                  <span className="text-text-muted">({diff.company} — {diff.role})</span>
                </div>
                <span className="text-[10px] rounded bg-border-subtle px-1.5 py-0.5 text-text-bright">
                  git diff --unified
                </span>
              </div>

              {/* Split Diff Table: Left (Legacy/Deletions) vs Right (Engineered Solutions/Additions) */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-subtle text-[12px] leading-relaxed">
                {/* Left Pane (Deletions / Problems Solved) */}
                <div className="bg-[#1f1416]/50 p-0 overflow-x-auto">
                  <div className="sticky top-0 bg-[#2d1418] px-3 py-1.5 text-[11px] font-bold text-rose-300 border-b border-rose-900/40 flex items-center justify-between">
                    <span>--- Legacy State / Problems Solved</span>
                    <span className="text-[10px] text-rose-400 font-mono">deletions (-)</span>
                  </div>
                  <div className="py-2">
                    {diff.diffLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="flex items-start px-2 py-1.5 hover:bg-rose-950/40 transition-colors"
                      >
                        <span className="w-8 shrink-0 text-right pr-2 text-rose-500/50 select-none text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="w-5 shrink-0 text-center font-bold text-rose-400 select-none">
                          -
                        </span>
                        <span className="text-rose-200/90 pr-2">
                          {line.legacy}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Pane (Additions / Engineered Solutions & Metrics) */}
                <div className="bg-[#122017]/50 p-0 overflow-x-auto">
                  <div className="sticky top-0 bg-[#162d1d] px-3 py-1.5 text-[11px] font-bold text-emerald-300 border-b border-emerald-900/40 flex items-center justify-between">
                    <span>+++ Engineered Solutions & Impact</span>
                    <span className="text-[10px] text-emerald-400 font-mono">additions (+)</span>
                  </div>
                  <div className="py-2">
                    {diff.diffLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="flex items-start px-2 py-1.5 hover:bg-emerald-950/40 transition-colors"
                      >
                        <span className="w-8 shrink-0 text-right pr-2 text-emerald-500/50 select-none text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="w-5 shrink-0 text-center font-bold text-emerald-400 select-none">
                          +
                        </span>
                        <span className="text-emerald-200/95 font-medium pr-2">
                          {line.solution}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diff Footer: Tags & Metrics summary */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-app px-4 py-2 text-[11px]">
                <div className="flex flex-wrap gap-1.5">
                  {diff.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {diff.metrics && diff.metrics.length > 0 && (
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    {diff.metrics.map((m) => (
                      <span key={m.label} className="bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        {m.value} {m.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detailed Work Log Modal Window (Timeline View Click) */}
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
                  className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-elevated-hover hover:text-text-bright cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="max-h-[75vh] overflow-y-auto p-5 space-y-6">
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
                  className="rounded-lg bg-accent px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
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
