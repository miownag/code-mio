import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
