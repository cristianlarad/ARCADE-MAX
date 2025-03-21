import { NavSection } from "@/types/navigation";
import { RiComputerLine, RiPhoneFindLine } from "@remixicon/react";
import { Laptop2, ShoppingBag } from "lucide-react";
import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const LoadingComponent = React.lazy(() => import("@/pages/LoadingPage"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const LaptopsPage = React.lazy(() => import("@/pages/products/Laptops"));
const EscritorioPage = React.lazy(() => import("@/pages/products/Escritorio"));
const TelefonoPage = React.lazy(() => import("@/pages/products/Telefonos"));
const PedidosStatus = React.lazy(
  () => import("@/pages/products/PedidosStatus")
);

const Inicio = React.lazy(() => import("@/pages/products/Inicio"));

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user?.admin) {
    return <Navigate to="/productos/laptops" replace />;
  }

  return <>{children}</>;
};

export const navMain: NavSection[] = [
  {
    title: "Inicio",
    items: [
      {
        title: "Inicio",
        path: "/",
        icon: Laptop2,
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Inicio />
          </Suspense>
        ),
      },
      ...(() => {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        return user?.admin
          ? [
              {
                title: "Admin",
                path: "/admin",
                icon: Laptop2,
                element: (
                  <AdminRoute>
                    <Suspense fallback={<LoadingComponent />}>
                      <h1>Admin Dashboard</h1>
                    </Suspense>
                  </AdminRoute>
                ),
              },
            ]
          : [];
      })(),
    ],
  },
  {
    title: "Productos",
    items: [
      {
        title: "Laptops",
        path: "/productos/laptops",
        icon: Laptop2,
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LaptopsPage />
          </Suspense>
        ),
        routes: [
          {
            path: "/subpage/:id/edit",
            element: <div>Editar subpágina</div>,
            title: "Editar",
          },
        ],
      },
      {
        title: "Escritorio",
        path: "/productos/escritorio",
        icon: RiComputerLine,
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <EscritorioPage />
          </Suspense>
        ),
      },
      {
        title: "Telefonos",
        path: "/productos/telefonos",
        icon: RiPhoneFindLine,
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <TelefonoPage />
          </Suspense>
        ),
        routes: [
          {
            path: "/subpage/:id/edit",
            element: <div>Editar subpágina</div>,
            title: "Editar",
          },
        ],
      },
      {
        path: "/pedidos",
        icon: ShoppingBag,
        element: (
          <div>
            <Suspense fallback={<LoadingComponent />}>
              <PedidosStatus />
            </Suspense>
          </div>
        ),
        title: "Pedidos",
      },
    ],
  },
];

export const authRoutes = [
  {
    title: "Login",
    path: "/login",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Login />
      </Suspense>
    ),
  },
  {
    title: "Register",
    path: "/register",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Register />
      </Suspense>
    ),
  },
];
