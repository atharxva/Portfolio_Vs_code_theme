"use client";

import { useState } from "react";
import {
  ExternalLink,
  Code2,
  Sliders,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  Play,
  RotateCcw,
  CheckCircle,
  X,
  Smartphone,
  Monitor,
  CloudRain,
  Sun,
  CloudLightning,
  AlertCircle,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECT_SECTIONS } from "@/data/projects";
import { ProjectItem } from "@/lib/types";

export function Projects() {
  const [selectedDemoProject, setSelectedDemoProject] = useState<ProjectItem | null>(null);
  const [selectedArchProject, setSelectedArchProject] = useState<ProjectItem | null>(null);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");

  // Weather ML Demo interactive state
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(78);
  const [pressure, setPressure] = useState(1012);
  const [windSpeed, setWindSpeed] = useState(18);
  const [mlInference, setMlInference] = useState<{
    ran: boolean;
    rainProbability: number;
    willRain: boolean;
    confidence: number;
  } | null>(null);
  const [isInferring, setIsInferring] = useState(false);

  const runMlInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      // Calculate realistic probability based on atmospheric variables
      const score = Math.min(
        98,
        Math.max(
          4,
          Math.round(
            (humidity * 0.65) +
            (1020 - pressure) * 1.8 +
            (windSpeed * 0.4) -
            (temperature > 32 ? 10 : 0)
          )
        )
      );
      setMlInference({
        ran: true,
        rainProbability: score,
        willRain: score >= 50,
        confidence: Math.round(82 + Math.random() * 14),
      });
      setIsInferring(false);
    }, 600);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 font-sans">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Projects & Interactive Sandboxes
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        Live demos, simulated machine learning inference drawers, and inspected system architectures.
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
                {section.projects.length} {section.projects.length === 1 ? "project" : "projects"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-elevated transition-all hover:border-accent/40 hover:shadow-xl"
                >
                  {/* Card Banner */}
                  <div
                    className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${project.gradient}`}
                  >
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs border border-white/10">
                      <span className={`h-1.5 w-1.5 rounded-full ${section.dotColor}`} />
                      {section.title}
                    </span>

                    {/* Enterprise / Closed Source Badge */}
                    {project.isClosedSource && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-xs">
                        <Lock size={10} />
                        Enterprise Work
                      </span>
                    )}

                    <span className="px-4 text-center text-sm font-semibold text-white/95 drop-shadow-sm">
                      {project.title}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-4.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-bold text-text-bright">
                        {project.title}
                      </h3>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-text-muted">
                      {project.description}
                    </p>

                    {/* Closed Source Notice */}
                    {project.isClosedSource && (
                      <div className="mt-2.5 rounded-md border border-amber-400/25 bg-amber-400/10 p-2 text-[11px] text-amber-200/90 leading-tight">
                        <div className="flex items-center gap-1 font-semibold text-amber-300 mb-0.5">
                          <Lock size={11} />
                          <span>Closed Source / Enterprise Work</span>
                        </div>
                        <p className="text-[10px] text-amber-300/80">{project.closedSourceReason}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-md border border-border-subtle bg-app px-2 py-0.5 text-[10px] font-mono text-text-muted">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Direct Action Buttons: Demo, Code/GitHub, Inspect Architecture */}
                    <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col gap-2.5 font-mono">
                      {/* High-Visibility Inspect Architecture Button */}
                      {project.architecture && (
                        <button
                          onClick={() => setSelectedArchProject(project)}
                          className="group/btn w-full flex items-center justify-between gap-2 rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 text-xs font-semibold text-text-bright hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer shadow-md shadow-accent/10 hover:shadow-accent/25 active:scale-[0.99]"
                          title="Inspect system architecture, data flows & engineering components"
                        >
                          <span className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/20 text-accent group-hover/btn:bg-white/20 group-hover/btn:text-white transition-colors">
                              <Layers size={13} />
                            </span>
                            <span className="font-sans font-bold tracking-tight">Inspect Architecture</span>
                          </span>

                          <span className="flex items-center gap-1 text-[11px] text-accent group-hover/btn:text-white transition-colors">
                            <span className="font-mono text-[10px] hidden sm:inline">Blueprint</span>
                            <Sparkles size={12} className="text-amber-400 group-hover/btn:text-amber-200" />
                          </span>
                        </button>
                      )}

                      {/* Secondary Action Row: Demo / Code / Closed Source */}
                      <div className="flex items-center justify-between text-xs pt-0.5">
                        {/* Demo Button */}
                        {(project.liveUrl || project.sandboxType) ? (
                          <button
                            onClick={() => {
                              setSelectedDemoProject(project);
                              setMlInference(null);
                            }}
                            className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-app px-2.5 py-1 text-[11px] font-medium text-text-primary hover:border-accent hover:text-accent transition-all cursor-pointer"
                            title="Open simulated sandbox / live preview drawer"
                          >
                            <Play size={11} className="fill-accent text-accent" />
                            <span>Live Demo</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-text-muted italic flex items-center gap-1.5">
                            {project.isClosedSource ? (
                              <span className="inline-flex items-center gap-1 rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/20">
                                <Lock size={10} />
                                Closed Source
                              </span>
                            ) : (
                              <span className="text-[10px] text-text-muted">CLI / Internal Engine</span>
                            )}
                          </span>
                        )}

                        {/* Code / GitHub Button */}
                        {project.codeUrl ? (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-app px-2.5 py-1 text-[11px] font-medium text-text-muted hover:border-border-strong hover:text-text-bright transition-colors"
                            title="View Source on GitHub"
                          >
                            <FaGithub size={12} />
                            <span>GitHub</span>
                          </a>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-text-muted">
                            <Lock size={10} className="text-amber-400/80" />
                            <span>Private Codebase</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- DEMO & SANDBOX DRAWER / MODAL ---------------- */}
      {selectedDemoProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs select-none"
          onClick={() => setSelectedDemoProject(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-subtle bg-titlebar px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Play size={15} className="text-accent fill-accent" />
                <h3 className="text-sm font-bold text-text-bright">
                  Interactive Sandbox: {selectedDemoProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Viewport switcher for iframe */}
                {selectedDemoProject.liveUrl && !selectedDemoProject.sandboxType && (
                  <div className="flex items-center gap-1 bg-app rounded-md p-0.5 border border-border-subtle text-xs">
                    <button
                      onClick={() => setViewportMode("desktop")}
                      className={`p-1 rounded cursor-pointer ${
                        viewportMode === "desktop" ? "bg-elevated text-accent" : "text-text-muted"
                      }`}
                      title="Desktop view"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      onClick={() => setViewportMode("mobile")}
                      className={`p-1 rounded cursor-pointer ${
                        viewportMode === "mobile" ? "bg-elevated text-accent" : "text-text-muted"
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setSelectedDemoProject(null)}
                  className="rounded-lg p-1 text-text-muted hover:bg-elevated hover:text-text-bright cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Weather Rain Prediction ML App Sandbox */}
              {selectedDemoProject.sandboxType === "weather-ml" && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 p-4 text-xs text-sky-200">
                    <p className="font-semibold text-sky-100 flex items-center gap-1.5 mb-1">
                      <Sparkles size={14} className="text-amber-400" />
                      Live ML Inference Simulator (FastAPI + Scikit-Learn Model)
                    </p>
                    <p className="text-sky-200/80">
                      Tweak atmospheric sensory inputs and simulate real-time model inference predictions.
                    </p>
                  </div>

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Humidity */}
                    <div className="rounded-xl border border-border-subtle bg-app p-3.5 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-text-muted">Relative Humidity</span>
                        <span className="font-bold text-accent">{humidity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={humidity}
                        onChange={(e) => setHumidity(Number(e.target.value))}
                        className="w-full accent-accent cursor-pointer"
                      />
                    </div>

                    {/* Atmospheric Pressure */}
                    <div className="rounded-xl border border-border-subtle bg-app p-3.5 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-text-muted">Pressure (hPa)</span>
                        <span className="font-bold text-accent">{pressure} hPa</span>
                      </div>
                      <input
                        type="range"
                        min="980"
                        max="1040"
                        value={pressure}
                        onChange={(e) => setPressure(Number(e.target.value))}
                        className="w-full accent-accent cursor-pointer"
                      />
                    </div>

                    {/* Temperature */}
                    <div className="rounded-xl border border-border-subtle bg-app p-3.5 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-text-muted">Ambient Temp (°C)</span>
                        <span className="font-bold text-accent">{temperature}°C</span>
                      </div>
                      <input
                        type="range"
                        min="-5"
                        max="48"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full accent-accent cursor-pointer"
                      />
                    </div>

                    {/* Wind Speed */}
                    <div className="rounded-xl border border-border-subtle bg-app p-3.5 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-text-muted">Wind Speed (km/h)</span>
                        <span className="font-bold text-accent">{windSpeed} km/h</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="65"
                        value={windSpeed}
                        onChange={(e) => setWindSpeed(Number(e.target.value))}
                        className="w-full accent-accent cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Run Inference Button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={runMlInference}
                      disabled={isInferring}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 px-4 text-xs font-bold text-white shadow-md hover:bg-accent-strong transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Cpu size={14} className={isInferring ? "animate-spin" : ""} />
                      <span>{isInferring ? "Running Neural Inference..." : "Run ML Inference"}</span>
                    </button>

                    {selectedDemoProject.liveUrl && (
                      <a
                        href={selectedDemoProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-app px-4 py-2.5 text-xs font-medium text-text-bright hover:border-accent"
                      >
                        <ExternalLink size={13} />
                        <span>Open Live App</span>
                      </a>
                    )}
                  </div>

                  {/* Inference Output Card */}
                  {mlInference && (
                    <div className="rounded-xl border border-border-strong bg-titlebar p-4.5 space-y-3">
                      <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
                        <div className="flex items-center gap-2">
                          {mlInference.willRain ? (
                            <CloudRain size={20} className="text-sky-400" />
                          ) : (
                            <Sun size={20} className="text-amber-400" />
                          )}
                          <div>
                            <p className="text-sm font-bold text-text-bright">
                              Prediction: {mlInference.willRain ? "Rain Expected Tomorrow" : "Dry / Clear Tomorrow"}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              RandomForestClassifier v2.4 (Open-Meteo Normalizer)
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-mono font-bold text-accent">
                            {mlInference.rainProbability}% Probability
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {mlInference.confidence}% Model Confidence
                          </p>
                        </div>
                      </div>

                      {/* Probability Bar */}
                      <div className="space-y-1">
                        <div className="h-2.5 w-full rounded-full bg-app overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              mlInference.willRain ? "bg-sky-400" : "bg-amber-400"
                            }`}
                            style={{ width: `${mlInference.rainProbability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* General Live Preview iframe / Desktop/Mobile Toggle */}
              {selectedDemoProject.liveUrl && !selectedDemoProject.sandboxType && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div
                      className={`transition-all rounded-xl border border-border-strong overflow-hidden bg-black ${
                        viewportMode === "mobile" ? "w-[360px] h-[520px]" : "w-full h-[450px]"
                      }`}
                    >
                      <iframe
                        src={selectedDemoProject.liveUrl}
                        title={selectedDemoProject.title}
                        className="w-full h-full border-none"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href={selectedDemoProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
                    >
                      <ExternalLink size={12} />
                      <span>Open live deployment in new tab</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ARCHITECTURE INSPECTOR DRAWER ---------------- */}
      {selectedArchProject && selectedArchProject.architecture && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs select-none"
          onClick={() => setSelectedArchProject(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-subtle bg-titlebar px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-accent" />
                <h3 className="text-sm font-bold text-text-bright">
                  Architecture Blueprint: {selectedArchProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArchProject(null)}
                className="rounded-lg p-1 text-text-muted hover:bg-elevated hover:text-text-bright cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Architecture Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-xs font-sans">
              <div className="rounded-xl border border-accent/25 bg-accent/10 p-3.5">
                <p className="text-[11px] font-mono text-accent uppercase font-bold tracking-wider">
                  Pattern / Style
                </p>
                <p className="text-sm font-bold text-text-bright mt-0.5">
                  {selectedArchProject.architecture.architectureType}
                </p>
              </div>

              {/* Core Components */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                  Core Architectural Components
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedArchProject.architecture.components.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border-subtle bg-app p-2.5 text-text-primary font-mono text-[11px]"
                    >
                      <span className="text-accent font-bold mr-1.5">[{i + 1}]</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Flow */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                  End-to-End Data Flow
                </h4>
                <ol className="space-y-2 font-mono text-[11px]">
                  {selectedArchProject.architecture.dataFlow.map((flow, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-lg border border-border-subtle bg-app p-2.5"
                    >
                      <span className="rounded bg-accent/20 text-accent font-bold px-1.5 py-0.5 shrink-0 text-[10px]">
                        Step {i + 1}
                      </span>
                      <span className="text-text-primary leading-relaxed">{flow}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Security & Performance */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Security, Scalability & Optimization
                </h4>
                <div className="space-y-1.5 text-text-muted text-[11px]">
                  {selectedArchProject.architecture.securityOrOptimization.map((sec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-status-green shrink-0" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Contributions (for Closed Source) */}
              {selectedArchProject.technicalContributions && (
                <div className="border-t border-border-subtle pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                    <Lock size={12} />
                    Specific Technical Contributions
                  </h4>
                  <ul className="space-y-1.5 text-text-primary text-[12px]">
                    {selectedArchProject.technicalContributions.map((contrib, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border-subtle bg-titlebar px-5 py-3 flex justify-end">
              <button
                onClick={() => setSelectedArchProject(null)}
                className="rounded-lg bg-accent px-4 py-1.5 text-xs font-medium text-white hover:bg-accent-strong cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
