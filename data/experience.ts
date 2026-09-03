import { ExperienceItem } from "@/lib/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "playbox",
    role: "Intern",
    company: "Playbox TV",
    location: "Andheri",
    dateRange: "Jun 2024 — Sept 2024",
    year: "2024",
    description:
      "Developed reusable React.js components, improving CMS efficiency and cutting down repetitive development work.",
    bullets: [
      "Developed reusable React.js components, improving CMS efficiency and reducing repetitive development work.",
    ],
    tags: ["React.js", "CMS", "Component Design"],
  },
  {
    id: "letsupgrade",
    role: "Software Intern",
    company: "LetsUpgrade",
    location: "Vashi",
    dateRange: "May 2025 — Sept 2025",
    year: "2025",
    description:
      "Automated content generation pipelines and built AI-driven workflows that cut manual editing and content effort dramatically.",
    bullets: [
      "Automated content generation pipelines, reducing manual effort by 40%.",
      "Built and deployed AI-driven automation workflows using n8n, Python, and APIs.",
      "Developed Script Trimmer, a Python-based video/audio splitting tool, improving content repurposing efficiency by 80%.",
      "Built an internal system to extract meaningful short clips from long sessions, reducing editing time by 80%.",
    ],
    tags: ["Python", "n8n", "AI Automation", "APIs"],
  },
  {
    id: "winvesta",
    role: "Software Development Intern",
    company: "Winvesta",
    location: "India",
    dateRange: "Sept 2025 — Dec 2025",
    year: "2025",
    description:
      "Owned end-to-end user onboarding for a US stock market investment trading application.",
    bullets: [
      "Worked on a US stock market investment trading application, owning end-to-end user onboarding.",
      "Designed onboarding workflows compliant with US investment rules and regulatory requirements.",
      "Built a microservice for efficient email management, improving scalability and delivery reliability.",
      "Created a deployment preview system allowing non-technical stakeholders to review feature changes from any branch without technical tooling.",
    ],
    tags: ["React", "Node.js", "Microservices", "System Design"],
    current: true,
  },
];
