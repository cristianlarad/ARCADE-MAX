"use client";

import { motion } from "framer-motion";
import { LaptopsType } from "@/types/laptops";
import LaptopGrid from "@/components/laptops/LaptopsGrid";
import { useGet } from "@/hooks/useGet";
import LoadingPage from "../LoadingPage";
import { ErrorState } from "@/components/ErrorState";
import { useCartStore } from "@/hooks/useStore";

export default function LaptopPage() {
  const { data, isLoading, error } = useGet<LaptopsType[]>({
    url: "/laptops",
    key: ["laptops"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
  const handleAddToCart = (laptop: LaptopsType) => {
    if (addItem && laptop.inStock) {
      console.log("Añadiendo al carrito:", laptop); // Verifica que se está llamando
      addItem({ ...laptop, quantity: 1 });
    }
  };
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div>
        <ErrorState />
      </div>
    );
  }

  const filterData = data?.filter((laptop) => laptop.tipo === "laptop");

  return (
    <div className="min-h-screen p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <motion.h1
            className="text-3xl font-bold text-primary mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Catálogo de Laptops
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explora nuestra selección de laptops de alta calidad
          </motion.p>
        </div>

        <LaptopGrid laptops={filterData ?? []} onAddToCart={handleAddToCart} />
      </motion.div>
    </div>
  );
}
