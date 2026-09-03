"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEditorStore } from "@/lib/store";
import { Welcome } from "@/components/pages/Welcome";
import { Experience } from "@/components/pages/Experience";
import { Skills } from "@/components/pages/Skills";
import { Projects } from "@/components/pages/Projects";
import { Education } from "@/components/pages/Education";
import { Contact } from "@/components/pages/Contact";
import { Code2 } from "lucide-react";

const PAGES: Record<string, React.ComponentType> = {
  welcome: Welcome,
  experience: Experience,
  skills: Skills,
  projects: Projects,
  education: Education,
  contact: Contact,
};

export function MainContent() {
  const activeTab = useEditorStore((s) => s.activeTab);
  const Page = activeTab ? PAGES[activeTab] : null;

  return (
    <div className="relative flex-1 overflow-y-auto bg-app">
      <AnimatePresence mode="wait">
        {Page ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="min-h-full"
          >
            <Page />
          </motion.div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-text-muted">
            <Code2 size={40} strokeWidth={1.2} />
            <p className="text-[13px]">No editor open</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
