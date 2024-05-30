"use client";

import type { TodoWithList } from "@workspace/db-todos/types";
import { useState } from "react";

import { Checkbox } from "@workspace/web-ui/components/Checkbox";

import { updateTodoCompleted } from "@/actions/todos";
import { DotSeparator } from "./DotSeparator";

export const Todo = ({
  description,
  list,
  id,
  createdAt,
  onCheckedChange = () => {},
  ...props
}: TodoWithList & { onCheckedChange?: (v: boolean) => void }) => {
  const [completed, setCompleted] = useState(props.completed);

  return (
    <div className="mt-1 flex w-full flex-row items-center gap-x-4 rounded-md bg-foreground/5 p-4 first-of-type:mt-0">
      <Checkbox
        checked={completed}
        onCheckedChange={async (v) => {
          if (typeof v === "boolean") {
            const result = await updateTodoCompleted({ id, completed: v });

            if (result.type !== "Error") {
              setCompleted(v);
              onCheckedChange(v);
            }
          }
        }}
      />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{description}</div>
        <div className="flex flex-row items-center gap-x-2 text-foreground/50">
          <span>{list !== null ? list.name : "Unlisted"}</span>
          <DotSeparator />
          <span>{createdAt.toDateString()}</span>
        </div>
      </div>
    </div>
  );
};
