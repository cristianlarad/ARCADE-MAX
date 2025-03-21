import { TaskData, TaskResponse } from "@/types/task";
import { APIError } from "@/types/api";
import { usePost } from "../../hooks/usePost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectSelect } from "@/components/ProjectSelect";
import { cn } from "@/lib/utils";

const taskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  proyect_id: z.string().min(1, "Debe seleccionar un proyecto"),
});

export default function CrearTarea() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      proyect_id: "",
    },
  });

  const { mutate: createTask, isPending } = usePost<TaskResponse, TaskData>({
    url: "/tasks",
    onSuccess: (data) => {
      toast.success(data.message || "Tarea creada exitosamente");
      navigate("/tareas/pendientes");
    },
    onError: (error: APIError) => {
      toast.error(error.response?.data?.message || "Error al crear la tarea");
    },
    invalidateQueries: ["tasks"],
  });

  const onSubmit = (data: z.infer<typeof taskSchema>) => {
    createTask(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl mx-auto py-8 px-4"
    >
      {/* Encabezado animado */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary mb-2">Nueva Tarea</h1>
        <p className="text-muted-foreground">
          Crea una nueva tarea para tu proyecto
        </p>
      </motion.div>

      <Card
        className={cn(
          "relative overflow-hidden",
          "border border-border backdrop-blur-sm",
          "transition-all duration-300 hover:shadow-lg"
        )}
      >
        {/* Efecto de resplandor */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-radial from-primary/5 to-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="popLayout">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Título
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese el título de la tarea"
                            className="bg-background/50 backdrop-blur-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Descripción
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese la descripción de la tarea"
                            className="bg-background/50 backdrop-blur-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="proyect_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Proyecto
                        </FormLabel>
                        <FormControl>
                          <ProjectSelect
                            value={field.value}
                            onChange={field.onChange}
                            error={!!form.formState.errors.proyect_id}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  className="flex justify-end space-x-4 pt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="gap-2 relative overflow-hidden"
                  >
                    <PlusCircle className="h-4 w-4" />
                    {isPending ? "Creando..." : "Crear Tarea"}
                    {isPending && (
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        animate={{
                          x: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </form>
          </Form>
        </CardContent>

        {/* Borde inferior con gradiente */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </Card>
    </motion.div>
  );
}
