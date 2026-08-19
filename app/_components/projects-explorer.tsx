"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GitHubRepoCard, GitHubRepo } from "@/components/github-repo-card";
import { featuredProjectNames } from "@/constants/projects";
import { cn } from "@/lib/utils";
import { ArrowDown, SlidersHorizontal } from "lucide-react";

type ProjectFilter = "all" | "owned" | "contributed";
type ProjectSort = "featured" | "newest" | "stars";

interface ProjectsExplorerProps {
  owned: GitHubRepo[];
  contributed: GitHubRepo[];
}

interface ProjectEntry {
  repo: GitHubRepo;
  relationship: "owned" | "contributed";
}

const INITIAL_VISIBLE_COUNT = 8;

export function ProjectsExplorer({
  owned,
  contributed,
}: ProjectsExplorerProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [sortBy, setSortBy] = useState<ProjectSort>("featured");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const entries = useMemo<ProjectEntry[]>(
    () => [
      ...owned.map((repo) => ({
        repo,
        relationship: "owned" as const,
      })),
      ...contributed.map((repo) => ({
        repo,
        relationship: "contributed" as const,
      })),
    ],
    [owned, contributed],
  );

  const visibleEntries = useMemo(() => {
    const filtered = entries.filter((entry) => {
      if (filter === "all") return true;
      return entry.relationship === filter;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "stars") {
        return b.repo.stargazers_count - a.repo.stargazers_count;
      }

      if (sortBy === "newest") {
        return (
          new Date(b.repo.created_at).getTime() -
          new Date(a.repo.created_at).getTime()
        );
      }

      const aFeatured = featuredProjectNames.indexOf(a.repo.full_name);
      const bFeatured = featuredProjectNames.indexOf(b.repo.full_name);
      const aRank = aFeatured === -1 ? Number.POSITIVE_INFINITY : aFeatured;
      const bRank = bFeatured === -1 ? Number.POSITIVE_INFINITY : bFeatured;

      if (aRank !== bRank) return aRank - bRank;
      if (a.relationship !== b.relationship) {
        return a.relationship === "owned" ? -1 : 1;
      }
      return b.repo.stargazers_count - a.repo.stargazers_count;
    });
  }, [entries, filter, sortBy]);

  const displayedEntries = visibleEntries.slice(0, visibleCount);
  const remainingCount = visibleEntries.length - displayedEntries.length;
  const filters: Array<{
    value: ProjectFilter;
    label: string;
    count: number;
  }> = [
    { value: "all", label: "All", count: entries.length },
    { value: "owned", label: "Owned", count: owned.length },
    {
      value: "contributed",
      label: "Contributed",
      count: contributed.length,
    },
  ];

  const changeFilter = (nextFilter: ProjectFilter) => {
    setFilter(nextFilter);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const changeSort = (nextSort: ProjectSort) => {
    setSortBy(nextSort);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <motion.section
      aria-labelledby="project-explorer-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: reduceMotion ? 0 : -18 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
        }}
        className="mb-6 flex items-start gap-3"
      >
        <span className="pt-1 font-mono text-xs text-primary">02</span>
        <div>
          <h2
            id="project-explorer-heading"
            className="pixel-font text-3xl sm:text-4xl"
          >
            Project Explorer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse original builds and open-source contributions.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay: reduceMotion ? 0 : 0.08 },
          },
        }}
        className="mb-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/55 p-2.5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div
          className="flex min-w-0 gap-1 overflow-x-auto"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <motion.button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => changeFilter(item.value)}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                filter === item.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {filter === item.value && (
                <motion.span
                  layoutId="active-project-filter"
                  className="absolute inset-0 rounded-xl bg-primary shadow-sm"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <span className="relative">{item.label}</span>
              <span
                className={cn(
                  "relative font-mono text-[10px] tabular-nums",
                  filter === item.value
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground",
                )}
              >
                {String(item.count).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>

        <label className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <SlidersHorizontal className="size-4" aria-hidden />
          <span className="sr-only sm:not-sr-only">Sort</span>
          <select
            value={sortBy}
            onChange={(event) => changeSort(event.target.value as ProjectSort)}
            className="cursor-pointer appearance-none bg-transparent pr-5 font-mono text-xs font-medium uppercase tracking-wider text-foreground outline-none"
            aria-label="Sort projects"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="stars">Stars</option>
          </select>
          <ArrowDown className="-ml-5 size-3 pointer-events-none" aria-hidden />
        </label>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {displayedEntries.map(({ repo, relationship }, index) => (
            <motion.div
              layout
              key={`${relationship}-${repo.full_name}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.35,
                delay: reduceMotion ? 0 : Math.min(index, 3) * 0.05,
              }}
            >
              <GitHubRepoCard repo={repo} relationship={relationship} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {displayedEntries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No projects found in this view.
        </div>
      )}

      {remainingCount > 0 && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <motion.button
            type="button"
            onClick={() => setVisibleCount(visibleEntries.length)}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Show {remainingCount} more
            <ArrowDown
              className="size-4"
              aria-hidden
            />
          </motion.button>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
            SHOWING {displayedEntries.length} / {visibleEntries.length}
          </span>
        </div>
      )}
    </motion.section>
  );
}
