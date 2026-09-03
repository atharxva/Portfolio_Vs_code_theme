"use client";

import {
  Briefcase,
  FolderOpen,
  Braces,
  GraduationCap,
  Mail,
  ArrowRight,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useEditorStore } from "@/lib/store";
import { FILES } from "@/lib/files";
import { FileIcon } from "@/components/ui/FileIcon";
import { FileId } from "@/lib/types";

const START_LINKS: { label: string; icon: typeof Briefcase; target: FileId }[] = [
  { label: "Experience...", icon: Briefcase, target: "experience" },
  { label: "Open Projects...", icon: FolderOpen, target: "projects" },
  { label: "View Skills...", icon: Braces, target: "skills" },
  { label: "View Education...", icon: GraduationCap, target: "education" },
  { label: "Connect to...", icon: Mail, target: "contact" },
];

const CONNECT_LINKS = [
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/in/atharva12",
  },
  { label: "GitHub", icon: FaGithub, href: "https://github.com/atharxva" },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:atharvajadhavlm10@gmail.com",
  },
];

export function Welcome() {
  const openFile = useEditorStore((s) => s.openFile);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10">
      <h1 className="text-4xl font-semibold text-text-bright sm:text-5xl">
        Atharva Jadhav
        <span className="caret-blink ml-1 inline-block h-9 w-0.5 translate-y-1 bg-accent align-middle sm:h-10" />
      </h1>
      <p className="mt-3 text-lg text-text-muted">
        Full-Stack Developer / Backend & Automation
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-primary">
            Start
          </h2>
          <ul className="space-y-3">
            {START_LINKS.map(({ label, icon: Icon, target }) => (
              <li key={label}>
                <button
                  onClick={() => openFile(target)}
                  className="group flex items-center gap-3 text-[15px] text-accent transition-colors hover:text-text-bright"
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  <ArrowRight
                    size={14}
                    className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-primary">
            Connect
          </h2>
          <ul className="space-y-3">
            {CONNECT_LINKS.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[15px] text-accent transition-colors hover:text-text-bright"
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-sm font-semibold text-text-primary">
          Recent
        </h2>
        <ul className="space-y-2">
          {FILES.filter((f) => f.id !== "welcome").map((f) => (
            <li key={f.id}>
              <button
                onClick={() => openFile(f.id)}
                className="group flex items-center gap-3 text-[14px]"
              >
                <FileIcon id={f.id} size={14} />
                <span className="text-accent group-hover:text-text-bright">
                  {f.recentLabel}
                </span>
                <span className="font-mono text-text-muted">
                  {f.recentPath}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 max-w-xl text-[13px] leading-relaxed text-text-muted">
        Full-stack developer with strong computer science fundamentals and
        hands-on experience building scalable web applications. Proficient in
        React, Node.js, REST APIs, and database-driven systems, with exposure
        to system design, automation, and production-grade deployments.
      </p>
    </div>
  );
}
