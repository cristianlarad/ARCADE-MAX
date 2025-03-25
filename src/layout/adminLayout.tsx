import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleEffect } from "@/components/particleEffect";
import { RiProductHuntLine } from "@remixicon/react";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAccess = () => {
      const user = localStorage.getItem("user");

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userData = JSON.parse(user);
        if (!userData.admin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        navigate("/login");
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const adminNavItems = [
    {
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      path: "/admin/pedidos",
      icon: ShoppingCart,
      label: "Pedidos",
    },
    {
      path: "/admin/usuarios",
      icon: Users,
      label: "Usuarios",
    },
    {
      path: "/admin/producto",
      icon: RiProductHuntLine,
      label: "Producto",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <Toaster position="bottom-left" />
        {/* Admin Navbar with animations */}
        <motion.nav
          className="py-4 px-2"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="container mx-auto flex justify-center space-x-6"
            variants={containerVariants}
          >
            {adminNavItems.map((item, index) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === item.path && <ParticleEffect />}
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-200 dark:hover:bg-primary/20 dark:hover:text-primary-foreground"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <motion.div
                      className="flex items-center space-x-2"
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <motion.span
                        animate={
                          isActive ? { fontWeight: 600 } : { fontWeight: 400 }
                        }
                      >
                        {item.label}
                      </motion.span>
                    </motion.div>
                  )}
                </NavLink>
              </div>
            ))}
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex-1 overflow-y-auto p-4"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children || <Outlet />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
