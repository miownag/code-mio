"use client";

import { motion } from "framer-motion";
import Subtitle from "@/components/subtitle";
import MomentsFeed from "./moments-feed";
import { Moment } from "@/types/moment";
import { PostMetadata } from "@/types/post";

interface Props {
  moments: Moment[];
  postsMap: Record<string, PostMetadata>;
}

export default function MomentsPageClient({ moments, postsMap }: Props) {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Subtitle size="lg">Moments</Subtitle>
        <p className="text-muted-foreground text-lg">
          Thoughts, updates, and snapshots from my journey.
        </p>
      </motion.div>

      <MomentsFeed moments={moments} postsMap={postsMap} />
    </div>
  );
}
