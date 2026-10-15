"use client";

import { useState, useRef, useEffect } from "react";
import { Files, Search, GitBranch, Blocks, UserCircle2, Settings, Palette, Terminal, Zap } from "lucide-react";
import { useEditorStore } from "@/lib/store";

export function ActivityBar() {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);
  const setThemePickerOpen = useEditorStore((s) => s.setThemePickerOpen);
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);
  const setCommandPaletteOpen = useEditorStore((s) => s.setCommandPaletteOpen);
  const toggleRecruiterMode = useEditorStore((s) => s.toggleRecruiterMode);
  const recruiterMode = useEditorStore((s) => s.recruiterMode);

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(e.target as Node)) {
        setSettingsMenuOpen(false);
      }
    }
    if (settingsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsMenuOpen]);

  return (
    <div className="flex w-12 shrink-0 flex-col items-center justify-between border-r border-border-subtle bg-titlebar py-2 relative select-none">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={toggleSidebar}
          aria-label="Explorer"
          title="Explorer (Files)"
          className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-text-bright cursor-pointer ${
            sidebarOpen ? "text-text-bright" : "text-text-muted"
          }`}
        >
          {sidebarOpen && (
            <span className="absolute left-0 h-6 w-0.5 rounded-r bg-accent" />
          )}
          <Files size={20} strokeWidth={1.8} />
        </button>
        <button
          onClick={() => setCommandPaletteOpen(true)}
          aria-label="Search"
          title="Search / Command Palette (Ctrl+P)"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright cursor-pointer"
        >
          <Search size={20} strokeWidth={1.8} />
        </button>
        <button
          onClick={() => {
            useEditorStore.getState().openFile("experience");
          }}
          aria-label="Source Control"
          title="Source Control (Git Diff)"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright cursor-pointer"
        >
          <GitBranch size={20} strokeWidth={1.8} />
        </button>
        <button
          onClick={toggleRecruiterMode}
          aria-label="Recruiter Mode"
          title={recruiterMode ? "Exit Recruiter Mode" : "⚡ Recruiter Mode"}
          className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors cursor-pointer ${
            recruiterMode ? "text-amber-400 font-bold" : "text-text-muted hover:text-amber-300"
          }`}
        >
          <Zap size={20} strokeWidth={1.8} className={recruiterMode ? "fill-amber-400 text-amber-400" : ""} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 relative" ref={settingsMenuRef}>
        <button
          onClick={() => {
            useEditorStore.getState().openFile("contact");
          }}
          aria-label="Account"
          title="Contact Atharva"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright cursor-pointer"
        >
          <UserCircle2 size={20} strokeWidth={1.8} />
        </button>

        <button
          onClick={() => setSettingsMenuOpen((prev) => !prev)}
          aria-label="Settings"
          title="Settings / Themes"
          className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-text-bright cursor-pointer ${
            settingsMenuOpen ? "text-text-bright bg-elevated" : "text-text-muted"
          }`}
        >
          <Settings size={20} strokeWidth={1.8} />
        </button>

        {/* Authentic VS Code Settings popup menu */}
        {settingsMenuOpen && (
          <div className="absolute bottom-2 left-12 z-50 w-56 rounded-lg border border-border-strong bg-titlebar p-1 shadow-2xl text-xs font-sans text-text-primary">
            <button
              onClick={() => {
                setSettingsMenuOpen(false);
                setThemePickerOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left hover:bg-accent hover:text-white transition-colors cursor-pointer"
            >
              <Palette size={14} />
              <span>Themes: Color Theme</span>
            </button>

            <button
              onClick={() => {
                setSettingsMenuOpen(false);
                toggleTerminal();
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left hover:bg-accent hover:text-white transition-colors cursor-pointer"
            >
              <Terminal size={14} />
              <span>Toggle Terminal</span>
            </button>

            <button
              onClick={() => {
                setSettingsMenuOpen(false);
                toggleRecruiterMode();
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left hover:bg-accent hover:text-white transition-colors cursor-pointer border-t border-border-subtle/50 mt-1 pt-1.5"
            >
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span>{recruiterMode ? "Exit Recruiter Mode" : "Switch to Recruiter Mode"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
