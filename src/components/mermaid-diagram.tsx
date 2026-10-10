"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

interface Props {
  chart: string;
  label: string;
}

export function MermaidDiagram({ chart, label }: Props): JSX.Element {
  const { resolvedTheme } = useTheme();
  const id: string = `mermaid-${useId().replace(/:/g, "")}`;
  const [svg, setSvg] = useState<string>("");
  const [failed, setFailed] = useState<boolean>(false);

  useEffect((): (() => void) => {
    let cancelled: boolean = false;
    async function render(): Promise<void> {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "inherit",
        });
        const result: { svg: string } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }
    void render();
    return (): void => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-md border p-3 text-xs">
        {chart}
      </pre>
    );
  }

  return (
    <figure
      role="img"
      aria-label={label}
      className="not-prose my-0 overflow-x-auto rounded-lg border bg-card p-3 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:!max-w-full [&_svg]:min-w-[560px]"
    >
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-48 animate-pulse rounded bg-muted" />
      )}
    </figure>
  );
}
