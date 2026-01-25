"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  return (
    <motion.h2
      variants={itemVariants}
      className={cn(
        "text-3xl md:text-4xl flex items-center gap-4 pixel-font",
        className,
      )}
    >
      <div className="h-8 w-1 bg-primary" />
      {children}
    </motion.h2>
  );
}
