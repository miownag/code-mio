"use client";

import { motion } from "framer-motion";
import { Moment } from "@/types/moment";
import { PostMetadata } from "@/types/post";
import MomentItem from "./moment-item";
import { useMemo } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface Props {
  moments: Moment[];
  postsMap: Record<string, PostMetadata>;
}

export default function MomentsFeed({ moments, postsMap }: Props) {
  const sortedMoments = useMemo(() => {
    const byDateDesc = (a: Moment, b: Moment) =>
      new Date(b.date).getTime() - new Date(a.date).getTime();

    const pinned = moments.filter((m) => m.pinned).sort(byDateDesc);
    const unpinned = moments.filter((m) => !m.pinned).sort(byDateDesc);

    return [...pinned, ...unpinned];
  }, [moments]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {sortedMoments.map((moment) => (
        <motion.div key={moment.id} variants={itemVariants}>
          <MomentItem moment={moment} postsMap={postsMap} />
        </motion.div>
      ))}
    </motion.div>
  );
}
