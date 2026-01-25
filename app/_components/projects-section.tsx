"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LuExternalLink, LuArrowRight } from "react-icons/lu";
import { projects } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Subtitle from "./subtitle";

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

export default function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-8"
      >
        <Subtitle>Featured Projects</Subtitle>
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
      </motion.div>
      <motion.div variants={itemVariants}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem
                key={project.name}
                className="md:basis-1/2 lg:basis-1/2"
              >
                <Card
                  className="bg-card border-border hover:border-primary/50 transition-all h-full group cursor-pointer"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <CardContent className="flex flex-col md:flex-row gap-6">
                    {/* Left side - Image */}
                    <div className="w-full md:w-2/5 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-48 md:min-h-56 rounded-2xl">
                      {project.image ? (
                        <Image
                          src={project.image || ""}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* Right side - Content */}
                    <div className="w-full md:w-3/5 flex flex-col justify-between">
                      <div>
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
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
