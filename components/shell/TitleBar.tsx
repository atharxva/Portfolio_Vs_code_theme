"use client";

import { Zap, Eye } from "lucide-react";
import { useEditorStore } from "@/lib/store";

export function TitleBar() {
  const recruiterMode = useEditorStore((s) => s.recruiterMode);
  const toggleRecruiterMode = useEditorStore((s) => s.toggleRecruiterMode);

  return (
    <div className="flex h-9 shrink-0 items-center justify-between border-b border-border-subtle bg-titlebar px-3 text-[13px] text-text-muted select-none">
      <div className="flex w-16 sm:w-28 items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="hidden h-3 w-3 rounded-full bg-[#febc2e] sm:block" />
        <span className="hidden h-3 w-3 rounded-full bg-[#28c840] sm:block" />
      </div>

      <div className="flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap text-xs">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span className="truncate text-text-bright font-medium">Atharva Jadhav</span>
        <span className="hidden text-text-muted sm:inline">— Portfolio</span>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={toggleRecruiterMode}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all shadow-xs cursor-pointer ${
            recruiterMode
              ? "bg-accent text-white"
              : "border border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25 hover:text-white"
          }`}
          title="Toggle Recruiter Mode (Executive Single-Page ATS / Resume View)"
        >
          <Zap size={12} className="fill-current" />
          <span className="whitespace-nowrap font-sans font-medium text-[11px]">
            {recruiterMode ? "💻 IDE Mode" : "⚡ Recruiter Mode"}
          </span>
        </button>
      </div>
    </div>
  );
}
