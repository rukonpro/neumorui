import React from "react";
import { useReveal } from "../../hooks/useAnimation";
import { cn } from "../../utils/cn";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn("neu-reveal", visible && "neu-visible", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
