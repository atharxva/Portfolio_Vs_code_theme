"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Search,
  X,
  Filter,
  FileCode,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FILES } from "@/lib/files";
import { FileGroup, FileId } from "@/lib/types";
import { useEditorStore } from "@/lib/store";
import { FileIcon } from "@/components/ui/FileIcon";
import { EXPERIENCE } from "@/data/experience";
import { PROJECT_SECTIONS } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";

const GROUPS: FileGroup[] = ["PORTFOLIO", "EXTRAS"];

// Associate tags and keywords with each file for real-time filtering
const FILE_TAGS: Record<FileId, string[]> = {
  welcome: ["about", "bio", "atharva", "jadhav", "full-stack", "engineer", "hero", "config"],
  experience: [
    "experience",
    "work",
    "internship",
    "winvesta",
    "letsupgrade",
    "playbox",
    "python",
    "react",
    "node.js",
    "n8n",
    "microservices",
    "diff",
    "timeline",
  ],
  skills: [
    "skills",
    "json",
    "languages",
    "typescript",
    "javascript",
    "python",
    "java",
    "c++",
    "sql",
    "frontend",
    "react.js",
    "next.js",
    "tailwind",
    "redux",
    "backend",
    "express",
    "mongodb",
    "postgresql",
    "aws",
    "docker",
    "cypress",
  ],
  projects: [
    "projects",
    "weather",
    "machine learning",
    "script trimmer",
    "kindle",
    "sight shop",
    "ai pipeline",
    "fastapi",
    "scikit-learn",
    "ffmpeg",
    "python",
    "sandbox",
    "demo",
    "architecture",
  ],
  contact: ["contact", "email", "phone", "linkedin", "github", "hire", "socials"],
  education: ["education", "itm", "degree", "b.tech", "computer science", "chinmaya", "college"],
};

