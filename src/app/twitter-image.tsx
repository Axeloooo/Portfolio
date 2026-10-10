import { DATA } from "@/data/resume";
import { OG_SIZE } from "@/lib/og";

export { default } from "./opengraph-image";

export const alt: string = DATA.name;
export const size: { width: number; height: number } = OG_SIZE;
export const contentType: string = "image/png";
