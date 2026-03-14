"use client";

import { motion } from "framer-motion";
import { photographs } from "@/constants/photos";
import PhotosFeeds from "@/components/photos-feeds";
import Subtitle from "@/components/subtitle";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const gear = {
  camera: { name: "Sony A7 IV", icon: Camera, status: "active" as const },
  lenses: [
    { name: "Sony 20-70mm F4", status: "active" as const },
    { name: "Sigma 35mm F1.4", status: "active" as const },
    { name: "Sigma 85mm F1.4", status: "sold" as const },
    { name: "Tamron 28-200mm F2.8-5.6", status: "sold" as const },
  ],
};

export default function PhotosPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Subtitle size="lg">Photography</Subtitle>
        <p className="text-muted-foreground text-lg">
          My photography collection - capturing moments and memories.
        </p>
      </motion.div>

      {/* Gear Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xl text-foreground">
          <div className="flex items-center gap-2 text-primary">
            <Camera className="w-4 h-4" />
            <span
              className={cn("pixel-font", {
                "text-muted-foreground": gear.camera.status !== "active",
              })}
            >
              {gear.camera.name}
              {gear.camera.status !== "active" ? " (Sold)" : ""}
            </span>
          </div>
          {gear.lenses.map((lens) => (
            <span
              key={lens.name}
              className={cn("pixel-font", {
                "text-muted-foreground": lens.status !== "active",
              })}
            >
              {lens.name}
              {lens.status !== "active" ? " (Sold)" : ""}
            </span>
          ))}
        </div>
      </motion.div>

      <PhotosFeeds
        photographs={photographs}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        motionDivProps={{
          initial: "hidden",
          animate: "visible",
        }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5"
      />
    </div>
  );
}
