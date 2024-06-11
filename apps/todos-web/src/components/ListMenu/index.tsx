"use client";

import {
  CircleSlashIcon,
  ListIcon,
  ListTodoIcon,
} from "@workspace/web-ui/components/Icons";

import { useListsNames } from "@/hooks/useListsNames";
import { CreateNewListForm } from "./CreateNewListForm";
import { ListCategory } from "./ListCategory";
import { ListLink } from "./ListLink";

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
        {listsNames.map((name, idx) => (
          <ListLink key={idx} href={`/${name.toLowerCase()}`}>
            {name}
          </ListLink>
        ))}
        <CreateNewListForm />
      </ListCategory>
    </div>
  );
};
