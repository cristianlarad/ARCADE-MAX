import { cn } from "@/lib/utils";
import { statusConfig } from "@/utils/StatusConfig";
import { AnimatePresence, motion } from "framer-motion";
// Configuración de estados con clases adaptables al tema

const ParticleEffect = ({
  isHovered = false,
  statusType = "pending" as "realized" | "assigned" | "pending" | "delete",
}) => {
  if (!isHovered) return null;

  const { colorClass } = statusConfig[statusType];

  return (
    <AnimatePresence>
      {isHovered && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={cn("absolute w-1 h-1 rounded-full", colorClass)}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -10 - Math.random() * 10],
                x: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                repeatDelay: Math.random(),
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};
export { ParticleEffect };
