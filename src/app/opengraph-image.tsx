import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gospel Expérience Lyon — Festival & École Gospel Fourvière";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #2B1B5E 0%, #1E1432 50%, #0D0D0D 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            backgroundColor: "#C8A24E",
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: 8,
          }}
        >
          Gospel Expérience
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#E8A67C",
            textAlign: "center",
            letterSpacing: 4,
            textTransform: "uppercase" as const,
            marginBottom: 32,
          }}
        >
          Lyon Fourvière
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Festival biennal de gospel & École de gospel dans la Crypte de la Basilique de Fourvière
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
          }}
        >
          {[
            ["1 500+", "Spectateurs"],
            ["3", "Éditions"],
            ["80+", "Artistes"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, color: "#C8A24E" }}>
                {num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  marginTop: 4,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
