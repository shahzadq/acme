import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "../utils/cn";

const variants = cva(
  "flex bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-9 w-full rounded-md border border-input px-3 py-1 shadow-sm focus-visible:ring-1 focus-visible:ring-ring",
        transparent: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof variants>
>(function Input({ className, type, variant, ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(variants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
