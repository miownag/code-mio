"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/particle-background";
import TypeWriter from "@/components/type-writer";
import { FiGithub } from "react-icons/fi";
import { LuMail, LuExternalLink } from "react-icons/lu";
import { experiences, projects, recentLearning, tags } from "./constants";
import { cn } from "@/lib/utils";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Particle Background with Mouse Interaction */}
      <ParticleBackground />

      {/* Grid Background Effect with Green Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-10 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(16,185,129,0.15),transparent)]" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-foreground">Hi, I&apos;m </span>
                <span className="text-primary">Mio</span>
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
                    "A Frontend Engineer based in Beijing, China. I'm focusing on ",
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
                className="text-4xl text-muted-foreground"
                style={{ fontFamily: "var(--font-jersey-10)" }}
                cursorClassName="bg-neutral-500 w-2 h-6 translate-y-1/20"
                loop
                loopDelay={3000}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-6 mt-4"
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
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="h-8 w-1 bg-primary" />
            My Tags
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {tags.map((tech) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="outline"
                  className={cn(
                    "text-base px-4 py-2 transition-colors cursor-default font-mono border-2",
                    tech.category === "Technology"
                      ? "border-primary/50 hover:bg-primary/10"
                      : "border-pink-300/50 hover:bg-pink-300/10"
                  )}
                >
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="h-8 w-1 bg-primary" />
            Work Experience
          </motion.h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="px-6 py-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-primary">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <p className="text-lg font-medium flex items-center gap-2">
                        {exp.icon}
                        {exp.company}
                      </p>
                      <p className="text-lg text-muted-foreground">
                        {exp.department}
                      </p>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="h-8 w-1 bg-primary" />
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className="bg-card border-border hover:border-primary/50 transition-all h-full group cursor-pointer"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <CardContent
                    className="px-6 py-2 flex flex-col h-full"
                    title="Go to GitHub repository"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LuExternalLink className="h-5 w-5 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground mb-4 grow">
                      {project.description}
                    </p>
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Reading Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold flex items-center gap-3"
          >
            <div className="h-8 w-1 bg-primary" />
            Recent Learning
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {recentLearning.map((article, index) => (
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
                  onClick={() => window.open(article.link, "_blank")}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

                  <CardContent className="px-6 py-2 relative z-10">
                    <div className="flex items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
                        {article.title}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LuExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {article.source}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, tagIndex) => (
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-20 text-center text-muted-foreground"
        >
          <p>Built with Love</p>
          <p className="mt-2">© 2026 Mio. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}
