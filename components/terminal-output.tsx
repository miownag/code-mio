"use client";

import { cn } from "@/lib/utils";
import { OutputLine } from "@/hooks/use-terminal";

interface TerminalOutputProps {
  line: OutputLine;
  onAnimationComplete?: () => void;
}

export default function TerminalOutput({ line }: TerminalOutputProps) {
  // Determine text color based on type
  const colorClass =
    line.type === "error"
      ? "text-red-500"
      : line.type === "command"
        ? "text-muted-foreground"
        : "text-primary";

  // Static output
  return (
    <div className={cn("whitespace-pre-wrap pixel-font text-md", colorClass)}>
      {line.content}
    </div>
  );
}
