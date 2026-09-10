"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Award, Cpu, Server, Brain, Users, Zap, Clock, Sparkles, Code2 } from "lucide-react";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiKotlin,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { SKILLS, CERTIFICATIONS } from "@/data/skills";

function renderSkillIcon(slug?: string) {
  switch (slug) {
    case "cpp":
      return <SiCplusplus className="text-[#00599C]" size={20} />;
    case "python":
      return <SiPython className="text-[#3776AB]" size={20} />;
    case "java":
      return <FaJava className="text-[#E76F00]" size={20} />;
    case "javascript":
      return <SiJavascript className="text-[#F7DF1E]" size={20} />;
    case "kotlin":
      return <SiKotlin className="text-[#7F52FF]" size={20} />;
    case "html5":
      return <SiHtml5 className="text-[#E34F26]" size={20} />;
    case "css3":
      return <SiCss className="text-[#1572B6]" size={20} />;
    case "react":
      return <SiReact className="text-[#61DAFB]" size={20} />;
    case "nextjs":
      return <SiNextdotjs className="text-text-bright" size={20} />;
    case "shadcn":
      return <Code2 className="text-text-bright" size={20} />;
    case "nodejs":
      return <SiNodedotjs className="text-[#5FA04E]" size={20} />;
    case "express":
      return <SiExpress className="text-text-bright" size={20} />;
    case "mysql":
      return <SiMysql className="text-[#4479A1]" size={20} />;
    case "mongodb":
      return <SiMongodb className="text-[#47A248]" size={20} />;
    case "supabase":
      return <SiSupabase className="text-[#3ECF8E]" size={20} />;
    case "postgresql":
      return <SiPostgresql className="text-[#4169E1]" size={20} />;
    case "aws":
      return <FaAws className="text-[#FF9900]" size={20} />;
    case "docker":
      return <SiDocker className="text-[#2496ED]" size={20} />;
    case "git":
      return <SiGit className="text-[#F05032]" size={20} />;
    case "github":
      return <SiGithub className="text-text-bright" size={20} />;
    case "dsa":
      return <Cpu className="text-amber-400" size={20} />;
    case "systemdesign":
      return <Server className="text-sky-400" size={20} />;
    case "problem_solving":
      return <Zap className="text-yellow-400" size={20} />;
    case "collaboration":
      return <Users className="text-emerald-400" size={20} />;
    case "adaptability":
      return <Sparkles className="text-purple-400" size={20} />;
    case "time_management":
      return <Clock className="text-rose-400" size={20} />;
    case "thinking":
      return <Brain className="text-cyan-400" size={20} />;
    default:
      return <Code2 className="text-accent" size={20} />;
  }
}

export function Skills() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Skills & Technologies
        <span className="caret-blink ml-1 inline-block h-7 w-0.5 bg-accent align-middle" />
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        Technologies, frameworks, databases, and tools I work with daily.
      </p>

      <div className="mt-8 space-y-4">
        {SKILLS.map((category) => {
          const isCollapsed = collapsed[category.id];
          return (
            <div
              key={category.id}
              className="rounded-xl border border-border-subtle bg-elevated shadow-md"
            >
              <button
                onClick={() =>
                  setCollapsed((c) => ({
                    ...c,
                    [category.id]: !c[category.id],
                  }))
                }
                className="flex w-full items-center gap-2 px-5 py-3.5 text-left select-none"
              >
                <motion.span
                  animate={{ rotate: isCollapsed ? -90 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex text-text-muted"
                >
                  <ChevronDown size={16} />
                </motion.span>
                <span className="flex-1 text-[15px] font-semibold text-text-bright">
                  {category.title}
                </span>
                <span className="text-[12px] text-text-muted font-mono">
                  {category.skills.length} items
                </span>
              </button>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-3 md:grid-cols-4">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group flex items-center gap-3 rounded-lg border border-border-subtle bg-app px-3.5 py-3 transition-all hover:border-accent/40 hover:bg-elevated-hover hover:shadow-lg"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-titlebar p-1.5 border border-border-subtle group-hover:scale-105 transition-transform">
                            {renderSkillIcon(skill.icon)}
                          </div>
                          <span className="text-[13px] font-medium text-text-primary group-hover:text-text-bright truncate">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-border-subtle bg-elevated p-5 shadow-md">
        <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-text-bright">
          <Award size={16} className="text-accent" />
          Certifications
        </h2>
        <ul className="space-y-2">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between text-[13px]"
            >
              <span className="text-text-primary font-medium">{c.name}</span>
              <span className="text-text-muted font-mono">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
