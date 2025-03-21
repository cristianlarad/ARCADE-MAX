"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, ListTodo, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/types/auth";
import { statusConfig } from "@/utils/StatusConfig";
import FormattedDate from "@/utils/FormatDate";

// Tipos para el proyecto y tareas
interface Task {
  id: string;

  title: string;
  description: string;
  completed: boolean;
  create_at: string;
  proyect_id: string;
  status: number;
  assignedUsers: IUser | null;
}

export interface IProjectDetail {
  id: string;
  name: string;
  description: string;
  created_at: string;
  status: string;
  completed: boolean;
  tasks: Task[];
}

// Mapeo de status numérico a categorías
const getStatusFromNumber = (
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

const StatusBadge = ({
  statusType,
}: {
  statusType: "realized" | "assigned" | "pending" | "delete";
}) => {
  const {
    label,
    icon: Icon,
    colorClass,
    bgClass,
    borderClass,
  } = statusConfig[statusType];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Badge
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 h-7 border",
          colorClass,
          bgClass,
          borderClass
        )}
      >
        <Icon size={14} />
        <span>{label}</span>
      </Badge>

      {/* Efecto de resplandor */}
      {isHovered && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full -z-10",
            "bg-gradient-radial to-transparent",
            statusConfig[statusType].glowClass
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ filter: "blur(4px)" }}
        />
      )}
    </motion.div>
  );
};

// Componente para mostrar una tarea individual
const TaskItem = ({ task }: { task: Task }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const statusType = getStatusFromNumber(task.status);
  const { colorClass, glowClass } = statusConfig[statusType];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative p-4 rounded-xl border",
        "border-border backdrop-blur-sm overflow-hidden",
        "bg-card text-card-foreground",
        isHovered ? "shadow-lg" : "shadow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo con efecto de resplandor */}
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

      <div className="flex flex-col gap-3">
        {/* Cabecera de la tarea */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <motion.h3
                className={cn("text-base font-medium", colorClass)}
                animate={{
                  scale: isHovered ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {task.title}
              </motion.h3>
              <StatusBadge statusType={statusType} />
            </div>
            <FormattedDate dateString={task.create_at} />
          </div>

          <motion.button
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </motion.button>
        </div>

        {/* Contenido expandible */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator className="my-2" />
              <div className="pt-1 text-sm text-muted-foreground">
                {task.description || "Sin descripción"}
              </div>

              {/* Sección de usuarios asignados */}
              <div className="mt-3 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {task.assignedUsers
                    ? "Usuarios asignados"
                    : "Sin usuarios asignados"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Borde inferior con color según estado */}
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
    </motion.div>
  );
};

// Componente principal de detalle de proyecto
export function ProjectDetail({ project }: { project: IProjectDetail }) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Calcular el progreso del proyecto

  useEffect(() => {
    if (project.tasks && project.tasks.length === 0) {
      setProgress(project.completed ? 100 : 0);
      return; // Asegúrate de que no haya un retorno de un componente JSX aquí
    }

    if (project.tasks) {
      const completedTasks = project.tasks.filter(
        (task) => task.completed
      ).length;
      const progressValue = Math.round(
        (completedTasks / project.tasks.length) * 100
      );

      // Animación del progreso
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress >= progressValue) {
          clearInterval(interval);
          return;
        }
        currentProgress += 1;
        setProgress(currentProgress);
      }, 20);

      return () => clearInterval(interval); // Esto es correcto, ya que se espera una función de limpieza
    }
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Cabecera del proyecto */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Card className="border shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="relative pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-primary">
                  {project && project.name}
                </CardTitle>
                <CardDescription className="mt-1"></CardDescription>
              </div>
            </div>

            {/* Línea de progreso */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">Progreso</span>
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="relative p-4 rounded-lg bg-muted/30 border border-border mt-2"
              onHoverStart={() => setHoveredSection("description")}
              onHoverEnd={() => setHoveredSection(null)}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Descripción</h3>
              </div>
              <p className="text-muted-foreground">
                {(project && project.description) || "Sin descripción"}
              </p>

              {/* Efecto de resplandor */}
              <AnimatePresence>
                {hoveredSection === "description" && (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-lg bg-gradient-radial from-primary/5 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sección de tareas */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
        onHoverStart={() => setHoveredSection("tasks")}
        onHoverEnd={() => setHoveredSection(null)}
      >
        <div className="flex items-center gap-2 mb-4">
          <ListTodo className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Tareas</h2>
        </div>

        {project.tasks && project.tasks.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence>
              {project.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center rounded-xl border border-dashed border-border"
          >
            <p className="text-muted-foreground">
              No hay tareas asociadas a este proyecto
            </p>
          </motion.div>
        )}

        {/* Efecto de resplandor para la sección */}
        <AnimatePresence>
          {hoveredSection === "tasks" && (
            <motion.div
              className="absolute -inset-4 -z-10 bg-primary/5 rounded-3xl blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Partículas decorativas */}
      <AnimatePresence>
        {hoveredSection && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`particle-${hoveredSection}-${i}`}
                className="fixed w-1 h-1 rounded-full bg-primary"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -20 - Math.random() * 30],
                  x: [0, (Math.random() - 0.5) * 40],
                }}
                transition={{
                  duration: 2,
                  repeat: 1,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectDetail;
