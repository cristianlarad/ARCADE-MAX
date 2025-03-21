"use client";

import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "@/types/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { navMain } from "@/routes/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/BreadCrumbs.css";
// Colores para los efectos de resplandor
const glowColors = {
  primary: "var(--primary)", // --primary: oklch(0.75 0.2 60);
  secondary: "var(--secondary)", // --secondary: oklch(0.3 0.05 250);
  accent: "var(--secondary)",
};

const findBreadcrumbPath = (
  items: NavItem[],
  currentPath: string
): NavItem[] | null => {
  for (const item of items) {
    if (item.routes) {
      const route = item.routes.find((route) => {
        const pattern = new RegExp(
          `^${route.path.replace(/:\w+/g, "([^/]+)")}$`
        );
        return pattern.test(currentPath);
      });

      if (route) {
        const idMatch = currentPath.match(new RegExp(`${item.path}/(.*)`));
        if (idMatch) {
          return [
            item,
            {
              title: `${route.title}`,
              path: currentPath,
              element: route.element,
              icon: item.icon,
            },
          ];
        }
      }
    }

    if (item.path === currentPath) {
      return [item];
    }

    if (item.children) {
      const childPath = findBreadcrumbPath(item.children, currentPath);
      if (childPath) {
        return [item, ...childPath];
      }
    }
  }
  return null;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  let breadcrumbItems: NavItem[] = [];
  navMain.forEach((section) => {
    const path = findBreadcrumbPath(section.items, currentPath);
    if (path) {
      breadcrumbItems = path;
    }
  });

  // Efecto de partículas para los elementos
  const ParticleEffect = ({ isLast = false, isHovered = false, path = "" }) => {
    if (!isLast && !isHovered) return null;

    return (
      <AnimatePresence>
        {(isLast || isHovered) && (
          <>
            {Array.from({ length: isLast ? 4 : 2 }).map((_, i) => (
              <motion.div
                key={`particle-${path}-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: isLast
                    ? glowColors.accent
                    : glowColors.primary,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -5 - Math.random() * 5],
                  x: [0, (Math.random() - 0.5) * 10],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  repeatDelay: Math.random(),
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Breadcrumb className="py-3  backdrop-blur-sm bg-background/30 ">
        <BreadcrumbList className="flex items-center">
          {/* Breadcrumb Items con animaciones */}
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHovered = hoveredItem === item.path;

            return (
              <React.Fragment key={item.path}>
                {/* Separador con animación */}
                <BreadcrumbSeparator>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * (index + 1),
                    }}
                  >
                    <ChevronRight size={18} className="text-primary" />
                  </motion.div>
                </BreadcrumbSeparator>

                {/* Item con animación */}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * (index + 1),
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      onHoverStart={() => setHoveredItem(item.path)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className="relative overflow-hidden rounded-lg px-2 py-1"
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "transition-colors duration-300 relative z-10 flex items-center",
                          isLast ? "font-bold text-primary" : "text-primary"
                        )}
                        style={{
                          textShadow:
                            isLast || isHovered
                              ? `0 0 5px ${glowColors.primary}40`
                              : "none",
                        }}
                      >
                        {item.title}
                      </Link>

                      {/* Efecto de resplandor */}
                      {(isLast || isHovered) && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: isLast ? 0.2 : 0.15, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            background: `radial-gradient(circle at center, ${
                              isLast ? glowColors.accent : glowColors.primary
                            } 0%, transparent 70%)`,
                          }}
                        />
                      )}

                      {/* Efecto de partículas */}
                      <ParticleEffect
                        isLast={isLast}
                        isHovered={isHovered}
                        path={item.path}
                      />

                      {/* Indicador de elemento activo */}
                      {isLast && (
                        <motion.div
                          layoutId="breadcrumbActiveIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sidebar-primary to-sidebar-foreground"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Efecto de línea de conexión */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sidebar-primary/30 to-transparent -z-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Efecto de resplandor general */}
      <motion.div
        className="absolute -inset-4 bg-sidebar-primary/5 rounded-3xl blur-xl -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export { Breadcrumbs };
