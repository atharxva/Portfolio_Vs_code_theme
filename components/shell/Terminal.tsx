"use client";

import { useState, useRef, useEffect } from "react";
import { X, Minus, ChevronRight, Terminal as TerminalIcon, Sparkles, Trash2 } from "lucide-react";
import { useEditorStore } from "@/lib/store";
import { FileId } from "@/lib/types";

interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "system" | "matrix";
  text: string | React.ReactNode;
}

const INITIAL_WELCOME: OutputLine[] = [
  {
    id: "welcome-1",
    type: "system",
    text: "Atharva Portfolio Shell v1.0.0 (x86_64-apple-darwin23.0)",
  },
  {
    id: "welcome-2",
    type: "system",
    text: 'Type "help" or "neofetch" to see available terminal commands.',
  },
];

export function Terminal() {
  const terminalOpen = useEditorStore((s) => s.terminalOpen);
  const setTerminalOpen = useEditorStore((s) => s.setTerminalOpen);
  const openFile = useEditorStore((s) => s.openFile);

  const [activePanelTab, setActivePanelTab] = useState<"terminal" | "output" | "problems" | "debug">("terminal");
  const [history, setHistory] = useState<OutputLine[]>(INITIAL_WELCOME);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...cmdHistory, trimmed];
    setCmdHistory(newHistory);
    setHistoryIdx(-1);

    const inputLine: OutputLine = {
      id: Math.random().toString(),
      type: "input",
      text: trimmed,
    };

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let responseLines: OutputLine[] = [];

    switch (cmd) {
      case "help":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="space-y-1 py-1 text-xs">
                <p className="font-semibold text-accent">Available Commands:</p>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
                  <div><span className="text-emerald-400 font-mono">neofetch</span> - Display developer specs & logo</div>
                  <div><span className="text-emerald-400 font-mono">bio / about</span> - Show developer background</div>
                  <div><span className="text-emerald-400 font-mono">skills</span> - Display tech stack summary</div>
                  <div><span className="text-emerald-400 font-mono">projects</span> - View featured projects list</div>
                  <div><span className="text-emerald-400 font-mono">open &lt;file&gt;</span> - Open file (welcome, skills, projects...)</div>
                  <div><span className="text-emerald-400 font-mono">contact</span> - Show email and social profiles</div>
                  <div><span className="text-emerald-400 font-mono">sudo hire</span> - Unlock developer response</div>
                  <div><span className="text-emerald-400 font-mono">clear</span> - Clear terminal screen</div>
                  <div><span className="text-emerald-400 font-mono">matrix</span> - Toggle matrix code stream</div>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "neofetch":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="flex flex-col gap-2 font-mono text-xs sm:flex-row sm:items-center py-2">
                <div className="text-accent font-bold leading-tight select-none">
                  {`  /\\ \n /  \\ \n/ /\\ \\\n\\/  \\/\n`}
                </div>
                <div className="space-y-0.5">
                  <p className="text-emerald-400 font-bold">atharva@portfolio-macbook</p>
                  <p className="text-text-muted">-----------------------</p>
                  <p><span className="text-sky-400 font-semibold">OS:</span> Next.js 16 + React 19 Shell</p>
                  <p><span className="text-sky-400 font-semibold">Role:</span> Full-Stack Software Engineer</p>
                  <p><span className="text-sky-400 font-semibold">Stack:</span> TypeScript, React, Next.js, Node.js, Tailwind</p>
                  <p><span className="text-sky-400 font-semibold">Editor:</span> VS Code Custom IDE Theme</p>
                  <p><span className="text-sky-400 font-semibold">Uptime:</span> 100% Ready for Opportunities</p>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "bio":
      case "about":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="py-1 text-xs text-text-bright leading-relaxed">
                <p>💡 <span className="font-semibold text-accent">Atharva Jadhav</span> is a passionate Software Engineer building modern web applications, scalable design systems, and delightful user experiences.</p>
              </div>
            ),
          },
        ];
        break;

      case "skills":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="py-1 text-xs space-y-1">
                <p className="font-semibold text-amber-400">⚡ Tech Stack & Capabilities:</p>
                <p>• <span className="text-sky-300">Frontend:</span> React, Next.js, TypeScript, TailwindCSS, Framer Motion, HTML5/CSS3</p>
                <p>• <span className="text-emerald-300">Backend:</span> Node.js, Express, REST APIs, GraphQL, PostgreSQL, MongoDB</p>
                <p>• <span className="text-purple-300">Tools:</span> Git, Docker, VS Code, Vercel, Figma</p>
              </div>
            ),
          },
        ];
        break;

      case "projects":
      case "ls":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="py-1 text-xs space-y-1">
                <p className="font-semibold text-cyan-400">📁 Portfolio Projects:</p>
                <p>1. <span className="text-text-bright font-mono">VS Code Theme Portfolio</span> - Interactive IDE portfolio site</p>
                <p>2. <span className="text-text-bright font-mono">Full-Stack Web App</span> - Next.js & React scalable web application</p>
                <p className="text-text-muted italic">Type "open projects" to launch the Projects tab view.</p>
              </div>
            ),
          },
        ];
        break;

      case "open":
        if (args.length > 0) {
          const fileArg = args[0].toLowerCase().replace(".tsx", "").replace(".json", "");
          const validFiles: FileId[] = ["welcome", "experience", "skills", "projects", "contact", "education"];
          if (validFiles.includes(fileArg as FileId)) {
            openFile(fileArg as FileId);
            responseLines = [
              {
                id: Math.random().toString(),
                type: "system",
                text: `Opening tab: ${fileArg}...`,
              },
            ];
          } else {
            responseLines = [
              {
                id: Math.random().toString(),
                type: "error",
                text: `File not found: ${args[0]}. Try: open welcome, open skills, open projects...`,
              },
            ];
          }
        } else {
          responseLines = [
            {
              id: Math.random().toString(),
              type: "error",
              text: "Usage: open <file_name> (e.g. open projects)",
            },
          ];
        }
        break;

      case "contact":
        responseLines = [
          {
            id: Math.random().toString(),
            type: "output",
            text: (
              <div className="py-1 text-xs space-y-1">
                <p className="font-semibold text-rose-400">📬 Let's Connect!</p>
                <p>• GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="underline text-sky-400">github.com</a></p>
                <p>• LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="underline text-sky-400">linkedin.com</a></p>
                <p className="text-text-muted italic">Type "open contact" to open the interactive contact form tab.</p>
              </div>
            ),
          },
        ];
        break;

      case "sudo":
        if (args.join(" ") === "hire") {
          responseLines = [
            {
              id: Math.random().toString(),
              type: "output",
              text: (
                <div className="py-2 px-3 my-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300">
                  <p className="font-bold flex items-center gap-1.5"><Sparkles size={14} /> Permission Granted!</p>
                  <p className="mt-1">Awesome choice! Atharva is ready to join high-impact teams. Reach out via the Contact tab or terminal!</p>
                </div>
              ),
            },
          ];
        } else {
          responseLines = [
            {
              id: Math.random().toString(),
              type: "error",
              text: `sudo: command not found: ${args.join(" ")}. Try "sudo hire"`,
            },
          ];
        }
        break;

      case "matrix":
        setIsMatrixActive(!isMatrixActive);
        responseLines = [
          {
            id: Math.random().toString(),
            type: "system",
            text: !isMatrixActive ? "Matrix Mode Activated! 🟢" : "Matrix Mode Deactivated.",
          },
        ];
        break;

      default:
        responseLines = [
          {
            id: Math.random().toString(),
            type: "error",
            text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
          },
        ];
        break;
    }

    setHistory((prev) => [...prev, inputLine, ...responseLines]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= cmdHistory.length) {
          setHistoryIdx(-1);
          setInputVal("");
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["help", "neofetch", "bio", "about", "skills", "projects", "open", "contact", "sudo hire", "clear", "matrix"];
      const match = commands.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  return (
    <div className="flex h-56 w-full flex-col border-t border-border-subtle bg-app font-mono text-xs select-none">
      {/* Terminal Panel Header Bar */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-border-subtle bg-titlebar px-3 text-[11px] text-text-muted">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActivePanelTab("terminal")}
            className={`flex items-center gap-1.5 border-b-2 py-2 font-medium transition-colors ${
              activePanelTab === "terminal" ? "border-accent text-text-bright" : "border-transparent hover:text-text-bright"
            }`}
          >
            <TerminalIcon size={13} />
            TERMINAL
          </button>
          <button
            onClick={() => setActivePanelTab("output")}
            className={`flex items-center gap-1.5 border-b-2 py-2 font-medium transition-colors ${
              activePanelTab === "output" ? "border-accent text-text-bright" : "border-transparent hover:text-text-bright"
            }`}
          >
            OUTPUT
          </button>
          <button
            onClick={() => setActivePanelTab("problems")}
            className={`flex items-center gap-1.5 border-b-2 py-2 font-medium transition-colors ${
              activePanelTab === "problems" ? "border-accent text-text-bright" : "border-transparent hover:text-text-bright"
            }`}
          >
            PROBLEMS <span className="rounded bg-accent/20 px-1 py-0.2 text-[10px] text-accent">0</span>
          </button>
          <button
            onClick={() => setActivePanelTab("debug")}
            className={`flex items-center gap-1.5 border-b-2 py-2 font-medium transition-colors ${
              activePanelTab === "debug" ? "border-accent text-text-bright" : "border-transparent hover:text-text-bright"
            }`}
          >
            DEBUG CONSOLE
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="rounded p-1 transition-colors hover:bg-elevated-hover hover:text-text-bright"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={() => setTerminalOpen(false)}
            title="Minimize Panel"
            className="rounded p-1 transition-colors hover:bg-elevated-hover hover:text-text-bright"
          >
            <Minus size={13} />
          </button>
          <button
            onClick={() => setTerminalOpen(false)}
            title="Close Panel"
            className="rounded p-1 transition-colors hover:bg-elevated-hover hover:text-text-bright"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div
        className="flex flex-1 flex-col overflow-y-auto p-3 leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {activePanelTab === "terminal" ? (
          <>
            {isMatrixActive && (
              <div className="mb-2 rounded bg-emerald-950/30 p-2 font-mono text-[10px] text-emerald-400 animate-pulse">
                01000001 01010100 01001000 01000001 01010010 01010110 01000001 -- MATRIX STREAM ACTIVE
              </div>
            )}

            {history.map((line) => (
              <div key={line.id} className="py-0.5">
                {line.type === "input" && (
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold">visitor@atharva-portfolio:~$</span>
                    <span className="text-text-bright">{line.text}</span>
                  </div>
                )}
                {line.type === "output" && <div className="text-text-primary">{line.text}</div>}
                {line.type === "system" && <div className="text-text-muted italic">{line.text}</div>}
                {line.type === "error" && <div className="text-rose-400">{line.text}</div>}
              </div>
            ))}

            {/* Input Prompt */}
            <div className="flex items-center gap-2 pt-1">
              <span className="flex items-center text-emerald-400 font-semibold shrink-0">
                <ChevronRight size={13} className="text-accent" />
                visitor@atharva-portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help'..."
                className="w-full bg-transparent text-text-bright outline-none placeholder:text-text-muted/50"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </>
        ) : activePanelTab === "output" ? (
          <div className="text-text-muted space-y-1 py-1">
            <p>[Info - 01:05:00 AM] Portfolio dev server initialized on port 3000.</p>
            <p>[Info - 01:05:02 AM] Optimized Client Components compiled successfully.</p>
          </div>
        ) : activePanelTab === "problems" ? (
          <div className="text-text-muted py-1 italic">No problems have been detected in the workspace.</div>
        ) : (
          <div className="text-text-muted py-1 italic">Debug console ready. Attaching debugger...</div>
        )}
      </div>
    </div>
  );
}
