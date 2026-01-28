"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all h-full group cursor-pointer"
      onClick={() => window.open(project.link, "_blank")}
    >
      <CardContent className="flex flex-col md:flex-row gap-6">
        {/* Left side - Image */}
        <div className="w-full md:w-2/5 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-48 md:min-h-56 rounded-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-3/5 flex flex-col justify-between">
          <div>
            <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
