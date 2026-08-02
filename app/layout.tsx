import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* Estedad — the display voice. Geometric bowls echo the wordmark.
   Arabic and Latin subsets are both declared so mixed bidi runs
   (HOTCOD, API) resolve inside the same family instead of falling
   through to system-ui. */
const estedad = localFont({
  variable: "--font-estedad",
  display: "swap",
  src: [
    { path: "./fonts/estedad-arabic-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/estedad-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
});

/* Vazirmatn — the body voice. The most legible free Persian face at 14–16px. */
const vazirmatn = localFont({
  variable: "--font-vazirmatn",
  display: "swap",
  src: [
    { path: "./fonts/vazirmatn-arabic-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/vazirmatn-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
});

/* JetBrains Mono — the machine voice. Tracking codes and Latin eyebrows only. */
const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  src: [
    { path: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "هات‌کد | ارسال پس‌کرایه برای فروشگاه‌های آنلاین",
    template: "%s | هات‌کد",
  },
  description:
    "نرخ ارسال شرکت‌های حمل‌ونقل رو مقایسه کن، مرسوله بساز، لحظه‌ای رهگیری کن و پس‌کرایه رو تسویه کن — همه از یک پنل. با گسترده‌ترین پوشش جغرافیایی کشور.",
};

export const viewport: Viewport = {
  themeColor: "#1d252f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${estedad.variable} ${vazirmatn.variable} ${jetbrains.variable} h-full`}
    >
      <body className="bg-surface-canvas text-content-primary flex min-h-full flex-col antialiased">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
