"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { PropsWithChildren, useCallback, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const BASE_SIZE = 40;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

// Magnifies icons near the pointer. Widths are written straight to the DOM in a
// rAF (no React state, no animation library); a CSS transition smooths them.
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const frame = useRef<number | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    const resize = (pointerX: number | null) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const icons =
          innerRef.current?.querySelectorAll<HTMLElement>("[data-dock-icon]");
        icons?.forEach((icon: HTMLElement) => {
          if (pointerX === null) {
            icon.style.width = "";
            return;
          }
          const bounds = icon.getBoundingClientRect();
          const offset = Math.abs(pointerX - bounds.x - bounds.width / 2);
          const t = Math.max(0, 1 - offset / distance);
          icon.style.width = `${BASE_SIZE + (magnification - BASE_SIZE) * t}px`;
        });
      });
    };

    return (
      <div
        ref={setRef}
        onMouseMove={(e) => resize(e.clientX)}
        onMouseLeave={() => resize(null)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {children}
      </div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({ className, children, ...props }: DockIconProps) => {
  return (
    <div
      data-dock-icon
      className={cn(
        "flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full transition-[width] duration-150 ease-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
