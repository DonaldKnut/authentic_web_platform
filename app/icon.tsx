import { ImageResponse } from "next/og";
import { LOGO_URL } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={LOGO_URL} width={28} height={28} alt="" style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  );
}
