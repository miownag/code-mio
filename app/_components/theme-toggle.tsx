"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon } from "react-icons/lu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
    requestAnimationFrame(() => setMounted(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cycleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const getIcon = () => {
    if (resolvedTheme === "dark") {
      return <LuMoon className="w-5 h-5" />;
    } else {
      return <LuSun className="w-5 h-5" />;
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10 flex items-center justify-center" />;
  }

  return (
    <motion.button
      onClick={cycleTheme}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full",
        "text-primary hover:bg-primary/10 transition-colors",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Current theme: ${resolvedTheme}. Click to change.`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
