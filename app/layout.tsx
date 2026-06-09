import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

// metadataBase: production URL — TBD (set at launch; canonical/OG depend on it).
export const metadata: Metadata = {
  metadataBase: new URL("https://inspire-academy.example"),
  title: {
    default: "Inspire Academy of Mathematics — Maths Coaching in Vadodara",
    template: "%s — Inspire Academy of Mathematics",
  },
  description:
    "Focused Maths coaching in Vadodara led by Snehal Soni Sir (25+ years) — Class 9–12, Applied Maths, NCERT, JEE and GUJCET. Concept clarity, regular tests, personal attention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
