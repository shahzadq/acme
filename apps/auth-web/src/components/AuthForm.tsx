"use client";

import type { StringKeyOf } from "@/types/generics";
import type { z } from "zod";
import { useMemo } from "react";
import Link from "next/link";

import { Button } from "@workspace/web-ui/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { TriangleAlertIcon } from "@workspace/web-ui/components/Icons";
import { Input } from "@workspace/web-ui/components/Input";
import { cn } from "@workspace/web-ui/utils/cn";

import { mapKeys } from "@/utils/objects";

export const AuthForm = <
  S extends z.ZodRawShape,
  V extends z.ZodObject<S>,
  I extends z.infer<V>,
>({
  validator,
  inputs,
  onSubmit,
}: {
  validator: V;
  inputs: Record<
    StringKeyOf<I>,
    React.ComponentProps<typeof Input> &
      Required<
        Pick<React.ComponentProps<typeof Input>, "placeholder" | "type">
      > & { errorCategory: string }
  >;
  onSubmit: (
    values: I,
    options: {
      setError: (message: string, on?: "root" | StringKeyOf<I>) => void;
    },
  ) => Promise<void> | void;
}) => {
  const form = useForm({
    resolver: zodResolver(validator),
  });

  const errors = useMemo(
    () =>
      mapKeys(form.formState.errors, (key, value) => {
        if (key === "root")
          return { field: undefined, error: value?.message ?? undefined };

        if (typeof value?.message !== "undefined")
          return {
            field: inputs[key as keyof typeof inputs].errorCategory,
            error: value.message.toString(),
          };

        return { field: key, error: undefined };
      }).filter((i) => typeof i.error !== "undefined") as {
        field: string;
        error: string;
      }[],
    [form.formState],
  );

  const isLoading = useMemo(
    () =>
      form.formState.isLoading ||
      form.formState.isSubmitting ||
      form.formState.isValidating,
    [form.formState],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) =>
          onSubmit(v as I, {
            setError: (message, on = "root") => form.setError(on, { message }),
          }),
        )}
        className="flex w-full flex-col gap-y-6"
      >
        {mapKeys(inputs, (key, { className, ...input }) => {
          if (typeof key === "string") {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          fieldState.error &&
                            "border-red-500 focus-visible:ring-red-500",
                          className,
                        )}
                        {...input}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          }
        })}
        {errors.length > 0 && (
          <ul className="flex flex-col gap-y-2">
            {errors.map(({ error }, i) => (
              <li
                key={i}
                className="flex flex-row items-center gap-x-2 text-sm text-red-500"
              >
                <TriangleAlertIcon className="size-4" />
                {/* {typeof field !== "undefined" && <span>{field}:</span>} */}
                <span>{error}</span>
              </li>
            ))}
          </ul>
        )}
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Next
        </Button>
      </form>
    </Form>
  );
};
