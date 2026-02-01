import { Suspense } from "react";
import { fetchAllRepos } from "@/lib/github";
import {
  ProjectsGrid,
  ProjectsGridSkeleton,
} from "../_components/projects-grid";
import { OwnedProjectsSection } from "../_components/owned-projects-section";
import Subtitle from "@/components/subtitle";

async function ProjectsContent() {
  const { owned, contributed } = await fetchAllRepos();
  const filteredOwned = owned.filter((repo) => repo.name !== "miownag");

  return (
    <div className="space-y-12">
      {contributed.length > 0 && (
        <section>
          <h2 className="text-2xl pixel-font text-muted-foreground/60 mb-4">
            {"//"} ======== Contributed ========
          </h2>
          <ProjectsGrid repos={contributed} />
        </section>
      )}

      <OwnedProjectsSection repos={filteredOwned} />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="mb-10">
      <Subtitle size="lg">Projects</Subtitle>
      <p className="text-muted-foreground text-lg">
        A collection of projects I&apos;ve built and contributed to.
      </p>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      <PageHeader />
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
