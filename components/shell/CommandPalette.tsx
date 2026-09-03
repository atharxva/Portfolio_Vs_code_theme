"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEditorStore } from "@/lib/store";
import { FILES } from "@/lib/files";
import { FileIcon } from "@/components/ui/FileIcon";

export function CommandPalette() {
  const open = useEditorStore((s) => s.commandPaletteOpen);
  const setOpen = useEditorStore((s) => s.setCommandPaletteOpen);
  const openFile = useEditorStore((s) => s.openFile);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = FILES.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-lg border border-border-strong bg-elevated shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2.5">
              <Search size={15} className="text-text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Go to file..."
                className="w-full bg-transparent text-[13px] text-text-bright outline-none placeholder:text-text-muted"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-1">
              {results.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    openFile(f.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-[13px] text-text-primary hover:bg-elevated-hover"
                >
                  <FileIcon id={f.id} size={15} />
                  <span className="font-mono">{f.name}</span>
                  <span className="ml-auto text-[11px] text-text-muted">
                    {f.recentPath}
                  </span>
                </button>
              ))}
              {results.length === 0 && (
                <p className="px-3 py-4 text-center text-[13px] text-text-muted">
                  No matching files
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
