"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEditorStore } from "@/lib/store";
import { FILES_BY_ID } from "@/lib/files";
import { FileIcon } from "@/components/ui/FileIcon";
import { FileId } from "@/lib/types";

export function TabBar() {
  const openTabs = useEditorStore((s) => s.openTabs);
  const activeTab = useEditorStore((s) => s.activeTab);
  const setActive = useEditorStore((s) => s.setActive);
  const closeTab = useEditorStore((s) => s.closeTab);

  return (
    <div className="flex h-10 shrink-0 overflow-x-auto border-b border-border-subtle bg-titlebar">
      <AnimatePresence initial={false}>
        {openTabs.map((id) => {
          const file = FILES_BY_ID[id as FileId];
          const active = activeTab === id;
          return (
            <motion.button
              key={id}
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setActive(id)}
              className={`group relative flex shrink-0 items-center gap-2 border-r border-border-subtle px-3 text-[13px] transition-colors ${
                active
                  ? "bg-app text-text-bright"
                  : "bg-titlebar text-text-muted hover:bg-elevated-hover"
              }`}
            >
              {active && (
                <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
              )}
              <FileIcon id={id as FileId} size={14} />
              <span className="font-mono whitespace-nowrap">
                {file.name}
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(id as FileId);
                }}
                className="ml-1 flex h-4 w-4 items-center justify-center rounded opacity-0 hover:bg-elevated-hover group-hover:opacity-100"
              >
                <X size={13} />
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
