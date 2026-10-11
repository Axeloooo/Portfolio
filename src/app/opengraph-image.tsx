import { DATA } from "@/data/resume";
import type { ImageResponse } from "next/og";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt: string = DATA.name;
export const size: { width: number; height: number } = OG_SIZE;
export const contentType: string = "image/png";

export default function Image(): ImageResponse {
  return renderOgImage(
    DATA.name,
    "Software Engineer, Researcher, and Entrepreneur",
    DATA.url.replace(/^https?:\/\//, "")
  );
}
