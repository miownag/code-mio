"use client";

import { motion } from "framer-motion";
import { photographs } from "@/constants/photos";
import PhotosFeeds from "@/components/photos-feeds";
import Subtitle from "@/components/subtitle";

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
