import { Marquee } from "@/components/magicui/marquee";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const copies = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>("[data-marquee-copy]"));

describe("Marquee", () => {
  afterEach(cleanup);

  it("renders two copies and hides the second from assistive tech", () => {
    const { container } = render(
      <Marquee>
        <span>TypeScript</span>
      </Marquee>
    );
    const [first, second] = copies(container);
    expect(copies(container)).toHaveLength(2);
    expect(first.getAttribute("aria-hidden")).toBeNull();
    expect(second.getAttribute("aria-hidden")).toBe("true");
    expect(screen.getAllByText("TypeScript")).toHaveLength(2);
  });

  it("applies the duration as a CSS variable", () => {
    const { container } = render(<Marquee duration={12}>item</Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--duration")).toBe("12s");
  });

  it("reverses direction only when asked", () => {
    const forward = render(<Marquee>item</Marquee>);
    expect(copies(forward.container)[0].className).not.toContain("[animation-direction:reverse]");
    forward.unmount();

    const reversed = render(<Marquee reverse>item</Marquee>);
    for (const copy of copies(reversed.container)) {
      expect(copy.className).toContain("[animation-direction:reverse]");
    }
  });

  it("stops the animation when the user prefers reduced motion", () => {
    const { container } = render(<Marquee>item</Marquee>);
    for (const copy of copies(container)) {
      expect(copy.className).toContain("animate-marquee");
      expect(copy.className).toContain("motion-reduce:animate-none");
    }
  });

  it("pauses on hover by default and can opt out", () => {
    const paused = render(<Marquee>item</Marquee>);
    expect(copies(paused.container)[0].className).toContain("group-hover:[animation-play-state:paused]");
    paused.unmount();

    const running = render(<Marquee pauseOnHover={false}>item</Marquee>);
    expect(copies(running.container)[0].className).not.toContain("group-hover:[animation-play-state:paused]");
  });
});
