"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCheckboxProps {
  id?: string;
  label?: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  onChange?: (checked: boolean) => void;
  onSubmit?: (checked: boolean) => Promise<void> | void;
  className?: string;
}

export function AnimatedCheckbox({
  id,
  label,
  description,
  defaultChecked = false,
  disabled = false,
  color = "primary",
  size = "md",
  onChange,
  onSubmit,
  className,
}: AnimatedCheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Configuración de colores basada en la prop color
  const colorConfig = {
    primary: {
      bg: "bg-primary",
      border: "border-primary",
      glow: "from-primary/40",
      text: "text-primary",
    },
    success: {
      bg: "bg-green-500",
      border: "border-green-500",
      glow: "from-green-500/40",
      text: "text-green-500",
    },
    warning: {
      bg: "bg-amber-500",
      border: "border-amber-500",
      glow: "from-amber-500/40",
      text: "text-amber-500",
    },
    danger: {
      bg: "bg-red-500",
      border: "border-red-500",
      glow: "from-red-500/40",
      text: "text-red-500",
    },
    info: {
      bg: "bg-blue-500",
      border: "border-blue-500",
      glow: "from-blue-500/40",
      text: "text-blue-500",
    },
  };

  // Configuración de tamaños
  const sizeConfig = {
    sm: {
      checkbox: "w-4 h-4",
      icon: "w-3 h-3",
      text: "text-sm",
      container: "gap-1.5",
    },
    md: {
      checkbox: "w-5 h-5",
      icon: "w-3.5 h-3.5",
      text: "text-base",
      container: "gap-2",
    },
    lg: {
      checkbox: "w-6 h-6",
      icon: "w-4 h-4",
      text: "text-lg",
      container: "gap-3",
    },
  };

  const selectedColor = colorConfig[color];
  const selectedSize = sizeConfig[size];

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = async () => {
    if (disabled || isSubmitting) return;

    const newChecked = !checked;
    setChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }

    if (onSubmit) {
      try {
        setIsSubmitting(true);
        await onSubmit(newChecked);
        // Mostrar partículas después de enviar exitosamente
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
      } catch (error) {
        console.error("Error al enviar el estado del checkbox:", error);
        // Revertir el estado en caso de error
        setChecked(!newChecked);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      <motion.label
        htmlFor={id || "animated-checkbox"}
        className={cn(
          "flex items-start select-none",
          selectedSize.container,
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        whileTap={!disabled ? { scale: 0.97 } : {}}
        onHoverStart={() => !disabled && setIsHovered(true)}
        onHoverEnd={() => !disabled && setIsHovered(false)}
      >
        <div className="relative flex-shrink-0">
          {/* Checkbox base */}
          <motion.div
            className={cn(
              "relative border-2 rounded-md flex items-center justify-center transition-colors",
              selectedSize.checkbox,
              checked
                ? cn(selectedColor.bg, selectedColor.border, "border-opacity-0")
                : "bg-background border-muted-foreground/30",
              disabled ? "opacity-50" : ""
            )}
            initial={false}
            animate={{
              scale: isHovered ? 1.05 : 1,
              borderColor: checked
                ? "rgba(0, 0, 0, 0)"
                : isHovered
                ? `var(--${color})`
                : "rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Icono de check */}
            <AnimatePresence mode="wait">
              {checked && !isSubmitting && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="text-primary-foreground"
                >
                  <Check className={selectedSize.icon} strokeWidth={3} />
                </motion.div>
              )}

              {/* Loader durante el envío */}
              {isSubmitting && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-primary-foreground"
                >
                  <Loader2 className={cn(selectedSize.icon, "animate-spin")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Efecto de resplandor */}
          <AnimatePresence>
            {(isHovered || checked) && !disabled && (
              <motion.div
                className={cn(
                  "absolute inset-0 -z-10 rounded-md bg-gradient-radial to-transparent",
                  selectedColor.glow
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: checked ? 0.4 : 0.2,
                  scale: checked ? 1.3 : 1.1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{ filter: "blur(4px)" }}
              />
            )}
          </AnimatePresence>

          {/* Partículas al completar el envío */}
          <AnimatePresence>
            {showParticles && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={cn(
                      "absolute w-1 h-1 rounded-full",
                      selectedColor.bg
                    )}
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [
                        0,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 40,
                      ],
                      y: [
                        0,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 40,
                      ],
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

          {/* Efecto de onda al hacer clic */}
          <AnimatePresence>
            {checked && !disabled && (
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-md border-2",
                  selectedColor.border
                )}
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Contenido de texto */}
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <motion.span
                className={cn(
                  "font-medium",
                  selectedSize.text,
                  checked ? selectedColor.text : "text-foreground"
                )}
                animate={{
                  color: checked ? `var(--${color})` : "var(--foreground)",
                }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </motion.label>

      <input
        type="checkbox"
        id={id || "animated-checkbox"}
        checked={checked}
        disabled={disabled || isSubmitting}
        onChange={handleChange}
        className="sr-only"
      />
    </div>
  );
}
