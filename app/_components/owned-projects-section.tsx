"use client";

import { useState, useMemo } from "react";
import { GitHubRepo } from "@/components/github-repo-card";
import { ProjectsGrid } from "./projects-grid";
import { HiSortDescending } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SortType = "stars" | "created";

interface OwnedProjectsSectionProps {
  repos: GitHubRepo[];
}

export function OwnedProjectsSection({ repos }: OwnedProjectsSectionProps) {
  const [sortBy, setSortBy] = useState<SortType>("stars");

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      } else {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    });
  }, [repos, sortBy]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-2xl pixel-font text-muted-foreground/60">
          {"//"} ======== Owned ========
        </h2>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 group",
            "text-sm cursor-pointer rounded-md",
            "hover:bg-muted transition-colors duration-300",
          )}
          title="Click to change sort way"
          onClick={() => setSortBy(sortBy === "stars" ? "created" : "stars")}
        >
          <HiSortDescending className="inline-block w-6 h-6 text-muted-foreground" />
          <div
            className={cn(
              "pixel-font text-xl text-muted-foreground",
              "group-hover:text-foreground transition-colors duration-300",
            )}
          >
            {sortBy === "stars" ? "STARS" : "CREATED"}
          </div>
        </div>
      </motion.div>
      <ProjectsGrid repos={sortedRepos} />
    </section>
  );
}
