"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Award } from "lucide-react";
import { SKILLS, CERTIFICATIONS } from "@/data/skills";

export function Skills() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Skills
        <span className="caret-blink ml-1 inline-block h-7 w-0.5 bg-accent align-middle" />
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        Technologies and tools I work with.
      </p>

      <div className="mt-8 space-y-4">
        {SKILLS.map((category) => {
          const isCollapsed = collapsed[category.id];
          return (
            <div
              key={category.id}
              className="rounded-xl border border-border-subtle bg-elevated"
            >
              <button
                onClick={() =>
                  setCollapsed((c) => ({
                    ...c,
                    [category.id]: !c[category.id],
                  }))
                }
                className="flex w-full items-center gap-2 px-5 py-3.5 text-left"
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
                <span className="text-[12px] text-text-muted">
                  {category.skills.length} skills
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
                    <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-4">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-center rounded-lg border border-border-subtle bg-app px-3 py-3 text-center text-[13px] text-text-primary transition-colors hover:border-border-strong hover:text-text-bright"
                        >
                          {skill.name}
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

      <div className="mt-10 rounded-xl border border-border-subtle bg-elevated p-5">
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
              <span className="text-text-primary">{c.name}</span>
              <span className="text-text-muted">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
