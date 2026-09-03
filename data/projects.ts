import { ProjectSection } from "@/lib/types";

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    id: "professional",
    title: "Professional",
    description: "Built as part of internship work.",
    dotColor: "bg-emerald-400",
    projects: [
      {
        id: "trading-app",
        title: "Investment Trading App (US Market)",
        description:
          "Implemented secure and regulation-compliant onboarding workflows for a US-based investment platform.",
        tags: ["React", "Node.js", "Compliance", "System Design"],
        gradient: "from-sky-500/30 via-blue-600/20 to-slate-900",
      },
    ],
  },
  {
    id: "personal",
    title: "Personal Projects",
    description: "Built independently and for fun.",
    dotColor: "bg-violet-400",
    projects: [
      {
        id: "script-trimmer",
        title: "Script Trimmer",
        description:
          "Python-based automation tool for video/audio trimming and content reuse; takes a YouTube lecture or an AWS S3 link as input and creates short videos based on the topic discussed.",
        tags: ["Python", "Automation", "AWS S3"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-fuchsia-500/30 via-purple-600/20 to-slate-900",
      },
      {
        id: "kindle-extractor",
        title: "Kindle Books Extractor",
        description:
          "Automated e-book text extraction system for personal knowledge management.",
        tags: ["Python", "Automation", "PKM"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-amber-500/30 via-orange-600/20 to-slate-900",
      },
      {
        id: "sight-shop",
        title: "Sight Shop",
        description:
          "E-commerce platform with a full product catalog and a secure checkout flow.",
        tags: ["React", "Node.js", "MongoDB"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-rose-500/30 via-red-600/20 to-slate-900",
      },
      {
        id: "ai-pipeline",
        title: "AI Content Automation Pipeline",
        description:
          "Automated article scraping, summarization, and blog-ready content generation using n8n, Firecrawl, Whisper API, and OpenAI — removing the manual work of writing and posting content.",
        tags: ["n8n", "OpenAI", "Whisper API", "Firecrawl"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-teal-500/30 via-emerald-600/20 to-slate-900",
      },
    ],
  },
];
