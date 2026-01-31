"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
}: {
  children: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const viaColor =
    resolvedTheme === "dark" ? "via-emerald-900" : "via-emerald-400";
  const clsName = cn(
    "bg-clip-text text-transparent bg-size-[200%_100%]",
    `bg-linear-to-r from-primary ${viaColor} to-primary`,
    "animate-[shimmer_3s_ease-in-out_infinite]",
    "font-extrabold text-2xl md:text-3xl",
  );

  return (
    <motion.h2
      variants={itemVariants}
      className={cn("text-3xl md:text-4xl flex items-center gap-4", className)}
    >
      <span className="flex items-center gap-2">
        <span className={clsName}>{"<"}</span>
        <span className="pixel-font">{children}</span>
        <span className={clsName}>{"/>"}</span>
      </span>
    </motion.h2>
  );
}
