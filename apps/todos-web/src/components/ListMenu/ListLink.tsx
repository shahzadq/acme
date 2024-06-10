import type { LucideIcon } from "@workspace/web-ui/components/Icons";

import { ActiveLink } from "@workspace/web-ui/components/ActiveLink";

export const ListLink = ({
  icon: Icon,
  children,
  ...props
}: {
  href: string;
  children: string;
  icon?: LucideIcon;
}) => {
  return (
    <ActiveLink
      className="flex h-8 w-full flex-row items-center gap-x-2 truncate rounded-md px-3 text-sm text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground/75 data-[active=true]:bg-foreground/10 data-[active=true]:text-foreground"
      {...props}
    >
      {typeof Icon !== "undefined" && <Icon className="aspect-square w-4" />}
      {children}
    </ActiveLink>
  );
};
