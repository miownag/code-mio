"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Logo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link href="/">
      <motion.div
        className="fixed top-4 left-6 z-50 cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center overflow-hidden"
          animate={{
            width: isScrolled ? 48 : "auto",
            height: 48,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="flex items-center justify-center px-4"
            animate={{
              paddingLeft: isScrolled ? 12 : 16,
              paddingRight: isScrolled ? 12 : 16,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* The "M" - always visible */}
            <motion.span
              className="text-primary pixel-font text-4xl font-bold"
              layout
            >
              M
            </motion.span>

            {/* The "io" - animated in/out */}
            <AnimatePresence mode="wait">
              {!isScrolled && (
                <motion.span
                  key="io"
                  className="pixel-font text-4xl font-bold overflow-hidden text-foreground/75"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  io
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
