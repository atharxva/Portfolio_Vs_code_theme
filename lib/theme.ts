export type ThemeId =
  | "default-dark"
  | "dracula"
  | "tokyo-night"
  | "one-dark-pro"
  | "github-light";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  type: "dark" | "light";
  vars: Record<string, string>;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "default-dark",
    name: "Default Dark (Current)",
    type: "dark",
    vars: {
      "--bg-app": "#1e1e2e",
      "--bg-sidebar": "#181825",
      "--bg-titlebar": "#11111a",
      "--bg-elevated": "#24243a",
      "--bg-elevated-hover": "#2b2b45",
      "--border-subtle": "#2c2c42",
      "--border-strong": "#3c3c5c",
      "--accent": "#4da6ff",
      "--accent-strong": "#007acc",
      "--text-primary": "#d8d8e6",
      "--text-bright": "#f4f4fb",
      "--text-muted": "#85859e",
      "--status-green": "#3fb950",
      "--status-amber": "#e3b341",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    type: "dark",
    vars: {
      "--bg-app": "#282a36",
      "--bg-sidebar": "#21222c",
      "--bg-titlebar": "#191a21",
      "--bg-elevated": "#343746",
      "--bg-elevated-hover": "#44475a",
      "--border-subtle": "#3d4052",
      "--border-strong": "#6272a4",
      "--accent": "#bd93f9",
      "--accent-strong": "#ff79c6",
      "--text-primary": "#f8f8f2",
      "--text-bright": "#ffffff",
      "--text-muted": "#6272a4",
      "--status-green": "#50fa7b",
      "--status-amber": "#f1fa8c",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    type: "dark",
    vars: {
      "--bg-app": "#1a1b26",
      "--bg-sidebar": "#16161e",
      "--bg-titlebar": "#13141c",
      "--bg-elevated": "#24283b",
      "--bg-elevated-hover": "#2f354d",
      "--border-subtle": "#292e42",
      "--border-strong": "#414868",
      "--accent": "#7aa2f7",
      "--accent-strong": "#bb9af7",
      "--text-primary": "#c0caf5",
      "--text-bright": "#e0e6ff",
      "--text-muted": "#565f89",
      "--status-green": "#9ece6a",
      "--status-amber": "#e0af68",
    },
  },
  {
    id: "one-dark-pro",
    name: "One Dark Pro",
    type: "dark",
    vars: {
      "--bg-app": "#282c34",
      "--bg-sidebar": "#21252b",
      "--bg-titlebar": "#1b1d23",
      "--bg-elevated": "#2c313a",
      "--bg-elevated-hover": "#3a3f4b",
      "--border-subtle": "#3e4451",
      "--border-strong": "#4b5263",
      "--accent": "#61afef",
      "--accent-strong": "#c678dd",
      "--text-primary": "#abb2bf",
      "--text-bright": "#d7dae0",
      "--text-muted": "#5c6370",
      "--status-green": "#98c379",
      "--status-amber": "#e5c07b",
    },
  },
  {
    id: "github-light",
    name: "GitHub Light",
    type: "light",
    vars: {
      "--bg-app": "#ffffff",
      "--bg-sidebar": "#f6f8fa",
      "--bg-titlebar": "#eaeef2",
      "--bg-elevated": "#f3f4f6",
      "--bg-elevated-hover": "#e5e7eb",
      "--border-subtle": "#d0d7de",
      "--border-strong": "#afb8c1",
      "--accent": "#0969da",
      "--accent-strong": "#0550ae",
      "--text-primary": "#24292f",
      "--text-bright": "#0f1419",
      "--text-muted": "#57606a",
      "--status-green": "#1a7f37",
      "--status-amber": "#9a6700",
    },
  },
];

export function applyTheme(themeId: ThemeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  if (theme.type === "light") {
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-light");
  }
}
