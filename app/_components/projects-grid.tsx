"use client";

import { motion } from "framer-motion";
import { GitHubRepoCard, GitHubRepo } from "@/components/github-repo-card";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

interface ProjectsGridProps {
  repos: GitHubRepo[];
}

export function ProjectsGrid({ repos }: ProjectsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {repos.map((repo) => (
        <motion.div key={repo.full_name} variants={itemVariants}>
          <GitHubRepoCard repo={repo} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="min-h-[172px] space-y-4 rounded-2xl border border-border/70 bg-card/50 p-5"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-5 w-44 max-w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
