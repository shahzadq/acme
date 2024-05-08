"use client";

import type { List, Todo as TodoType } from "@workspace/db-todos/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/web-ui/components/Tabs";

interface TodoAndList extends TodoType {
  list: List | null;
}

const Todo = ({ description }: TodoAndList) => {
  return <div>{description}</div>;
};

type Tab = "completed" | "not-completed";
const searchParam = "t";

export const Todos = ({
  todos,
  title,
}: {
  todos: TodoAndList[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>();

  useEffect(() => {
    const value = searchParams.get(searchParam);

    if (value === "completed" || value === "not-completed") setTab(value);
    else setTab("not-completed");
  }, [searchParams]);

  const createTabQueryString = useCallback(
    (value: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(searchParam, value);

      return params.toString();
    },
    [searchParams],
  );

  const { completed, notCompleted } = useMemo(() => {
    const completed = [] as TodoAndList[];
    const notCompleted = [] as TodoAndList[];

    todos.forEach((todo) =>
      todo.completed ? completed.push(todo) : notCompleted.push(todo),
    );

    return { completed, notCompleted };
  }, [todos]);

  return (
    <>
      <h1>{title}</h1>
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList>
          <TabsTrigger
            value="not-completed"
            onClick={() => {
              router.push(
                `${pathname}?${createTabQueryString("not-completed")}`,
              );
            }}
          >
            Not Completed
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => {
              router.push(`${pathname}?${createTabQueryString("completed")}`);
            }}
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="not-completed">
          {notCompleted.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </TabsContent>
        <TabsContent value="completed">
          {completed.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};
