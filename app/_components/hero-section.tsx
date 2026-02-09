"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AboutMe from "@/app/_components/about-me";
import Terminal from "@/components/terminal";
import { FiGithub } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
import useHasMounted from "@/hooks/use-has-mounted";
import ScrambleText from "@/components/scramble-text";

export default function HeroSection() {
  const [isTerminalFullscreen, setIsTerminalFullscreen] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();

  const dynamicTexts = [
    {
      text: "Web Tech.",
      className: `${resolvedTheme === "dark" && hasMounted ? "text-pink-400" : "text-pink-600"}`,
    },
    {
      text: "Node.js.",
      className: `${resolvedTheme === "dark" && hasMounted ? "text-green-400" : "text-green-600"}`,
    },
    {
      text: "AI Agent.",
      className: `${resolvedTheme === "dark" && hasMounted ? "text-cyan-400" : "text-cyan-600"}`,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div
        className={cn(
          "grid gap-6 transition-all duration-500",
          isTerminalFullscreen
            ? "grid-cols-1"
            : isTerminalMinimized
              ? "grid-cols-1 md:grid-cols-[8fr_1fr]"
              : "grid-cols-1 md:grid-cols-[2fr_1fr]",
        )}
      >
        {/* Left: Hero Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isTerminalFullscreen ? 0 : 1,
            x: isTerminalFullscreen ? -100 : 0,
          }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex w-full gap-8 justify-between pr-12 relative",
            isTerminalFullscreen && "hidden",
          )}
        >
          {resolvedTheme === "dark" && hasMounted ? (
            <div
              className={cn(
                "opacity-7 pointer-events-none bg-no-repeat bg-center bg-contain bg-[url(/code.svg)]",
                "absolute -top-16 -left-23",
                "w-120 h-85",
              )}
            />
          ) : (
            <div
              className={cn(
                "opacity-7 pointer-events-none bg-no-repeat bg-center bg-contain bg-[url(/code-light.svg)]",
                "absolute -top-16 -left-23",
                "w-120 h-85",
              )}
            />
          )}
          <Image
            className="mask-[linear-gradient(to_bottom,black_75%,transparent_100%)] -ml-8 -mt-4 w-auto h-auto max-w-55 max-h-55 object-fill"
            src="/man.png"
            width={215}
            height={210}
            alt=""
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-foreground font-extrabold">
                  Hi, I&apos;m{" "}
                </span>
                {["M", "i", "o"].map((char, index) => (
                  <span
                    key={index}
                    className="text-primary pixel-font text-8xl mr-1 leading-12"
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full mt-4" />
            </motion.div>
            <ScrambleText
              textProps={{
                baseText:
                  "A Frontend Engineer working in Tencent. I'm focusing on ",
                dynamicTexts,
              }}
              className="text-[2rem] leading-[1.2] text-muted-foreground pixel-font"
              loop
              loopDelay={2000}
            />
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-6 mt-4 items-center w-full"
            >
              <Button size="lg" className="font-semibold" asChild>
                <a
                  href="https://github.com/miownag"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub className="mr-1 h-5 w-5" />
                  Github
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold transition-none"
                asChild
              >
                <a href="mailto:miownag@gmail.com">
                  <LuMail className="mr-1 h-5 w-5" />
                  Contact
                </a>
              </Button>
              <AboutMe />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Terminal */}
        <Terminal
          isFullscreen={isTerminalFullscreen}
          isMinimized={isTerminalMinimized}
          onToggleFullscreen={() => {
            setIsTerminalFullscreen((prev) => !prev);
            setIsTerminalMinimized(false);
          }}
          onMinimize={() => {
            setIsTerminalMinimized((prev) => !prev);
            setIsTerminalFullscreen(false);
          }}
        />
      </div>
    </motion.section>
  );
}
