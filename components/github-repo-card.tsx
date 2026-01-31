"use client";

import { Card } from "@/components/ui/card";
import { LuGitFork, LuStar, LuBookMarked } from "react-icons/lu";

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  owner: {
    login: string;
  };
}

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Ruby: "#701516",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const languageColor = repo.language
    ? languageColors[repo.language] || "#8b949e"
    : null;

  return (
    <Card className="group bg-card border-border hover:border-primary/50 transition-all py-4 px-6 h-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <LuBookMarked className="h-4 w-4 text-muted-foreground shrink-0" />
        <span
          className="font-semibold truncate hover:underline group-hover:text-primary cursor-pointer"
          onClick={() => window.open(repo.html_url, "_blank")}
        >
          {repo.owner.login}/{repo.name}
        </span>
        <span className="text-xs text-muted-foreground border border-border rounded-full px-1.5 py-0.5 shrink-0">
          Public
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-1">
        {repo.description || "No description provided."}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColor || "#8b949e" }}
            />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LuStar className="h-3.5 w-3.5" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        {repo.forks_count > 0 && (
          <div className="flex items-center gap-1">
            <LuGitFork className="h-3.5 w-3.5" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
