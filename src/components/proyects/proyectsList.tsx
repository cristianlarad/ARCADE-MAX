"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import LoadingState from "../ui/LoadinState";
import type { IProyectLists } from "@/types/task";
import FormattedDate from "@/utils/FormatDate";
import { ParticleEffect } from "../particleEffect";
import { EmptyState } from "../EmpryState";
import { ErrorState } from "../ErrorState";
import { APIError } from "@/types/api";
import DeleteTask from "../tareas/deleteTask";
import { Link } from "react-router-dom";

const ProjectItem = ({
  project,
  isHovered,
  onHover,
  onDeleteProject,
}: {
  project: IProyectLists;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onDeleteProject: (projectId: string) => void;
}) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={project}
      id={project.id}
      dragControls={dragControls}
      dragListener={false}
      className={cn(
        "relative p-4 rounded-xl border",
        "border-border backdrop-blur-sm overflow-hidden",
        "bg-card text-card-foreground",
        isHovered ? "shadow-lg" : "shadow",
        "cursor-move"
      )}
      whileDrag={{
        scale: 1.02,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        zIndex: 50,
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-end justify-end">
        <DeleteTask
          url={`/projects/${project.id}`}
          onDeleteSuccess={() => onDeleteProject(project.id)}
          onSuccess="Proyecto eliminado correctamente"
        />
      </div>
      <motion.div
        className={cn(
          "absolute inset-0 -z-10",
          "bg-gradient-radial to-transparent"
        )}
        initial={{ opacity: 0.05 }}
        animate={{
          opacity: isHovered ? 0.15 : 0.05,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div
            className="md:absolute md:-left-2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 flex items-center justify-center p-1 rounded-md hover:bg-muted/50 transition-colors cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1 md:ml-3">
            <div className="flex items-center justify-between mb-1">
              <motion.button className="text-lg font-semibold hover:underline">
                <Link to={`/proyects/${project.id}/edit`}>{project.name}</Link>
              </motion.button>
              <FormattedDate dateString={project.created_at} />
            </div>
            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <ParticleEffect isHovered={isHovered} statusType="realized" />
    </Reorder.Item>
  );
};

interface IProjectList {
  initialProjects: IProyectLists[];
  error: APIError | null;
  isLoading: boolean;
}

export function ProjectList({
  initialProjects,
  error,
  isLoading,
}: IProjectList) {
  const [projects, setProjects] = useState<IProyectLists[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const handleDeleteProject = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <ErrorState message={error.message || "Error al cargar los proyectos"} />
    );
  if (!projects.length) return <EmptyState />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
      ref={containerRef}
    >
      <Reorder.Group
        axis="y"
        values={projects}
        onReorder={(newOrder) => setProjects(newOrder)}
        className="space-y-4"
        layoutScroll
        as="div"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <AnimatePresence>
          {projects.map((project) => {
            const isHovered = hoveredProject === project.id && !isDragging;

            return (
              <ProjectItem
                key={project.id}
                project={project}
                isHovered={isHovered}
                onHover={setHoveredProject}
                onDeleteProject={handleDeleteProject}
              />
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </motion.div>
  );
}

export default ProjectList;
