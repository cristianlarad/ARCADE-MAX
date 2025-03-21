import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { IUserData } from "@/types/auth";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { toast } from "react-hot-toast";
import { IAssignedUsers } from "@/types/task";
import { useNavigate } from "react-router-dom";

interface AssignTaskResponse {
  message: string;
  task: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    status: number;
  };
}

interface AssignTaskData {
  userId: string;
  taskId: string;
}

const UserAssignment = ({
  taskId,
  currentUserId,
  onAssignUser,
  status,
  user,
}: {
  taskId: string;
  status: number;
  user: IAssignedUsers;
  currentUserId?: string;
  onAssignUser: (taskId: string, userId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: users, isLoading } = useGet<IUserData>({
    url: "/users",
    key: ["users"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
  const navigate = useNavigate();
  const { mutate: assignUser, isPending } = usePost<
    AssignTaskResponse,
    AssignTaskData
  >({
    url: `/task/assigned-user`,
    onSuccess: (data) => {
      toast.success(data.message || "Usuario asignado exitosamente");
      onAssignUser(taskId, data.task.user.id);
      navigate("/tareas/asingadas");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al asignar usuario");
    },
    invalidateQueries: ["tasks"],
  });

  const currentUser = user;
  if (isLoading) {
    return <div className="animate-pulse h-10 w-40 bg-muted rounded-md" />;
  }

  return (
    <TooltipProvider>
      <Select
        disabled={status >= 2 || isPending}
        value={currentUserId}
        onValueChange={(value) => {
          const selectedUser = users?.users.find((u) => u.id === value);
          if (selectedUser) {
            assignUser({
              userId: selectedUser.id,
              taskId: taskId,
            });
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative"
            >
              <SelectTrigger
                className={cn(
                  "w-auto min-w-[40px] h-10 px-2 border-input bg-background/50",
                  !currentUser && "justify-center"
                )}
              >
                {currentUser ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={""} alt={currentUser.name} />
                      <AvatarFallback>
                        {currentUser.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate max-w-[100px]">
                      {currentUser.name}
                    </span>
                  </div>
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </SelectTrigger>

              {isHovered && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-md bg-gradient-radial from-primary/20 to-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: "blur(4px)" }}
                />
              )}

              <AnimatePresence>
                {isHovered && (
                  <>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`user-particle-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-primary"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0, 1, 0],
                          y: [0, -5 - Math.random() * 5],
                          x: [0, (Math.random() - 0.5) * 10],
                        }}
                        transition={{
                          duration: 1,
                          repeat: 1,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {currentUser ? "Cambiar asignación" : "Asignar usuario"}
          </TooltipContent>
        </Tooltip>

        <SelectContent className="bg-popover/80 backdrop-blur-sm border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-1 border-b border-border">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Asignar a</span>
          </div>
          {users?.users.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id}
              className="focus:bg-accent focus:text-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={""} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TooltipProvider>
  );
};

export { UserAssignment };
