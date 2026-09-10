"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  FolderOpen,
  Braces,
  GraduationCap,
  Mail,
  ArrowRight,
  RotateCcw,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEditorStore } from "@/lib/store";
import { FILES } from "@/lib/files";
import { FileIcon } from "@/components/ui/FileIcon";
import { FileId } from "@/lib/types";

const CODE_LINES = [
  { text: '// developer.ts - Atharva\'s Config', type: 'comment' },
  { text: 'interface Developer {', type: 'keyword' },
  { text: '  name: string;', type: 'type' },
  { text: '  role: string;', type: 'type' },
  { text: '  stack: string[];', type: 'type' },
  { text: '  availableForHire: boolean;', type: 'type' },
  { text: '}', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: 'const atharva: Developer = {', type: 'const' },
  { text: '  name: "Atharva Jadhav",', type: 'string' },
  { text: '  role: "Full-Stack Software Engineer",', type: 'string' },
  { text: '  stack: ["Next.js", "React", "TypeScript", "Node.js"],', type: 'array' },
  { text: '  availableForHire: true,', type: 'boolean' },
  { text: '};', type: 'const' },
  { text: '', type: 'empty' },
  { text: '// Ready to build high-performance web applications 🚀', type: 'comment' },
];

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
  const [displayedLineCount, setDisplayedLineCount] = useState(1);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (displayedLineCount < CODE_LINES.length) {
      const timeout = setTimeout(() => {
        setDisplayedLineCount((prev) => prev + 1);
      }, 140);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedLineCount]);

  const restartTypewriter = () => {
    setDisplayedLineCount(1);
    setIsTypingComplete(false);
  };

  const renderHighlightedLine = (line: { text: string; type: string }) => {
    if (line.type === "comment") {
      return <span className="text-text-muted italic">{line.text}</span>;
    }
    if (line.type === "empty") return <span>&nbsp;</span>;

    if (line.text.includes("interface ")) {
      return (
        <span>
          <span className="text-purple-400">interface</span>{" "}
          <span className="text-amber-300">Developer</span> &#123;
        </span>
      );
    }
    if (line.type === "type") {
      const parts = line.text.split(":");
      return (
        <span>
          <span className="text-sky-300">{parts[0]}</span>:
          <span className="text-emerald-400">{parts[1]}</span>
        </span>
      );
    }
    if (line.text.includes("const atharva")) {
      return (
        <span>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-amber-300">atharva</span>:{" "}
          <span className="text-emerald-300">Developer</span> = &#123;
        </span>
      );
    }
    if (line.type === "string") {
      const parts = line.text.split(":");
      return (
        <span>
          <span className="text-sky-300">{parts[0]}</span>:
          <span className="text-amber-200">{parts[1]}</span>
        </span>
      );
    }
    if (line.type === "array") {
      return (
        <span>
          <span className="text-sky-300">  stack</span>: [
          <span className="text-amber-200">"Next.js"</span>,{" "}
          <span className="text-amber-200">"React"</span>,{" "}
          <span className="text-amber-200">"TypeScript"</span>,{" "}
          <span className="text-amber-200">"Node.js"</span>],
        </span>
      );
    }
    if (line.type === "boolean") {
      return (
        <span>
          <span className="text-sky-300">  availableForHire</span>:{" "}
          <span className="text-purple-400 font-semibold">true</span>,
        </span>
      );
    }
    return <span className="text-text-primary">{line.text}</span>;
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10">
      {/* Main Grid Section starting from top level */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Title Header + Start & Links */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-4xl font-semibold text-text-bright sm:text-5xl">
              Atharva Jadhav
              <span className="caret-blink ml-1 inline-block h-9 w-0.5 translate-y-1 bg-accent align-middle sm:h-10" />
            </h1>
            <p className="mt-3 text-base text-text-muted">
              Full-Stack Developer / Backend & Automation
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-text-muted font-mono">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>TypeScript v5.0 Active</span>
            </div>
          </div>

          <div className="border-t border-border-subtle pt-6">
            <h2 className="mb-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
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
            <h2 className="mb-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
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

          <div>
            <h2 className="mb-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Recent Files
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
                    <span className="font-mono text-text-muted text-[12px]">
                      {f.recentPath}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code Typewriter Window (Aligned at top level with title) */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg border border-border-strong bg-titlebar shadow-xl">
            {/* Code Window Header Bar */}
            <div className="flex h-9 items-center justify-between border-b border-border-subtle bg-titlebar px-3 text-xs text-text-muted select-none">
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-accent" />
                <span className="font-mono text-text-bright font-medium">developer.ts</span>
                {isTypingComplete && (
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-300">
                    Compiled
                  </span>
                )}
              </div>

              <button
                onClick={restartTypewriter}
                title="Replay Code Typewriter"
                className="flex items-center gap-1 rounded px-2 py-1 transition-colors hover:bg-elevated-hover hover:text-text-bright text-[11px]"
              >
                <RotateCcw size={12} />
                Replay
              </button>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto bg-app">
              {CODE_LINES.slice(0, displayedLineCount).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center gap-4 py-0.5 hover:bg-elevated-hover/50 rounded px-1"
                >
                  <span className="w-6 shrink-0 text-right text-text-muted/50 select-none text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="flex-1 whitespace-pre">
                    {renderHighlightedLine(line)}
                    {idx === displayedLineCount - 1 && !isTypingComplete && (
                      <span className="inline-block w-2 h-4 ml-0.5 bg-accent animate-pulse align-middle" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-text-muted">
            Full-stack developer with strong computer science fundamentals and hands-on experience building scalable web applications. Proficient in React, Next.js, TypeScript, Node.js, REST APIs, and modern UI engineering.
          </p>
        </div>
      </div>
    </div>
  );
}

