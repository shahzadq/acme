"use client";

import type { List } from "@workspace/db-todos/types";
import type { LucideIcon } from "@workspace/web-ui/components/Icons";
import { useEffect, useMemo } from "react";

import { mapKeys } from "@workspace/utils/objects";
import { ActiveLink } from "@workspace/web-ui/components/ActiveLink";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@workspace/web-ui/components/ContextMenu";
import {
  CircleSlashIcon,
  ListIcon,
  ListTodoIcon,
  PencilIcon,
  Trash2Icon,
} from "@workspace/web-ui/components/Icons";
import { Spinner } from "@workspace/web-ui/components/Spinner";

import { setLists, useTodosStore } from "@/stores/todos";

const ListLink = ({
  icon: Icon,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}) => (
  <ContextMenu>
    <ContextMenuTrigger>
      <ActiveLink
        className="flex h-8 w-full flex-row items-center gap-x-2 truncate rounded-md px-3 text-sm text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground/75 data-[active=true]:bg-foreground/10 data-[active=true]:text-foreground"
        {...props}
      >
        {typeof Icon !== "undefined" && <Icon className="aspect-square w-4" />}
        {children}
      </ActiveLink>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        <PencilIcon className="mr-2 size-4" /> Rename
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <Trash2Icon className="mr-2 size-4" /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

const ListCategory = ({
  icon: Icon,
  name,
  children,
}: {
  name: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) => (
  <div className="mt-2 flex flex-col gap-y-1">
    <div className="flex h-8 flex-row items-center gap-x-2 text-sm text-foreground/50">
      <Icon className="aspect-square w-4" />
      <span>{name}</span>
    </div>
    <div className="ml-2 border-l border-border pl-2">{children}</div>
  </div>
);

export const ListMenu = (props: { lists: List[] }) => {
  const lists = useTodosStore((state) => state.lists);

  useEffect(() => {
    if (typeof lists === "undefined") setLists(props.lists);
  }, [lists]);

  const listsNames = useMemo(() => {
    if (typeof lists === "undefined") return undefined;
    return mapKeys(lists, (name) => name);
  }, [lists]);

  return (
    <div className="flex flex-col gap-y-1">
      <ListLink href="/" icon={ListTodoIcon}>
        All
      </ListLink>
      <ListLink href="/unlisted" icon={CircleSlashIcon}>
        Unlisted
      </ListLink>
      <ListCategory name="Your Lists" icon={ListIcon}>
        {typeof listsNames === "undefined" ? (
          <Spinner />
        ) : listsNames.length > 0 ? (
          listsNames.map((name, idx) => (
            <ListLink key={idx} href={`/${name.toLowerCase()}`}>
              {name}
            </ListLink>
          ))
        ) : (
          <div className="w-full overflow-hidden text-sm text-foreground/25">
            You've not created any custom lists. Create a new list by pressing
            the '+' button below.
          </div>
        )}
      </ListCategory>
    </div>
  );
};
