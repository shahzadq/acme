import { cn } from "../utils/cn";
import { ActiveLink } from "./ActiveLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { ChevronDownIcon, ListTodoIcon } from "./Icons";

export const AppLogo = ({ name }: { name?: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex w-fit flex-row items-center gap-x-1">
      <div className="flex flex-row items-center gap-x-1 text-sm">
        <span
          className={cn(
            typeof name !== "undefined"
              ? "text-foreground/50"
              : "text-foreground",
          )}
        >
          acme
        </span>
        {typeof name !== "undefined" && (
          <>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </>
        )}
      </div>
      <ChevronDownIcon className="size-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <ActiveLink href="http://localhost:3000">
        <DropdownMenuItem>
          <ListTodoIcon className="mr-2 size-4" />
          Todos
        </DropdownMenuItem>
      </ActiveLink>
    </DropdownMenuContent>
  </DropdownMenu>
);
