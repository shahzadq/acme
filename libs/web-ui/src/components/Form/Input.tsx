import type { ControllerFieldState } from "react-hook-form";
import { forwardRef } from "react";

import { cn } from "../../utils/cn";
import { Input } from "../Input";

export const FormInput = forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    fieldState: ControllerFieldState;
  }
>(({ className, fieldState, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      fieldState.error && "border-red-500 focus-visible:ring-red-500",
      className,
    )}
    {...props}
  />
));
