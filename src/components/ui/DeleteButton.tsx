import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedDeleteButtonProps {
  onDelete: () => Promise<void> | void;
  confirmText?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function AnimatedDeleteButton({
  onDelete,
  confirmText = "¿Estás seguro?",
  children = "Eliminar",
  className,
  variant = "default",
  size = "default",
  disabled = false,
}: AnimatedDeleteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleClick = async () => {
    if (disabled || isDeleting) return;

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete();
      setShowParticles(true);
      setTimeout(() => {
        setShowParticles(false);
        setIsConfirming(false);
      }, 1000);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  return (
    <div className="relative">
      <motion.div
        onHoverStart={() => !disabled && setIsHovered(true)}
        onHoverEnd={() => !disabled && setIsHovered(false)}
        onTapStart={() => !disabled && setIsPressed(true)}
        onTap={() => setTimeout(() => setIsPressed(false), 300)}
        onTapCancel={() => setIsPressed(false)}
        className="relative"
      >
        <Button
          variant={isConfirming ? "destructive" : variant}
          size={size}
          disabled={disabled || isDeleting}
          onClick={handleClick}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            isConfirming && "pr-9",
            className
          )}
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{
              x: isConfirming ? -5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: isHovered && !isConfirming ? [0, -10, 0, 10, 0] : 0,
                scale: isPressed ? 0.9 : isHovered ? 1.1 : 1,
              }}
              transition={{
                rotate: {
                  duration: 0.5,
                  repeat: isHovered && !isConfirming ? 1 : 0,
                  repeatType: "loop",
                },
                scale: { duration: 0.2 },
              }}
            >
              {isConfirming ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </motion.div>
            <span>{isConfirming ? confirmText : children}</span>
          </motion.div>

          {/* Botón de cancelar confirmación */}
          {isConfirming && (
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-destructive-foreground/10 transition-colors"
              onClick={handleCancel}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-3 w-3" />
            </motion.button>
          )}

          {/* Efecto de resplandor */}
          <AnimatePresence>
            {isHovered && !disabled && (
              <motion.div
                className={cn(
                  "absolute inset-0 -z-10",
                  isConfirming
                    ? "bg-gradient-radial from-destructive/20 to-transparent"
                    : "bg-gradient-radial from-primary/20 to-transparent"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ filter: "blur(8px)" }}
              />
            )}
          </AnimatePresence>

          {/* Efecto de ondas al hacer clic */}
          <AnimatePresence>
            {isPressed && !disabled && (
              <>
                {[1, 2].map((i) => (
                  <motion.div
                    key={`ripple-${i}`}
                    className={cn(
                      "absolute inset-0 rounded-md border-2",
                      isConfirming
                        ? "border-destructive/30"
                        : "border-primary/30"
                    )}
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.5 + i * 0.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Partículas de eliminación */}
      <AnimatePresence>
        {showParticles && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`delete-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-destructive"
                style={{
                  left: "50%",
                  top: "50%",
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

      {/* Efecto de explosión */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-destructive/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ filter: "blur(10px)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
