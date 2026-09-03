"use client";

import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECT_SECTIONS } from "@/data/projects";

export function Projects() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Projects
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        A collection of projects I&apos;ve built and contributed to.
      </p>

      <div className="mt-10 space-y-12">
        {PROJECT_SECTIONS.map((section) => (
          <div key={section.id}>
            <div className="mb-4 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${section.dotColor}`} />
              <h2 className="text-[15px] font-semibold text-text-bright">
                {section.title}
              </h2>
              <span className="text-[12px] text-text-muted">
                {section.description}
              </span>
              <span className="ml-auto text-[12px] text-text-muted">
                {section.projects.length} projects
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-elevated transition-colors hover:border-border-strong"
                >
                  <div
                    className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${project.gradient}`}
                  >
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                      <span className={`h-1.5 w-1.5 rounded-full ${section.dotColor}`} />
                      {section.title}
                    </span>
                    <span className="px-4 text-center text-sm font-semibold text-white/90">
                      {project.title}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-[14px] font-semibold text-text-bright">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-text-muted">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-full border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-4 border-t border-border-subtle pt-3 text-[12px]">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-accent hover:text-text-bright"
                        >
                          <ExternalLink size={12} /> Live Demo
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-accent hover:text-text-bright"
                        >
                          <FaGithub size={12} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
