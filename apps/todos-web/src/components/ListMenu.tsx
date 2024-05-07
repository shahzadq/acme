"use client";

import type { LucideIcon } from "@workspace/web-ui/components/Icons";

import {
  CircleSlashIcon,
  ListIcon,
  ListTodoIcon,
} from "@workspace/web-ui/components/Icons";

import { useListsNames } from "@/hooks/useListsNames";
import { ActiveLink } from "./ActiveLink";
import { CreateNewList } from "./CreateNewList";

const ListLink = ({
  icon: Icon,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}) => (
  <ActiveLink
    className="flex h-8 w-full flex-row items-center gap-x-2 truncate rounded-md px-3 text-sm text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground/75 [&.active]:bg-foreground/10 [&.active]:text-foreground"
    {...props}
  >
    {typeof Icon !== "undefined" && <Icon className="aspect-square w-4" />}
    {children}
  </ActiveLink>
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

export const ListMenu = () => {
  const listsNames = useListsNames();

  return (
    <div className="flex w-96 flex-col justify-between border-r border-border px-5 py-4">
      <div className="flex flex-col gap-y-1">
        <ListLink href="/" icon={ListTodoIcon}>
          All
        </ListLink>
        <ListLink href="/unlisted" icon={CircleSlashIcon}>
          Unlisted
        </ListLink>
        <ListCategory name="Your Lists" icon={ListIcon}>
          {listsNames.length > 0 ? (
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
      <CreateNewList />
    </div>
  );
};
