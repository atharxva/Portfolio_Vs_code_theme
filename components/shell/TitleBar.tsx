export function TitleBar() {
  return (
    <div className="flex h-9 shrink-0 items-center border-b border-border-subtle bg-titlebar px-3 text-[13px] text-text-muted select-none">
      <div className="flex w-10 shrink-0 items-center gap-2 sm:w-24">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="hidden h-3 w-3 rounded-full bg-[#febc2e] sm:block" />
        <span className="hidden h-3 w-3 rounded-full bg-[#28c840] sm:block" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span className="truncate text-text-bright">Atharva Jadhav</span>
        <span className="hidden text-text-muted sm:inline">— Portfolio</span>
      </div>
      <div className="w-10 shrink-0 sm:w-24" />
    </div>
  );
}
