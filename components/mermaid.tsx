"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    darkMode: true,
    background: "#0a0a0a",
    primaryColor: "#3b82f6",
    primaryTextColor: "#e5e7eb",
    primaryBorderColor: "#3b82f6",
    lineColor: "#6b7280",
    secondaryColor: "#1e293b",
    tertiaryColor: "#1e1e2e",
    noteBkgColor: "#1e293b",
    noteTextColor: "#e5e7eb",
    noteBorderColor: "#3b82f6",
    actorBkg: "#1e293b",
    actorBorder: "#3b82f6",
    actorTextColor: "#e5e7eb",
    actorLineColor: "#6b7280",
    signalColor: "#e5e7eb",
    signalTextColor: "#e5e7eb",
  },
  fontFamily: "monospace",
});

let mermaidIdCounter = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const id = `mermaid-${mermaidIdCounter++}`;
    mermaid.render(id, chart).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
