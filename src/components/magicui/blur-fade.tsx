import { cn } from "@/lib/utils";
import React from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  // Element to render; use "li" when the item sits directly inside a list.
  as?: "div" | "li" | "span";
  duration?: number;
  delay?: number;
  yOffset?: number;
  // Fade in from transparent. Turn off for above-the-fold content so it is
  // visible (and counts as the largest contentful paint) on the first frame.
  fade?: boolean;
}

// Fade-and-rise entrance done in CSS so it runs before hydration and stays on
// the compositor (opacity + transform only). Disabled for reduced motion.
const BlurFade = ({
  children,
  className,
  as: Tag = "div",
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  fade = true,
}: BlurFadeProps) => {
  return (
    <Tag
      className={cn(
        fade ? "animate-blur-fade" : "animate-rise",
        "motion-reduce:animate-none",
        className
      )}
      style={
        {
          "--blur-fade-y": `${yOffset}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${0.04 + delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
};

export default BlurFade;
