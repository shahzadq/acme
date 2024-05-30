import type { LucideIcon } from "../Icons";
import { cn } from "../../utils/cn";
import { AppLogo } from "../AppLogo";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { LogOutIcon, UserRoundIcon } from "../Icons";

export const SidebarFooterButton = ({
  icon: Icon,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  icon: LucideIcon;
}) => (
  <Button
    variant="transparent"
    size="fit"
    className={cn("opacity-50 transition-colors hover:opacity-100", className)}
    {...props}
  >
    <Icon className="size-5" />
  </Button>
);

export const SidebarFooter = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarFooterButton icon={UserRoundIcon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>email@domain.com</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    {typeof children !== "undefined" && (
      <div className="flex items-center justify-center gap-x-4">{children}</div>
    )}
  </div>
);

export const SidebarHeader = ({
  children,
  appName,
}: { children?: React.ReactNode } & { appName: "todos" }) => (
  <div className="flex items-center justify-between">
    <AppLogo name={appName} />
    {children}
  </div>
);

export const SidebarContent = (props: { children: React.ReactNode }) => (
  <div className="h-full" {...props} />
);

export const Sidebar = (props: { children: React.ReactNode }) => (
  <div className="flex w-56 flex-col gap-y-4 px-5 py-4" {...props} />
);
