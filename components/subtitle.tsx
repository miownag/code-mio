"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import useHasMounted from "@/hooks/use-has-mounted";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Subtitle({
  children,
  className,
  size = "md",
}: {
  children: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const viaColor =
    hasMounted && resolvedTheme === "dark"
      ? "via-emerald-900"
      : "via-emerald-400";
  const textSize =
    hasMounted && size === "md"
      ? "text-3xl md:text-4xl"
      : "text-4xl md:text-6xl";
  const iconTextSize =
    hasMounted && size === "md"
      ? "text-2xl md:text-3xl"
      : "text-3xl md:text-4xl";
  const clsName = cn(
    "bg-clip-text text-transparent bg-size-[200%_100%]",
    `bg-linear-to-r from-primary ${viaColor} to-primary`,
    "animate-[shimmer_3s_ease-in-out_infinite]",
    "font-extrabold",
    iconTextSize,
  );

  return (
    <motion.h2
      variants={itemVariants}
      className={cn(textSize, "flex items-center gap-4", className)}
    >
      <span className="flex items-center gap-2">
        <span className={clsName}>{"<"}</span>
        <span className="pixel-font">{children}</span>
        <span className={clsName}>{"/>"}</span>
      </span>
    </motion.h2>
  );
}
