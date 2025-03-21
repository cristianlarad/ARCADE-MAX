import { usePost } from "@/hooks/usePost";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RiDeleteBin4Fill } from "@remixicon/react";

interface DeleteTaskProps {
  taskId?: string;
  onDeleteSuccess: () => void;
  url?: string;
  onSuccess?: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({
  taskId,
  onDeleteSuccess,
  url,
  onSuccess,
}) => {
  const { mutate: deleteTask } = usePost({
    url: url ? url : `/tasks/${taskId}`,
    onSuccess: () => {
      toast.success(onSuccess ? onSuccess : "Tarea eliminada exitosamente");
      onDeleteSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar");
    },
  });

  const [showParticles, setShowParticles] = useState(false);

  const handleDelete = async () => {
    setShowParticles(true);
    await deleteTask({});
    setTimeout(() => setShowParticles(false), 1000);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <RiDeleteBin4Fill />
      </motion.button>

      <AnimatePresence>
        {showParticles && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-red-500"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [
                    0,
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 40,
                  ],
                  y: [
                    0,
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 40,
                  ],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteTask;
