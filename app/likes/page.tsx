"use client";

import Subtitle from "@/components/subtitle";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LikesPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Subtitle size="lg">Things I Like</Subtitle>
        <p className="text-muted-foreground text-lg">
          A collection of things that inspire and excite me.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4 items-center justify-center h-96 border-2 border-dashed border-border rounded-lg"
      >
        <Image
          src="/dark-side-of-the-moon.png"
          alt="Dark Side of the Moon"
          width={256}
          height={256}
        />
        <div className="text-center">
          <p className="text-muted-foreground text-xl mb-2">Coming Soon...</p>
          <p className="text-muted-foreground text-sm">
            Stay tuned for my curated collection of favorite things
          </p>
        </div>
      </motion.div>
    </div>
  );
}
