"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCake, HiOutlineLocationMarker } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AiFillWechat } from "react-icons/ai";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { VscPinned } from "react-icons/vsc";
import { VscPinnedDirty } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import useSound from "use-sound";

export default function AboutMe() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [fixedPosition, setFixedPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const [playPopSound] = useSound("/sounds/pop.wav", {
    volume: 0.8,
  });
  const [playSwitchSound] = useSound("/sounds/switch.wav", {
    volume: 0.8,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest(".relative") &&
        !isPinned
      ) {
        setIsOpened(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPinned]);

  useEffect(() => {
    if (isOpened && popoverRef.current && !isPinned) {
      const timer = setTimeout(() => {
        if (popoverRef.current) {
          const rect = popoverRef.current.getBoundingClientRect();
          setFixedPosition({ top: rect.top, left: rect.left });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpened, isPinned]);

  useEffect(() => {
    if (!isPinned || !isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setFixedPosition({
        top: e.clientY - dragOffset.y,
        left: e.clientX - dragOffset.x,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPinned, isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPinned) return;

    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("svg") ||
      target.closest("img") ||
      target.tagName === "IMG"
    ) {
      return;
    }

    const rect = popoverRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  return (
    <div className="relative ml-4">
      {/* Location Button */}
      <motion.div
        className="flex items-center gap-2 py-2 rounded-lg cursor-pointer"
        whileHover={{ scale: isOpened ? 1 : 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isPinned) {
            setIsOpened((prev) => !prev);
            if (!isOpened) {
              playPopSound();
            }
          }
        }}
        title="Click to check more"
      >
        <span
          className={cn("pixel-font text-2xl shimmer select-none shrink-0", {
            "text-primary": isOpened,
          })}
        >
          Click Me
        </span>
      </motion.div>

      {/* Business Card Popover */}
      <AnimatePresence mode="wait">
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={
            isOpened
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 10, scale: 0.95 }
          }
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn("absolute z-50", {
            fixed: isPinned,
            "-top-48": !isPinned,
            "left-22": !isPinned,
            "pointer-events-none": !isOpened,
          })}
          style={
            isPinned
              ? {
                  top: fixedPosition.top,
                  left: fixedPosition.left,
                }
              : undefined
          }
        >
          <Card
            className={cn(
              "bg-card border-primary/20 shadow-lg shadow-primary/10 w-80",
              {
                "cursor-move": isPinned && !isDragging,
                "cursor-grabbing": isDragging,
              },
            )}
            onMouseDown={handleMouseDown}
          >
            <CardContent className="px-6">
              {/* Header with Avatar Placeholder */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center scale-110">
                    <Image
                      src="/avatar.jpeg"
                      className="rounded-full cursor-pointer"
                      onClick={() => window.open("https://github.com/miownag")}
                      width={52}
                      height={52}
                      preload
                      alt="Doge"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-card" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-foreground">Mio</h3>
                    <div className="flex items-center gap-2 self-start h-full">
                      <motion.div
                        onClick={() => {
                          setIsPinned((prev) => !prev);
                          playSwitchSound();
                        }}
                        className={cn(
                          "cursor-pointer hover:text-primary text-muted-foreground",
                          {
                            "text-primary": isPinned,
                          },
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPinned ? <VscPinnedDirty /> : <VscPinned />}
                      </motion.div>
                      <motion.div
                        onClick={() => !isPinned && setIsOpened(false)}
                        className={cn("cursor-pointer text-muted-foreground", {
                          "hover:text-primary": !isPinned,
                          "cursor-not-allowed text-muted": isPinned,
                        })}
                        whileHover={{ scale: !isPinned ? 1.1 : 1 }}
                        whileTap={{ scale: !isPinned ? 0.95 : 1 }}
                      >
                        <HiOutlineMinusCircle />
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground chinese-font">
                    時空太過大，超脫我的喜與悲
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Location Info */}
              <div className="flex items-center gap-2 mb-2 text-sm">
                <HiOutlineLocationMarker className="h-4 w-4 text-blue-300" />
                <span className="text-muted-foreground">Beijing, China</span>
              </div>

              {/* Birthday Info */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <HiCake className="h-4 w-4 text-pink-200" />
                <span className="text-muted-foreground">Born 1998</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Contact Links */}
              <div className="flex-1 flex items-center flex-col justify-center gap-2 px-3 py-2 rounded-md border-2 border-primary/30 transition-colors">
                <div className="flex items-center gap-1">
                  <AiFillWechat className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    WeChat
                  </span>
                </div>
                <Image
                  src="/wechat.jpg"
                  width={256}
                  height={256}
                  className="rounded-lg mb-1"
                  alt="WeChat"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
