"use client";

import type { TodoWithList } from "@workspace/db-todos/types";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/web-ui/components/Tabs";

import { arrayIncludes } from "@/utils/arrays";
import { mapKeys } from "@/utils/objects";
import { CreateNewTodoForm } from "./CreateNewTodoForm";
import { Todo } from "./Todo";

const searchParam = "t";

export const Todos = ({
  title,
  ...props
}: {
  todos: TodoWithList[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tabs, setTabs] = useState({
    all: {
      text: "All",
      items: props.todos,
    },
    completed: {
      text: "Completed",
      items: props.todos.filter((todo) => todo.completed),
    },
    "not-completed": {
      text: "Not Completed",
      items: props.todos.filter((todo) => !todo.completed),
    },
  });

  type Tab = keyof typeof tabs;

  const [tab, setTab] = useState<Tab>();

  useEffect(() => {
    const value = searchParams.get(searchParam);

    if (arrayIncludes(Object.keys(tabs), value)) setTab(value as Tab);
    else setTab("all");
  }, [searchParams, tabs]);

  const addSearchParam = useCallback(
    (value: Tab) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value !== "all") params.set(searchParam, value);
      else params.delete(searchParam);

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router],
  );

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as Tab)}
        className="flex h-full flex-col gap-y-4 px-5 pt-4"
      >
        <h1 className="text-2xl">{title}</h1>
        <TabsList className="justify-start">
          {mapKeys(tabs, (tab, { text }) => (
            <TabsTrigger value={tab} onClick={() => addSearchParam(tab)}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>
        {mapKeys(tabs, (tab, { items }) => (
          <TabsContent key={tab} value={tab}>
            {items.map((todo) => (
              <Todo
                key={todo.id}
                onCheckedChange={(v) => {
                  setTabs((draft) => {
                    const result = draft[tab].items.find(
                      ({ id }) => id === todo.id,
                    );
                    if (typeof result !== "undefined") result.completed = v;
                    return draft;
                  });
                }}
                {...todo}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
      <div className="border-t border-border px-5 py-4">
        <CreateNewTodoForm
          onSuccess={(todo) => {
            setTabs((draft) => {
              draft.all.items = [...draft.all.items, todo];
              draft["not-completed"].items = [
                ...draft["not-completed"].items,
                todo,
              ];

              return draft;
            });
          }}
        />
      </div>
    </>
  );
};
