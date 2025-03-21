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

import { useGet } from "@/hooks/useGet";
import LoadingState from "../ui/LoadinState";
import type { IProject, Task } from "@/types/task";
import FormattedDate from "@/utils/FormatDate";
import { ProjectLabel } from "../ProyectLabel";
import { ParticleEffect } from "../particleEffect";
import { EmptyState } from "../EmpryState";
import { ErrorState } from "../ErrorState";
import { UserAssignment } from "../userAsigned";
import { StatusBadge } from "../statusBadge";
import type { APIError } from "@/types/api";
import PostCompleteTask from "./completeTask";
import DeleteTask from "./deleteTask";
import { statusConfig } from "@/utils/StatusConfig";

export const getStatusFromNumber = (
  status: number
): "pending" | "assigned" | "realized" | "delete" => {
  switch (status) {
    case 1:
      return "pending";
    case 2:
      return "assigned";
    case 3:
      return "realized";
    case 4:
      return "delete";

    case 5:
    default:
      return "realized";
  }
};

const TaskItem = ({
  task,
  project,
  isHovered,
  onHover,
  onAssignUser,
  userAssignments,
  onDeleteTask,
}: {
  task: Task;
  project?: IProject;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onAssignUser: (taskId: string, userId: string) => void;
  userAssignments: Record<string, string>;
  onDeleteTask: (taskId: string) => void;
}) => {
  const statusType = getStatusFromNumber(task.status);
  const { glowClass, colorClass } = statusConfig[statusType];
  const dragControls = useDragControls();

  return (
    <>
      <Reorder.Item
        value={task}
        id={task.id}
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
        onMouseEnter={() => onHover(task.id)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="flex items-end justify-end">
          {task.status != 4 && (
            <DeleteTask
              taskId={task.id}
              onDeleteSuccess={() => onDeleteTask(task.id)}
            />
          )}
        </div>
        <motion.div
          className={cn(
            "absolute inset-0 -z-10",
            "bg-gradient-radial to-transparent",
            glowClass
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
                <motion.h3 className={cn("text-lg font-semibold", colorClass)}>
                  {task.title}
                </motion.h3>
                <FormattedDate dateString={task.create_at} />
              </div>
              <p className="text-muted-foreground text-sm">
                {task.description}
              </p>
            </div>
            <StatusBadge statusType={statusType} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2 border-t border-border/50">
            <ProjectLabel project={project} />
            <div className="grid space-y-3">
              <UserAssignment
                user={task.assignedUsers}
                status={task.status}
                taskId={task.id}
                currentUserId={userAssignments[task.id]}
                onAssignUser={onAssignUser}
              />
              {task.status === 2 && <PostCompleteTask taskId={task.id} />}
            </div>
          </div>
        </div>

        <ParticleEffect isHovered={isHovered} statusType={statusType} />

        <motion.div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1",
            "bg-gradient-to-r to-transparent",
            colorClass
          )}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0.3,
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </Reorder.Item>
    </>
  );
};

interface ItaskList {
  initialTasks: Task[];
  error: APIError | null;
  isLoading: boolean;
}

export function TaskList({ initialTasks, error, isLoading }: ItaskList) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [proyects, setProyects] = useState<IProject[]>([]);
  const [userAssignments, setUserAssignments] = useState<
    Record<string, string>
  >({});
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: proyect } = useGet<IProject[]>({
    url: "/projects",
    key: ["projects"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (initialTasks && proyect) {
      setTasks(initialTasks);
      setProyects(proyect);
    }
  }, [initialTasks, proyect]);

  const handleAssignUser = (taskId: string, userId: string) => {
    setUserAssignments((prev) => ({
      ...prev,
      [taskId]: userId,
    }));

    console.log(`Tarea ${taskId} asignada al usuario ${userId}`);
  };

  const handleReorder = (newOrder: Task[]) => {
    setTasks(newOrder);

    // Aquí normalmente enviarías el nuevo orden al servidor
    console.log(
      "Nuevo orden de tareas:",
      newOrder.map((task) => task.id)
    );
  };

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <ErrorState message={error.message || "Error al cargar las tareas"} />
    );
  if (!tasks.length) return <EmptyState />;
  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
      ref={containerRef}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary mb-2">Mis Tareas</h1>
        <p className="text-muted-foreground">
          Gestiona tus tareas y proyectos
          <span className="block text-xs mt-1 text-muted-foreground/70">
            Arrastra y suelta para reordenar
          </span>
        </p>
      </motion.div>

      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={handleReorder}
        className="space-y-4"
        layoutScroll
        as="div"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <AnimatePresence>
          {tasks.map((task) => {
            const project = proyects.find((p) => p.id === task.proyect_id);
            const isHovered = hoveredTask === task.id && !isDragging;

            return (
              <>
                <TaskItem
                  key={task.id}
                  task={task}
                  project={project}
                  isHovered={isHovered}
                  onHover={setHoveredTask}
                  onAssignUser={handleAssignUser}
                  userAssignments={userAssignments}
                  onDeleteTask={handleDeleteTask}
                />
              </>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            Reordenando tareas...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TaskList;
