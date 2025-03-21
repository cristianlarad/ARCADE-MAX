import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/layout/adminLayout";
import { LayoutDashboard, ShoppingCart, Users, Settings } from "lucide-react";
import Dashboard from "./Dashboard";

const adminRoutes = [
  {
    path: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    element: <Dashboard />,
  },
  {
    path: "pedidos",
    label: "Pedidos",
    icon: ShoppingCart,
    element: <h1>Lista de Pedidos</h1>,
  },
  {
    path: "usuarios",
    label: "Usuarios",
    icon: Users,
    element: <h1>Gestión de Usuarios</h1>,
  },
  {
    path: "configuracion",
    label: "Configuración",
    icon: Settings,
    element: <h1>Configuración del Sistema</h1>,
  },
];

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AdminLayout>
  );
}

export { adminRoutes };
