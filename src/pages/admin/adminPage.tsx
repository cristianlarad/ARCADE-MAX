import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/layout/adminLayout";
import { LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import Dashboard from "./Dashboard";
import UsuariosList from "./UsuariosList";
import CreateProducto from "./CreateProducto";
import { RiProductHuntLine } from "@remixicon/react";

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
    element: <div>Pedidos</div>,
  },
  {
    path: "usuarios",
    label: "Usuarios",
    icon: Users,
    element: <UsuariosList />,
  },
  {
    path: "producto",
    label: "Producto",
    icon: RiProductHuntLine,
    element: <CreateProducto />,
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
