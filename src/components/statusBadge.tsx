import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { statusConfig } from "@/utils/StatusConfig";
import { motion } from "framer-motion";
import { useState } from "react";
import { getStatusFromNumber } from "./tareas/TaskList";

const StatusBadge = ({
  statusType,
  status,
}: {
  statusType?: "assigned" | "realized" | "pending" | "delete";
  status?: number;
}) => {
  const statusTyp = getStatusFromNumber(status ?? 0);

  const {
    label,
    icon: Icon,
    colorClass,
    bgClass,
    borderClass,
  } = statusConfig[statusType ? statusType : statusTyp];
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
          "flex items-center gap-1 px-2 py-1 h-6 border",
          colorClass,
          bgClass,
          borderClass
        )}
      >
        <Icon size={12} />
        <span>{label}</span>
      </Badge>

      {/* Efecto de resplandor */}
      {isHovered && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full -z-10",
            "bg-gradient-radial to-transparent",
            statusConfig[statusType ? statusType : statusTyp].glowClass
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
export { StatusBadge };
