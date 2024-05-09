"use client";

import type { Todo, TodoWithList } from "@workspace/db-todos/types";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@workspace/web-ui/components/Button";
import {
  Form,
  FormField,
  FormItem,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { Input } from "@workspace/web-ui/components/Input";

import { createTodo } from "@/actions/todos";

const schema = z.object({
  description: z.string().min(2).max(256),
});

export const CreateNewTodoForm = ({
  listId = null,
  onSuccess,
}: Partial<Pick<Todo, "listId">> & {
  onSuccess: (todo: TodoWithList) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
    },
  });

  const handleFormSubmit = form.handleSubmit(async (values) => {
    setIsLoading(true);
    const result = await createTodo({ ...values, listId });

    if (result.type === "Error") {
      form.setError("root", { message: result.message });
    } else {
      form.reset();
      onSuccess(result.content);
    }

    setIsLoading(false);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-row gap-x-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <Input
                type="text"
                placeholder="What do you want to get done?"
                className="h-full"
                {...field}
              />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          size="icon"
          isLoading={isLoading}
        >
          <PlusIcon className="aspect-square w-4" />
        </Button>
      </form>
    </Form>
  );
};
