import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  // Scroll right to left by default; `reverse` scrolls left to right.
  reverse?: boolean;
  pauseOnHover?: boolean;
  // Seconds for one full loop; lower is faster.
  duration?: number;
  // Fade the left and right edges into the background.
  fade?: boolean;
  children: React.ReactNode;
}

// Renders the children twice so the loop is seamless; the second copy is
// hidden from assistive tech so each item is read once.
export function Marquee({
  reverse = false,
  pauseOnHover = true,
  duration = 40,
  fade = true,
  className,
  style,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        fade &&
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      style={{ ...style, "--duration": `${duration}s` } as React.CSSProperties}
    >
      {[0, 1].map((copy: number) => (
        <div
          key={copy}
          data-marquee-copy={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className={cn(
            "flex shrink-0 items-center justify-around [gap:var(--gap)] animate-marquee motion-reduce:animate-none",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