export function Explorer() {
  const sidebarOpen = useEditorStore((s) => s.sidebarOpen);
  const activeTab = useEditorStore((s) => s.activeTab);
  const openFile = useEditorStore((s) => s.openFile);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // 1. Direct matching files
  const matchingFiles = useMemo(() => {
    if (!trimmedQuery) return FILES;
    return FILES.filter((file) => {
      const nameMatch = file.name.toLowerCase().includes(trimmedQuery);
      const tagMatch = FILE_TAGS[file.id]?.some((tag) =>
        tag.toLowerCase().includes(trimmedQuery)
      );
      return nameMatch || tagMatch;
    });
  }, [trimmedQuery]);

  // 2. Deep component search results (shown if query exists)
  const deepSearchResults = useMemo(() => {
    if (!trimmedQuery) return [];
    const results: { fileId: FileId; label: string; snippet: string }[] = [];

    // Search inside Experience
    EXPERIENCE.forEach((exp) => {
      const match =
        exp.company.toLowerCase().includes(trimmedQuery) ||
        exp.role.toLowerCase().includes(trimmedQuery) ||
        exp.tags.some((t) => t.toLowerCase().includes(trimmedQuery)) ||
        exp.bullets.some((b) => b.toLowerCase().includes(trimmedQuery));
      if (match) {
        results.push({
          fileId: "experience",
          label: `${exp.company} — ${exp.role}`,
          snippet: exp.bullets[0] || exp.description,
        });
      }
    });

    // Search inside Projects
    PROJECT_SECTIONS.flatMap((s) => s.projects).forEach((p) => {
      const match =
        p.title.toLowerCase().includes(trimmedQuery) ||
        p.description.toLowerCase().includes(trimmedQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(trimmedQuery));
      if (match) {
        results.push({
          fileId: "projects",
          label: p.title,
          snippet: p.description,
        });
      }
    });

    // Search inside Skills
    const allSkills = [
      ...SKILLS_DATA.developer.skills.languages,
      ...SKILLS_DATA.developer.skills.frontend.core,
      ...SKILLS_DATA.developer.skills.frontend.stateAndUi,
      ...SKILLS_DATA.developer.skills.backend.runtime,
      ...SKILLS_DATA.developer.skills.backend.apis,
      ...SKILLS_DATA.developer.skills.databases.nosql,
      ...SKILLS_DATA.developer.skills.databases.relational,
      ...SKILLS_DATA.developer.skills.devopsAndCloud.platforms,
      ...SKILLS_DATA.developer.skills.devopsAndCloud.ciCdAndAutomation,
      ...SKILLS_DATA.developer.skills.testingAndOptimization,
    ];
    const skillMatch = allSkills.find((s) => s.toLowerCase().includes(trimmedQuery));
    if (skillMatch) {
      results.push({
        fileId: "skills",
        label: `Skill: ${skillMatch}`,
        snippet: `Nested in Skills.json`,
      });
    }

    return results.slice(0, 4);
  }, [trimmedQuery]);

  if (!sidebarOpen) return null;

  // Helper to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-amber-400/30 text-amber-300 font-bold rounded-xs px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-20 bg-black/40 sm:hidden"
        onClick={() => useEditorStore.getState().toggleSidebar()}
      />

      <aside className="fixed left-12 top-8 bottom-6 z-30 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-border-subtle bg-sidebar shadow-2xl sm:static sm:z-auto sm:h-full sm:shadow-none select-none">
        <div className="w-full px-3 py-3">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
              Explorer
            </p>
            {trimmedQuery && (
              <span className="text-[10px] text-accent font-mono">
                {matchingFiles.length} match{matchingFiles.length === 1 ? "" : "es"}
              </span>
            )}
          </div>

          {/* Quick Filter & Search Input */}
          <div className="relative mb-3">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
            <input
              type="text"
              placeholder="Filter files or symbols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border-subtle bg-app pl-8 pr-7 py-1 text-xs text-text-bright placeholder:text-text-muted/60 focus:border-accent focus:outline-none transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-bright cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Direct File Matches */}
          {matchingFiles.length > 0 ? (
            GROUPS.map((group) => {
              const files = matchingFiles.filter((f) => f.group === group);
              if (files.length === 0) return null;
              const isCollapsed = collapsed[group];

              return (
                <div key={group} className="mb-3">
                  <button
                    onClick={() =>
                      setCollapsed((c) => ({ ...c, [group]: !c[group] }))
                    }
                    className="flex w-full items-center gap-1 rounded px-1 py-1 text-[11px] font-bold tracking-wider text-text-muted hover:text-text-bright uppercase cursor-pointer"
                  >
                    <span
                      className={`transition-transform duration-150 ${
                        isCollapsed ? "-rotate-90" : "rotate-0"
                      }`}
                    >
                      <ChevronDown size={13} />
                    </span>
                    {group}
                  </button>

                  {!isCollapsed && (
                    <div className="mt-1 flex flex-col gap-0.5">
                      {files.map((file) => {
                        const active = activeTab === file.id;
                        return (
                          <button
                            key={file.id}
                            onClick={() => {
                              openFile(file.id);
                              if (
                                typeof window !== "undefined" &&
                                window.innerWidth < 640
                              ) {
                                useEditorStore.getState().toggleSidebar();
                              }
                            }}
                            className={`relative flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-[13px] transition-colors cursor-pointer ${
                              active
                                ? "bg-elevated text-text-bright font-medium"
                                : "text-text-primary hover:bg-elevated-hover hover:text-text-bright"
                            }`}
                          >
                            {active && (
                              <span className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-accent" />
                            )}
                            <FileIcon id={file.id} size={15} />
                            <span className="font-mono truncate">
                              {highlightMatch(file.name, trimmedQuery)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-4 text-center">
              <p className="text-xs text-text-muted">No files matching &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {/* Cross-Component Global Search Results (if query matches content) */}
          {deepSearchResults.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border-subtle/70">
              <div className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-accent font-mono">
                <Sparkles size={11} />
                <span>Global Matches in Code</span>
              </div>

              <div className="space-y-1.5">
                {deepSearchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      openFile(res.fileId);
                      if (typeof window !== "undefined" && window.innerWidth < 640) {
                        useEditorStore.getState().toggleSidebar();
                      }
                    }}
                    className="w-full rounded-md border border-border-subtle/80 bg-app p-2 text-left hover:border-accent hover:bg-elevated transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-text-bright mb-0.5">
                      <span className="truncate">{highlightMatch(res.label, trimmedQuery)}</span>
                      <span className="text-[10px] text-accent font-mono shrink-0 ml-1">
                        {res.fileId}.tsx
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted line-clamp-1">
                      {highlightMatch(res.snippet, trimmedQuery)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
