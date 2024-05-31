import { forwardRef } from "react";
import { Separator } from "@radix-ui/react-context-menu";

import { cn } from "../../utils/cn";

export const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
