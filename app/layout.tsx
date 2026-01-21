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
import ScrollToTop from "@/components/scroll-to-top";
import Logo from "@/components/logo";
import QueryProvider from "../providers/query-provider";
import BootScreen from "@/components/boot-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: "400",
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
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
    <html
      lang="en"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "hsl(142, 76%, 20%) #0D0D0D",
      }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} ${notoSansSc.variable} ${notoSans.variable} antialiased`}
      >
        <BootScreen>
          <div className="min-h-screen bg-background text-foreground english-font">
            {/* Logo */}
            <Logo />

            {/* Navigation Bar */}
            <Navigation />

            {/* Particle Background with Mouse Interaction */}
            <ParticleBackground />

            {/* Main Content */}
            <QueryProvider>{children}</QueryProvider>

            {/* Scroll to Top Button */}
            <ScrollToTop />
          </div>
        </BootScreen>
      </body>
    </html>
  );
}
