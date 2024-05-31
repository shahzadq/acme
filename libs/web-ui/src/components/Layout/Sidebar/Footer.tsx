import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../DropdownMenu";
import { LogOutIcon, UserRoundIcon } from "../../Icons";
import { ThemeToggle } from "../../ThemeToggle";
import { SidebarButton } from "./Button";

export const SidebarFooter = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center justify-center gap-x-4">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarButton icon={UserRoundIcon} />
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
    </div>
    {typeof children !== "undefined" && (
      <div className="flex items-center justify-center gap-x-4">{children}</div>
    )}
  </div>
);
