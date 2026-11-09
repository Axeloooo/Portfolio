// Hover/focus label above a dock icon, styled like the shadcn tooltip but pure
// CSS: no Radix/floating-ui JS on every page for seven static labels.
// The parent DockIcon must carry `group relative`. Screen readers get the name
// from the control's aria-label, so the label itself is aria-hidden.
export function DockLabel({ children }: { children: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100"
    >
      {children}
    </span>
  );
}
