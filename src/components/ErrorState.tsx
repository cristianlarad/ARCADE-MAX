import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const ErrorState = ({ message = "Error al cargar las tareas" }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
        transition={{
          scale: { duration: 0.5 },
          rotate: { duration: 0.5, delay: 0.5 },
        }}
        className="relative mb-4 text-destructive"
      >
        <AlertCircle className="h-16 w-16" />
        <motion.div
          className="absolute inset-0 rounded-full -z-10 bg-gradient-radial from-destructive/20 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(8px)" }}
        />
      </motion.div>

      <motion.h3
        className="text-xl font-bold text-destructive mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        ¡Ups! Algo salió mal
      </motion.h3>

      <motion.p
        className="text-muted-foreground text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6"
      >
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </Button>
      </motion.div>
    </motion.div>
  );
};
export { ErrorState };
