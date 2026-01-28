"use client";

import { motion } from "framer-motion";
import { projects } from "@/constants";
import { ProjectCard } from "@/components/project-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-light pixel-font mb-4 flex items-center gap-4">
          <div className="h-10 w-1 bg-primary" />
          Projects
        </h1>
        <p className="text-muted-foreground text-lg">
          A collection of projects I&apos;ve built and contributed to.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
