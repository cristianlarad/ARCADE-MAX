"use client";

import type React from "react";
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { RiLogoutBoxLine } from "@remixicon/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/accordion.css";
import type { NavItem } from "@/types/navigation";
import { navMain } from "@/routes/navigation";

const glowColors = {
  primary: "var(--primary)", // --primary: oklch(0.75 0.2 60);
  secondary: "var(--secondary)", // --secondary: oklch(0.3 0.05 250);
  accent: "var(--accent)", // --accent: oklch(0.75 0.25 310);
};

// This is sample data.
const data = {
  teams: [
    {
      name: "ARCADE MAX",
      logo: "../../public/LogoSize/logo_size_invert.jpg",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Efecto de partículas para los elementos del menú
  const ParticleEffect = ({ isActive = false, isHovered = false }) => {
    if (!isActive && !isHovered) return null;

    return (
      <AnimatePresence>
        {(isActive || isHovered) && (
          <>
            {Array.from({ length: isActive ? 5 : 3 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: isActive
                    ? glowColors.secondary
                    : glowColors.primary,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -10 - Math.random() * 10],
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

  const renderMenuItems = (items: NavItem[]) => {
    return items.map((menuItem, index) => {
      const isActive = location.pathname === menuItem.path;
      const isHovered = hoveredItem === menuItem.title;
      const hasChildren = menuItem.children && menuItem.children.length > 0;

      if (hasChildren) {
        return (
          <Accordion
            key={menuItem.title}
            type="single"
            collapsible
            className="border-none"
          >
            <AccordionItem value={menuItem.title} className="border-none">
              <AccordionTrigger
                className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:no-underline overflow-hidden ${
                  isActive ? "bg-primary" : "hover:bg-primary/10"
                }`}
                onMouseEnter={() => setHoveredItem(menuItem.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="mr-3 text-primary"
                  >
                    {menuItem.icon && (
                      <menuItem.icon
                        size={20}
                        aria-hidden="true"
                        className="font-medium"
                        style={{
                          filter: isHovered
                            ? `drop-shadow(0 0 3px ${glowColors.primary})`
                            : "none",
                        }}
                      />
                    )}
                  </motion.div>
                  <span
                    className="font-medium text-primary"
                    style={{
                      textShadow: isHovered
                        ? `0 0 5px ${glowColors.primary}40`
                        : "none",
                    }}
                  >
                    {menuItem.title}
                  </span>
                </div>

                {/* Efecto de resplandor */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at center, ${glowColors.primary} 0%, transparent 70%)`,
                    }}
                  />
                )}

                <ParticleEffect isActive={isActive} isHovered={isHovered} />
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0">
                <div className="pl-4 border-l-2 border-sidebar-ring/20">
                  {renderMenuItems(menuItem.children ?? [])}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }

      return (
        <motion.div
          key={menuItem.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ease-in-out overflow-hidden ${
                isActive ? "bg-sidebar-ring/20" : "hover:bg-sidebar-ring/10"
              }`}
              onMouseEnter={() => setHoveredItem(menuItem.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink to={menuItem.path} className="flex items-center w-full">
                {/* Indicador activo con animación */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-full bg-gradient-to-b from-primary to-foreground rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icono con animación */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`mr-3 relative z-10 ${
                    isActive
                      ? "text-primary"
                      : "text-primary group-hover:text-primary"
                  }`}
                >
                  {menuItem.icon && (
                    <menuItem.icon
                      size={20}
                      aria-hidden="true"
                      className={`font-medium ${
                        isActive
                          ? "text-primary"
                          : "text-primary group-hover:text-primary"
                      }`}
                      style={{
                        filter:
                          isActive || isHovered
                            ? `drop-shadow(0 0 3px ${glowColors.primary})`
                            : "none",
                      }}
                    />
                  )}
                </motion.div>

                {/* Texto con animación */}
                <span
                  className={`font-medium relative z-10 ${
                    isActive
                      ? "text-primary"
                      : "text-primary group-hover:text-primary"
                  }`}
                  style={{
                    textShadow:
                      isActive || isHovered
                        ? `0 0 5px ${glowColors.primary}40`
                        : "none",
                  }}
                >
                  {menuItem.title}
                </span>

                {/* Efecto de resplandor */}
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isActive ? 0.2 : 0.15, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at center, ${glowColors.primary} 0%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Efecto de partículas */}
                <ParticleEffect isActive={isActive} isHovered={isHovered} />
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {menuItem.children && (
            <div className="pl-4">{renderMenuItems(menuItem.children)}</div>
          )}
        </motion.div>
      );
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Sidebar
      {...props}
      className="backdrop-blur-xl bg-background dark:bg-background/50 border-r shadow-lg text-primary"
    >
      <SidebarHeader className="p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <TeamSwitcher teams={data.teams} />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="px-3 bg-background">
        {navMain.map((section, sectionIndex) => (
          <SidebarGroup key={section.title} className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="mb-2 px-4 text-sm text-sidebar-ring font-semibold"
              whileHover={{
                x: 3,
                textShadow: `0 0 5px ${glowColors.primary}40`,
                transition: { duration: 0.2 },
              }}
            >
              {section.title}
            </motion.div>
            <SidebarGroupContent className="bg-background">
              <SidebarMenu>{renderMenuItems(section.items)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 bg-background">
        <SidebarMenu>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                className="group relative px-4 py-2 rounded-xl hover:bg-sidebar-ring/10 transition-all duration-300 ease-in-out overflow-hidden"
                asChild
                onClick={handleSignOut}
              >
                <motion.div
                  className="flex items-center w-full relative z-10"
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 },
                  }}
                  onMouseEnter={() => setHoveredItem("signout")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 },
                    }}
                    className="mr-3 text-sidebar-ring group-hover:text-sidebar-ring"
                    style={{
                      filter:
                        hoveredItem === "signout"
                          ? `drop-shadow(0 0 3px ${glowColors.primary})`
                          : "none",
                    }}
                  >
                    <RiLogoutBoxLine size={20} aria-hidden="true" />
                  </motion.div>
                  <span
                    className="font-medium text-sidebar-ring group-hover:text-sidebar-ring"
                    style={{
                      textShadow:
                        hoveredItem === "signout"
                          ? `0 0 5px ${glowColors.primary}40`
                          : "none",
                    }}
                  >
                    Sign Out
                  </span>

                  {/* Efecto de resplandor */}
                  {hoveredItem === "signout" && (
                    <motion.div
                      className="absolute inset-0 -z-10 opacity-30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.15, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `radial-gradient(circle at center, ${glowColors.primary} 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Efecto de ondas al hacer hover */}
                  <AnimatePresence>
                    {hoveredItem === "signout" && (
                      <>
                        {[1, 2].map((i) => (
                          <motion.div
                            key={`ripple-${i}`}
                            className="absolute inset-0 rounded-xl border border-sidebar-ring -z-10"
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ scale: 1 + i * 0.1, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Partículas */}
                  <ParticleEffect isHovered={hoveredItem === "signout"} />
                </motion.div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
