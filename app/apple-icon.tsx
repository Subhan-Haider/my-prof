import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #090a12 0%, #15192c 100%)",
          borderRadius: "36px",
          border: "4px solid rgba(52, 211, 153, 0.6)",
          boxShadow: "inset 0 0 40px rgba(52, 211, 153, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(135deg, #34d399 0%, #38bdf8 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
