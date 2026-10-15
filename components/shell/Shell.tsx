"use client";

import { useEffect, useState } from "react";
import { TitleBar } from "./TitleBar";
import { MenuBar } from "./MenuBar";
import { ActivityBar } from "./ActivityBar";
import { Explorer } from "./Explorer";
import { TabBar } from "./TabBar";
import { Breadcrumb } from "./Breadcrumb";
import { StatusBar } from "./StatusBar";
import { MainContent } from "./MainContent";
import { Terminal } from "./Terminal";
import { CommandPalette } from "./CommandPalette";
import { ThemePickerModal } from "./ThemePickerModal";
import { RecruiterView } from "@/components/pages/RecruiterView";
import { useEditorStore } from "@/lib/store";
import { ThemeId, applyTheme } from "@/lib/theme";

export function Shell() {
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);
  const recruiterMode = useEditorStore((s) => s.recruiterMode);
  const setRecruiterMode = useEditorStore((s) => s.setRecruiterMode);
  const setTheme = useEditorStore((s) => s.setTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Restore saved theme from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("color_theme") as ThemeId | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
      const savedRecruiterMode = localStorage.getItem("recruiter_mode") === "true";
      if (savedRecruiterMode) {
        setRecruiterMode(true);
      }
    }
  }, [setTheme, setRecruiterMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "`") || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j")) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-app text-text-primary">
      <TitleBar />
      <MenuBar />

      {recruiterMode ? (
        <div className="flex-1 overflow-y-auto">
          <RecruiterView />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1">
          <ActivityBar />
          <Explorer />
          <div className="flex min-w-0 flex-1 flex-col">
            <TabBar />
            <Breadcrumb />
            <MainContent />
            <Terminal />
          </div>
        </div>
      )}

      <StatusBar />
      <CommandPalette />
      <ThemePickerModal />
    </div>
  );
}
