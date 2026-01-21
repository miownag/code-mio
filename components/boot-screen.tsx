"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const bootMessages = [
  "BIOS v1.0.0",
  "Memory Test: 640K OK",
  "Loading system...",
  "READY.",
];

// Use useSyncExternalStore to safely read sessionStorage
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function BootScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasMounted = useHasMounted();
  const alreadyBooted = hasMounted && sessionStorage.getItem("booted");

  const [isDone, setIsDone] = useState(false);
  // Track which character we're at globally across all messages
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const animationStarted = useRef(false);

  const isBooting = hasMounted && !alreadyBooted && !isDone;

  // Calculate total characters including line breaks
  const totalChars = bootMessages.reduce((sum, msg) => sum + msg.length, 0);

  // Get displayed text based on current charIndex
  const getDisplayedLines = () => {
    let remaining = charIndex;
    const lines: string[] = [];

    for (const msg of bootMessages) {
      if (remaining <= 0) break;
      if (remaining >= msg.length) {
        lines.push(msg);
        remaining -= msg.length;
      } else {
        lines.push(msg.slice(0, remaining));
        remaining = 0;
      }
    }
    return lines;
  };

  const displayedLines = getDisplayedLines();
  const isComplete = charIndex >= totalChars;

  // Run boot animation
  useEffect(() => {
    if (!isBooting || animationStarted.current) return;
    animationStarted.current = true;

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);

    // Typewriter effect - type each character
    const typeSpeed = 35; // ms per character
    const lineDelay = 200; // delay between lines

    let currentChar = 0;
    let currentLineIndex = 0;
    let charInLine = 0;

    const typeNextChar = () => {
      if (currentChar >= totalChars) {
        // Typing complete, wait a bit then end
        setTimeout(() => {
          sessionStorage.setItem("booted", "true");
          setIsDone(true);
        }, 400);
        return;
      }

      const currentLine = bootMessages[currentLineIndex];

      if (charInLine >= currentLine.length) {
        // Move to next line with delay
        currentLineIndex++;
        charInLine = 0;
        setTimeout(typeNextChar, lineDelay);
        return;
      }

      currentChar++;
      charInLine++;
      setCharIndex(currentChar);

      setTimeout(typeNextChar, typeSpeed);
    };

    // Start typing after initial delay
    setTimeout(typeNextChar, 300);

    return () => {
      clearInterval(cursorInterval);
    };
  }, [isBooting, totalChars]);

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
          >
            {/* CRT screen effect */}
            <div className="absolute inset-0 pointer-events-none crt-overlay" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none scanlines" />

            {/* Boot content */}
            <div className="relative w-full max-w-2xl px-8 py-12">
              {/* Terminal text */}
              <div className="pixel-font text-2xl md:text-3xl leading-relaxed tracking-wider">
                {displayedLines.map((line, index) => (
                  <div
                    key={index}
                    className={cn("mb-2", {
                      "text-primary":
                        index === bootMessages.length - 1 && isComplete,
                      "text-muted-foreground":
                        index !== bootMessages.length - 1,
                    })}
                  >
                    <span className="text-primary/60 mr-2">&gt;</span>
                    {line}
                    {/* Show cursor at the end of the current typing line */}
                    {index === displayedLines.length - 1 && !isComplete && (
                      <span
                        className={`inline-block w-2 h-4 md:h-5 bg-primary align-middle ml-1 ${
                          showCursor ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                ))}

                {/* Show cursor on empty line when starting */}
                {displayedLines.length === 0 && (
                  <div className="mb-2">
                    <span className="text-primary/60 mr-2">&gt;</span>
                    <span
                      className={`inline-block w-3 h-6 md:h-7 bg-primary align-middle ml-1 ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Screen flicker on boot complete */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-primary pointer-events-none"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - hidden until boot complete or skipped */}
      <div
        className={
          !hasMounted || isBooting
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        {children}
      </div>

      <style jsx global>{`
        .crt-overlay {
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 90%,
            rgba(0, 0, 0, 0.6) 100%
          );
        }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          );
        }
      `}</style>
    </>
  );
}
