"use client";

import { Files, Search, GitBranch, Blocks, UserCircle2, Settings } from "lucide-react";
import { useEditorStore } from "@/lib/store";

export function ActivityBar() {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);

  return (
    <div className="flex w-12 shrink-0 flex-col items-center justify-between border-r border-border-subtle bg-titlebar py-2">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={toggleSidebar}
          aria-label="Explorer"
          className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-text-bright ${
            sidebarOpen ? "text-text-bright" : "text-text-muted"
          }`}
        >
          {sidebarOpen && (
            <span className="absolute left-0 h-6 w-0.5 rounded-r bg-accent" />
          )}
          <Files size={20} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright"
        >
          <Search size={20} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Source Control"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright"
        >
          <GitBranch size={20} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Extensions"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright"
        >
          <Blocks size={20} strokeWidth={1.8} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-1">
        <button
          aria-label="Account"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright"
        >
          <UserCircle2 size={20} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-bright"
        >
          <Settings size={20} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
