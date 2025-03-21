import * as React from "react";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import menulight from "@/components/icons/Menulight.json";
import menuDarck from "@/components/icons/MenuDarck.json";
import { useTheme } from "@/theme/theme-provider";

interface MenuIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export function MenuIcon({
  className,
  size = "md",
  color = "currentColor",
  ...props
}: MenuIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeClasses[size],
        color && `text-${color}`,
        className
      )}
      {...props}
    >
      <Lottie
        animationData={theme === "light" ? menulight : menuDarck}
        loop={true}
        autoplay={true}
        className="w-full h-full text-blue-500"
      />
    </div>
  );
}
