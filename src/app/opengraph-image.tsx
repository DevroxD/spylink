import { ImageResponse } from "next/og";

export const alt =
  "Spylink — Security, Privacy and Digital Forensics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050706",
          color: "#e9efe6",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(200,255,61,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,255,61,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 780,
            height: 780,
            borderRadius: 9999,
            right: -260,
            top: -300,
            background:
              "radial-gradient(circle, rgba(200,255,61,0.16), rgba(200,255,61,0) 68%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            color: "#94a29b",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 34,
                height: 34,
                border: "1px solid #c8ff3d",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#e9efe6", fontSize: 26, letterSpacing: 6 }}>
                SPYLINK
              </span>
              <span style={{ fontSize: 11, letterSpacing: 4, color: "#5d6b64" }}>
                SECURITY STUDIO
              </span>
            </div>
          </div>
          <span>INDEPENDENT · EST. 2019</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              color: "#c8ff3d",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Offensive security · DFIR · Reverse engineering
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            <span>Security and Privacy</span>
            <span>
              for your{" "}
              <span style={{ color: "#c8ff3d", marginLeft: 14 }}>link.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #1a2420",
            paddingTop: 24,
            fontSize: 18,
            letterSpacing: 2,
            color: "#94a29b",
          }}
        >
          <span>spylink.security</span>
          <span style={{ color: "#c8ff3d" }}>WE ASSURE TOTAL SECURITY</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
