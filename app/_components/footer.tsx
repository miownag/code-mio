"use client";

import useHasMounted from "@/hooks/use-has-mounted";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();

  const pinkColorCss = hasMounted
    ? resolvedTheme === "dark"
      ? "text-pink-300/80"
      : "text-pink-500/80"
    : "text-pink-500/80";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border pt-8 mt-20 text-center text-muted-foreground"
    >
      <p>
        Built with{" "}
        <span
          className={`${pinkColorCss} pixel-font text-2xl font-light ml-0.5`}
        >
          Love
        </span>
      </p>
      <p className="mt-2">
        © 2026{" "}
        <span className="pixel-font text-2xl font-light text-primary/80 ml-0.5">
          Mio
        </span>
        . All rights reserved.
      </p>
    </motion.footer>
  );
}
