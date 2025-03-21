import ProjectList from "@/components/proyects/proyectsList";
import { useGet } from "@/hooks/useGet";
import { IProyectLists } from "@/types/task";
import { motion } from "framer-motion";
export default function TodosProyectos() {
  const { data, isLoading, error } = useGet<IProyectLists[]>({
    url: "/projects",
    key: ["projects"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="">
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProjectList
          initialProjects={data ?? []}
          isLoading={isLoading}
          error={error}
        />
      </motion.div>
    </div>
  );
}
