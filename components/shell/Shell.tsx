"use client";

import { useEffect } from "react";
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
import { useEditorStore } from "@/lib/store";

export function Shell() {
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);

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
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
