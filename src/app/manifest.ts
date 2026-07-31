import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Freewave",
    short_name: "Freewave",
    description: "Free forever premium music streaming.",
    start_url: "/",
    display: "standalone",
    background_color: "#070712",
    theme_color: "#8b5cf6",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
