import type { LucideIcon, LucideProps } from "lucide-react";

import { cn } from "../../utils/cn";

export const ContextMenuItemIcon = ({
  icon: Icon,
  className,
  ...props
}: LucideProps & { icon: LucideIcon }) => (
  <Icon className={cn("size-4", className)} {...props} />
);
