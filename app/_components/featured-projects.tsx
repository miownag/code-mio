"use client";

import { GitHubRepo } from "@/components/github-repo-card";
import {
  featuredProjectProfiles,
  ProjectVisual,
} from "@/constants/projects";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

interface FeaturedProjectsProps {
  repos: GitHubRepo[];
}

function SessionsVisual() {
  const reduceMotion = useReducedMotion();
  const sessions = [
    ["01", "feature/agent-ui", "RUNNING"],
    ["02", "fix/context-sync", "READY"],
    ["03", "refactor/tools", "IDLE"],
  ];

  return (
    <div className="space-y-2.5 font-mono text-[10px] sm:text-xs">
      {sessions.map(([number, branch, status], index) => (
        <div
          key={branch}
          className={cn(
            "grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2.5",
            index === 0
              ? "border-primary/35 bg-primary/10 text-foreground"
              : "border-border/70 bg-background/55 text-muted-foreground",
          )}
        >
          <span className="text-primary">{number}</span>
          <span className="truncate">{branch}</span>
          <motion.span
            className={index === 0 ? "text-primary" : ""}
            animate={
              index === 0 && !reduceMotion
                ? { opacity: [0.45, 1, 0.45] }
                : undefined
            }
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            {status}
          </motion.span>
        </div>
      ))}
      <div className="rounded-lg border border-border/70 bg-background/40 px-3 py-3">
        <div className="flex items-center justify-between text-[9px] tracking-[0.16em] text-muted-foreground">
          <span>AGENT ACTIVITY</span>
          <span className="text-primary">3 WORKTREES</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: "28%" }}
            animate={
              reduceMotion
                ? { width: "72%" }
                : { width: ["28%", "84%", "56%", "72%"] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[9px] text-muted-foreground">
          <span>ISOLATED</span>
          <span>SYNCED</span>
          <span>READY</span>
        </div>
      </div>
    </div>
  );
}

function MarkdownVisual() {
  return (
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-3 font-mono text-[10px] sm:text-xs">
      <div className="rounded-lg border border-border/70 bg-background/55 p-3 text-muted-foreground">
        <p className="text-primary"># Ship faster</p>
        <p className="mt-2">**Fast** rendering</p>
        <p className="mt-1">- GFM</p>
        <p>- syntax highlight</p>
      </div>
      <div className="rounded-lg border border-primary/25 bg-primary/5 p-3">
        <p className="font-semibold">Ship faster</p>
        <p className="mt-2 text-muted-foreground">
          <strong className="text-foreground">Fast</strong> rendering
        </p>
        <p className="mt-1 text-primary">✓ GFM</p>
        <p className="text-primary">✓ syntax highlight</p>
      </div>
    </div>
  );
}

function AgentVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-xl border border-border/70 bg-background/65 p-3 font-mono text-[10px] sm:text-xs">
      <p className="text-muted-foreground">
        <span className="mr-2 text-primary">❯</span>
        fix the failing test
      </p>
      <div className="my-3 h-px bg-border/70" />
      <p className="text-muted-foreground">scanning workspace...</p>
      <p className="mt-1 text-muted-foreground">editing src/runner.ts</p>
      <p className="mt-3 text-primary">
        ✓ patch ready
        <motion.span
          aria-hidden
          className="ml-1 inline-block h-3 w-1.5 bg-primary align-middle"
          animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </p>
    </div>
  );
}

function ProjectVisualPanel({ visual }: { visual: ProjectVisual }) {
  if (visual === "sessions") return <SessionsVisual />;
  if (visual === "markdown") return <MarkdownVisual />;
  return <AgentVisual />;
}

export function FeaturedProjects({ repos }: FeaturedProjectsProps) {
  const reduceMotion = useReducedMotion();
  const repoMap = new Map(repos.map((repo) => [repo.full_name, repo]));
  const projects = featuredProjectProfiles.flatMap((profile) => {
    const repo = repoMap.get(profile.fullName);
    return repo ? [{ profile, repo }] : [];
  });

  if (projects.length === 0) return null;

  return (
    <motion.section
      aria-labelledby="selected-work-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: reduceMotion ? 0 : -18 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
        }}
        className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex items-start gap-3">
          <span className="pt-1 font-mono text-xs text-primary">01</span>
          <div>
            <h2
              id="selected-work-heading"
              className="pixel-font text-3xl sm:text-4xl"
            >
              Selected Work
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A closer look at the projects that best represent my work.
            </p>
          </div>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:block">
          03 / FEATURED BUILDS
        </span>
      </motion.div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.14 },
          },
        }}
        className="grid gap-4 lg:grid-cols-12"
      >
        {projects.map(({ profile, repo }, index) => {
          const primary = index === 0;

          return (
            <motion.article
              key={repo.full_name}
              variants={{
                hidden: {
                  opacity: 0,
                  y: reduceMotion ? 0 : 28,
                  scale: reduceMotion ? 1 : 0.985,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              className={cn(
                primary
                  ? "lg:col-span-7 lg:row-span-2"
                  : "lg:col-span-5",
              )}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${repo.full_name} on GitHub`}
                className={cn(
                  "group relative flex h-full min-h-[310px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm transition-all duration-300",
                  "hover:border-primary/45 hover:shadow-[0_24px_70px_-45px_var(--color-primary)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  primary && "sm:min-h-[410px] lg:min-h-[520px] lg:p-7",
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-300 group-hover:via-primary/90"
                />
                <div
                  aria-hidden
                  className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-500 group-hover:bg-primary/15"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
                      {profile.eyebrow}
                    </p>
                    <h3
                      className={cn(
                        "mt-2 font-semibold tracking-tight",
                        primary ? "text-2xl sm:text-3xl" : "text-xl",
                      )}
                    >
                      {repo.name}
                    </h3>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                  />
                </div>

                <p
                  className={cn(
                    "relative mt-4 max-w-xl font-medium leading-snug",
                    primary ? "text-xl sm:text-2xl" : "text-lg",
                  )}
                >
                  {profile.tagline}
                </p>
                <p className="relative mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {profile.summary}
                </p>

                <div className="relative my-5 flex-1 overflow-hidden rounded-2xl border border-border/50 bg-background/35 p-3 sm:p-4">
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-3 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent"
                      animate={{ y: primary ? [10, 330, 10] : [10, 150, 10] }}
                      transition={{
                        duration: primary ? 7 : 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <div className="mb-3 flex items-center gap-1.5" aria-hidden>
                    <span className="size-2 rounded-full bg-red-400" />
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[9px] tracking-widest text-muted-foreground">
                      PREVIEW
                    </span>
                  </div>
                  <div className="relative">
                    <ProjectVisualPanel visual={profile.visual} />
                  </div>
                </div>

                <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {profile.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/20 group-hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5" aria-hidden />
                      {repo.stargazers_count.toLocaleString()}
                    </span>
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3.5" aria-hidden />
                        {repo.forks_count.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
