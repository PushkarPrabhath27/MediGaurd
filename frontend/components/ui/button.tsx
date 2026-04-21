import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-950 text-white hover:bg-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.15)]",
      premium: "bg-primary text-primary-foreground hover:bg-teal-700 shadow-[0_18px_36px_rgba(15,118,110,0.22)]",
      destructive: "bg-red-500 text-white hover:bg-red-500/90 shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
      outline: "border border-border bg-white/75 text-foreground hover:bg-white shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "text-muted-foreground hover:bg-white/80 hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-11 px-4 py-2",
      sm: "h-9 rounded-xl px-3 text-xs",
      lg: "h-12 rounded-2xl px-8 text-base",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] transition-all duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
