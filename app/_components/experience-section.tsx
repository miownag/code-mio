"use client";

import { motion } from "framer-motion";
import { StepTimeline } from "@/components/step-timeline";
import { experiences } from "@/constants";
import Subtitle from "../../components/subtitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ExperienceSection() {
  return (
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
        }))}
      />
    </motion.section>
  );
}
