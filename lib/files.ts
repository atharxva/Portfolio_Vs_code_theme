import { FileMeta } from "./types";

export const FILES: FileMeta[] = [
  {
    id: "welcome",
    name: "Welcome.tsx",
    ext: "tsx",
    group: "PORTFOLIO",
    recentPath: "~/portfolio/welcome",
    recentLabel: "welcome",
  },
  {
    id: "experience",
    name: "Experience.tsx",
    ext: "tsx",
    group: "PORTFOLIO",
    recentPath: "~/portfolio/experience",
    recentLabel: "experience",
  },
  {
    id: "skills",
    name: "Skills.json",
    ext: "json",
    group: "PORTFOLIO",
    recentPath: "~/portfolio/skills",
    recentLabel: "skills",
  },
  {
    id: "projects",
    name: "Projects.tsx",
    ext: "tsx",
    group: "PORTFOLIO",
    recentPath: "~/portfolio/projects",
    recentLabel: "projects",
  },
  {
    id: "contact",
    name: "Contact.tsx",
    ext: "tsx",
    group: "PORTFOLIO",
    recentPath: "~/portfolio/contact",
    recentLabel: "contact",
  },
  {
    id: "education",
    name: "Education.tsx",
    ext: "tsx",
    group: "EXTRAS",
    recentPath: "~/portfolio/education",
    recentLabel: "education",
  },
];

export const FILES_BY_ID: Record<string, FileMeta> = Object.fromEntries(
  FILES.map((f) => [f.id, f])
);

export const DEFAULT_FILE = "welcome" as const;
