import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("spylink-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.addEventListener("DOMContentLoaded", function () {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", theme === "light" ? "#f4f5ed" : "#050706");
    });
  } catch (error) {}
})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spylink.security"),
  title: {
    default: "Spylink — Security, Privacy & Digital Forensics",
    template: "%s — Spylink",
  },
  description:
    "An independent security studio. Penetration testing, security audits, digital forensics, and reverse engineering for teams that take their systems seriously.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "digital forensics",
    "reverse engineering",
    "security audit",
    "red team",
  ],
  authors: [{ name: "Spylink" }],
  openGraph: {
    title: "Spylink — Security, Privacy & Digital Forensics",
    description:
      "We assure the total security for your systems and infrastructures.",
    type: "website",
    siteName: "Spylink",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spylink — Security, Privacy & Digital Forensics",
    description:
      "We assure the total security for your systems and infrastructures.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-acid focus:bg-void focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-acid"
        >
          Skip to content
        </a>
        <div id="top" className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
