import { cn } from "../../utils/cn";

export const Main = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <main
    className={cn(
      "mr-2 mt-2 w-full overflow-y-auto overflow-x-hidden rounded-t-md border border-border bg-foreground/[0.02]",
      className,
    )}
    {...props}
  />
);
