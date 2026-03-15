"use client";

import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import Subtitle from "../../components/subtitle";
import { ProjectsGrid, ProjectsGridSkeleton } from "./projects-grid";
import { GitHubRepo } from "@/components/github-repo-card";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/github/pinned");
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch pinned repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <Subtitle>Pinned Projects</Subtitle>
        <Link href="/projects">
          <motion.div
            className="flex items-center gap-2 hover:text-primary transition-colors pixel-font text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View More
            <LuArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </div>
      {loading ? <ProjectsGridSkeleton /> : <ProjectsGrid repos={repos} />}
    </section>
  );
}
