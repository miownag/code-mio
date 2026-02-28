"use client";

import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import Subtitle from "@/components/subtitle";
import { useEffect, useState } from "react";
import { Moment } from "@/types/moment";
import { PostMetadata, ApiResponse } from "@/types/post";
import MomentItem from "@/app/moments/_components/moment-item";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function MomentsSection() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [postsMap, setPostsMap] = useState<Record<string, PostMetadata>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [momentsRes, postsRes] = await Promise.all([
          fetch("/api/moments"),
          fetch("/api/posts"),
        ]);

        const momentsJson: ApiResponse<Moment[]> = await momentsRes.json();
        const postsJson: ApiResponse<PostMetadata[]> = await postsRes.json();

        if (momentsJson.data) {
          const byDateDesc = (a: Moment, b: Moment) =>
            new Date(b.date).getTime() - new Date(a.date).getTime();

          const pinned = momentsJson.data
            .filter((m) => m.pinned)
            .sort(byDateDesc);
          const unpinned = momentsJson.data
            .filter((m) => !m.pinned)
            .sort(byDateDesc);

          setMoments([...pinned, ...unpinned].slice(0, 3));
        }

        if (postsJson.data) {
          const map: Record<string, PostMetadata> = {};
          for (const post of postsJson.data) {
            map[post.id] = post;
          }
          setPostsMap(map);
        }
      } catch (error) {
        console.error("Failed to fetch moments:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <motion.section
      id="moments"
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
        <Subtitle>Moments</Subtitle>
        <Link href="/moments">
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

      <motion.div
        variants={containerVariants}
        className="flex flex-col gap-6 max-w-2xl"
      >
        {moments.map((moment) => (
          <motion.div key={moment.id} variants={itemVariants}>
            <MomentItem moment={moment} postsMap={postsMap} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
