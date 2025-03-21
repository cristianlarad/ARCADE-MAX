import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";

import "@/index.css";
import { ModeToggle } from "@/theme/mode-toggle";
import { Breadcrumbs } from "@/components/bread-crumbs";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShoppingCart from "@/components/shopingcard";
import { useEffect, useState } from "react";
import { RiAdminFill } from "@remixicon/react";

export default function RootLayout() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        navigate("/login");
        return;
      }

      // Verificar si es admin
      try {
        const userData = JSON.parse(user);
        // Cambié de userData.isAdmin a userData.admin
        setIsAdmin(userData.admin === true);
      } catch (error) {
        console.error("Error parsing user data", error);
        setIsAdmin(false);
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);
  return (
    <div>
      <Toaster position="bottom-left" />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="-ms-4 hover:cursor-pointer " />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumbs />
            </div>
            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => `
              flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200
              ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-200 dark:hover:bg-primary dark:hover:text-black"
              }
            `}
              >
                <RiAdminFill />
                Administración
              </NavLink>
            )}
            <ModeToggle />
            <ShoppingCart onCheckout={() => {}} />
          </header>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            <div className="">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
