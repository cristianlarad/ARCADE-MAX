import ProjectDetail, {
  IProjectDetail,
} from "@/components/proyects/ProyectDetail";
import { useGet } from "@/hooks/useGet";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
export default function DetalleProyectos() {
  const { proyectId } = useParams();

  const { data, isLoading, error } = useGet<IProjectDetail>({
    url: `/projects/${proyectId}`,
    key: ["projects"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar el proyecto: {error.message}</div>; // Muestra un mensaje de error
  }

  return (
    <div className="">
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {data ? (
          <ProjectDetail project={data} />
        ) : (
          <div>No se encontró el proyecto.</div>
        )}
      </motion.div>
    </div>
  );
}
