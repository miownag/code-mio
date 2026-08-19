export type ProjectVisual = "sessions" | "markdown" | "agent";

export interface FeaturedProjectProfile {
  fullName: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  tags: string[];
  visual: ProjectVisual;
}

export const featuredProjectProfiles: FeaturedProjectProfile[] = [
  {
    fullName: "miownag/forkestra",
    eyebrow: "AI CODING DESKTOP",
    tagline: "Run coding agents in parallel, without losing the thread.",
    summary:
      "A focused desktop workspace for isolated, multi-session agent workflows powered by Git worktrees.",
    tags: ["AI Coding", "Desktop", "Git Worktree"],
    visual: "sessions",
  },
  {
    fullName: "miownag/ink-markdown-es",
    eyebrow: "TERMINAL RENDERING",
    tagline: "Markdown that feels native in the terminal.",
    summary:
      "A modern, performance-minded Markdown renderer designed for Ink applications.",
    tags: ["Markdown", "Terminal UI", "TypeScript"],
    visual: "markdown",
  },
  {
    fullName: "miownag/walle-agent",
    eyebrow: "AGENT SDK",
    tagline: "Build focused agents from composable plugins.",
    summary:
      "A plugin-first SDK for creating extensible agent workflows without unnecessary complexity.",
    tags: ["AI Agent", "Agent SDK", "Plugins"],
    visual: "agent",
  },
];

export const featuredProjectNames = featuredProjectProfiles.map(
  (project) => project.fullName,
);
