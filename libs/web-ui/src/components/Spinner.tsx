import { forwardRef } from "react";

import { cn } from "../utils/cn";
import { Loader2Icon } from "./Icons";

export const Spinner = forwardRef<
  React.ElementRef<typeof Loader2Icon>,
  React.ComponentPropsWithoutRef<typeof Loader2Icon>
>(function Spinner({ className, ...props }, ref) {
  return (
    <Loader2Icon
      ref={ref}
      className={cn("animate-spin opacity-50", className)}
      {...props}
    />
  );
});
