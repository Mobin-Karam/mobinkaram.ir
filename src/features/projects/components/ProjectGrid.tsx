"use client";

import ProjectCard from "./ProjectCard";
import type { Project } from "../data/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div
      className={[
        "grid grid-cols-1 gap-4 font-mono",
        "sm:gap-5 md:grid-cols-2",
        "xl:grid-cols-3",
      ].join(" ")}
    >
      {projects.map((project, index) => {
        const isFeatured = projects.length > 3 && index % 7 === 0;

        return (
          <div
            key={`${project.name}-${index}`}
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
          </div>
        );
      })}
    </div>
  );
}
