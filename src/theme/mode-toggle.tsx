"use client";

import type React from "react";

import { useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/theme/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determinar qué icono mostrar basado en el tema actual
  const currentIcon =
    theme === "dark" ? "moon" : theme === "light" ? "sun" : "system";

  // Colores para los efectos de resplandor
  const glowColors = {
    light: "#FFD700", // Dorado para el sol
    dark: "#6366F1", // Púrpura/azul para la luna
    system: "#10B981", // Verde para sistema
  };

  const currentColor =
    theme === "dark"
      ? glowColors.dark
      : theme === "light"
      ? glowColors.light
      : glowColors.system;

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-colors"
            style={{
              borderColor: isHovered
                ? currentColor
                : "rgba(var(--primary), 0.2)",
              boxShadow: isHovered ? `0 0 10px 2px ${currentColor}40` : "none",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onTapStart={() => setIsPressed(true)}
            onTap={() => setTimeout(() => setIsPressed(false), 300)}
            onTapCancel={() => setIsPressed(false)}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{
              scale: 0.95,
              rotate: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            {/* Efecto de resplandor */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${currentIcon}-${isHovered ? "hover" : "normal"}-${
                  isPressed ? "pressed" : "normal"
                }`}
                className="absolute inset-0 rounded-full opacity-30"
                initial={{ scale: 0 }}
                animate={{
                  scale: isPressed ? 1.2 : isHovered ? 1.5 : 1.2,
                  opacity: isPressed ? 0.6 : isHovered ? 0.4 : 0.2,
                }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `radial-gradient(circle, ${currentColor} 0%, transparent 70%)`,
                }}
              />
            </AnimatePresence>

            {/* Efecto de ondas al hacer clic */}
            <AnimatePresence>
              {isPressed && (
                <>
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={`ripple-${i}`}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: currentColor }}
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Iconos con animación */}
            <AnimatePresence mode="wait">
              {theme === "light" && (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{
                    rotate: isHovered ? 180 : 0,
                    opacity: 1,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: isHovered ? 3 : 0.5,
                      repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                      ease: "linear",
                    },
                  }}
                  className="relative z-10"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
                </motion.div>
              )}

              {theme === "dark" && (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{
                    rotate: isHovered ? 360 : 0,
                    opacity: 1,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: isHovered ? 3 : 0.5,
                      repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                      ease: "linear",
                    },
                  }}
                  className="relative z-10"
                >
                  <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
                </motion.div>
              )}

              {theme === "system" && (
                <motion.div
                  key="system"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                    opacity: 1,
                    rotate: isHovered ? 10 : 0,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    scale: {
                      duration: 1.5,
                      repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative z-10"
                >
                  <Laptop className="h-[1.2rem] w-[1.2rem] text-emerald-500" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Partículas que aparecen al hacer hover */}
            <AnimatePresence>
              {isHovered && !isOpen && (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`hover-particle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: currentColor }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 30,
                        y: (Math.random() - 0.5) * 30,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        repeatDelay: Math.random() * 2,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            <span className="sr-only">Toggle theme</span>
          </motion.button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent align="end" forceMount asChild>
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-1 backdrop-blur-sm bg-background/80 border-2 border-primary/10 shadow-lg rounded-lg"
              >
                <ThemeMenuItem
                  icon={<Sun className="h-4 w-4 mr-2 text-amber-500" />}
                  label="Light"
                  onClick={() => setTheme("light")}
                  active={theme === "light"}
                  color={glowColors.light}
                />

                <ThemeMenuItem
                  icon={<Moon className="h-4 w-4 mr-2 text-indigo-400" />}
                  label="Dark"
                  onClick={() => setTheme("dark")}
                  active={theme === "dark"}
                  color={glowColors.dark}
                />

                <ThemeMenuItem
                  icon={<Laptop className="h-4 w-4 mr-2 text-emerald-500" />}
                  label="System"
                  onClick={() => setTheme("system")}
                  active={theme === "system"}
                  color={glowColors.system}
                />
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>

      {/* Partículas decorativas que aparecen al cambiar el tema */}
      <AnimatePresence>
        {isOpen && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-primary"
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 60 - 30,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente para cada elemento del menú con animaciones
function ThemeMenuItem({
  icon,
  label,
  onClick,
  active,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DropdownMenuItem
      asChild
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
          active ? "bg-primary/10" : "bg-transparent"
        } ${isHovered ? `bg-opacity-20 bg-[${color}]` : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative"
          animate={
            isHovered
              ? {
                  x: [0, -2, 0, 2, 0],
                  y: [0, 1, 0, -1, 0],
                }
              : {}
          }
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "tween",
          }}
          style={{
            filter: isHovered ? `drop-shadow(0 0 3px ${color})` : "none",
            transition: "filter 0.2s ease-in-out",
          }}
        >
          {/* Efecto de resplandor detrás del icono */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.7, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: "blur(2px)",
              }}
            />
          )}

          {icon}
        </motion.div>
        <span>{label}</span>

        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute right-2 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </div>
    </DropdownMenuItem>
  );
}
