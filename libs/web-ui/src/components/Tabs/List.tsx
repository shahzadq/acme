import { forwardRef } from "react";
import { List } from "@radix-ui/react-tabs";

import { cn } from "../../utils/cn";

export const TabsList = forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-x-2 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
