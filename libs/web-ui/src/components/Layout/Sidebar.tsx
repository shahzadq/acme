import { AppLogo } from "../AppLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { LogOutIcon, UserRoundIcon } from "../Icons";

export const Sidebar = ({
  children,
  appName,
}: {
  children: React.ReactNode;
  appName: string;
}) => (
  <div className="flex flex-col gap-y-4 px-5 py-4">
    <AppLogo name={appName} />
    <div className="h-full">{children}</div>
    <div className="flex flex-row gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="opacity-50 transition-colors hover:opacity-100">
          <UserRoundIcon className="size-5" />
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
  </div>
);
