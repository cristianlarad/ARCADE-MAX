import type { RemixiconComponentType } from "@remixicon/react";

export interface RouteItem {
  path: string;
  element: React.ReactNode;
  title: string;
}

export interface NavItem {
  title: string;
  path: string;
  icon: RemixiconComponentType;
  element: React.ReactNode;
  children?: NavItem[];
  routes?: RouteItem[]; // Reemplazamos detail y create por un array de rutas
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

// Tipos de utilidad adicionales que podrías necesitar
export type NavItemWithoutChildren = Omit<NavItem, "children">;
export type RouteConfigWithoutChildren = Omit<RouteConfig, "children">;
