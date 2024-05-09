import { forwardRef } from "react";

import { cn } from "../utils/cn";
import { LoaderIcon } from "./Icons";

export const Spinner = forwardRef<
  React.ElementRef<typeof LoaderIcon>,
  React.ComponentPropsWithoutRef<typeof LoaderIcon>
>(function Spinner({ className, ...props }, ref) {
  return (
    <LoaderIcon
      ref={ref}
      className={cn("animate-spin opacity-50", className)}
      {...props}
    />
  );
});
