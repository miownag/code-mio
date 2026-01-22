"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ThoughtBubbleProps {
  children: ReactNode;
  className?: string;
}

const ThoughtBubble = ({ children, className = "" }: ThoughtBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className={`relative ${className}`}
    >
      {/* Main cloud bubble */}
      <div className="relative">
        {/* SVG Cloud Shape */}
        <svg
          width="160"
          height="72"
          viewBox="0 0 155 72"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main cloud shape */}
          <path
            d="M 0,37
               Q 0,28 15,25
               Q 20,16 40,16
               Q 55,10 75,13
               Q 95,10 110,16
               Q 130,16 135,25
               Q 150,28 150,37
               Q 150,46 135,49
               Q 130,58 110,58
               Q 95,64 75,61
               Q 55,64 40,58
               Q 20,58 15,49
               Q 0,46 0,37 Z"
            className="fill-card stroke-muted-foreground/50"
            strokeWidth="2"
          />
        </svg>

        {/* Content inside bubble */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-foreground text-center">{children}</div>
        </div>
      </div>

      {/* Small thinking bubbles (dots leading to main bubble) */}
      <motion.div
        className="absolute bottom-0 -left-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="8"
            cy="8"
            r="6"
            className="fill-card stroke-muted-foreground/40"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="5"
            cy="5"
            r="4"
            className="fill-card stroke-muted-foreground/40"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ThoughtBubble;
