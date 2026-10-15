"use client";

import { useEffect, useState } from "react";
import { GitBranch, AlertTriangle, XCircle, Bell, Wifi, Terminal as TerminalIcon, Zap } from "lucide-react";
import { useEditorStore } from "@/lib/store";

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function StatusBar() {
  const [time, setTime] = useState<string>("");
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);
  const recruiterMode = useEditorStore((s) => s.recruiterMode);
  const toggleRecruiterMode = useEditorStore((s) => s.toggleRecruiterMode);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 1000 * 10);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-6 shrink-0 items-center justify-between bg-accent-strong px-3 text-[11px] text-white select-none">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <Wifi size={12} />
          Remote
        </span>
        <span className="flex items-center gap-1">
          <GitBranch size={12} />
          main
        </span>
        <button
          onClick={toggleTerminal}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors hover:bg-white/20 cursor-pointer ${
            terminalOpen ? "bg-white/20 font-semibold" : ""
          }`}
          title="Toggle Terminal (Ctrl + ~)"
        >
          <TerminalIcon size={12} />
          Terminal
        </button>
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-0.5">
            <AlertTriangle size={12} /> 0
          </span>
          <span className="flex items-center gap-0.5">
            <XCircle size={12} /> 0
          </span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleRecruiterMode}
          className={`flex items-center gap-1 px-2 py-0.5 rounded font-medium transition-all cursor-pointer ${
            recruiterMode
              ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
          title="Toggle Fast Recruiter Mode"
        >
          <Zap size={11} className={recruiterMode ? "fill-slate-950" : "fill-amber-300 text-amber-300"} />
          <span>⚡ Recruiter Mode</span>
        </button>

        <span className="hidden sm:inline">Next.js</span>
        <span className="hidden sm:inline">TypeScript</span>
        <span className="hidden sm:inline">Tailwind</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">Port: 3000</span>
        <span>{time}</span>
        <Bell size={12} />
      </div>
    </div>
  );
}
