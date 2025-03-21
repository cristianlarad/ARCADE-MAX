import { IProject } from "@/types/task";
import { useState } from "react";
import { motion } from "framer-motion";

const ProjectLabel = ({ project }: { project: IProject | undefined }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!project)
    return <div className="text-muted-foreground text-sm">Sin proyecto</div>;

  return (
    <motion.div
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background/50"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: project.color }}
      />
      <span className="text-sm font-medium">{project.name}</span>

      {/* Efecto de resplandor */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-md bg-gradient-radial from-primary/10 to-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ filter: "blur(4px)" }}
        />
      )}
    </motion.div>
  );
};
export { ProjectLabel };
