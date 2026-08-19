import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  GitFork,
  Star,
  Boxes,
  GitPullRequestArrow,
} from "lucide-react";

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  owner: {
    login: string;
  };
}

interface GitHubRepoCardProps {
  repo: GitHubRepo;
  relationship?: "owned" | "contributed";
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

export function GitHubRepoCard({
  repo,
  relationship = repo.owner.login === "miownag" ? "owned" : "contributed",
}: GitHubRepoCardProps) {
  const languageColor = repo.language
    ? languageColors[repo.language] || "#8b949e"
    : null;
  const displayName = relationship === "owned" ? repo.name : repo.full_name;
  const RelationshipIcon =
    relationship === "owned" ? Boxes : GitPullRequestArrow;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${repo.full_name} on GitHub`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        className={cn(
          "relative h-full min-h-[172px] gap-4 overflow-hidden border-border/70 bg-card/70 px-5 py-5 shadow-none backdrop-blur-sm",
          "transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/45 group-hover:shadow-[0_18px_55px_-42px_var(--color-primary)]",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-300 group-hover:via-primary/90"
        />
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <RelationshipIcon className="size-3.5" aria-hidden />
              <span>
                {relationship === "owned" ? "Original build" : "Contributor"}
              </span>
            </div>
            <h3 className="line-clamp-2 text-base font-semibold leading-5 transition-colors duration-300 group-hover:text-primary sm:text-lg">
              {displayName}
            </h3>
          </div>
          <ArrowUpRight
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-5 text-muted-foreground">
          {repo.description || "No description provided."}
        </p>

        <div className="mt-auto flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
          {repo.language && (
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: languageColor || "#8b949e" }}
              />
              <span className="truncate">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="size-3.5" aria-hidden />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="size-3.5" aria-hidden />
              <span>{repo.forks_count.toLocaleString()}</span>
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}
