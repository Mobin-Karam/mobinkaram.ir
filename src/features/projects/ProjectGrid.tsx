"use client";

import { motion, type Variants } from "framer-motion";

import ProjectCard from "./ProjectCard";
import type { Project } from "./projects";

interface ProjectGridProps {
  projects: Project[];
}

const gridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className={[
        "grid grid-cols-1 gap-4",
        "sm:gap-5 md:grid-cols-2",
        "xl:grid-cols-3",
      ].join(" ")}
    >
      {projects.map((project, index) => {
        const isFeatured = projects.length > 3 && index % 7 === 0;

        return (
          <motion.div
            key={`${project.name}-${index}`}
            variants={cardVariants}
            className={[
              "min-w-0",
              isFeatured ? "md:col-span-2 xl:col-span-2" : "",
            ].join(" ")}
          >
            <ProjectCard
              project={project}
              index={index}
              featured={isFeatured}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
