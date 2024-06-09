"use client";

import type { LucideIcon } from "@workspace/web-ui/components/Icons";

import { ActiveLink } from "@workspace/web-ui/components/ActiveLink";
import {
  CircleSlashIcon,
  ListIcon,
  ListTodoIcon,
} from "@workspace/web-ui/components/Icons";
import { Spinner } from "@workspace/web-ui/components/Spinner";

import { useListsNames } from "@/hooks/useListsNames";
import { CreateNewListForm } from "./CreateNewListForm";

const ListLink = ({
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
    <div className="ml-2 flex flex-col gap-y-1 border-l border-border pl-2">
      {children}
    </div>
  </div>
);

export const ListMenu = () => {
  const listsNames = useListsNames();

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
        ) : (
          listsNames.map((name, idx) => (
            <ListLink key={idx} href={`/${name.toLowerCase()}`}>
              {name}
            </ListLink>
          ))
        )}
        <CreateNewListForm />
      </ListCategory>
    </div>
  );
};
