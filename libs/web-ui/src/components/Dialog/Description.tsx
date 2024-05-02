import { forwardRef } from "react";
import { Description } from "@radix-ui/react-dialog";

import { cn } from "../../utils/cn";

export const DialogDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
