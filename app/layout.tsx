import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { resolveImage } from "@/lib/site-images";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";

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

// metadataBase: production URL is TBD (set at launch; canonical/OG depend on it).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Inspire Academy of Mathematics, Math Coaching in Vadodara",
    template: "%s | Inspire Academy of Mathematics",
  },
  description:
    "Mathematics coaching in Vadodara by Snehal Sir, 25+ years of experience, small batches at two branches: Alkapuri and Sama. Class 9 to 12, Math and Applied Math, JEE and GUJCET. Concept clarity, weekly tests, personal attention.",
  openGraph: {
    type: "website",
    siteName: "Inspire Academy of Mathematics",
    locale: "en_IN",
    title: "Inspire Academy of Mathematics, Math Coaching in Vadodara",
    description:
      "Math coaching in Vadodara by Snehal Sir. Class 9 to 12, Applied Math, JEE and GUJCET. Two branches, small batches, weekly tests.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Academy of Mathematics, Math Coaching in Vadodara",
  },
  appleWebApp: { capable: true, title: "Inspire Academy", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#069494" };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoUrl = await resolveImage("/brand/logo.svg");
  const logoDarkUrl = await resolveImage("/brand/logo-dark.svg");
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        <Nav logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} />
        <div className="flex-1">{children}</div>
        <Footer logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} />
        <ScrollReveal />
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
