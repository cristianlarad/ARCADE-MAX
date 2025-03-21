import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { Folder, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useGet } from "@/hooks/useGet";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectSelectProps {
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const ProjectSelect = ({
  value,
  onChange,
  error,
}: ProjectSelectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: projects, isLoading } = useGet<Project[]>({
    url: "/projects",
    key: ["projects"],
  });

  const currentProject = projects?.find((p) => p.id === value);

  return (
    <TooltipProvider>
      <Select value={value} onValueChange={onChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative"
            >
              <SelectTrigger
                className={cn(
                  "w-full min-w-[200px] h-10 px-2 border-input bg-background/50",
                  !currentProject && "text-muted-foreground",
                  error && "border-destructive"
                )}
              >
                {isLoading ? (
                  <span>Cargando proyectos...</span>
                ) : currentProject ? (
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm truncate">
                      {currentProject.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    <span>Seleccionar proyecto</span>
                  </div>
                )}
              </SelectTrigger>

              {/* Efecto de resplandor */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-md bg-gradient-radial from-primary/20 to-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: "blur(4px)" }}
                />
              )}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {currentProject ? "Cambiar proyecto" : "Seleccionar proyecto"}
          </TooltipContent>
        </Tooltip>

        <SelectContent className="bg-popover/80 backdrop-blur-sm border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-1 border-b border-border">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Proyectos</span>
          </div>
          {projects?.map((project) => (
            <SelectItem
              key={project.id}
              value={project.id}
              className="focus:bg-accent focus:text-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {project.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TooltipProvider>
  );
};
