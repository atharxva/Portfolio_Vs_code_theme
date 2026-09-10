import { create } from "zustand";
import { FileId } from "./types";
import { DEFAULT_FILE } from "./files";

interface EditorState {
  openTabs: FileId[];
  activeTab: FileId | null;
  sidebarOpen: boolean;
  terminalOpen: boolean;
  commandPaletteOpen: boolean;
  openFile: (id: FileId) => void;
  closeTab: (id: FileId) => void;
  setActive: (id: FileId) => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  setTerminalOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  openTabs: [DEFAULT_FILE],
  activeTab: DEFAULT_FILE,
  sidebarOpen: true,
  terminalOpen: true,
  commandPaletteOpen: false,

  openFile: (id) => {
    const { openTabs } = get();
    if (!openTabs.includes(id)) {
      set({ openTabs: [...openTabs, id], activeTab: id });
    } else {
      set({ activeTab: id });
    }
  },

  closeTab: (id) => {
    const { openTabs, activeTab } = get();
    const idx = openTabs.indexOf(id);
    if (idx === -1) return;
    const newTabs = openTabs.filter((t) => t !== id);
    let newActive = activeTab;
    if (activeTab === id) {
      if (newTabs.length === 0) {
        newActive = null;
      } else {
        const nextIdx = Math.max(0, idx - 1);
        newActive = newTabs[nextIdx];
      }
    }
    set({ openTabs: newTabs, activeTab: newActive });
  },

  setActive: (id) => set({ activeTab: id }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
