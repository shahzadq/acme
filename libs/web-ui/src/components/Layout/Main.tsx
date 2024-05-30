import { cn } from "../../utils/cn";

export const Main = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <main
    className={cn(
      "mr-2 mt-2 w-full rounded-t-md border border-border bg-foreground/[0.01]",
      className,
    )}
    {...props}
  />
);
