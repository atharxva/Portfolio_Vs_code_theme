"use client";

import { TitleBar } from "./TitleBar";
import { MenuBar } from "./MenuBar";
import { ActivityBar } from "./ActivityBar";
import { Explorer } from "./Explorer";
import { TabBar } from "./TabBar";
import { Breadcrumb } from "./Breadcrumb";
import { StatusBar } from "./StatusBar";
import { MainContent } from "./MainContent";
import { CommandPalette } from "./CommandPalette";

export function Shell() {
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
        </div>
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
