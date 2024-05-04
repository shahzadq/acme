import { createContext, forwardRef, useId } from "react";

import { cn } from "../../utils/cn";

interface FormItemContextValue {
  id: string;
}

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <FormItemContext.Provider value={{ id: useId() }}>
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  </FormItemContext.Provider>
));
