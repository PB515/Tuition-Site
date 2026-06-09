import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inspire Academy of Mathematics",
    short_name: "Inspire Academy",
    description: "Maths coaching in Vadodara. Parent portal and academy info.",
    start_url: "/parent",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#069494",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
