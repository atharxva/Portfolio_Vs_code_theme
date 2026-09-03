export type FileId =
  | "welcome"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact";

export type FileGroup = "PORTFOLIO" | "EXTRAS";

export interface FileMeta {
  id: FileId;
  name: string; // e.g. "Welcome.tsx"
  ext: "tsx" | "json" | "md";
  group: FileGroup;
  recentPath: string; // e.g. "~/portfolio/welcome"
  recentLabel: string; // e.g. "welcome"
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  dateRange: string;
  description: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
  year: string; // primary year label for the timeline axis
}

export interface EducationItem {
  id: string;
  degree: string;
  institute: string;
  dateRange: string;
  location?: string;
  detail?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; icon?: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  codeUrl?: string;
  liveUrl?: string;
  gradient: string; // tailwind gradient classes for the mock preview
}

export interface ProjectSection {
  id: string;
  title: string;
  description: string;
  dotColor: string;
  projects: ProjectItem[];
}
