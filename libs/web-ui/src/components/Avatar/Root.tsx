import { forwardRef } from "react";
import { Root } from "@radix-ui/react-avatar";

import { cn } from "../../utils/cn";

export const Avatar = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
