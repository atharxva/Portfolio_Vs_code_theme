"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Palette } from "lucide-react";
import { THEMES, ThemeId } from "@/lib/theme";
import { useEditorStore } from "@/lib/store";

export function ThemePickerModal() {
  const themePickerOpen = useEditorStore((s) => s.themePickerOpen);
  const setThemePickerOpen = useEditorStore((s) => s.setThemePickerOpen);
  const currentTheme = useEditorStore((s) => s.currentTheme);
  const setTheme = useEditorStore((s) => s.setTheme);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const originalTheme = useRef<ThemeId>(currentTheme);

  useEffect(() => {
    if (themePickerOpen) {
      originalTheme.current = currentTheme;
      const idx = THEMES.findIndex((t) => t.id === currentTheme);
      setSelectedIndex(idx >= 0 ? idx : 0);
    }
  }, [themePickerOpen, currentTheme]);

  if (!themePickerOpen) return null;

  const handleSelect = (themeId: ThemeId) => {
    setTheme(themeId);
    setThemePickerOpen(false);
  };

  const handleClose = () => {
    // Revert to original if cancelled
    setTheme(originalTheme.current);
    setThemePickerOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (selectedIndex + 1) % THEMES.length;
      setSelectedIndex(next);
      setTheme(THEMES[next].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (selectedIndex - 1 + THEMES.length) % THEMES.length;
      setSelectedIndex(prev);
      setTheme(THEMES[prev].id);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(THEMES[selectedIndex].id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/50 backdrop-blur-2xs"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border-strong bg-titlebar shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-2.5 text-xs font-mono text-text-muted">
          <Palette size={14} className="text-accent" />
          <span className="font-semibold text-text-bright">Select Color Theme</span>
          <span className="ml-auto text-[10px] text-text-muted">↑/↓ to preview, Enter to select, Esc to cancel</span>
        </div>

        <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
          {THEMES.map((theme, idx) => {
            const isSelected = selectedIndex === idx;
            const isCurrent = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onMouseEnter={() => {
                  setSelectedIndex(idx);
                  setTheme(theme.id);
                }}
                onClick={() => handleSelect(theme.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-accent text-white font-medium"
                    : "text-text-primary hover:bg-elevated-hover"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: theme.vars["--accent"] }}
                  />
                  <span>{theme.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-mono ${isSelected ? "text-white/80" : "text-text-muted"}`}>
                    {theme.type}
                  </span>
                  {isCurrent && <Check size={14} className={isSelected ? "text-white" : "text-accent"} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
