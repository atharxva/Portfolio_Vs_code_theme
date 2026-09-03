"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FILES } from "@/lib/files";
import { FileGroup } from "@/lib/types";
import { useEditorStore } from "@/lib/store";
import { FileIcon } from "@/components/ui/FileIcon";

const GROUPS: FileGroup[] = ["PORTFOLIO", "EXTRAS"];

export function Explorer() {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);
  const activeTab = useEditorStore((s) => s.activeTab);
  const openFile = useEditorStore((s) => s.openFile);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-20 bg-black/40 sm:hidden"
        onClick={() => useEditorStore.getState().toggleSidebar()}
      />
      
      <aside
        className="fixed left-12 top-8 bottom-6 z-30 flex w-60 shrink-0 flex-col overflow-y-auto border-r border-border-subtle bg-sidebar shadow-2xl sm:static sm:z-auto sm:h-full sm:shadow-none"
      >
        <div className="w-full px-3 py-3 select-none">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
              Explorer
            </p>
          </div>

          {GROUPS.map((group) => {
            const files = FILES.filter((f) => f.group === group);
            const isCollapsed = collapsed[group];
            return (
              <div key={group} className="mb-3">
                <button
                  onClick={() =>
                    setCollapsed((c) => ({ ...c, [group]: !c[group] }))
                  }
                  className="flex w-full items-center gap-1 rounded px-1 py-1 text-[11px] font-bold tracking-wider text-text-muted hover:text-text-bright uppercase"
                >
                  <span className={`transition-transform duration-150 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}>
                    <ChevronDown size={13} />
                  </span>
                  {group}
                </button>
                {!isCollapsed && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {files.map((file) => {
                      const active = activeTab === file.id;
                      return (
                        <button
                          key={file.id}
                          onClick={() => {
                            openFile(file.id);
                            if (typeof window !== "undefined" && window.innerWidth < 640) {
                              useEditorStore.getState().toggleSidebar();
                            }
                          }}
                          className={`relative flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                            active
                              ? "bg-elevated text-text-bright font-medium"
                              : "text-text-primary hover:bg-elevated-hover hover:text-text-bright"
                          }`}
                        >
                          {active && (
                            <span className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-accent" />
                          )}
                          <FileIcon id={file.id} size={15} />
                          <span className="font-mono">{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
