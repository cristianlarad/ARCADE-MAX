"use client";

import type React from "react";
import { useState } from "react";
import type { LaptopsType } from "../../types/laptops";
import { usePost } from "@/hooks/usePost";
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
  Upload,
  Laptop,
  Smartphone,
  ComputerIcon as Desktop,
  Usb,
  Tv2,
  Headphones,
  Wifi,
  NetworkIcon as Ethernet,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const PUERTOS_OPTIONS = [
  { value: "USB", icon: <Usb className="w-3.5 h-3.5 mr-1.5" /> },
  { value: "HDMI", icon: <Tv2 className="w-3.5 h-3.5 mr-1.5" /> },
  { value: "Thunderbolt", icon: <Usb className="w-3.5 h-3.5 mr-1.5" /> },
  { value: "Jack 3.5mm", icon: <Headphones className="w-3.5 h-3.5 mr-1.5" /> },
  { value: "Ethernet", icon: <Ethernet className="w-3.5 h-3.5 mr-1.5" /> },
  { value: "Wi-Fi", icon: <Wifi className="w-3.5 h-3.5 mr-1.5" /> },
];

const TIPOS_PRODUCTO = [
  {
    value: "laptop",
    label: "Laptop",
    icon: <Laptop className="w-4 h-4 mr-2" />,
  },
  {
    value: "teléfono",
    label: "Teléfono",
    icon: <Smartphone className="w-4 h-4 mr-2" />,
  },
  {
    value: "escritorio",
    label: "Escritorio",
    icon: <Desktop className="w-4 h-4 mr-2" />,
  },
];

const CreateProducto: React.FC = () => {
  const [producto, setProducto] = useState<Partial<LaptopsType>>({
    inStock: true,
    tipo: "laptop",
    puertos: [],
  });
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
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

  const handleSelectChange = (name: string, value: string) => {
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePuertosChange = (puerto: string) => {
    setProducto((prev) => {
      const currentPuertos = prev.puertos || [];
      if (currentPuertos.includes(puerto)) {
        return {
          ...prev,
          puertos: currentPuertos.filter((p) => p !== puerto),
        };
      } else {
        return { ...prev, puertos: [...currentPuertos, puerto] };
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
    hover: { scale: 1.02, backgroundColor: "#2563eb" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="max-w-5xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border shadow-lg  ">
        <CardHeader className="bg-amber-500 border mx-4 p-4 text-white rounded-lg">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            Crear Nuevo Producto
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Imagen del producto */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Imagen del Producto</h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <Label htmlFor="image" className="text-sm font-medium">
                    Seleccionar imagen
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <Label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer  transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Haz clic para subir
                          </span>{" "}
                          o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG o WEBP (MAX. 2MB)
                        </p>
                      </div>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>

                {imagePreview && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Vista previa</Label>
                    <div className="relative border rounded-lg overflow-hidden aspect-video ">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Vista previa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Información básica */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Información Básica</h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Producto</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={producto.nombre || ""}
                    onChange={handleChange}
                    placeholder="Ej: MacBook Pro 16 2023"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precio">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-green-600" /> Precio
                    </div>
                  </Label>
                  <Input
                    id="precio"
                    name="precio"
                    value={producto.precio || ""}
                    onChange={handleChange}
                    placeholder="Ej: 1299.99"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Producto</Label>
                  <Select
                    value={producto.tipo || "laptop"}
                    onValueChange={(value) => handleSelectChange("tipo", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_PRODUCTO.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          <div className="flex items-center">
                            {tipo.icon}
                            {tipo.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Disponibilidad</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md ">
                    <div className="flex items-center gap-2">
                      {producto.inStock ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span>{producto.inStock ? "En Stock" : "Agotado"}</span>
                    </div>
                    <Switch
                      checked={producto.inStock || false}
                      onCheckedChange={(checked) =>
                        setProducto((prev) => ({ ...prev, inStock: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Especificaciones técnicas */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  Especificaciones Técnicas
                </h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="procesador">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" /> Procesador
                    </div>
                  </Label>
                  <Input
                    id="procesador"
                    name="procesador"
                    value={producto.procesador || ""}
                    onChange={handleChange}
                    placeholder="Ej: Intel Core i7-12700H"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memoria_RAM">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-blue-600" /> Memoria RAM
                    </div>
                  </Label>
                  <Input
                    id="memoria_RAM"
                    name="memoria_RAM"
                    value={producto.memoria_RAM || ""}
                    onChange={handleChange}
                    placeholder="Ej: 16GB DDR5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="almacenamiento">
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-amber-600" />{" "}
                      Almacenamiento
                    </div>
                  </Label>
                  <Input
                    id="almacenamiento"
                    name="almacenamiento"
                    value={producto.almacenamiento || ""}
                    onChange={handleChange}
                    placeholder="Ej: 512GB SSD NVMe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pantalla">
                    <div className="flex items-center gap-1.5">
                      <Monitor className="w-4 h-4 text-indigo-600" /> Pantalla
                    </div>
                  </Label>
                  <Input
                    id="pantalla"
                    name="pantalla"
                    value={producto.pantalla || ""}
                    onChange={handleChange}
                    placeholder="Ej: 15.6 pulgadas FHD IPS"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="peso">
                    <div className="flex items-center gap-1.5">
                      <Weight className="w-4 h-4 text-gray-600" /> Peso
                    </div>
                  </Label>
                  <Input
                    id="peso"
                    name="peso"
                    value={producto.peso || ""}
                    onChange={handleChange}
                    placeholder="Ej: 1.8 kg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batería">
                    <div className="flex items-center gap-1.5">
                      <Battery className="w-4 h-4 text-green-600" /> Batería
                    </div>
                  </Label>
                  <Input
                    id="batería"
                    name="batería"
                    value={producto.batería || ""}
                    onChange={handleChange}
                    placeholder="Ej: 6 celdas, 72Wh"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Puertos y conectividad */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <Usb className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  Puertos y Conectividad
                </h3>
              </div>
              <Separator />

              <div className="space-y-3">
                <Label>Selecciona los puertos disponibles</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {PUERTOS_OPTIONS.map((puerto) => {
                    const isSelected = (producto.puertos || []).includes(
                      puerto.value
                    );
                    return (
                      <motion.div
                        key={puerto.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePuertosChange(puerto.value)}
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected ? "scale-105" : ""
                        }`}
                      >
                        <Badge
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full py-3 justify-center text-sm font-medium ${
                            isSelected
                              ? "bg-amber-500 hover:bg-amber-600 text-white"
                              : "hover:bg-amber-50 dark:hover:bg-amber-950"
                          }`}
                        >
                          <div className="flex items-center">
                            {puerto.icon}
                            {puerto.value}
                          </div>
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Botón de envío */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full py-6 text-lg font-medium bg-amber-500 hover:bg-amber-600 rounded-lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                      <span>Creando producto...</span>
                    </div>
                  ) : (
                    <span>Crear Producto</span>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateProducto;
