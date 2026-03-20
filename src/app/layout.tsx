import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Barber Shop",
  description: "Experience premium grooming with our class-leading barber services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`}>
        <LenisProvider>
          {children}
        </LenisProvider>
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "16px",
            zIndex: 9999,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.70)",
            color: "#BCFF40",
            fontSize: "11px",
            padding: "6px 12px",
            borderRadius: "20px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          📍 Demo Site — Your branding replaces everything here
        </div>
      </body>
    </html>
  );
}
