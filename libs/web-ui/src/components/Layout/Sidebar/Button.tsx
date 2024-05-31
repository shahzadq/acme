import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../../utils/cn";
import { Button } from "../../Button";

const variants = cva("", {
  variants: {
    size: {
      default: "size-5",
      sm: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const SidebarButton = forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, "children"> & {
    icon: LucideIcon;
  } & VariantProps<typeof variants>
>(({ icon: Icon, className, size, ...props }, ref) => (
  <Button
    ref={ref}
    variant="transparent"
    size="fit"
    className={cn(
      "w-fit opacity-50 transition-colors hover:opacity-100",
      className,
    )}
    {...props}
  >
    <Icon className={variants({ size })} />
  </Button>
));
