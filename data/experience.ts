import { ExperienceItem } from "@/lib/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "playbox",
    role: "Intern",
    company: "Playbox TV",
    logo: "/media/playbox/image.png",
    location: "Andheri",
    dateRange: "Jun 2024 — Sept 2024",
    year: "2024",
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
  },
  {
    id: "letsupgrade",
    role: "Software Intern",
    company: "LetsUpgrade",
    logo: "/media/letsupgrade/image.png",
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
    metrics: [
      { value: "40%", label: "Manual Effort Reduction" },
      { value: "80%", label: "Content Repurposing Efficiency" },
      { value: "80%", label: "Editing Time Saved" },
    ],
    tags: ["Python", "n8n", "AI Automation", "APIs"],
  },
  {
    id: "winvesta",
    role: "Software Development Intern",
    company: "Winvesta",
    logo: "/media/winvesta/image.png",
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
    metrics: [
      { value: "100%", label: "Onboarding Flow Ownership" },
      { value: "US Market", label: "Regulatory Compliance" },
      { value: "Microservice", label: "Email Management" },
    ],
    tags: ["React", "Node.js", "Microservices", "System Design"],
    current: true,
  },
];
