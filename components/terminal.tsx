"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTerminal } from "@/hooks/use-terminal";
import TerminalOutput from "./terminal-output";
import { HiOutlineTerminal } from "react-icons/hi";

interface TrafficLightsProps {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onMinimize: () => void;
}

const TrafficLights = ({
  fullscreen,
  onToggleFullscreen,
  onMinimize,
}: TrafficLightsProps) => (
  <div className="flex gap-2">
    {/* Close Button */}
    <button
      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
      onClick={onMinimize}
      aria-label="Close"
    >
      <svg
        className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2 2L10 10M10 2L2 10"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
    {/* Minimize Button */}
    <button
      className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
      onClick={onMinimize}
      aria-label="Minimize"
    >
      <svg
        className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2 6H10"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
    {/* Fullscreen Button */}
    <button
      className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
      onClick={onToggleFullscreen}
      aria-label="Toggle fullscreen"
    >
      {!fullscreen ? (
        <svg
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M8 2 L2 2 L2 8" fill="black" stroke="none" />
          <path d="M4 10 L10 10 L10 4" fill="black" stroke="none" />
        </svg>
      ) : (
        <svg
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M0 5 L5 0 L5 5" fill="black" stroke="none" />
          <path d="M7 12 L12 7 L7 7" fill="black" stroke="none" />
        </svg>
      )}
    </button>
  </div>
);

interface TerminalProps {
  isFullscreen: boolean;
  isMinimized: boolean;
  onToggleFullscreen: () => void;
  onMinimize: () => void;
}

export default function Terminal({
  isFullscreen,
  isMinimized,
  onToggleFullscreen,
  onMinimize,
}: TerminalProps) {
  const {
    history,
    currentInput,
    isExecuting,
    handleInputChange,
    handleSubmit,
    handleHistoryNavigation,
    handleTabCompletion,
    initializeTerminal,
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize terminal with ls command
  useEffect(() => {
    if (!initialized) {
      const timer = setTimeout(() => {
        initializeTerminal();
        setInitialized(true);
      }, 800); // Match animation delay

      return () => clearTimeout(timer);
    }
  }, [initialized, initializeTerminal]);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when not executing
  useEffect(() => {
    if (!isExecuting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExecuting]);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleHistoryNavigation("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleHistoryNavigation("down");
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={
        isFullscreen
          ? { type: "spring", stiffness: 200, damping: 25 }
          : { delay: 0.8, duration: 0.5 }
      }
      className={cn(
        "flex flex-col rounded-lg overflow-hidden shadow-2xl border border-border",
        {
          "h-80": !isMinimized && !isFullscreen,
          "h-120": isFullscreen,
          "h-fit": isMinimized,
          "w-fit": isMinimized,
        },
      )}
    >
      {!isMinimized ? (
        <>
          <div className="flex items-center px-3 py-1.5 bg-card/90 backdrop-blur-sm">
            <TrafficLights
              fullscreen={isFullscreen}
              onToggleFullscreen={onToggleFullscreen}
              onMinimize={onMinimize}
            />
            <div
              className={cn(
                "flex-1 text-center text-md text-muted-foreground pixel-font cursor-default select-none",
                "flex justify-center items-center gap-2",
              )}
            >
              <HiOutlineTerminal />
              Terminal
            </div>
            <div className="w-15" />
          </div>

          <div
            ref={terminalBodyRef}
            className="flex-1 bg-black/80 backdrop-blur-sm px-4 py-2 overflow-y-auto font-mono"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "hsl(142, 76%, 20%) #030404",
            }}
          >
            <div className="space-y-1">
              {history.map((line) => (
                <TerminalOutput key={line.id} line={line} />
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="pixel-font text-md">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "flex-1 bg-transparent border-none outline-none",
                  "pixel-font text-lg",
                  "caret-primary",
                )}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-2 items-center px-3 py-2 bg-card/90 backdrop-blur-sm">
          <TrafficLights
            fullscreen={isFullscreen}
            onToggleFullscreen={onToggleFullscreen}
            onMinimize={onMinimize}
          />
          <div className="text-center text-md text-muted-foreground pixel-font">
            Terminal
          </div>
        </div>
      )}
    </motion.div>
  );
}
