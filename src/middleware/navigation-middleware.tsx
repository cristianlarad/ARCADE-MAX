import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface NavigationMiddlewareProps {
  children: React.ReactNode;
}

export const NavigationMiddleware = ({
  children,
}: NavigationMiddlewareProps) => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Navegando a: ${location.pathname}`);
  }, [location]);

  return children;
};
