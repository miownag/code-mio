import { Suspense } from "react";
import { fetchAllRepos } from "@/lib/github";
import { ProjectsHero } from "../_components/projects-hero";
import { FeaturedProjects } from "../_components/featured-projects";
import { ProjectsExplorer } from "../_components/projects-explorer";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Github } from "lucide-react";

async function ProjectsContent() {
  const { owned, contributed } = await fetchAllRepos();
  const filteredOwned = owned.filter((repo) => repo.name !== "miownag");
  const allProjects = [...filteredOwned, ...contributed];

  return (
    <div className="space-y-16 sm:space-y-20">
      <ProjectsHero
        ownedCount={filteredOwned.length}
        contributedCount={contributed.length}
      />

      {allProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
          <Github className="mx-auto size-7 text-primary" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold">
            Projects are taking a short build break.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            GitHub data could not be loaded right now. The source is still
            available directly on my profile.
          </p>
          <a
            href="https://github.com/miownag"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Visit GitHub
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      ) : (
        <>
          <FeaturedProjects repos={filteredOwned} />
          <ProjectsExplorer
            owned={filteredOwned}
            contributed={contributed}
          />
        </>
      )}
    </div>
  );
}

function ProjectsPageSkeleton() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="rounded-[1.75rem] border border-border/70 bg-card/50 p-6 sm:p-10">
        <Skeleton className="h-4 w-72 max-w-full" />
        <Skeleton className="mt-5 h-14 w-80 max-w-full" />
        <Skeleton className="mt-5 h-6 w-xl max-w-full" />
        <div className="mt-8 grid max-w-sm grid-cols-2 gap-3">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
      </div>
      <div>
        <Skeleton className="mb-6 h-10 w-56" />
        <div className="grid gap-4 lg:grid-cols-12">
          <Skeleton className="min-h-[420px] rounded-2xl lg:col-span-7" />
          <div className="grid gap-4 lg:col-span-5">
            <Skeleton className="h-50 rounded-2xl" />
            <Skeleton className="h-50 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 pb-16 pt-24 sm:pb-24">
      <Suspense fallback={<ProjectsPageSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
