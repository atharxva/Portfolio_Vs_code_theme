"use client";

import { Home, ChevronRight } from "lucide-react";
import { useEditorStore } from "@/lib/store";
import { FILES_BY_ID } from "@/lib/files";
import { FileId } from "@/lib/types";

export function Breadcrumb() {
  const activeTab = useEditorStore((s) => s.activeTab);
  const openFile = useEditorStore((s) => s.openFile);
  const file = activeTab ? FILES_BY_ID[activeTab as FileId] : null;

  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-border-subtle bg-app px-4 text-[12px] text-text-muted">
      <button
        onClick={() => openFile("welcome")}
        className="flex items-center gap-1 hover:text-text-bright"
      >
        <Home size={13} />
      </button>
      {file && (
        <>
          <ChevronRight size={13} />
          <span className="font-mono text-text-primary">{file.name}</span>
        </>
      )}
    </div>
  );
}
