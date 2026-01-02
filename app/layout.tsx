import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Jersey_10,
  Noto_Sans_SC,
  Noto_Sans,
} from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import ParticleBackground from "@/components/particle-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  weight: "400",
  subsets: ["latin"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: "400",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Mio",
  description: "A personal website about me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} ${notoSansSc.variable} ${notoSans.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground english-font">
          {/* Navigation Bar */}
          <Navigation />

          {/* Particle Background with Mouse Interaction */}
          <ParticleBackground />

          {/* Grid Background Effect with Green Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-10 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(16,185,129,0.15),transparent)]" />
          </div>

          {/* Main Content */}
          {children}
        </div>
      </body>
    </html>
  );
}
