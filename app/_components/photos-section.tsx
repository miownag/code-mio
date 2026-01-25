"use client";

import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { photographs } from "@/constants/photos";
import PhotosFeeds from "@/components/photos-feeds";
import Link from "next/link";
import Subtitle from "./subtitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PhotosSection() {
  return (
    <motion.section
      id="photos"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-8"
      >
        <Subtitle>Photographs</Subtitle>
        <Link href="/photos">
          <motion.div
            className="flex items-center gap-2 hover:text-primary transition-colors pixel-font text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View More
            <LuArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </motion.div>
      <PhotosFeeds
        photographs={photographs.slice(0, 7)}
        itemVariants={itemVariants}
      />
    </motion.section>
  );
}
