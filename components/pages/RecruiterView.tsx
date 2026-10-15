"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Mail,
  Phone,
  ArrowLeft,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Code2,
  ExternalLink,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Download,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { EXPERIENCE } from "@/data/experience";
import { PROJECT_SECTIONS } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { EDUCATION } from "@/data/education";
import { useEditorStore } from "@/lib/store";

export function RecruiterView() {
  const setRecruiterMode = useEditorStore((s) => s.setRecruiterMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="relative min-h-screen bg-app text-text-primary selection:bg-accent/30 font-sans pb-24">
      {/* Floating Exit Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setRecruiterMode(false)}
          className="group flex items-center gap-2 rounded-full border border-accent/40 bg-elevated/95 px-4 py-2.5 text-xs font-semibold text-text-bright shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:bg-accent hover:text-white cursor-pointer"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>💻 Exit to IDE Mode</span>
        </button>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-8 sm:pt-12">
        {/* Top bar with back link & print */}
        <div className="mb-8 flex items-center justify-between border-b border-border-subtle pb-4">
          <button
            onClick={() => setRecruiterMode(false)}
            className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-accent cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to VS Code IDE</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-status-green/30 bg-status-green/10 px-2.5 py-0.5 text-[11px] font-medium text-status-green">
              <span className="h-1.5 w-1.5 rounded-full bg-status-green animate-pulse" />
              Recruiter Mode Active
            </span>
          </div>
        </div>

        {/* 1. Header with Name, Role, Contact, & Download */}
        <header className="rounded-2xl border border-border-subtle bg-elevated/80 p-6 sm:p-8 shadow-xl backdrop-blur-xs">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-mono font-medium text-accent border border-accent/25">
                <span>FULL-STACK SOFTWARE ENGINEER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-bright">
                Atharva Jadhav
              </h1>
              <p className="max-w-xl text-[14px] leading-relaxed text-text-muted">
                Specializing in scalable React/Next.js architectures, Node.js & Python backend microservices,
                and high-throughput AI workflow automations.
              </p>

              {/* Contact Icons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <a
                  href="mailto:atharvajadhavlm10@gmail.com"
                  className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-app px-3 py-1.5 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={13} className="text-accent" />
                  <span>atharvajadhavlm10@gmail.com</span>
                </a>
                <a
                  href="tel:+918369244148"
                  className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-app px-3 py-1.5 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <Phone size={13} className="text-status-green" />
                  <span>+91 83692 44148</span>
                </a>
                <a
                  href="https://linkedin.com/in/atharva12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-app px-3 py-1.5 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <FaLinkedin size={13} className="text-[#0a66c2]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/atharxva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-app px-3 py-1.5 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <FaGithub size={13} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Resume Download / Print Button */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-strong hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download size={15} />
                <span>Download Resume (PDF)</span>
              </button>
              <p className="text-[11px] text-center text-text-muted">
                ATS-Optimized Printable Document
              </p>
            </div>
          </div>
        </header>

        {/* 2. Executive Summary / About Me */}
        <section className="mt-8 rounded-2xl border border-border-subtle bg-elevated/40 p-6 sm:p-7">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-text-muted uppercase">
            <Sparkles size={15} className="text-amber-400" />
            Executive Summary
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-text-primary">
            Passionate software engineer with hands-on experience building mission-critical user onboarding
            systems for international trading platforms, developing enterprise CMS design systems, and
            engineering automated AI-powered video and audio content pipelines. Proficient in TypeScript,
            React, Next.js, Node.js, Python, and cloud services (AWS, Firebase, Docker). Strong background in
            data structures, algorithms, and microservices architecture.
          </p>
        </section>

        {/* 3. Work Experience */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={18} className="text-accent" />
            <h2 className="text-lg font-bold text-text-bright">Work Experience</h2>
            <span className="text-xs text-text-muted ml-auto">Winvesta · LetsUpgrade · Playbox TV</span>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="relative rounded-xl border border-border-subtle bg-elevated/60 p-5 sm:p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-text-bright">{exp.role}</h3>
                    <p className="text-sm font-semibold text-accent">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {exp.dateRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {exp.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs"
                      >
                        <span className="font-bold text-accent">{m.value}</span>
                        <span className="text-text-muted text-[11px]">{m.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Bulleted Achievements */}
                <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-text-primary">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-1 text-emerald-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle/60">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border-subtle bg-app px-2 py-0.5 text-[11px] font-mono text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Featured Projects */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <FolderGit2 size={18} className="text-accent" />
            <h2 className="text-lg font-bold text-text-bright">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECT_SECTIONS.flatMap((s) => s.projects).map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between rounded-xl border border-border-subtle bg-elevated/60 p-5 transition-all hover:border-accent/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-text-bright">{proj.title}</h3>
                    {proj.isClosedSource && (
                      <span className="shrink-0 rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/25">
                        Enterprise Work
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border-subtle bg-app px-1.5 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-border-subtle/50 text-xs">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:underline font-medium"
                      >
                        <ExternalLink size={12} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.codeUrl && (
                      <a
                        href={proj.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-text-muted hover:text-text-bright font-medium"
                      >
                        <FaGithub size={12} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technical Skills Grouped Neatly into Columns */}
        <section className="mt-10 rounded-2xl border border-border-subtle bg-elevated/60 p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-6">
            <Code2 size={18} className="text-accent" />
            <h2 className="text-lg font-bold text-text-bright">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Languages */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Languages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS_DATA.developer.skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...SKILLS_DATA.developer.skills.frontend.core,
                  ...SKILLS_DATA.developer.skills.frontend.stateAndUi,
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Backend
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...SKILLS_DATA.developer.skills.backend.runtime,
                  ...SKILLS_DATA.developer.skills.backend.apis,
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Databases
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...SKILLS_DATA.developer.skills.databases.nosql,
                  ...SKILLS_DATA.developer.skills.databases.relational,
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Cloud & DevOps
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...SKILLS_DATA.developer.skills.devopsAndCloud.platforms,
                  ...SKILLS_DATA.developer.skills.devopsAndCloud.ciCdAndAutomation,
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Testing & Optimization */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5">
                Testing & Optimization
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS_DATA.developer.skills.testingAndOptimization.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border-subtle bg-app px-2.5 py-1 text-xs font-mono text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Education */}
        <section className="mt-10 rounded-2xl border border-border-subtle bg-elevated/60 p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-accent" />
            <h2 className="text-lg font-bold text-text-bright">Education</h2>
          </div>

          <div className="space-y-4">
            {EDUCATION.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-border-subtle/50 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <h3 className="text-sm font-bold text-text-bright">{edu.degree}</h3>
                  <p className="text-xs text-accent">{edu.institute}</p>
                </div>
                <span className="text-xs text-text-muted font-mono">{edu.dateRange}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-text-muted pb-8">
          <p>© {new Date().getFullYear()} Atharva Jadhav — Built with Next.js, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
