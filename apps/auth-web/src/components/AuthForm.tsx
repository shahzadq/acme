"use client";

import type { RequireKeys, StringKeyOf } from "@workspace/types/objects";
import type { z } from "zod";
import { useMemo } from "react";

import { mapKeys } from "@workspace/utils/objects";
import { isString } from "@workspace/utils/typeguards";
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

export const AuthForm = <
  S extends z.ZodObject<z.ZodRawShape>,
  I extends z.infer<S>,
  K extends StringKeyOf<I>,
>({
  schema,
  inputs,
  onSubmit,
}: {
  schema: S;
  inputs: Record<
    K,
    RequireKeys<React.ComponentProps<typeof Input>, "type" | "placeholder">
  >;
  onSubmit: (
    values: I,
    options: {
      setError: (message: string, on?: "root" | K) => void;
    },
  ) => Promise<void> | void;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const errors = useMemo(
    () =>
      mapKeys(form.formState.errors, (_, value) => value?.message).filter(
        isString,
      ),
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
        {mapKeys(inputs, (key, { className, ...input }) => (
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
        ))}
        {errors.length > 0 && (
          <ul className="flex flex-col gap-y-2">
            {errors.map((error, i) => (
              <li
                key={i}
                className="flex flex-row items-center gap-x-2 text-sm text-red-500"
              >
                <TriangleAlertIcon className="size-4" />
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
