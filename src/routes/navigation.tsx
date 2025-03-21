import { NavSection } from "@/types/navigation";
import { RiComputerLine, RiPhoneFindLine } from "@remixicon/react";
import { Laptop2, ShoppingBag } from "lucide-react";
import React, { Suspense, lazy } from "react";

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
