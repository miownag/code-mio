"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TypeWriter from "@/components/type-writer";
import AboutMe from "@/components/about-me";
import Terminal from "@/components/terminal";
import { StepTimeline, StepTimelineItem } from "@/components/step-timeline";
import { FiGithub } from "react-icons/fi";
import { LuMail, LuExternalLink, LuArrowRight } from "react-icons/lu";
import { experiences, projects, recentLearning } from "./constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import ThoughtBubble from "@/components/thought-bubble";

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

const Subtitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <motion.h2
      variants={itemVariants}
      className={cn(
        "text-3xl md:text-4xl flex items-center gap-4 pixel-font",
        className,
      )}
    >
      <div className="h-8 w-1 bg-primary" />
      {children}
    </motion.h2>
  );
};

export default function Home() {
  const [isTerminalFullscreen, setIsTerminalFullscreen] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <div
          className={cn(
            "grid gap-6 transition-all duration-500",
            isTerminalFullscreen
              ? "grid-cols-1"
              : isTerminalMinimized
                ? "grid-cols-1 md:grid-cols-[8fr_1fr]"
                : "grid-cols-1 md:grid-cols-[1fr_1fr]",
          )}
        >
          {/* Left: Hero Content */}
          <motion.div
            animate={{
              opacity: isTerminalFullscreen ? 0 : 1,
              x: isTerminalFullscreen ? -100 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex flex-col gap-4",
              isTerminalFullscreen && "hidden",
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-foreground">Hi, I&apos;m </span>
                {["M", "i", "o"].map((char, index) => (
                  <span
                    key={index}
                    className="text-primary pixel-font text-8xl mr-1 leading-12"
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full mb-6" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TypeWriter
                textProps={{
                  baseText:
                    "A Frontend Engineer working in Tencent. I'm focusing on ",
                  dynamicTexts: [
                    {
                      text: "Web Tech.",
                      className: "text-pink-400",
                    },
                    {
                      text: "Node.js & Bun.",
                      className: "text-green-400",
                    },
                    {
                      text: "AI Agent.",
                      className: "text-cyan-400",
                    },
                  ],
                }}
                delay={100}
                className="text-4xl text-muted-foreground pixel-font"
                cursorClassName="bg-neutral-500 w-2 h-6 translate-y-1/20"
                loop
                loopDelay={3000}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex w-full gap-16 items-end justify-between pr-12 relative"
            >
              <Image
                className="mask-[linear-gradient(to_bottom,black_75%,transparent_100%)] -ml-8"
                src="/man.png"
                width={240}
                height={240}
                alt=""
              />
              <ThoughtBubble className="absolute! -top-4 left-40">
                <div className="text-xl pixel-font text-muted-foreground">
                  <span className="text-primary/80">Taste</span> is all you need
                </div>
              </ThoughtBubble>
              <div className="opacity-20 hover:opacity-30 bg-no-repeat bg-center bg-contain w-45 h-30 bg-[url(/code.svg)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-6 mt-4 items-center"
            >
              <Button
                variant="default"
                size="lg"
                className="font-semibold"
                asChild
              >
                <a
                  href="https://github.com/miownag"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub className="mr-1 h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold"
                asChild
              >
                <a href="mailto:miownag@gmail.com">
                  <LuMail className="mr-1 h-5 w-5" />
                  Contact
                </a>
              </Button>
              <AboutMe />
            </motion.div>
          </motion.div>

          {/* Right: Terminal */}
          <Terminal
            isFullscreen={isTerminalFullscreen}
            isMinimized={isTerminalMinimized}
            onToggleFullscreen={() => {
              setIsTerminalFullscreen((prev) => !prev);
              setIsTerminalMinimized(false);
            }}
            onMinimize={() => {
              setIsTerminalMinimized((prev) => !prev);
              setIsTerminalFullscreen(false);
            }}
          />
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-20"
      >
        <Subtitle className="mb-8">Work Exp</Subtitle>
        <StepTimeline
          items={experiences.map((exp, index) => ({
            id: index,
            title: exp.position,
            subtitle: exp.company,
            meta: exp.department,
            period: exp.period,
            description: exp.description,
            icon: exp.icon,
            textClassNames: (exp: StepTimelineItem) =>
              exp.subtitle === "Shopee"
                ? "line-through decoration-muted-foreground/70 decoration-1"
                : "",
            status: (exp) => (exp.subtitle === "Shopee" ? "failed" : undefined),
          }))}
        />
      </motion.section>

      {/* Projects Section */}
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

      {/* Recent Reading Section */}
      <motion.section
        id="posts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <Subtitle>Posts & Learning</Subtitle>
          <Link href="/posts">
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
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {recentLearning.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{
                scale: 1.02,
                rotate: [0, index % 2 === 0 ? 3 : -3, 0],
                transition: {
                  duration: 0.4,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                },
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <Card
                className="bg-card border-border hover:border-primary/50 transition-all h-full group cursor-pointer overflow-hidden relative"
                onClick={() => window.open(post.link, "_blank")}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

                <CardContent className="px-6 py-2 relative z-10">
                  <div className="flex items-start gap-2 mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
                      {post.title}
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LuExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {post.source}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + tagIndex * 0.05 }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Photos Section */}
      <motion.section
        id="photos"
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
          <Subtitle>Photographs</Subtitle>
          <Link href="/photos">
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
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg"
        >
          <p className="text-muted-foreground text-lg">Coming Soon...</p>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-border pt-8 mt-20 text-center text-muted-foreground"
      >
        <p>
          Built with{" "}
          <span className="text-pink-300/80 pixel-font text-2xl font-light ml-0.5">
            Love
          </span>
        </p>
        <p className="mt-2">
          © 2026{" "}
          <span className="pixel-font text-2xl font-light text-primary/80 ml-0.5">
            Mio
          </span>
          . All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
