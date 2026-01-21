"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "../constants";
import { LuExternalLink } from "react-icons/lu";

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
        className="mb-12"
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
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card
              className="bg-card border-border hover:border-primary/50 transition-all h-full group cursor-pointer"
              onClick={() => window.open(project.link, "_blank")}
            >
              <CardContent className="px-6 py-2 flex flex-col h-full">
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="py-1"
                  >
                    <LuExternalLink className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>
                <p className="text-muted-foreground mb-4 grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
