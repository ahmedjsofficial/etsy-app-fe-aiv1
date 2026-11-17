import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeHead } from "@/components/theme/ThemeHead";
import { cn } from "@/lib/utils";
import { palette } from "@/lib/theme";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Threadline — The AI workspace for Etsy sellers",
  description:
    "Create listings, optimize performance, generate stunning content, market on Pinterest, and automate your entire Etsy business with AI.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.plum },
    { media: "(prefers-color-scheme: dark)", color: palette.night },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        manrope.variable,
        instrumentSerif.variable,
        caveat.variable,
        anton.variable,
      )}
    >
      <head>
        <ThemeHead />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
