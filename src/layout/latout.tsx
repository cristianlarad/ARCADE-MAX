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
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShoppingCart from "@/components/shopingcard";
import { useEffect } from "react";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        navigate("/login");
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
