import { AlertCircle, Check, Clock, DeleteIcon } from "lucide-react";

export const statusConfig = {
  realized: {
    label: "Completada",
    icon: Check,
    colorClass: "text-green-500 dark:text-green-400",
    bgClass: "bg-green-500/10 dark:bg-green-500/20",
    borderClass: "border-green-500/20 dark:border-green-400/30",
    glowClass: "from-green-500/40 dark:from-green-400/40",
  },
  assigned: {
    label: "Assignadas",
    icon: Clock,
    colorClass: "text-amber-500 dark:text-amber-400",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    borderClass: "border-amber-500/20 dark:border-amber-400/30",
    glowClass: "from-amber-500/40 dark:from-amber-400/40",
  },
  pending: {
    label: "Pendiente",
    icon: AlertCircle,
    colorClass: "text-indigo-500 dark:text-indigo-400",
    bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
    borderClass: "border-indigo-500/20 dark:border-indigo-400/30",
    glowClass: "from-indigo-500/40 dark:from-indigo-400/40",
  },
  delete: {
    label: "Eliminadas",
    icon: DeleteIcon,
    colorClass: "text-red-500 dark:text-red-400",
    bgClass: "bg-red-500/10 dark:bg-red-500/20",
    borderClass: "border-indigo-500/20 dark:border-red-400/30",
    glowClass: "from-red-500/40 dark:from-red-400/40",
  },
};
