"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  Zap,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Braces,
} from "lucide-react";
import { SKILLS_DATA } from "@/data/skills";

// Authentic VS Code Bracket Pair Colorizer colors
const BRACKET_COLORS = [
  "#ffd700", // Gold (Level 0, 3...)
  "#da70d6", // Orchid / Magenta (Level 1, 4...)
  "#179fff", // VS Code Blue (Level 2, 5...)
];

function getBracketColor(depth: number) {
  return BRACKET_COLORS[depth % BRACKET_COLORS.length];
}

interface Token {
  type: "indent" | "key" | "colon" | "space" | "string" | "brace" | "bracket" | "comma" | "plain";
  text: string;
  depth?: number;
}

interface LineData {
  lineNum: number;
  fullText: string;
  tokens: Token[];
  startCharIndex: number;
  endCharIndex: number;
  foldInfo: {
    startLine: number;
    endLine: number;
    kind: "object" | "array";
    hasTrailingComma: boolean;
  } | null;
}

// Tokenize one line of JSON accurately
function tokenizeLine(line: string, depth: number): { tokens: Token[]; newDepth: number } {
  const tokens: Token[] = [];
  let remaining = line;
  let curDepth = depth;

  // Leading indentation
  const indentMatch = remaining.match(/^(\s+)/);
  if (indentMatch) {
    tokens.push({ type: "indent", text: indentMatch[1] });
    remaining = remaining.slice(indentMatch[1].length);
  }

  // Check if line closes an opening bracket before anything else
  const trimmed = line.trim();
  if (trimmed.startsWith("}") || trimmed.startsWith("]")) {
    curDepth = Math.max(0, curDepth - 1);
  }

  while (remaining.length > 0) {
    // Key: "key":
    const keyMatch = remaining.match(/^"([^"\\]*(?:\\.[^"\\]*)*)"(?=\s*:)/);
    if (keyMatch) {
      tokens.push({ type: "key", text: `"${keyMatch[1]}"` });
      remaining = remaining.slice(keyMatch[0].length);
      continue;
    }

    // Colon
    if (remaining.startsWith(":")) {
      tokens.push({ type: "colon", text: ":" });
      remaining = remaining.slice(1);
      continue;
    }

    // String value: "string"
    const strMatch = remaining.match(/^"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (strMatch) {
      tokens.push({ type: "string", text: `"${strMatch[1]}"` });
      remaining = remaining.slice(strMatch[0].length);
      continue;
    }

    // Spaces
    const spaceMatch = remaining.match(/^(\s+)/);
    if (spaceMatch) {
      tokens.push({ type: "space", text: spaceMatch[1] });
      remaining = remaining.slice(spaceMatch[1].length);
      continue;
    }

    // Braces
    if (remaining.startsWith("{") || remaining.startsWith("}")) {
      const char = remaining[0];
      const tokenDepth = char === "{" ? curDepth : curDepth;
      tokens.push({ type: "brace", text: char, depth: tokenDepth });
      if (char === "{") curDepth++;
      remaining = remaining.slice(1);
      continue;
    }

    // Brackets
    if (remaining.startsWith("[") || remaining.startsWith("]")) {
      const char = remaining[0];
      const tokenDepth = char === "[" ? curDepth : curDepth;
      tokens.push({ type: "bracket", text: char, depth: tokenDepth });
      if (char === "[") curDepth++;
      remaining = remaining.slice(1);
      continue;
    }

    // Comma
    if (remaining.startsWith(",")) {
      tokens.push({ type: "comma", text: "," });
      remaining = remaining.slice(1);
      continue;
    }

    // Fallback
    tokens.push({ type: "plain", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return { tokens, newDepth: curDepth };
}

// Slice tokens when typed up to charLimit
function sliceTokens(tokens: Token[], charLimit: number): Token[] {
  let charsLeft = charLimit;
  const result: Token[] = [];
  for (const token of tokens) {
    if (charsLeft <= 0) break;
    if (token.text.length <= charsLeft) {
      result.push(token);
      charsLeft -= token.text.length;
    } else {
      result.push({ ...token, text: token.text.slice(0, charsLeft) });
      charsLeft = 0;
      break;
    }
  }
  return result;
}

export function Skills() {
  const fullJson = useMemo(() => JSON.stringify(SKILLS_DATA, null, 2), []);
  const totalChars = fullJson.length;

  // Pre-parse the entire document into line structures & folding boundaries
  const parsedData = useMemo(() => {
    const rawLines = fullJson.split("\n");
    let currentOffset = 0;
    let depth = 0;
    const lines: LineData[] = [];

    // First pass: tokenization & offsets
    rawLines.forEach((text, idx) => {
      const start = currentOffset;
      const end = start + text.length;
      currentOffset = end + 1; // +1 for newline character
      const { tokens, newDepth } = tokenizeLine(text, depth);
      depth = newDepth;
      lines.push({
        lineNum: idx + 1,
        fullText: text,
        tokens,
        startCharIndex: start,
        endCharIndex: end,
        foldInfo: null,
      });
    });

    // Second pass: folding pairs
    const stack: { lineNum: number; kind: "object" | "array" }[] = [];
    lines.forEach((line) => {
      const trimmed = line.fullText.trim();
      if (trimmed.endsWith("{") || trimmed.endsWith("[")) {
        stack.push({
          lineNum: line.lineNum,
          kind: trimmed.endsWith("{") ? "object" : "array",
        });
      } else if (trimmed.startsWith("}") || trimmed.startsWith("]")) {
        const top = stack.pop();
        if (top) {
          const parentLine = lines[top.lineNum - 1];
          parentLine.foldInfo = {
            startLine: top.lineNum,
            endLine: line.lineNum,
            kind: top.kind,
            hasTrailingComma: trimmed.endsWith(","),
          };
        }
      }
    });

    return lines;
  }, [fullJson]);

  // Start animation fresh every time Skills.json is opened
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);

  const [collapsedLines, setCollapsedLines] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState<boolean>(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const userScrolledUpRef = useRef<boolean>(false);

  // Auto-scroll handler
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // If user scrolled up significantly from bottom, do not force scroll
    userScrolledUpRef.current = scrollHeight - (scrollTop + clientHeight) > 100;
  };

  // Instant Load / Skip animation
  const handleSkip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCharIndex(totalChars);
    setIsCompleted(true);
  }, [totalChars]);

  // Replay animation from beginning
  const handleReplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCollapsedLines(new Set());
    setCharIndex(0);
    setIsCompleted(false);
    userScrolledUpRef.current = false;
  }, []);

  // Copy raw JSON
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fullJson]);

  // Fold toggle
  const toggleFold = useCallback(
    (lineNum: number) => {
      if (!isCompleted) return;
      setCollapsedLines((prev) => {
        const next = new Set(prev);
        if (next.has(lineNum)) {
          next.delete(lineNum);
        } else {
          next.add(lineNum);
        }
        return next;
      });
    },
    [isCompleted]
  );

  // Toggle fold all
  const allFoldableLines = useMemo(() => {
    return parsedData.filter((l) => l.foldInfo !== null).map((l) => l.lineNum);
  }, [parsedData]);

  const allFolded = allFoldableLines.length > 0 && allFoldableLines.every((n) => collapsedLines.has(n));

  const toggleAllFolds = useCallback(() => {
    if (!isCompleted) return;
    if (allFolded) {
      setCollapsedLines(new Set());
    } else {
      setCollapsedLines(new Set(allFoldableLines));
    }
  }, [isCompleted, allFolded, allFoldableLines]);

  // Typewriter engine with realistic developer cadence
  useEffect(() => {
    if (isCompleted || charIndex >= totalChars) {
      if (!isCompleted) {
        setIsCompleted(true);
      }
      return;
    }

    const char = fullJson[charIndex];
    let step = 1;
    let delay = 5;

    if (char === "\n") {
      // Snappy newline transition
      step = 1;
      delay = 8;
    } else if (char === " ") {
      // Fast-forward through indentation spaces (simulates VS Code auto-indent)
      let spaceCount = 0;
      while (
        charIndex + spaceCount < totalChars &&
        fullJson[charIndex + spaceCount] === " "
      ) {
        spaceCount++;
      }
      step = spaceCount;
      delay = 2;
    } else if (
      char === ":" ||
      char === "," ||
      char === "{" ||
      char === "}" ||
      char === "[" ||
      char === "]"
    ) {
      step = 1;
      delay = 5;
    } else if (char === '"') {
      step = 1;
      delay = 4;
    } else {
      // Rapid typing stream for regular word characters (3-4 chars per tick)
      let textCount = 1;
      const maxStep = 4;
      while (
        textCount < maxStep &&
        charIndex + textCount < totalChars &&
        /[a-zA-Z0-9_\-./() +]/.test(fullJson[charIndex + textCount]) &&
        fullJson[charIndex + textCount] !== '"'
      ) {
        textCount++;
      }
      step = textCount;
      delay = 5;
    }

    timerRef.current = setTimeout(() => {
      setCharIndex((prev) => Math.min(totalChars, prev + step));

      // Auto-scroll smoothly to cursor position if user hasn't scrolled up
      if (!userScrolledUpRef.current && containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [charIndex, isCompleted, totalChars, fullJson]);

  // Determine current line & column being typed
  const activeLineIndex = useMemo(() => {
    for (let i = 0; i < parsedData.length; i++) {
      const line = parsedData[i];
      if (charIndex >= line.startCharIndex && charIndex <= line.endCharIndex + 1) {
        return i;
      }
    }
    return parsedData.length - 1;
  }, [charIndex, parsedData]);

  const activeLine = parsedData[activeLineIndex];
  const activeCol = Math.max(1, charIndex - (activeLine ? activeLine.startCharIndex : 0) + 1);

  // Compute which lines should be visible (taking folds into account)
  const renderedLines = useMemo(() => {
    const list: {
      line: LineData;
      isFolded: boolean;
      typedCount: number;
      isCursorHere: boolean;
    }[] = [];

    let skipUntilLine: number | null = null;

    for (let i = 0; i < parsedData.length; i++) {
      const line = parsedData[i];

      // If this line hasn't been reached yet by typing
      if (line.startCharIndex > charIndex) {
        break;
      }

      // If we are currently inside a folded block, skip rendering child lines
      if (skipUntilLine !== null) {
        if (line.lineNum <= skipUntilLine) {
          continue;
        }
        skipUntilLine = null;
      }

      const isFolded = isCompleted && collapsedLines.has(line.lineNum);
      if (isFolded && line.foldInfo) {
        skipUntilLine = line.foldInfo.endLine;
      }

      const typedCount = Math.min(line.fullText.length, Math.max(0, charIndex - line.startCharIndex));
      const isCursorHere = i === activeLineIndex && (!isCompleted || charIndex === totalChars);

      list.push({
        line,
        isFolded,
        typedCount,
        isCursorHere,
      });
    }

    return list;
  }, [parsedData, charIndex, isCompleted, collapsedLines, activeLineIndex, totalChars]);

  return (
    <div className="flex h-full flex-col bg-app font-mono text-[13.5px] leading-[22px] select-text">
      {/* VS Code Editor Action Bar */}
      <div className="sticky top-0 z-20 flex h-9 shrink-0 items-center justify-between border-b border-border-subtle bg-app/95 px-4 backdrop-blur-sm select-none">
        <div className="flex items-center gap-2 text-xs">
          <Braces size={14} className="text-amber-400" />
          <span className="font-mono text-text-bright">Skills.json</span>

          {!isCompleted ? (
            <span className="ml-2 flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] font-sans text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              <span>Typing... Ln {activeLineIndex + 1}, Col {activeCol}</span>
            </span>
          ) : (
            <span className="ml-2 flex items-center gap-1.5 rounded-full border border-status-green/30 bg-status-green/10 px-2 py-0.5 text-[11px] font-sans text-status-green">
              <Check size={11} />
              <span>JSON Ready</span>
              <span className="text-text-muted hidden sm:inline">· 66 lines</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {!isCompleted ? (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 rounded-md border border-accent/50 bg-accent/15 px-2.5 py-1 text-xs font-sans font-medium text-text-bright transition-all hover:bg-accent hover:text-white cursor-pointer shadow-sm active:scale-95"
              title="Skip typing animation and show full JSON immediately"
            >
              <Zap size={13} className="fill-amber-400 text-amber-400" />
              <span>Instant Load</span>
            </button>
          ) : (
            <>
              <button
                onClick={toggleAllFolds}
                className="flex items-center gap-1 rounded border border-border-subtle bg-elevated px-2 py-1 text-xs font-sans text-text-muted transition-colors hover:bg-elevated-hover hover:text-text-bright cursor-pointer"
                title={allFolded ? "Unfold all nested sections" : "Fold all nested sections"}
              >
                <ChevronsUpDown size={12} />
                <span className="hidden sm:inline">{allFolded ? "Unfold All" : "Fold All"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded border border-border-subtle bg-elevated px-2.5 py-1 text-xs font-sans text-text-muted transition-colors hover:bg-elevated-hover hover:text-text-bright cursor-pointer"
                title="Copy entire JSON to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-status-green" />
                    <span className="text-status-green font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReplay}
                className="flex items-center gap-1 rounded border border-border-subtle bg-elevated px-2 py-1 text-xs font-sans text-text-muted transition-colors hover:bg-elevated-hover hover:text-text-bright cursor-pointer"
                title="Replay typing animation"
              >
                <RotateCcw size={12} />
                <span className="hidden sm:inline">Replay</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Code Editor Body */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto overflow-x-auto py-2"
      >
        <div className="min-w-fit">
          {renderedLines.map(({ line, isFolded, typedCount, isCursorHere }) => {
            const isHovered = hoveredLine === line.lineNum;
            const hasFold = isCompleted && line.foldInfo !== null;
            const lineTokens = sliceTokens(line.tokens, typedCount);

            return (
              <div
                key={line.lineNum}
                onMouseEnter={() => setHoveredLine(line.lineNum)}
                onMouseLeave={() => setHoveredLine(null)}
                className={`group flex items-center transition-colors ${
                  isHovered || (!isCompleted && isCursorHere)
                    ? "bg-white/[0.035]"
                    : ""
                }`}
              >
                {/* Gutter: Line Number & Folding Arrow */}
                <div className="flex h-[22px] w-14 shrink-0 items-center justify-between pr-2 text-right text-[12px] font-mono select-none text-[#5c6370]">
                  {/* Fold chevron */}
                  <span className="flex w-4 items-center justify-center">
                    {hasFold && (
                      <button
                        onClick={() => toggleFold(line.lineNum)}
                        className="flex h-3.5 w-3.5 items-center justify-center rounded text-text-muted hover:text-text-bright cursor-pointer hover:bg-elevated"
                        title={isFolded ? "Click to unfold" : "Click to fold"}
                      >
                        {isFolded ? (
                          <ChevronRight size={12} className="text-accent" />
                        ) : (
                          <ChevronDown
                            size={12}
                            className={
                              isHovered
                                ? "text-text-bright opacity-100"
                                : "opacity-0 group-hover:opacity-100 transition-opacity"
                            }
                          />
                        )}
                      </button>
                    )}
                  </span>

                  {/* Line Number */}
                  <span
                    className={
                      isCursorHere || isHovered
                        ? "text-text-bright font-semibold"
                        : "text-[#55596e]"
                    }
                  >
                    {line.lineNum}
                  </span>
                </div>

                {/* Subtle vertical gutter divider */}
                <div className="h-[22px] w-[1px] bg-border-subtle/50 shrink-0 mr-3" />

                {/* Code Content */}
                <div className="flex items-center whitespace-pre pr-6">
                  {isFolded && line.foldInfo ? (
                    // Collapsed preview representation
                    <>
                      {/* Render indent + key + colon */}
                      {lineTokens.map((tok, idx) => {
                        if (tok.type === "brace" || tok.type === "bracket") {
                          return null;
                        }
                        return renderToken(tok, idx);
                      })}
                      {/* Collapsed badge */}
                      <button
                        onClick={() => toggleFold(line.lineNum)}
                        className="inline-flex items-center mx-1 px-1.5 py-0.2 rounded bg-[#2a2a3e] hover:bg-[#34344e] text-[11px] text-[#9ca3af] hover:text-white border border-border-strong cursor-pointer font-mono shadow-sm transition-colors"
                        title="Click to unfold"
                      >
                        {line.foldInfo.kind === "object" ? "{ ... }" : "[ ... ]"}
                      </button>
                      {/* Trailing comma if closed with comma */}
                      {line.foldInfo.hasTrailingComma && (
                        <span className="text-[#d4d4d4]">,</span>
                      )}
                    </>
                  ) : (
                    // Regular full tokens
                    <>
                      {lineTokens.map((tok, idx) => renderToken(tok, idx))}
                    </>
                  )}

                  {/* Active Blinking Cursor trailing the latest typed character */}
                  {isCursorHere && !isCompleted && (
                    <span
                      className="inline-block w-[7.5px] h-[16px] -mb-0.5 ml-0.5 bg-accent rounded-[1px] shadow-[0_0_8px_rgba(77,166,255,0.9)] animate-pulse"
                      title="Cursor"
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Resting cursor when typing is complete */}
          {isCompleted && (
            <div className="flex items-center h-4 text-xs text-text-muted/40 pl-16 pt-1 select-none">
              <span className="inline-block w-[7px] h-[15px] bg-accent/40 rounded-[1px] caret-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Render individual syntax token with accurate VS Code colors
function renderToken(tok: Token, idx: number) {
  switch (tok.type) {
    case "indent": {
      // Indentation spaces with subtle vertical indent guides
      const levelCount = Math.floor(tok.text.length / 2);
      return (
        <span key={idx} className="inline-flex">
          {Array.from({ length: levelCount }).map((_, i) => (
            <span
              key={i}
              className="inline-block w-[16.5px] border-l border-white/[0.05] select-none"
            >
              &nbsp;&nbsp;
            </span>
          ))}
        </span>
      );
    }
    case "key":
      // Light blue / cyan: #9cdcfe
      return (
        <span key={idx} className="text-[#9cdcfe]">
          {tok.text}
        </span>
      );
    case "string":
      // Warm peach / soft orange: #ce9178
      return (
        <span key={idx} className="text-[#ce9178]">
          {tok.text}
        </span>
      );
    case "brace":
      // Bracket pair colorizer
      return (
        <span
          key={idx}
          style={{ color: getBracketColor(tok.depth ?? 0) }}
          className="font-semibold"
        >
          {tok.text}
        </span>
      );
    case "bracket":
      // Bracket pair colorizer
      return (
        <span
          key={idx}
          style={{ color: getBracketColor(tok.depth ?? 0) }}
          className="font-semibold"
        >
          {tok.text}
        </span>
      );
    case "colon":
      return (
        <span key={idx} className="text-[#d4d4d4]">
          :
        </span>
      );
    case "comma":
      return (
        <span key={idx} className="text-[#d4d4d4]">
          ,
        </span>
      );
    case "space":
      return <span key={idx}> </span>;
    default:
      return <span key={idx}>{tok.text}</span>;
  }
}
