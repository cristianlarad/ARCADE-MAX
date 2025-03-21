import { motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-4 text-muted-foreground"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M8 12.5H16M8 16.5H13M7.8 4H16.2C17.8802 4 18.7202 4 19.362 4.32698C19.9265 4.6146 20.3854 5.07354 20.673 5.63803C21 6.27976 21 7.11984 21 8.8V15.2C21 16.8802 21 17.7202 20.673 18.362C20.3854 18.9265 19.9265 19.3854 19.362 19.673C18.7202 20 17.8802 20 16.2 20H7.8C6.11984 20 5.27976 20 4.63803 19.673C4.07354 19.3854 3.6146 18.9265 3.32698 18.362C3 17.7202 3 16.8802 3 15.2V8.8C3 7.11984 3 6.27976 3.32698 5.63803C3.6146 5.07354 4.07354 4.6146 4.63803 4.32698C5.27976 4 6.11984 4 7.8 4Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full -z-10 bg-gradient-radial from-primary/10 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
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
        className="text-xl font-bold text-primary mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title ? <span>{title}</span> : <span>No hay tareas disponibles</span>}
      </motion.h3>

      <motion.p
        className="text-muted-foreground text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {description ? (
          <span>{description}</span>
        ) : (
          <span>
            Parece que no tienes ninguna tarea. ¡Es un buen momento para crear
            una nueva!
          </span>
        )}
      </motion.p>
    </motion.div>
  );
};
export { EmptyState };
