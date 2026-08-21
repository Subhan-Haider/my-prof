import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "8px",
          border: "1.5px solid rgba(52, 211, 153, 0.6)",
        }}
      >
        <div
          style={{
            fontSize: 20,
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
