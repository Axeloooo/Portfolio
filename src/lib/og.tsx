import { ImageResponse } from "next/og";

export const OG_SIZE: { width: number; height: number } = {
  width: 1200,
  height: 630,
};

export function renderOgImage(
  title: string,
  subtitle: string,
  footer: string,
): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ fontSize: 28, color: "#a3a3a3" }}>{footer}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: title.length > 40 ? 64 : 84,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 34, color: "#a3a3a3", marginTop: 32 }}>
          {subtitle}
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
