"use client";

import { z } from "zod";

import { includes } from "@workspace/utils/arrays";
import { Button } from "@workspace/web-ui/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormMessage,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { RotateCcwIcon } from "@workspace/web-ui/components/Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/web-ui/components/Tooltip";
import { cn } from "@workspace/web-ui/utils/cn";

import { useListsNames } from "@/hooks/useListsNames";
import { setList } from "@/stores/todos";

export const CreateNewListForm = () => {
  const listsNames = useListsNames();

  const formSchema = z.object({
    name: z
      .string({ message: "Invalid name" })
      .min(2, { message: "Name should be at least 2 characters long" })
      .max(50, { message: "Nam can't exceed 50 characters" })
      .refine((arg) => !includes(listsNames, arg), {
        message: "Looks like you've already got a list with that name",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const handleFormSubmit = form.handleSubmit((values) => {
    setList({ ...values, id: "1", userId: "1", createdAt: new Date() });
    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ fieldState, field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <FormInput
                    type="text"
                    placeholder="+ New list"
                    className={cn(
                      "h-8 border-0 hover:bg-foreground/5 focus-visible:bg-foreground/10 focus-visible:ring-0",
                      fieldState.error && "text-red-500",
                    )}
                    autoComplete="off"
                    fieldState={fieldState}
                    {...field}
                  />
                </FormControl>
                {(fieldState.isDirty || fieldState.error) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="transparent"
                        size="fit"
                        className="absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center rounded-full backdrop-blur-md hover:bg-foreground/10"
                        onClick={() => form.reset()}
                      >
                        <RotateCcwIcon className="size-3 opacity-75" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Reset</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
