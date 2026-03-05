"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

// Dark mode: black background, green accents on nodes, white lines/text
const darkThemeVariables = {
  darkMode: true,
  background: "#0d0d0d",
  primaryColor: "#1a2e1a",
  primaryTextColor: "#f5f5f5",
  primaryBorderColor: "#22c55e",
  lineColor: "#e5e7eb",
  secondaryColor: "#1a2e1a",
  tertiaryColor: "#1a2e1a",
  noteBkgColor: "#1a2e1a",
  noteTextColor: "#f5f5f5",
  noteBorderColor: "#22c55e",
  actorBkg: "#1a2e1a",
  actorBorder: "#22c55e",
  actorTextColor: "#f5f5f5",
  actorLineColor: "#22c55e",
  signalColor: "#e5e7eb",
  signalTextColor: "#e5e7eb",
};

// Light mode: white background, green accents on nodes, dark lines/text
const lightThemeVariables = {
  darkMode: false,
  background: "#f2f2f2",
  primaryColor: "#f0fdf4",
  primaryTextColor: "#262626",
  primaryBorderColor: "#15803d",
  lineColor: "#262626",
  secondaryColor: "#f0fdf4",
  tertiaryColor: "#f0fdf4",
  noteBkgColor: "#f0fdf4",
  noteTextColor: "#262626",
  noteBorderColor: "#15803d",
  actorBkg: "#f0fdf4",
  actorBorder: "#15803d",
  actorTextColor: "#262626",
  actorLineColor: "#15803d",
  signalColor: "#262626",
  signalTextColor: "#262626",
};

let mermaidIdCounter = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark = resolvedTheme === "dark";

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      themeVariables: isDark ? darkThemeVariables : lightThemeVariables,
      fontFamily: "monospace",
    });

    const id = `mermaid-${mermaidIdCounter++}`;
    mermaid.render(id, chart).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chart, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
