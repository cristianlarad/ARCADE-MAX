import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layout/latout";
import NotFound from "@/pages/Not-found";
import { RouteConfig, NavItem } from "@/types/navigation";
import { navMain, authRoutes } from "./navigation";
import { PrivateRoute } from "@/components/PrivateRoute";

const generateRoutesFromNavMain = (): RouteConfig[] => {
  const processItems = (items: NavItem[]): RouteConfig[] => {
    return items.flatMap((item) => {
      const routes: RouteConfig[] = [
        {
          path: item.path,
          element: item.element,
        },
      ];

      // Procesar rutas adicionales si existen
      if (item.routes) {
        item.routes.forEach((route) => {
          routes.push({
            path: route.path,
            element: route.element,
          });
        });
      }

      // Procesar rutas hijas
      if (item.children) {
        routes.push(...processItems(item.children));
      }

      return routes;
    });
  };

  const routes: RouteConfig[] = [];
  navMain.forEach((section) => {
    routes.push(...processItems(section.items));
  });

  return routes;
};

export const router = createBrowserRouter([
  // Rutas de autenticación (públicas)
  ...authRoutes,

  // Rutas protegidas
  {
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      ...generateRoutesFromNavMain(),
      {
        path: "/",
        element: <Navigate to="/tareas/pendientes" replace />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
