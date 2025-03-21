import { usePost } from "@/hooks/usePost";
import { toast } from "react-hot-toast";
import { AnimatedCheckbox } from "./PostCompleteTask";
import { useNavigate } from "react-router-dom";

interface PostCompleteTaskProps {
  taskId: string;
}

const PostCompleteTask: React.FC<PostCompleteTaskProps> = ({ taskId }) => {
  const navigate = useNavigate();
  const { mutate: completeTask } = usePost({
    url: `/tasks/${taskId}/completed`, // Asegúrate de que esta URL sea correcta
    onSuccess: () => {
      toast.success("Tarea completada exitosamente");
      navigate("/tareas/realizadas");
    },
    onError: (error) => {
      toast.error(error.message || "Error al completar la tarea");
    },
  });

  const handleCompleteTask = async (checked: boolean) => {
    if (checked) {
      await completeTask({});
    }
  };

  return (
    <AnimatedCheckbox label="Completar Tarea" onChange={handleCompleteTask} />
  );
};

export default PostCompleteTask;
