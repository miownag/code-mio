"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LuArrowRight } from "react-icons/lu";
import { projects } from "@/constants";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Subtitle from "./subtitle";
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
                <ProjectCard project={project} />
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
