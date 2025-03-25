"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Monitor,
  Weight,
  Usb,
  Battery,
  Check,
  X,
  ChevronDown,
  ShoppingCart,
  Star,
  StarHalf,
  Heart,
  Truck,
  Clock,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LaptopsType } from "@/types/laptops";

interface LaptopCardProps {
  laptop: LaptopsType;
  onAddToCart?: (laptop: LaptopsType) => void;
}

export function LaptopCard({ laptop, onAddToCart }: LaptopCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  // Formatear el precio para asegurarnos de que tiene el formato correcto
  const formattedPrice = laptop.precio.startsWith("$")
    ? laptop.precio
    : `$${laptop.precio}`;

  const priceValue = Number.parseFloat(formattedPrice.replace(/[^\d.-]/g, ""));
  const originalPrice = (priceValue * 1.15).toFixed(2); // Simulando un precio original 15% mayor

  const handleAddToCart = () => {
    if (onAddToCart && laptop.inStock) {
      onAddToCart(laptop);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
    }
  };

  const specItems = [
    { icon: Cpu, label: "Procesador", value: laptop.procesador, key: "cpu" },
    {
      icon: Memory,
      label: "Memoria RAM",
      value: laptop.memoria_RAM,
      key: "ram",
    },
    {
      icon: HardDrive,
      label: "Almacenamiento",
      value: laptop.almacenamiento,
      key: "storage",
    },
    {
      icon: Monitor,
      label: "Pantalla",
      value: laptop.pantalla,
      key: "display",
    },
    { icon: Weight, label: "Peso", value: laptop.peso, key: "weight" },
    { icon: Battery, label: "Batería", value: laptop.batería, key: "battery" },
  ];

  // Generar una calificación aleatoria entre 3.5 y 5
  const rating =
    Math.floor(Math.random() * 3) + 3 + (Math.random() > 0.5 ? 0.5 : 0);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const reviewCount = Math.floor(Math.random() * 1000) + 50;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border transition-all duration-300 group",
        isHovered ? "shadow-xl border-amber-300/50" : "shadow hover:shadow-md",
        !laptop.inStock && "opacity-90"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Etiqueta de descuento */}
      <div className="absolute top-0 left-0 z-10">
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-md flex items-center">
          <Percent className="h-3 w-3 mr-1" />
          15% OFF
        </div>
      </div>

      {/* Badge de stock */}
      <div className="absolute top-0 right-0 z-10">
        <Badge
          variant={laptop.inStock ? "default" : "outline"}
          className={cn(
            "font-medium rounded-bl-md rounded-tr-none",
            laptop.inStock
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-red-500/50 text-red-500 bg-white"
          )}
        >
          {laptop.inStock ? (
            <motion.div
              className="flex items-center gap-1"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 1,
              }}
            >
              <Check className="h-3.5 w-3.5" />
              <span>En Stock</span>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? [0.8, 1, 0.8] : 0.8 }}
              transition={{
                duration: 1,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              <X className="h-3.5 w-3.5" />
              <span>Agotado</span>
            </motion.div>
          )}
        </Badge>
      </div>

      {/* Imagen del producto (ocupando todo el espacio) */}
      <div className="relative flex justify-center items-center h-48 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden p-0">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 0.98 }}
          animate={{
            scale: isHovered ? 1.02 : 0.98,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {laptop.imageURL ? (
            <img
              src={laptop.imageURL || "/placeholder.svg"}
              alt={laptop.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-amber-600 dark:text-amber-400 line-clamp-3">
                  {laptop.nombre}
                </div>
                <div className="text-xs text-amber-500/70 dark:text-amber-400/70 mt-1">
                  {laptop.procesador}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Botones de acción flotantes */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <motion.button
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md",
              isWishlist ? "text-red-500" : "text-gray-400"
            )}
            onClick={() => setIsWishlist(!isWishlist)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className="h-4 w-4"
              fill={isWishlist ? "currentColor" : "none"}
            />
          </motion.button>
        </div>
      </div>

      <CardContent className="pt-4">
        {/* Calificación */}
        <div className="flex items-center mb-1">
          <div className="flex text-amber-400">
            {Array.from({ length: Math.max(0, fullStars) }).map((_, i) => (
              <Star key={`star-${i}`} className="h-4 w-4 fill-current" />
            ))}
            {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
            {Array.from({
              length: Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0)),
            }).map((_, i) => (
              <Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Nombre del producto */}
        <h3 className="font-medium text-base line-clamp-2 h-12 mb-1 group-hover:text-primary transition-colors">
          {laptop.nombre}
        </h3>

        {/* Precios */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {formattedPrice}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          </div>

          {/* Envío */}
          <div className="flex items-center text-xs text-green-600 mt-1">
            <Truck className="h-3.5 w-3.5 mr-1" />
            <span>Envío gratis</span>
            {laptop.inStock && (
              <>
                <span className="mx-1">•</span>
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Entrega en 24h</span>
              </>
            )}
          </div>
        </div>

        {/* Especificaciones destacadas */}
        <div className="space-y-2 mb-3">
          <div className="grid grid-cols-2 gap-2">
            {specItems.slice(0, 4).map((item) => (
              <div key={item.key} className="flex items-start gap-1.5 text-xs">
                <item.icon className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className="font-medium ml-1 line-clamp-1">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección expandible */}
        <div className="mt-2">
          <motion.button
            className="flex items-center justify-center w-full py-1 text-xs text-primary hover:text-primary/80 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-1">
              {isExpanded ? "Ver menos" : "Ver más detalles"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-2"
              >
                <Separator className="mb-2" />

                {/* Especificaciones adicionales */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {specItems.slice(4).map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start gap-1.5 text-xs"
                    >
                      <item.icon className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">
                          {item.label}:
                        </span>
                        <span className="font-medium ml-1 line-clamp-1">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Puertos */}
                <div className="relative p-2 rounded-md border border-border bg-muted/30">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Usb className="h-3.5 w-3.5 text-primary" />
                    <h4 className="font-medium text-xs">Puertos</h4>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {laptop.puertos.map((puerto, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-background/80 text-xs py-0 px-1.5"
                      >
                        {puerto}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0 pb-4 px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <Button
                  className={cn(
                    "w-full h-9 text-sm",
                    laptop.inStock
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  )}
                  disabled={!laptop.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                  <span>Añadir</span>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{laptop.inStock ? "Añadir al carrito" : "Producto agotado"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>

      {/* Partículas al añadir al carrito */}
      <AnimatePresence>
        {showParticles && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`cart-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-amber-500"
                style={{
                  left: "75%", // Posición del botón de añadir al carrito
                  top: "90%",
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: [1, Math.random() * 2],
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
    </Card>
  );
}

export default LaptopCard;
