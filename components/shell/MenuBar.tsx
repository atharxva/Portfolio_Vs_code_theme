const ITEMS = ["File", "Edit", "View", "Go", "Help"];

export function MenuBar() {
  return (
    <div className="hidden h-8 shrink-0 items-center gap-1 border-b border-border-subtle bg-titlebar px-3 text-[13px] text-text-muted md:flex select-none">
      {ITEMS.map((item) => (
        <button
          key={item}
          className="rounded px-2 py-0.5 transition-colors hover:bg-elevated-hover hover:text-text-bright"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
