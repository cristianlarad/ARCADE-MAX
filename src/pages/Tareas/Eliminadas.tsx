import TaskList from "@/components/tareas/TaskList";
import { AnimatedDeleteButton } from "@/components/ui/DeleteButton";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { Task } from "@/types/task";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function TareasEliminadas() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGet<Task[]>({
    url: "/task/bin-task",
    key: ["tasks"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
  const { mutate } = usePost({
    url: "/task/bin-task/delete-all",
    onSuccess() {
      toast.success("Papelera Eliminada exitosamente");
      navigate("/tareas/asingadas");
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar la papelera");
    },
    invalidateQueries: ["tasks"],
  });

  return (
    <div className="">
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedDeleteButton
          onDelete={async () => {
            await mutate({});
          }}
        />
        <TaskList
          initialTasks={data ?? []}
          isLoading={isLoading}
          error={error}
        />
      </motion.div>
    </div>
  );
}
