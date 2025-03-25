"use client";

import type React from "react";
import { useState } from "react";
import type { LaptopsType } from "../../types/laptops";
import { usePost } from "@/hooks/usePost";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Monitor,
  Weight,
  Server,
  Battery,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";

const CreateProducto: React.FC = () => {
  const [producto, setProducto] = useState<Partial<LaptopsType>>({
    inStock: true,
    tipo: "laptop",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      setProducto((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setProducto((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePuertosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setProducto((prev) => {
      const currentPuertos = prev.puertos || [];
      if (checked) {
        return { ...prev, puertos: [...currentPuertos, value] };
      } else {
        return {
          ...prev,
          puertos: currentPuertos.filter((puerto) => puerto !== value),
        };
      }
    });
  };

  const { mutate: createProduct, isPending } = usePost<LaptopsType, FormData>({
    url: "/laptops",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: () => {
      toast.success("Producto creado exitosamente");
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Error al crear el producto"
      );
    },
    invalidateQueries: ["laptops"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Añadir campos de texto
    Object.entries(producto).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "puertos") {
          formData.append(key, (value as string[]).join(","));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Añadir imagen si existe
    if (image) {
      formData.append("image", image);
    }

    createProduct(formData);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: "#2563eb" },
    tap: { scale: 0.95 },
  };

  const checkboxVariants = {
    checked: { scale: 1.1 },
    unchecked: { scale: 1 },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8  rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Crear Nuevo Producto (Laptop)
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-2" variants={itemVariants}>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Imagen del Producto
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Vista previa"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="nombre"
              name="nombre"
              value={producto.nombre || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="procesador"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" /> Procesador
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="procesador"
              name="procesador"
              value={producto.procesador || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <label
              htmlFor="memoria_RAM"
              className=" text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Server className="w-4 h-4" /> Memoria RAM
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="memoria_RAM"
              name="memoria_RAM"
              value={producto.memoria_RAM || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="almacenamiento"
              className=" text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <HardDrive className="w-4 h-4" /> Almacenamiento
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="almacenamiento"
              name="almacenamiento"
              value={producto.almacenamiento || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <label
              htmlFor="pantalla"
              className=" text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" /> Pantalla
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="pantalla"
              name="pantalla"
              value={producto.pantalla || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="peso"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Weight className="w-4 h-4" /> Peso
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="peso"
              name="peso"
              value={producto.peso || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tipo de Producto
            </label>
            <motion.select
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              id="tipo"
              name="tipo"
              value={producto.tipo || "laptop"}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg  text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option className="bg-primary" value="laptop">
                Laptop
              </option>
              <option value="teléfono">Teléfono</option>
              <option value="escritorio">Escritorio</option>
            </motion.select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="inStock"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Disponibilidad
            </label>
            <div className="flex items-center space-x-3">
              <motion.div
                variants={checkboxVariants}
                animate={producto.inStock ? "checked" : "unchecked"}
                className="relative"
              >
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={producto.inStock || false}
                  onChange={handleChange}
                  className="sr-only"
                />
                <motion.div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                    producto.inStock
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() =>
                    setProducto((prev) => ({ ...prev, inStock: !prev.inStock }))
                  }
                >
                  <motion.div
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: producto.inStock ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.div>
              <span className="flex items-center gap-1 text-sm">
                {producto.inStock ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" /> En Stock
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" /> Agotado
                  </>
                )}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Puertos
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["USB", "HDMI", "Thunderbolt", "Jack 3.5mm", "Ethernet"].map(
              (puerto) => (
                <motion.label
                  key={puerto}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    (producto.puertos || []).includes(puerto)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <input
                    type="checkbox"
                    name="puertos"
                    value={puerto}
                    checked={(producto.puertos || []).includes(puerto)}
                    onChange={handlePuertosChange}
                    className="sr-only"
                  />
                  <motion.span
                    animate={{
                      scale: (producto.puertos || []).includes(puerto)
                        ? 1.05
                        : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {puerto}
                  </motion.span>
                </motion.label>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <label
              htmlFor="batería"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Battery className="w-4 h-4" /> Batería
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="batería"
              name="batería"
              value={producto.batería || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" /> Precio
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
              }}
              type="text"
              id="precio"
              name="precio"
              value={producto.precio || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium text-lg shadow-md hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          disabled={isPending}
        >
          {isPending ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <span>Creando...</span>
            </motion.div>
          ) : (
            "Crear Producto"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CreateProducto;
