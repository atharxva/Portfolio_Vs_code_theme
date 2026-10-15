import { ExperienceItem } from "@/lib/types";

export interface ExperienceDiffItem extends ExperienceItem {
  commitHash: string;
  commitMsg: string;
  author: string;
  diffLines: {
    legacy: string; // Left Pane deletion
    solution: string; // Right Pane addition
  }[];
}

export const EXPERIENCE_DIFFS: ExperienceDiffItem[] = [
  {
    id: "winvesta",
    role: "Software Development Intern",
    company: "Winvesta",
    logo: "/media/winvesta/image.png",
    location: "India",
    dateRange: "Sept 2025 — Dec 2025",
    year: "2025",
    current: true,
    commitHash: "7b4c92f",
    commitMsg: "feat(onboarding): engineer US stock trading onboarding flow & compliance microservices",
    author: "Atharva Jadhav <atharvajadhavlm10@gmail.com>",
    description:
      "Owned end-to-end user onboarding for a US stock market investment trading application.",
    bullets: [
      "Worked on a US stock market investment trading application, owning end-to-end user onboarding.",
      "Designed onboarding workflows compliant with US investment rules and regulatory requirements.",
      "Built a microservice for efficient email management, improving scalability and delivery reliability.",
      "Created a deployment preview system allowing non-technical stakeholders to review feature changes from any branch without technical tooling.",
    ],
    metrics: [
      { value: "100%", label: "Onboarding Flow Ownership" },
      { value: "US Market", label: "Regulatory Compliance" },
      { value: "Microservice", label: "Email Management" },
    ],
    tags: ["React", "Node.js", "Microservices", "System Design"],
    diffLines: [
      {
        legacy: "High drop-offs and friction during foreign market US regulatory compliance verification",
        solution: "Engineered seamless, compliant US stock onboarding workflows with 100% flow ownership",
      },
      {
        legacy: "Monolithic, unmonitored transactional email dispatch causing delivery bottlenecks",
        solution: "Architected dedicated microservice for reliable email management & asynchronous queuing",
      },
      {
        legacy: "Non-technical stakeholders blocked from inspecting branch features without local developer tooling",
        solution: "Created zero-dependency deployment preview system for real-time stakeholder verification",
      },
    ],
  },
  {
    id: "letsupgrade",
    role: "Software Intern",
    company: "LetsUpgrade",
    logo: "/media/letsupgrade/image.png",
    location: "Vashi",
    dateRange: "May 2025 — Sept 2025",
    year: "2025",
    commitHash: "3f81e0a",
    commitMsg: "feat(automation): deploy n8n media pipeline & Python Script Trimmer",
    author: "Atharva Jadhav <atharvajadhavlm10@gmail.com>",
    description:
      "Automated content generation pipelines and built AI-driven workflows that cut manual editing and content effort dramatically.",
    bullets: [
      "Automated content generation pipelines, reducing manual effort by 40%.",
      "Built and deployed AI-driven automation workflows using n8n, Python, and APIs.",
      "Developed Script Trimmer, a Python-based video/audio splitting tool, improving content repurposing efficiency by 80%.",
      "Built an internal system to extract meaningful short clips from long sessions, reducing editing time by 80%.",
    ],
    metrics: [
      { value: "40%", label: "Manual Effort Reduction" },
      { value: "80%", label: "Content Repurposing Efficiency" },
      { value: "80%", label: "Editing Time Saved" },
    ],
    tags: ["Python", "n8n", "AI Automation", "APIs"],
    diffLines: [
      {
        legacy: "Manual multi-hour audio/video content trimming and clip extraction workflows taking 4+ hours",
        solution: "Developed Python Script Trimmer tool, accelerating content repurposing efficiency by 80%",
      },
      {
        legacy: "Repetitive manual content generation tasks consuming engineering & editorial team bandwidth",
        solution: "Built & deployed AI-driven automation workflows via n8n & Python APIs, cutting effort by 40%",
      },
      {
        legacy: "Slow turnaround times slicing highlight segments from 2+ hour educational sessions",
        solution: "Engineered automated clip extraction engine slashing overall editing turnaround time by 80%",
      },
    ],
  },
  {
    id: "playbox",
    role: "Intern",
    company: "Playbox TV",
    logo: "/media/playbox/image.png",
    location: "Andheri",
    dateRange: "Jun 2024 — Sept 2024",
    year: "2024",
    commitHash: "1d94a6b",
    commitMsg: "refactor(cms): build reusable React design system components",
    author: "Atharva Jadhav <atharvajadhavlm10@gmail.com>",
    description:
      "Developed reusable React.js components, improving CMS efficiency and cutting down repetitive development work.",
    bullets: [
      "Developed reusable React.js components, improving CMS efficiency and reducing repetitive development work.",
      "Collaborated with frontend engineering teams to streamline UI component consistency across CMS platforms.",
    ],
    metrics: [
      { value: "30%", label: "Faster Component Assembly" },
      { value: "Reusable", label: "CMS Design System" },
    ],
    tags: ["React.js", "CMS", "Component Design"],
    diffLines: [
      {
        legacy: "Rigid non-reusable CMS components resulting in duplicate code and inconsistent UI states",
        solution: "Engineered modular React component library boosting assembly velocity by 30%",
      },
      {
        legacy: "Ad-hoc design implementations causing UI discrepancies across disparate CMS platform pages",
        solution: "Established unified design tokens and reusable UI patterns across frontend engineering",
      },
    ],
  },
];
