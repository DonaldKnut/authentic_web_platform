import { ImageResponse } from "next/og";

export const alt = "AUTHENTIC — the trust layer for physical products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a2540",
          color: "white",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "2px solid #60a5fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#60a5fa",
              }}
            />
          </div>
          <div style={{ fontSize: 28, letterSpacing: 8 }}>AUTHENTIC</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#93c5fd" }}>
            THE TRUST LAYER FOR PHYSICAL PRODUCTS
          </div>
          <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
            Make every physical product verifiable.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
