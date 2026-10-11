import { DATA } from "@/data/resume";
import { renderOgImage } from "@/lib/og";
import type { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export function GET(request: NextRequest): ImageResponse {
  const title: string = (
    request.nextUrl.searchParams.get("title") || DATA.name
  ).slice(0, 120);
  return renderOgImage(title, DATA.name, DATA.url.replace(/^https?:\/\//, ""));
}
