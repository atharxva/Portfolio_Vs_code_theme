"use client";

import { useEffect, useState } from "react";
import { GitBranch, AlertTriangle, XCircle, Bell, Wifi } from "lucide-react";

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function StatusBar() {
  const [time, setTime] = useState<string>("");

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
