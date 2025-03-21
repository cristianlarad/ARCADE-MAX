import TaskList from "@/components/tareas/TaskList";
import { useGet } from "@/hooks/useGet";
import { Task } from "@/types/task";
import { motion } from "framer-motion";
export default function TareasAssignadas() {
  const { data, isLoading, error } = useGet<Task[]>({
    url: "/tasks",
    key: ["tasks"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const pendinTask = data?.filter((task) => task.status === 2) ?? [];
  return (
    <div className="">
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TaskList
          initialTasks={pendinTask}
          isLoading={isLoading}
          error={error}
        />
      </motion.div>
    </div>
  );
}
