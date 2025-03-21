import { cn } from "@/lib/utils";
import { StatusPEdidosItems } from "@/types/pedidos";
import { useState } from "react";
import { motion } from "framer-motion";

export function ItemList({ item }: { item: StatusPEdidosItems }) {
  const [isHovered, setIsHovered] = useState(false);

  const itemTotal =
    Number.parseFloat(item.precio.replace(/[^\d.-]/g, "")) * item.cantidad;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-md border p-3",
        "bg-card",
        isHovered ? "shadow-md border-primary/30" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3">
        {/* Imagen simulada */}
        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-muted-foreground">
            {item.nombre.split(" ")[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm line-clamp-1">{item.nombre}</h3>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded-md">
              <div className="w-8 text-center text-sm">{item.cantidad}</div>
            </div>

            <motion.div
              className="font-medium text-sm"
              animate={{
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? "var(--primary)" : "var(--foreground)",
              }}
              transition={{ duration: 0.2 }}
            >
              ${itemTotal.toFixed(2)}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
