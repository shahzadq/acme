import Link from "next/link";

import { cn } from "@workspace/web-ui/utils/cn";

export const AuthFormLink = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => (
  <Link
    className={cn("text-center text-sm text-blue-500", className)}
    {...props}
  />
);
