"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ScrambleTextProps {
  textProps: {
    baseText: string;
    dynamicTexts: (string | { text: string; className?: string })[];
  };
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
  showCursor?: boolean;
  className?: string;
  style?: React.CSSProperties;
  cursorClassName?: string;
  onComplete?: () => void;
  scrambleChars?: string;
  scrambleIterations?: number;
}

const ScrambleText = ({
  textProps,
  speed = 50,
  delay = 0,
  loop = false,
  loopDelay = 1000,
  showCursor = true,
  className,
  style,
  cursorClassName,
  onComplete,
  scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  scrambleIterations = 3,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const textPropsRef = useRef(textProps);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  const getCurrentDynamicText = (index: number) => {
    const item = textPropsRef.current.dynamicTexts[index];
    return typeof item === "string" ? item : item.text;
  };

  // Update text when prop changes
  useEffect(() => {
    textPropsRef.current = textProps;
    setDisplayText("");
    setDynamicTextIndex(0);
    setIsScrambling(false);
  }, [textProps]);

  useEffect(() => {
    const scramble = () => {
      const targetText = getCurrentDynamicText(dynamicTextIndex);
      const targetLength = targetText.length;

      let currentIteration = 0;
      let revealedCount = 0;
      const iterationsPerChar = scrambleIterations;

      const animate = () => {
        if (revealedCount >= targetLength) {
          // Finished scrambling current text
          setDisplayText(targetText);
          setIsScrambling(false);

          if (loop) {
            timerRef.current = setTimeout(() => {
              // Move to next dynamic text
              const nextIndex =
                (dynamicTextIndex + 1) %
                textPropsRef.current.dynamicTexts.length;
              setDynamicTextIndex(nextIndex);
              setIsScrambling(true);
            }, loopDelay);
          } else {
            onComplete?.();
          }
          return;
        }

        // Build the display text
        let result = "";
        for (let i = 0; i < targetLength; i++) {
          if (i < revealedCount) {
            // Already revealed
            result += targetText[i];
          } else if (i === revealedCount) {
            // Currently scrambling this character
            if (currentIteration >= iterationsPerChar) {
              result += targetText[i];
              revealedCount++;
              currentIteration = 0;
            } else {
              result += getRandomChar();
              currentIteration++;
            }
          } else {
            // Not yet reached, show random
            result += getRandomChar();
          }
        }

        setDisplayText(result);
        timerRef.current = setTimeout(animate, speed);
      };

      setIsScrambling(true);
      animate();
    };

    const startScramble = () => {
      if (delay > 0) {
        timerRef.current = setTimeout(scramble, delay);
      } else {
        scramble();
      }
    };

    // Start scrambling when component mounts or when dynamicTextIndex changes
    if (isScrambling || dynamicTextIndex === 0) {
      startScramble();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicTextIndex]);

  return (
    <div className={cn("flex items-center", className)} style={style}>
      <span className="whitespace-wrap">
        {textProps.baseText}
        <span
          className={
            typeof textProps.dynamicTexts[dynamicTextIndex] === "string"
              ? ""
              : textProps.dynamicTexts[dynamicTextIndex].className
          }
        >
          {displayText}
        </span>
        {showCursor && (
          <div
            className={cn("ml-1", "inline-block", cursorClassName)}
            style={{
              animation: "blink 1s infinite",
            }}
          />
        )}
      </span>
    </div>
  );
};

export default ScrambleText;
