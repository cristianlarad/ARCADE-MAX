"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import LaptopCard from "./laptopsCard";
import { LaptopsType } from "@/types/laptops";

interface LaptopGridProps {
  laptops: LaptopsType[];
  onAddToCart?: (laptop: LaptopsType) => void;
}

export function LaptopGrid({ laptops, onAddToCart }: LaptopGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [showInStock, setShowInStock] = useState(false);
  const [filteredLaptops, setFilteredLaptops] = useState(laptops);

  const applyFilters = () => {
    let result = [...laptops];

    if (searchTerm) {
      result = result.filter(
        (laptop) =>
          laptop.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          laptop.procesador.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showInStock) {
      result = result.filter((laptop) => laptop.inStock);
    }

    // Ordenar
    result.sort((a, b) => {
      if (sortBy === "precio-asc") {
        return (
          Number.parseFloat(a.precio.replace(/[^\d.-]/g, "")) -
          Number.parseFloat(b.precio.replace(/[^\d.-]/g, ""))
        );
      } else if (sortBy === "precio-desc") {
        return (
          Number.parseFloat(b.precio.replace(/[^\d.-]/g, "")) -
          Number.parseFloat(a.precio.replace(/[^\d.-]/g, ""))
        );
      } else {
        return a.nombre.localeCompare(b.nombre);
      }
    });

    setFilteredLaptops(result);
  };

  // Resetear filtros
  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("nombre");
    setShowInStock(false);
    setFilteredLaptops(laptops);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por nombre o procesador..."
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => {
                setSearchTerm("");
                applyFilters();
              }}
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nombre">Nombre (A-Z)</SelectItem>
              <SelectItem value="precio-asc">Precio (menor a mayor)</SelectItem>
              <SelectItem value="precio-desc">
                Precio (mayor a menor)
              </SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Ajusta los filtros para encontrar la laptop perfecta
                </SheetDescription>
              </SheetHeader>

              <div className="py-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stock"
                    checked={showInStock}
                    onCheckedChange={(checked) =>
                      setShowInStock(checked === true)
                    }
                  />
                  <Label htmlFor="stock">Mostrar solo disponibles</Label>
                </div>

                <Separator />

                {/* Aquí podrían ir más filtros como rango de precios, 
                    tipo de procesador, cantidad de RAM, etc. */}
              </div>

              <SheetFooter className="sm:justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Resetear
                </Button>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>Aplicar filtros</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button onClick={applyFilters}>Aplicar</Button>
        </div>
      </div>

      {/* Grid de laptops */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <AnimatePresence>
          {filteredLaptops.map((laptop) => (
            <motion.div
              key={laptop._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <LaptopCard laptop={laptop} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredLaptops.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">
            No se encontraron laptops que coincidan con los filtros.
          </p>
          <Button variant="link" onClick={resetFilters} className="mt-2">
            Resetear filtros
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default LaptopGrid;
