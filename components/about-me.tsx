"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCake, HiOutlineLocationMarker } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AiFillWechat } from "react-icons/ai";

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative ml-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Location Button */}
      <motion.div
        className="flex items-center gap-2 py-2 rounded-lg cursor-default"
        whileHover={{ scale: 1.1 }}
      >
        <span className="pixel-font text-2xl">More</span>
      </motion.div>

      {/* Business Card Popover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full mt-2 left-0 z-50"
          >
            <Card className="bg-card border-primary/20 shadow-lg shadow-primary/10 w-80">
              <CardContent className="px-6">
                {/* Header with Avatar Placeholder */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center scale-110">
                      <Image
                        src="/avatar.jpeg"
                        className="rounded-full"
                        width={52}
                        height={52}
                        alt="About Me"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-card" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Mio
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      時空太過大，超脫我的喜與悲
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-4" />

                {/* Location Info */}
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <HiOutlineLocationMarker className="h-4 w-4 text-sky-500" />
                  <span className="text-muted-foreground">Beijing, China</span>
                </div>

                {/* Birthday Info */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <HiCake className="h-4 w-4 text-pink-300" />
                  <span className="text-muted-foreground">Jan 13, 1998</span>
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
        )}
      </AnimatePresence>
    </div>
  );
}
