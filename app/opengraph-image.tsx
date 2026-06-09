import { ImageResponse } from "next/og";

// Default Open Graph / Twitter card for every route that doesn't define its
// own. Generated at build time as a 1200x630 PNG.
export const alt = "Luke Banicevic — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px",
                background: "#0b0d0c",
                color: "#f7f7f5",
                fontFamily: "monospace",
            }}
        >
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
                Luke Banicevic
            </div>
            <div style={{ marginTop: 20, fontSize: 36, color: "#8a928c" }}>
                Software Engineer
            </div>
            <div
                style={{
                    marginTop: 48,
                    fontSize: 26,
                    color: "#6f7771",
                }}
            >
                device-to-cloud comms · embedded · engineering notes
            </div>
            <div
                style={{
                    marginTop: "auto",
                    fontSize: 26,
                    color: "#6f7771",
                }}
            >
                lukebanicevic.com
            </div>
        </div>,
        { ...size },
    );
}
