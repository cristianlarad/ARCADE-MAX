import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingState = ({ title }: { title?: string }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative mb-4"
      >
        <Loader2 className="h-12 w-12 text-primary" />
        <motion.div
          className="absolute inset-0 rounded-full -z-10 bg-gradient-radial from-primary/20 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(4px)" }}
        />
      </motion.div>

      <motion.p
        className="text-muted-foreground text-lg"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {title ? <span>{title}</span> : <span> Cargando tareas...</span>}
      </motion.p>

      {/* Partículas decorativas */}
      <AnimatePresence>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`loading-particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `calc(50% + ${(Math.random() - 0.5) * 100}px)`,
              top: `calc(50% + ${(Math.random() - 0.5) * 100}px)`,
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
              repeat: Infinity,
              delay: i * 0.3,
              repeatDelay: Math.random(),
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingState;
